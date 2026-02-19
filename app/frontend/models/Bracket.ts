import type { Identity } from "./Identity";

export interface BracketStage {
  name: string;
  format: string;
  is_single_sided: boolean;
  is_elimination: boolean;
  rounds: BracketRound[];
  player_count: number;
}

export interface BracketRound {
  id: null;
  number: number;
  pairings: BracketPairing[];
}

export interface BracketPairing {
  id: null;
  table_number: number;
  round: number;
  winner_game: number | null;
  loser_game: number | null;
  bracket_type: string;
  player1?: Player;
  player2?: Player;
  score_label?: string;
}

export interface Player {
  id: number;
  name_with_pronouns: string;
  side: string | null;
  user_id: string | null;
  side_label: string | null;
  corp_id: Identity | null;
  runner_id: Identity | null;
}

export interface PlayerSource {
  method: "winner" | "loser";
  game: number;
}

export type PredecessorMap = Record<number, PlayerSource[]>;
