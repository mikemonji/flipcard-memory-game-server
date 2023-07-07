import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { GameResolver } from "./resolvers/gameResolver";

export default (): Promise<GraphQLSchema> => {
    return buildSchema({
      resolvers: [
        GameResolver
      ],
      validate: false
    });
}