import type { Stage } from "../models/Standings";

declare const Routes: {
  standings_data_tournament_players_path: (tournamentId: number) => string;
};

export async function loadStandings(
  tournamentId: number,
): Promise<StandingsData> {
  const response = await fetch(
    Routes.standings_data_tournament_players_path(tournamentId),
    {
      method: "GET",
    },
  );
  return (await response.json()) as StandingsData;
}

export interface StandingsData {
  manual_seed: boolean;
  stages: Stage[];
}
