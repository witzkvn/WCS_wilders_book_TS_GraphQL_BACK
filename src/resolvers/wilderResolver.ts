import { Wilder } from "../entity/Wilder";
import dataSource from "../utils";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { CreateWilderInput } from "./inputs/createWilderInput";

@Resolver(Wilder)
export class WilderResolver {
  @Query(() => [Wilder])
  async getAllWilders(): Promise<Wilder[]> {
    const allWilders = await dataSource.getRepository(Wilder).find({
      relations: {
        grades: {
          skill: true,
        },
      },
    });
    return allWilders;
  }

  @Mutation(() => Wilder)
  async createWilder(
    @Arg("data") newWilder: CreateWilderInput
  ): Promise<Wilder> {
    const createdWilder = await dataSource.getRepository(Wilder).save({
      name: newWilder.name,
      city: newWilder.city,
      description: newWilder.description,
      avatar: newWilder.avatar,
    });
    return createdWilder;
  }
}
