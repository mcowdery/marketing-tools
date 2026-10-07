# marketing-tools

Turns real engineering work (in city-popper, Studio, or anywhere else) into draft case studies /
posts for finding consulting work — without ever posting anything automatically. Three steps:

1. **Gather.** Point it at a repo and a time window:

   ```
   node gather.mjs "C:\Users\mcowd\Documents\proj\city-popper" --since=14d
   node gather.mjs "C:\path\to\krea-2-turbo" --since=2026-09-01
   ```

   This writes `briefings/<date>-<repoName>.md`: your commits in that window, the files they
   touched, and diffs for the non-noisy ones (lockfiles, snapshots and binary assets are listed but
   skipped). It does not call any model — it's just the raw material.

   For a recurring cadence across every project at once, list their paths in `repos.txt` and run
   `node digest.mjs --since=14d` — it calls `gather.mjs` for each one in turn. Do this every 1-2
   weeks, not per-commit, so there's enough material for a real thread each time: a standing
   "what happened" habit rather than a one-off write-up.

2. **Draft.** Open the briefing and hand it to Claude (this Claude Code session, or any other) — the
   briefing file ends with a ready-made instruction asking for a short case-study or LinkedIn-style
   post aimed at engineering leads, with a guard against claiming outcomes that didn't happen. Save
   whatever comes back into `drafts/` if you want a record of it.

3. **Review, post, log.** Read the draft like you'd read anything from an agent — cut what's wrong
   or overclaimed, decide where it goes, paste it yourself. Nothing here ever has posting
   credentials, on purpose. Once it's out, record it:

   ```
   node log.mjs "worktree + GPU queue" "linkedin" "no reply yet"
   ```

   `log.csv` builds up a plain record of what you posted and whether anyone responded, so after a
   few rounds you can see which angle (governance? testing discipline? multi-agent orchestration?)
   actually gets replies — and ditch the rest.

No dependencies, no API keys, nothing scheduled. Re-run `gather.mjs` (or `digest.mjs` for all repos
at once) whenever you've got a new chunk of work worth writing up, roughly every 1-2 weeks rather
than per-commit.
