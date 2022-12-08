enum Move {
  Rock,
  Paper,
  Scissors,
}

enum Outcome {
  Loss = "X",
  Draw = "Y",
  Win = "Z",
}

type Game = {
  them: Move;
  me: Move;
};

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
};

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
};

const StrMoveMap: { [key: string]: Move } = {
  A: Move.Rock,
  X: Move.Rock,
  B: Move.Paper,
  Y: Move.Paper,
  C: Move.Scissors,
  Z: Move.Scissors,
};

const MoveScoreMap = {
  [Move.Rock]: 1,
  [Move.Paper]: 2,
  [Move.Scissors]: 3,
};

const OutcomeScoreMap = {
  [Outcome.Win]: 6,
  [Outcome.Draw]: 3,
  [Outcome.Loss]: 0,
};

const buildGames1 = (input: string[]): Game[] =>
  input.map((line) => {
    const parts = line.split(" ");
    return { them: StrMoveMap[parts[0]], me: StrMoveMap[parts[1]] };
  });

const buildGames2 = (input: string[]): Game[] =>
  input.map((line) => {
    const parts = line.split(" ");
    const theirMove = StrMoveMap[parts[0]];
    const myMove = MoveMap[theirMove][parts[1] as Outcome];
    return { them: theirMove, me: myMove };
  });

const scoreGame = (game: Game): number =>
  MoveScoreMap[game.me] + OutcomeScoreMap[OutcomeMap[game.them][game.me]];

export const d02p1 = (input: string[]): number => {
  const games = buildGames1(input);
  return games.reduce((acc, game) => acc + scoreGame(game), 0);
};

export const d02p2 = (input: string[]): number => {
  const games = buildGames2(input);
  return games.reduce((acc, game) => acc + scoreGame(game), 0);
};
