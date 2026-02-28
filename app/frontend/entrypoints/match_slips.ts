import { mount } from "svelte";
import MatchSlips from "../pairings/MatchSlips.svelte";

document.addEventListener("turbolinks:load", function () {
  const anchor = document.getElementById("match_slips_anchor");
  if (anchor?.childNodes.length == 0) {
    mount(MatchSlips, {
      target: anchor,
      props: {
        tournamentId:
          Number(anchor.getAttribute("data-tournament") ?? "") || -1,
        roundId: Number(anchor.getAttribute("data-round") ?? "") || -1,
      },
    });
  }
});
