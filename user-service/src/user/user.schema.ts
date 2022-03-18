import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field(() => ID)
    id: Number;

    @Field()
    email: string;

    @Field()
    password: string;
}