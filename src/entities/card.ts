import { Field, ObjectType } from "type-graphql";

export type CardReveal =
    'CAP' |
    'SHOES' |
    'SKIRT' |
    'OVERALLS' |
    'T-SHIRT'
;

export type CardMatch =
    'H' |
    'A' |
    'P' |
    'Y' |
    'U' |
    'N'
;

export type CardStatus =
    'BUSY_FLIPPING' |
    'BUSY_RESETTING' |
    'COVERED' |
    'FLIPPED'
;

export type ICardGameStatus =
    'CARD_NOT_MATCHED' |
    'CARD_MATCHED' |
    'CARD_SURPRISE_REVEALED'
;

@ObjectType()
export class Card {
    @Field()
    id: string;
    
    @Field(_ => String)
    reveal: CardReveal;
    
    @Field(_ => String)
    match: CardMatch;

    // This simply mimics what would be a persistent layer i.e: Database call
    constructor(id: string, reveal: CardReveal, match: CardMatch) {
        this.id = id;
        this.reveal = reveal;
        this.match = match;
    }
};

@ObjectType()
export class CardRow {
    @Field()
    rowIndex: number;

    @Field(_ => [Card])
    cards: Array<Card>;

    constructor(index: number) {
        this.rowIndex = index;
        this.cards = [];
    }
};