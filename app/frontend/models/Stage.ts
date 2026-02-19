import type { Round } from "./Round";

export interface Stage {
  id: number;
  name: string;
  format: string;
  is_single_sided: boolean;
  is_elimination: boolean;
  view_decks: boolean;
  rounds: Round[];
}

export interface StageSettings {
  id: number;
  tournament_id: number;
  number: number;
  format: string | null;
  table_ranges: TableRange[];
}

export interface TableRange {
  id?: number;
  stage_id: number;
  first_table: number;
  last_table: number;
}
