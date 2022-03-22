import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { WorkSpaceMember } from './entities/work-space-member.entity';

@Injectable()
@EntityRepository(WorkSpaceMember)
export class WorkSpaceMemberRepository extends Repository<WorkSpaceMember> {
  public async findUserIdByWorkSpaceId(id: number) {
    return this.createQueryBuilder('WorkSpaceMember')
      .select('WorkSpaceMember.userId', 'userId')
      .where('WorkSpaceMember.workSpaceId = :id', { id })
      .getRawMany();
  }
}
