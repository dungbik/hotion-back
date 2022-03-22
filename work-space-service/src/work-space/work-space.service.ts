import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateWorkSpaceInput,
  UserOutput,
  WorkSpaceOutput,
} from './dtos/create-work-space.dto';
import { WorkSpaceMember } from './entities/work-space-member.entity';
import { WorkSpace } from './entities/work-space.entity';
import { UserDTO, UserGrade } from './dtos/user.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WorkSpaceService {
  constructor(
    @InjectRepository(WorkSpace)
    private readonly workSpaceRepository: Repository<WorkSpace>,
    @InjectRepository(WorkSpaceMember)
    private readonly workSpaceMemberRepository: Repository<WorkSpaceMember>,
    @Inject('USER_SERVICE') private userService: ClientProxy,
  ) {}

  async getAllWorkSpace(userId: number): Promise<WorkSpaceOutput[]> {
    if (!userId) {
      return [];
    }

    const workSpaceIds = (
      await this.workSpaceMemberRepository.find({ where: { userId } })
    ).map((workSpaceMember) => workSpaceMember.workSpaceId);

    const workSpaces: WorkSpace[] = await this.workSpaceRepository
      .createQueryBuilder('workspace')
      .whereInIds(workSpaceIds)
      .getMany();

    const memberMap = new Map();

    for (const workspace of workSpaces) {
      const memberIds = await this.workSpaceMemberRepository
        .createQueryBuilder('member')
        .select('member.userId', 'userId')
        .where('member.workSpaceId = :id', { id: workspace.id })
        .getRawMany();

      const members: UserOutput = (
        await firstValueFrom(
          this.userService.send(
            'get_users',
            memberIds.map((obj) => obj.userId),
          ),
        )
      ).map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
      }));
      memberMap.set(workspace.id, members);
    }

    console.log(memberMap);

    const result: WorkSpaceOutput[] = workSpaces.map((workspace) => {
      let output = new WorkSpaceOutput();
      output.id = workspace.id;
      output.title = workspace.title;
      output.isTeam = workspace.isTeam;
      output.members = memberMap.get(workspace.id);
      return output;
    });

    console.log(result);

    return result;
  }

  async createWorkSpace(
    { title, isTeam }: CreateWorkSpaceInput,
    userId: number,
  ): Promise<WorkSpaceOutput> {
    if (!userId) {
      return;
    }

    const workSpace = await this.workSpaceRepository.save(
      this.workSpaceRepository.create({ title, isTeam }),
    );

    const user: UserDTO = await firstValueFrom(
      this.userService.send('get_user', userId),
    );

    if (isTeam && user.grade != UserGrade.Premium) {
      return;
    }

    await this.workSpaceMemberRepository.save(
      this.workSpaceMemberRepository.create({
        userId,
        workSpaceId: workSpace.id,
      }),
    );

    let output = new WorkSpaceOutput();
    output.id = workSpace.id;
    output.title = workSpace.title;
    output.isTeam = workSpace.isTeam;
    output.members = [
      { id: user.id, username: user.username, email: user.email },
    ];

    return output;
  }
}
