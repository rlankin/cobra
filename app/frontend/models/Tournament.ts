export class Tournament {
  id = 0;
  player_meeting = false;
  registration_open = false;
  registration_unlocked = false;
  self_registration = false;
  locked_players = 0;
  unlocked_players = 0;
  allow_streaming_opt_out = false;
}

export class TournamentPolicies {
  update = false;
  custom_table_numbering = false;
}
