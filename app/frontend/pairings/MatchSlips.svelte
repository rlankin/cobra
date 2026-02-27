<script lang="ts">
  import { onMount } from "svelte";
  import FontAwesomeIcon from "../widgets/FontAwesomeIcon.svelte";
  import { loadPairings, type Pairing } from "./PairingsData";

  let {
    tournamentId,
    roundId,
  }: {
    tournamentId: number;
    roundId: number;
  } = $props();

  let roundNumber = $state(0);
  let pairings = $state<Pairing[]>();
  let collated = $state(false);

  const sortByTableNumber = (p1: Pairing, p2: Pairing) => {
    if (p1.table_number < p2.table_number) {
      return -1;
    } else if (p1.table_number > p2.table_number) {
      return 1;
    }
    return 0;
  };

  onMount(async () => {
    const pairingsData = await loadPairings(tournamentId);

    for (const stage of pairingsData.stages) {
      const round = stage.rounds.find((round) => round.id === roundId);
      if (!round) {
        continue;
      }

      roundNumber = round.number;

      // Collect and sort the pairings by table number
      pairings = [];
      for (const pairing of round.pairings) {
        pairings.push(pairing);
      }
      pairings.sort(sortByTableNumber);
    }
  });

  function toggleCollated() {
    collated = !collated;

    if (!pairings) {
      return;
    }

    if (collated && pairings.length >= 5) {
      let collatedPairings: Pairing[] = [];
      const period = Math.ceil(pairings.length / 4);
      for (let i = 0; i < period; i++) {
        for (let j = i; j < pairings.length; j += period) {
          collatedPairings.push(pairings[j]);
        }
      }
      pairings = collatedPairings;
    } else {
      pairings.sort(sortByTableNumber);
    }
  }
</script>

<p class="dontprint">
  <a href={`/beta/tournaments/${tournamentId}/rounds`} class="btn btn-primary">
    <FontAwesomeIcon icon="arrow-left" /> Back to Pairings
  </a>
  <button type="button" class="btn btn-primary" onclick={toggleCollated}>
    <FontAwesomeIcon icon="flag-checkered" />
    {collated ? "Uncollate" : "Collate"}
  </button>
</p>

<h2 class="dontprint">Round {roundNumber} Match Slips</h2>

{#if pairings}
  <div class="slips">
    {#each pairings as pairing (pairing.id)}
      <hr />

      <div class="match_slip">
        <h4>Round {roundNumber} - Table {pairing.table_number}</h4>

        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Wins</th>
              <th>Timed Wins</th>
              <th>Draws</th>
              <th>Initials</th>
              <th>Drop?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{pairing.player1.name_with_pronouns}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>{pairing.player2.name_with_pronouns}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <p>
          Indicate how many wins, timed wins, and draws were earned by each
          player. Then initial to confirm. Tick "Drop?" if you would like to
          drop.
        </p>
      </div>
    {/each}
  </div>
{:else}
  <div class="d-flex align-items-center m-2">
    <div class="spinner-border m-auto"></div>
  </div>
{/if}
