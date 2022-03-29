import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreatePageInput,
  CreatePageOutput,
  DetailPageOutput,
  SimplePageOutput,
  UpdatePageInput,
  UpdatePageOutput,
} from './dtos/page.dto';
import { Page } from './entities/page.entity';

@Injectable()
export class PageService {
  constructor(
    @Inject('USER_SERVICE') private userService: ClientProxy,
    @InjectRepository(Page) private readonly pageRepository: Repository<Page>,
  ) {}

  async getAllPage(workSpaceId: number, userId: number) {
    if (!userId) throw new UnauthorizedException();

    const pages: Page[] = await this.pageRepository
      .createQueryBuilder('page')
      .where('page.workSpaceId = :id', { id: workSpaceId })
      .getMany();

    const result: SimplePageOutput[] = [];
    const pageDict = {};

    for (const page of pages) {
      const output = new SimplePageOutput(page);
      result.push(output);
      if (page.parentId) {
        if (page.parentId in pageDict) {
          pageDict[page.parentId].push(output);
        } else {
          pageDict[page.parentId] = [output];
        }
      }
    }

    for (let cur of result) {
      const pages: SimplePageOutput[] = pageDict[cur.pageId];
      if (Symbol.iterator in Object(pages)) {
        for (const page of pages) {
          cur.children.push(page.pageId);
        }
      }
    }
    return result;
  }

  async getPage(pageId: number, userId: number): Promise<DetailPageOutput> {
    if (!userId) throw new UnauthorizedException();

    const exPage = await this.pageRepository.findOne({ where: { id: pageId } });
    if (!exPage) throw new NotFoundException();

    return { content: exPage.content };
  }

  async createPage(
    { workSpaceId, parentId, title, level }: CreatePageInput,
    userId: number,
  ): Promise<CreatePageOutput> {
    try {
      if (!userId) throw new UnauthorizedException();

      const page: Page = await this.pageRepository.save(
        this.pageRepository.create({ workSpaceId, parentId, title, level }),
      );
      return { pageId: page.id };
    } catch (e) {
      return { pageId: -1 };
    }
  }

  async updatePage(
    { pageId, title, content }: UpdatePageInput,
    userId: number,
  ): Promise<UpdatePageOutput> {
    try {
      if (!userId) throw new UnauthorizedException();

      const exPage: Page = await this.pageRepository.findOne({
        where: { id: pageId },
      });
      if (!exPage) throw new NotFoundException();

      exPage.title = title;
      exPage.content = content;
      await this.pageRepository.save(exPage);

      return { success: true };
    } catch (e) {
      return { success: false };
    }
  }
}
