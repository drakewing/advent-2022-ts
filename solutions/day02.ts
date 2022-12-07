enum Move {
  Rock,
  Paper,
  Scissors,
}

enum Player {
  Them,
  Me,
}

enum Outcome {
  Win,
  Loss,
  Draw,
}

type Game = {
  them: Move,
  me: Move,
}


// their move -> my move -> outcome
const OutcomeMap = {
  [Move.Rock]: {
    [Move.Rock]: Outcome.Draw,
    [Move.Paper]: Outcome.Win,
    [Move.Scissors]: Outcome.Loss,
  },
  [Move.Paper]: {
    [Move.Rock]: Outcome.Loss,
    [Move.Paper]: Outcome.Draw,
    [Move.Scissors]: Outcome.Win,
  },
  [Move.Scissors]: {
    [Move.Rock]: Outcome.Win,
    [Move.Paper]: Outcome.Loss,
    [Move.Scissors]: Outcome.Draw,
  },
}

const getOutcome = (game: Game): Outcome => {
  return OutcomeMap[game.them][game.me];

}

const strToMove = (input: string): Move => {
  switch (input) {
    case "A":
    case "X":
      return Move.Rock;
    case "B":
    case "Y":
      return Move.Paper;
    default:
      return Move.Scissors;
  }
}

const buildGames = (input: string[]): Game[] => {
  const output: Game[] = [];

  for (const line of input) {
    const parts = line.split(" ");
    output.push({ them: strToMove(parts[0]), me: strToMove(parts[1]) });
  }

  return output;
}

const scoreGame = (game: Game): number => {
  let score = 0;

  switch (game.me) {
    case Move.Rock:
      score += 1;
      break;
    case Move.Paper:
      score += 2;
      break;
    default:
      score += 3;
  }

  switch (getOutcome(game)) {
    case Outcome.Win:
      score += 6;
      break;
    case Outcome.Draw:
      score += 3;
      break;
  }

  return score;
}


export const d02p1 = (input: string[]): number => {
  const games = buildGames(input);

  let score = 0;
  for (const game of games) {
    score += scoreGame(game);
  }

  return score;
}

export const d02p2 = (input: string[]): number => {
  return 0;
}
