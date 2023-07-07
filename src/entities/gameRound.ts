import { Field, ObjectType } from "type-graphql";
import { PlayAttempt } from "./PlayAttempt";
import { GameRoundStatus } from "src/inputs/gameInput";

@ObjectType()
export class GameRound {
    @Field()
    gameId: string;

    @Field()
    playerId: string;

    @Field(_ => String)
    roundStatus: GameRoundStatus;

    @Field()
    playAttempts: Array<PlayAttempt>;
}