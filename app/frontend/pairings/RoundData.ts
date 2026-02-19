import type { Round } from "../models/Round";
import type { Stage } from "../models/Stage";
import type { Tournament, TournamentPolicies } from "../models/Tournament";
import { globalMessages } from "../utils/GlobalMessageState.svelte";

declare const Routes: {
  round_data_beta_tournament_round_path: (
    tournamentId: number,
    roundId: number,
  ) => string;
};

export async function loadRound(
  tournamentId: number,
  roundId: number,
): Promise<RoundData> {
  const response = await fetch(
    Routes.round_data_beta_tournament_round_path(tournamentId, roundId),
    {
      method: "GET",
    },
  );

  const data = (await response.json()) as RoundData;
  globalMessages.warnings = data.warnings ?? [];

  return data;
}

export interface RoundData {
  tournament: Tournament;
  stage: Stage;
  round: Round;
  policy?: TournamentPolicies;
  warnings?: string[];
}
