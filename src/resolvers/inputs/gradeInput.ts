import { InputType, Field } from "type-graphql";
import { Grade } from "../../entity/Grade";

@InputType({ description: "New wilder data" })
export class GradeInput {
  @Field()
  id: number;

  @Field()
  grade: number;

  @Field()
  skillId: number;

  @Field()
  wilderId: number;
}
