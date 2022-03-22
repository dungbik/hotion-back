import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';

@Entity()
export class WorkSpace extends CoreEntity {
  @Column()
  title: string;

  @Column()
  isTeam: boolean;
}
