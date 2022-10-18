import "reflect-metadata";
import { ApolloServer, gql } from "apollo-server";
import dataSource from "./utils";
import { Wilder } from "./entity/Wilder";
import { buildSchema } from "type-graphql";
import { WilderResolver } from "./resolvers/wilderResolver";

const typeDefs = gql`
  type Wilder {
    name: String
    city: String
    description: String
    avatar: String
    grades: [Grade]
  }

  type Grade {
    grade: Int
    skill: Skill
  }

  type Skill {
    name: String
  }

  type Query {
    getAllWilders: [Wilder]
  }

  type Mutation {
    createNewWilder(
      name: String
      city: String
      description: String
      avatar: String
    ): Wilder
  }
`;

const resolvers = {
  Query: {
    getAllWilders: async () => {
      const wilders = await dataSource.getRepository(Wilder).find({
        relations: {
          grades: {
            skill: true,
          },
        },
      });
    },
  },

  Mutation: {
    createNewWilder: async (
      resParent: any,
      { name, city, description, avatar }: any
    ) => {
      const newWilder = new Wilder();
      newWilder.name = name;
      newWilder.city = city;
      newWilder.description = description;
      newWilder.avatar = avatar;
      return await dataSource.getRepository(Wilder).save(newWilder);
    },
  },
};

const port = 5000;

async function start(): Promise<void> {
  try {
    await dataSource.initialize();

    const schema = await buildSchema({ resolvers: [WilderResolver] });
    const server = new ApolloServer({ schema });

    try {
      const { url }: { url: string } = await server.listen({ port });
      console.log(`🚀  Server ready at ${url}`);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log("Error while launching the server");
    console.log(error);
  }
}

start();
