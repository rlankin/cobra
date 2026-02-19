import type { BracketStage } from "../models/Bracket";

declare const Routes: {
  brackets_tournament_rounds_path: (tournamentId: number) => string;
};

export async function loadBrackets(tournamentId: number): Promise<BracketData> {
  const response = await fetch(
    Routes.brackets_tournament_rounds_path(tournamentId),
    {
      method: "GET",
    },
  );

  return (await response.json()) as BracketData;
}

export interface BracketData {
  stages: BracketStage[];
}
