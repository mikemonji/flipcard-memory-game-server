import { PlayAttempt } from '../entities/PlayAttempt';
import { Card, CardMatch, CardReveal } from '../entities/card';
import { Game, GameWithAttempts } from '../entities/game';
import { v4 as uuidv4 } from 'uuid';
import { GameRoundStatus } from '../inputs/gameInput';
import { GameRound } from '../entities/gameRound';

const games: Game[] = [];
const gamesPlayed: GameRound[] = [];

type SubmitGameInputType = {
  gameId: string;
  playerId: string;
  playAttempts: Array<PlayAttempt>;
  roundStatus: GameRoundStatus;
};

class GameRepository {
  private GAME_ROWS = 2;

  private REVEALABLE_CARDS: Array<CardReveal> = [
    'CAP',
    'OVERALLS',
    'SHOES',
    'SKIRT',
    'T-SHIRT'
  ];

  private MATCHED_CARDS: Array<CardMatch> = [
    'H', 'A', 'P', 'P', 'Y',
    'H', 'U', 'N', 'N', 'Y',
  ];

  private generateUID() {
    return uuidv4();
  }

  public hasPausedGame(playerId: string) {
    return gamesPlayed.some(game => game.playerId === playerId && game.roundStatus === 'PAUSED');
  }

  public createGame(playerId: string) {
    const pausedRound = gamesPlayed.find(game => game.playerId === playerId && game.roundStatus === 'PAUSED');

    if (pausedRound) {
      const pausedGame = this.getGameById(pausedRound.gameId);
      const gameRound = this.getAttemptsByGameId(pausedRound.gameId);

      return {
        ...pausedGame,
        playAttempts: gameRound?.playAttempts
      };
    }

    const unfinishedGame = games.find(game => game.playerId === playerId && !game.isCompleted);

    if (unfinishedGame) {
      return unfinishedGame;
    }

    const cardsToReveal = Array(this.GAME_ROWS)
      .fill(null)
      .map(() => this.REVEALABLE_CARDS)
      .reduce((x, y) => x.concat(...y), []);

    const shuffledCards = cardsToReveal
      .map(card => ({ index: Math.random(), card }))
      .sort((x, y) => x.index < y.index ? -1 : 1)
      .map(x => x.card);

    const cards: Array<Card> = shuffledCards.map((card, index) => new Card(
      this.generateUID(), 
      card, 
      this.MATCHED_CARDS[index]
    ));

    const game = new Game(
      this.generateUID(), 
      cards,
      playerId
    );

    this.addGame(game);

    return game;
  }

  private logPlayedGame(input: SubmitGameInputType) {
    const gamePlayed = gamesPlayed.find(game => game.gameId === input.gameId);

    if (gamePlayed) {
      return;
    }

    gamesPlayed.push(input);
  }

  public submitGame(input: SubmitGameInputType) {
    this.updateRound(input);
    this.logPlayedGame(input);

    const game = this.getGameById(input.gameId);

    if (!game) {
      return;
    }    

    if (input.roundStatus === 'COMPLETED') {
      this.updateGame({ ...game, isCompleted: true});
    }
  }

  public getAllGames(): Game[] {
    return games;
  }

  public getAllGamesByPlayer(playerId: string): Game[] {
    return games.filter(x => x.playerId === playerId);
  }

  public getPlayerRoundCount(playerId: string): number {
    return gamesPlayed.filter(game => game.playerId === playerId && game.roundStatus === 'COMPLETED').length;
  }

  public getGameById(id: string): Game | undefined {
    return games.find((game) => game.id === id);
  }

  public getAttemptsByGameId(id: string) {
    return gamesPlayed.find((round) => round.gameId === id);
  }

  private addGame(game: Game): void {
    games.push(game);
  }

  private updateRound(round: GameRound): void {
    const index = gamesPlayed.findIndex((x) => x.gameId === round.gameId);

    if (index !== -1) {
      gamesPlayed[index] = round;
    }
  }

  private updateGame(game: Game): void {
    const index = games.findIndex((x) => x.id === game.id);

    if (index !== -1) {
      games[index] = game;
    }
  }

  private deleteGame(id: string): void {
    const index = games.findIndex((game) => game.id === id);

    if (index !== -1) {
      games.splice(index, 1);
    }
  }
}

export { GameRepository };
