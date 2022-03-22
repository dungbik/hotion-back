import {
  Field,
  ObjectType,
  registerEnumType,
  InputType,
  Directive,
} from '@nestjs/graphql';
import { Column, Entity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsEmail, IsEnum, IsBoolean, IsString } from 'class-validator';
import { CoreEntity } from './core.entity';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export enum UserGrade {
  Normal = 'Normal',
  Premium = 'Premium',
}

registerEnumType(UserGrade, { name: 'UserGrade' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsString()
  username: string;

  @Column({ unique: true })
  @Field(() => String)
  @IsEmail()
  email: string;

  @Column()
  @Field(() => String)
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserGrade, default: UserGrade.Normal })
  @Field(() => UserGrade)
  @IsEnum(UserGrade)
  grade: UserGrade;

  @Column({ default: false })
  @Field(() => Boolean)
  @IsBoolean()
  verified: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      if (this.password) this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(aPassword, this.password);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
