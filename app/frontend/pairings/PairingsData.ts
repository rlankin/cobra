import type { NewPairing } from "../models/Pairing";
import type { Stage } from "../models/Stage";
import { Tournament, TournamentPolicies } from "../models/Tournament";
import { globalMessages } from "../utils/GlobalMessageState.svelte";
import { csrfToken } from "../utils/network";

declare const Routes: {
  markdown_tournament_round_pairings_path: (
    tournamentId: number,
    roundId: number,
  ) => string;
  beta_tournament_round_pairings_path: (
    tournamentId: number,
    roundId: number,
  ) => string;
  beta_tournament_round_pairing_path: (
    tournamentId: number,
    roundId: number,
    pairingId: number,
  ) => string;
  pairings_data_beta_tournament_rounds_path: (tournamentId: number) => string;
  repair_beta_tournament_round_path: (
    tournamentId: number,
    roundId: number,
  ) => string;
  complete_beta_tournament_round_path: (
    tournamentId: number,
    roundId: number,
  ) => string;
  beta_tournament_rounds_path: (tournamentId: number) => string;
  beta_tournament_round_path: (tournamentId: number, roundId: number) => string;
  beta_tournament_stages_path: (tournamentId: number) => string;
  beta_tournament_stage_path: (tournamentId: number, stageId: number) => string;
  cut_beta_tournament_path: (tournamentId: number) => string;
  open_registration_beta_tournament_path: (tournamentId: number) => string;
  close_registration_beta_tournament_path: (tournamentId: number) => string;
  unlock_player_registrations_beta_tournament_path: (
    tournamentId: number,
  ) => string;
  lock_player_registrations_beta_tournament_path: (
    tournamentId: number,
  ) => string;
  update_timer_beta_tournament_round_path: (
    tournamentId: number,
    roundId: number,
  ) => string;
};

export async function loadPairings(
  tournamentId: number,
): Promise<PairingsData> {
  const response = await fetch(
    Routes.pairings_data_beta_tournament_rounds_path(tournamentId),
    {
      method: "GET",
    },
  );

  const data = (await response.json()) as PairingsData;
  globalMessages.warnings = data.warnings ?? [];

  return data;
}

export async function loadSharingData(
  tournamentId: number,
  roundId: number,
): Promise<SharingData> {
  const response = await fetch(
    Routes.markdown_tournament_round_pairings_path(tournamentId, roundId),
    {
      method: "GET",
    },
  );

  return (await response.json()) as SharingData;
}

export async function createPairing(
  tournamentId: number,
  roundId: number,
  newPairing: NewPairing,
): Promise<boolean> {
  const response = await fetch(
    Routes.beta_tournament_round_pairings_path(tournamentId, roundId),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": csrfToken(),
      },
      body: JSON.stringify({ pairing: newPairing }),
    },
  );

  return response.status === 200;
}

export async function deletePairing(
  tournamentId: number,
  roundId: number,
  pairingId: number,
): Promise<boolean> {
  const response = await fetch(
    Routes.beta_tournament_round_pairing_path(tournamentId, roundId, pairingId),
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": csrfToken(),
      },
    },
  );

  return response.status === 200;
}

export async function pairRound(tournamentId: number) {
  const response = await fetch(
    Routes.beta_tournament_rounds_path(tournamentId),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": csrfToken(),
      },
    },
  );

  return response.status === 200;
}

export async function rePairRound(
  tournamentId: number,
  roundId: number,
): Promise<boolean> {
  const response = await fetch(
    Routes.repair_beta_tournament_round_path(tournamentId, roundId),
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": csrfToken(),
      },
    },
  );

  return response.status === 200;
}

export async function completeRound(
  tournamentId: number,
  roundId: number,
  completed: boolean,
): Promise<boolean> {
  const response = await fetch(
    Routes.complete_beta_tournament_round_path(tournamentId, roundId),
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": csrfToken(),
      },
      body: JSON.stringify({ completed: completed }),
    },
  );

  return response.status === 200;
}

export async function deleteRound(
  tournamentId: number,
  roundId: number,
): Promise<boolean> {
  const response = await fetch(
    Routes.beta_tournament_round_path(tournamentId, roundId),
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": csrfToken(),
      },
    },
  );

  return response.status === 200;
}

export async function createStage(
  tournamentId: number,
  cutSingleElim?: boolean,
  cutCount?: number,
) {
  const isCut = cutSingleElim !== undefined && cutCount !== undefined;
  const path = isCut
    ? Routes.cut_beta_tournament_path(tournamentId)
    : Routes.beta_tournament_stages_path(tournamentId);
  const body = isCut
    ? { number: cutCount, ...(cutSingleElim && { elimination_type: "single" }) }
    : null;

  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRF-Token": csrfToken(),
    },
    body: JSON.stringify(body),
  });

  return response.status === 200;
}

export async function deleteStage(
  tournamentId: number,
  stageId: number,
): Promise<boolean> {
  const response = await fetch(
    Routes.beta_tournament_stage_path(tournamentId, stageId),
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": csrfToken(),
      },
    },
  );

  return response.status === 200;
}

export async function setRegistrationStatus(
  tournamentId: number,
  open: boolean,
): Promise<boolean> {
  const path = open
    ? Routes.open_registration_beta_tournament_path(tournamentId)
    : Routes.close_registration_beta_tournament_path(tournamentId);

  const response = await fetch(path, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRF-Token": csrfToken(),
    },
  });

  return response.status === 200;
}

export async function setPlayerRegistrationStatus(
  tournamentId: number,
  locked: boolean,
): Promise<boolean> {
  const path = locked
    ? Routes.lock_player_registrations_beta_tournament_path(tournamentId)
    : Routes.unlock_player_registrations_beta_tournament_path(tournamentId);

  const response = await fetch(path, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRF-Token": csrfToken(),
    },
  });

  return response.status === 200;
}

export async function updateRoundTimer(
  tournamentId: number,
  roundId: number,
  length_minutes: number,
  operation: string,
): Promise<boolean> {
  const response = await fetch(
    Routes.update_timer_beta_tournament_round_path(tournamentId, roundId),
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": csrfToken(),
      },
      body: JSON.stringify({
        length_minutes: length_minutes,
        operation: operation,
      }),
    },
  );

  return response.status === 200;
}

export interface PairingsContext {
  showOrganizerView: boolean;
}

export class PairingsData {
  policy = new TournamentPolicies();
  tournament = new Tournament();
  stages: Stage[] = [];
  warnings?: string[] = [];
}

export class SharingData {
  pages: string[] = [];
}
