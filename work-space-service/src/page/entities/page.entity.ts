import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Page extends CoreEntity {
  @Column()
  workSpaceId: number;

  @Column()
  level: number;

  @Column({ nullable: true })
  parentId?: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  content?: string;
}
