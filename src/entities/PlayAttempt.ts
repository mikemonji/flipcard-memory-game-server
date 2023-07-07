import { Field, ObjectType } from "type-graphql";
import { Card } from "./card";

@ObjectType()
export class PlayAttempt {
    @Field(_ => Card)
    firstCard?: Card;

    @Field(_ => Card)
    secondCard?: Card;

    @Field()
    isMatch?: boolean;
};