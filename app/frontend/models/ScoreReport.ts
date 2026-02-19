export interface ScoreReport {
  report_player_id?: number;
  score1: number | null;
  score2: number | null;
  score1_corp: number | null;
  score2_corp: number | null;
  score1_runner: number | null;
  score2_runner: number | null;
  intentional_draw: boolean;
  two_for_one?: boolean;
  label?: string;
  extra_self_report_label?: string;
}
