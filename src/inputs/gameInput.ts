import { Game } from "../entities/game";
import { CardMatch, CardReveal } from "../entities/card";
import { Field, InputType, ObjectType } from "type-graphql";
import { PlayAttempt } from "../entities/PlayAttempt";

export type GameRoundStatus = 'PAUSED' | 'COMPLETED';

@InputType()
export class PlayerIdInput {
    @Field()
    playerId: string;
}

@InputType()
class CardInput {
    @Field()
    id: string;
    
    @Field(_ => String)
    reveal: CardReveal;
    
    @Field(_ => String)
    match: CardMatch;
}

@InputType()
class PlayAttemptInput {
    @Field(_ => CardInput)
    firstCard?: CardInput;

    @Field(_ => CardInput)
    secondCard?: CardInput;

    @Field()
    isMatch?: boolean;
};

@InputType()
export class SubmitGameInput extends PlayerIdInput {
    @Field(_ => [PlayAttemptInput])
    playAttempts: Array<PlayAttemptInput>;

    @Field(_ => String)
    roundStatus: GameRoundStatus;

    @Field()
    playerId: string;

    @Field()
    gameId: string;
}
