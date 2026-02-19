import type { Pairing } from "./Pairing";
import type { Player } from "./Player";

export interface Round {
  id: number;
  number: number;
  completed: boolean;
  pairings: Pairing[];
  pairings_reported: number;
  unpaired_players?: Player[];
  length_minutes: number;
  timer: RoundTimer;
}

export interface RoundTimer {
  running: boolean;
  paused: boolean;
  started: boolean;
}
