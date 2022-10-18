import { InputType, Field } from "type-graphql";

@InputType({ description: "New wilder data" })
export class CreateWilderInput {
  @Field()
  name: string;

  @Field()
  city: string;

  @Field()
  description: string;

  @Field((type) => String, { nullable: true })
  avatar: string;
}
