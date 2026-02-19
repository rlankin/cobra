import type { StageSettings } from "../models/Stage";
import { globalMessages } from "../utils/GlobalMessageState.svelte";
import { csrfToken } from "../utils/network";

declare const Routes: {
  settings_tournament_stage_path: (
    tournamentId: number,
    stageId: number,
  ) => string;
  tournament_stage_path: (tournamentId: number, stageId: number) => string;
};

export class StageData {
  stage: StageSettings;
  warning?: string;

  constructor() {
    this.stage = {
      id: -1,
      tournament_id: -1,
      number: -1,
      format: null,
      table_ranges: [],
    };
  }
}

export interface SaveStageResponse {
  url: string;
  error?: string;
}

export class ValidationError extends Error {
  constructor(public errors: string) {
    super("Validation failed");
    this.name = "ValidationError";
  }
}

export async function loadStage(
  tournamentId: number,
  stageId: number,
): Promise<StageData> {
  const response = await fetch(
    Routes.settings_tournament_stage_path(tournamentId, stageId),
    {
      headers: { Accept: "application/json" },
      method: "GET",
    },
  );

  const data = (await response.json()) as StageData;
  globalMessages.warnings = data.warning ? [data.warning] : [];

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status.toString()}: ${response.statusText}`,
    );
  }

  return data;
}

export async function saveStage(
  tournamentId: number,
  stage: StageSettings,
): Promise<SaveStageResponse> {
  const response = await fetch(
    Routes.tournament_stage_path(tournamentId, stage.id),
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": csrfToken(),
      },
      body: JSON.stringify({ stage }),
    },
  );

  const saveStageResponse = (await response.json()) as SaveStageResponse;

  if (!response.ok) {
    if (response.status === 422) {
      throw new ValidationError(
        saveStageResponse.error ?? "Stage could not be updated.",
      );
    }

    throw new Error(
      `HTTP ${response.status.toString()}: ${response.statusText}`,
    );
  }

  return saveStageResponse;
}
