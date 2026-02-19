import type {
  FeatureFlags,
  TournamentOptions,
  TournamentSettings,
} from "../models/TournamentSettings";

export type Errors = Record<string, string[]>;

declare const Routes: {
  new_form_tournaments_path: () => string;
  edit_form_tournament_path: (id: number) => string;
  tournaments_path: () => string;
};

export interface TournamentSettingsData {
  tournament: TournamentSettings;
  options: TournamentOptions;
  feature_flags: FeatureFlags;
  csrf_token: string;
}

export function emptyTournamentOptions(): TournamentOptions {
  return {
    tournament_types: [],
    formats: [],
    card_sets: [],
    deckbuilding_restrictions: [],
    time_zones: [],
    official_prize_kits: [],
  };
}

export async function loadNewTournament(): Promise<TournamentSettingsData> {
  const response = await fetch(Routes.new_form_tournaments_path(), {
    headers: { Accept: "application/json" },
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status.toString()}: ${response.statusText}`,
    );
  }
  return (await response.json()) as TournamentSettingsData;
}

export async function loadEditTournament(
  id: number,
): Promise<TournamentSettingsData> {
  const response = await fetch(Routes.edit_form_tournament_path(id), {
    headers: { Accept: "application/json" },
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status.toString()}: ${response.statusText}`,
    );
  }
  return (await response.json()) as TournamentSettingsData;
}

export interface TournamentCreateResponse {
  id: number;
  name: string;
  url: string;
}

export interface TournamentCreateErrorResponse {
  errors: Errors;
}

export async function createTournament(
  csrfToken: string,
  tournament: TournamentSettings,
): Promise<TournamentCreateResponse> {
  const response = await fetch(Routes.tournaments_path(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRF-Token": csrfToken,
    },
    body: JSON.stringify({ tournament }),
  });

  if (!response.ok) {
    if (response.status === 422) {
      const errorData =
        (await response.json()) as TournamentCreateErrorResponse;
      throw new ValidationError(errorData.errors);
    }
    throw new Error(
      `HTTP ${response.status.toString()}: ${response.statusText}`,
    );
  }

  return (await response.json()) as TournamentCreateResponse;
}

export class ValidationError extends Error {
  constructor(public errors: Errors) {
    super("Validation failed");
    this.name = "ValidationError";
  }
}
