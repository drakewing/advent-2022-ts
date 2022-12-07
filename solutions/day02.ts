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
  Loss = "X",
  Draw = "Y",
  Win = "Z",
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

// their move -> desired outcome -> my move
const MoveMap = {
  [Move.Rock]: {
    [Outcome.Draw]: Move.Rock,
    [Outcome.Win]: Move.Paper,
    [Outcome.Loss]: Move.Scissors,
  },
  [Move.Paper]: {
    [Outcome.Draw]: Move.Paper,
    [Outcome.Win]: Move.Scissors,
    [Outcome.Loss]: Move.Rock,
  },
  [Move.Scissors]: {
    [Outcome.Draw]: Move.Scissors,
    [Outcome.Win]: Move.Rock,
    [Outcome.Loss]: Move.Paper,
  },
}

const getOutcome = (game: Game): Outcome => {
  return OutcomeMap[game.them][game.me];
}

const outcomeToMove = (outcome: Outcome, theirMove: Move): Move => {
  return MoveMap[theirMove][outcome];
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

const buildGames2 = (input: string[]): Game[] => {
  const output: Game[] = [];

  for (const line of input) {
    const parts = line.split(" ");
    const theirMove = strToMove(parts[0])
    const myMove = outcomeToMove(parts[1] as Outcome, theirMove);
    output.push({ them: theirMove, me: myMove });
  };

  return output;
};

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
  const games = buildGames2(input);

  let score = 0;
  for (const game of games) {
    score += scoreGame(game);
  }

  return score;
}
