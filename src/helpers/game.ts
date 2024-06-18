import { kv } from "@vercel/kv";

export type Survey = {
  address: string;
  answers: number[];
  result: number | null;
};

export const getOrCreateSurvey = async (address: string) => {
  const game = await kv.get<Survey>(address);
  if (!game)  {
    const newGame = {
      address,
      answers: [],
      result: null,
    }
    await kv.set<Survey>(address, newGame);
    return newGame;
  }
  return game;
}

export const updateSurvey = async (address: string, question: number, answer: number) => {
  const game = await getOrCreateSurvey(address);
  game.answers[question] = answer;
  await kv.set<Survey>(address, game);
}

export const updateSurveyResult = async (address: string, result: number) => {
  const game = await getOrCreateSurvey(address);
  await kv.set<Survey>(address, {
    ...game,
    result
  });
}
