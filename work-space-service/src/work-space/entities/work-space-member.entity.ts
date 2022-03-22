import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class WorkSpaceMember extends CoreEntity {
  @Field(() => ID)
  @Column()
  userId: number;

  @Field(() => ID)
  @Column()
  workSpaceId: number;
}
