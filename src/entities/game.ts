import { Field, ObjectType } from "type-graphql";
import { Card } from "./card";
import { POSSIBLE_TRIES } from "../utils/constants";
import { PlayAttempt } from "./PlayAttempt";

@ObjectType()
export class Game {
    @Field()
    id: string;
    
    cards: Array<Card>;

    @Field()
    playerId: string;

    @Field()
    maximumTriesAllowed: number;

    @Field({ nullable: true })
    isCompleted: boolean;

    constructor(id: string, cards: Array<Card>, playerId: string) {
        this.id = id;
        this.cards = cards;
        this.playerId = playerId;
        this.maximumTriesAllowed = POSSIBLE_TRIES;
    }
}

@ObjectType()
export class GameWithAttempts extends Game {
    @Field(_ => [PlayAttempt], { nullable: true })
    playAttempts?: Array<PlayAttempt>;
}
