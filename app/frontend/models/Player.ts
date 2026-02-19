import type { Identity } from "./Identity";

export class Player {
  id = 0;
  name = "";
  name_with_pronouns = "";
  side: string | null = null;
  user_id: number | null = null;
  side_label: string | null = null;
  corp_id: Identity | null = null;
  runner_id: Identity | null = null;
  include_in_stream = false;
  active: boolean | null = null;
}
