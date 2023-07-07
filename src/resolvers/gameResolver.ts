import { Arg, FieldResolver, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { GameRepository } from "../repositories/gameRepository";
import { Game, GameWithAttempts } from "../entities/game";
import { PlayerIdInput, SubmitGameInput } from "../inputs/gameInput";
import { Card, CardRow } from "../entities/card";
import { MAX_CARD_PER_ROW } from "../utils/constants";
import { removeDuplicates } from "../utils/utilities";

@Resolver(_ => Game)
export class GameResolver {
    private repositoy = new GameRepository();

    @Query(_ => [Game])
    listAllGames() {
        return this.repositoy.getAllGames();
    }

    @Query(_ => Boolean)
    hasPausedGame(@Arg('input') input: PlayerIdInput) {
        return this.repositoy.hasPausedGame(input.playerId);
    }

    @Query(_ => Int)
    getPlayerRoundCount(@Arg('input') input: PlayerIdInput) {
        return this.repositoy.getPlayerRoundCount(input.playerId);
    }

    @Query(_ => [Game])
    listAllGamesByPlayer(@Arg('input') input: PlayerIdInput) {
        return this.repositoy.getAllGamesByPlayer(input.playerId);
    }

    @Mutation(_ => GameWithAttempts, { nullable: true })
    getNextGame(@Arg('input') input: PlayerIdInput) {
        return this.repositoy.createGame(input.playerId);
    }

    @Mutation(_ => Boolean)
    submitGame(@Arg('input') input: SubmitGameInput) {
        this.repositoy.submitGame(input);

        return true;
    }

    @FieldResolver(_ => [CardRow])
    cardRows(@Root() game: Game) {
        const rows = game.cards.map((_, index) => Math.floor(index / MAX_CARD_PER_ROW));
        const uniqueRows = removeDuplicates(rows);
        const cardRows = uniqueRows.map(rowIndex => new CardRow(rowIndex));

        cardRows.forEach((row, rowIndex) => {
            row.cards.push(
                ...game.cards
                    .map((card, cardIndex) => ({ index: cardIndex, ...card}))
                    .filter(x => Math.floor(x.index / MAX_CARD_PER_ROW) === rowIndex)
            )
        });

        return cardRows;
    }
}