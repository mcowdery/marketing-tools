# Status — the consulting-business side project

Not part of the game (renamed from `city-popper` to `A Rainy Place to Die`; the Studio codebase
renamed from `krea-2-turbo` to `Trame`). Start future Claude Code sessions on this with the working
directory set to this folder (`marketing-tools`), not the game's — there's no reason to drag its
CLAUDE.md into an unrelated conversation.

## A second track: devlog / reputation, not just consulting

As of 2026-10-09, there's a second angle running alongside the consulting funnel below: using the
game itself (and the agent-orchestration practice of building it) as a build-in-public reputation
vehicle, rather than trying to sell the game or treating it only as a product. `gather.mjs` and
`digest.mjs` now take a `--devlog` flag that swaps the closing instruction to a game-dev/indie
framing instead of the engineering-leads one — same tool, two audiences.

One open, unresolved question hanging over this: the game has a planned NSFW/uncensored edition,
and the user is weighing whether to cut it, given the tension between "put myself in the game under
my real name" and his actual career direction (AI governance/policy, a defense contractor, a
security-adjacent background). Not decided — don't assume either way. If a pseudonym or a cut
NSFW edition becomes the answer, it changes how (or whether) his real name gets attached to the
game publicly.

Also noticed, unrelated to this file but worth knowing about: `mcowdery-portfolio` and
`mcowdery-portfolio-v1-teal` folders have appeared under `proj/` (an Astro site, no git history
yet) — looks like portfolio-site work is already underway elsewhere, possibly another session.
Worth checking before starting a third one from scratch.

## Live pages (Claude Artifacts, not files in this repo)

- **Quiz** — "AI Agent Governance Check": https://claude.ai/artifact/65vPipfpdV7K1enD1xHcjM
  10-question self-scored readiness check, no sign-up. Links forward to the offer page below.
- **Offer page** — "Governed Agents": https://claude.ai/artifact/2hj14gcFM6MZtcWrn7MYso
  The productized-service pitch. Links back to the quiz as the entry point.

Both are **private** as of 2026-10-07 — open each one's Share menu and set "anyone with the link"
before sending either out.

## The offer, as published

- **Audit** — $4,000 flat, ~1 week. Review of an org's actual agentic-coding setup against 10
  governance categories (isolation, resource contention, review gates, secrets, compliance mapping,
  etc.), severity-ranked findings, a prioritized roadmap.
- **Implementation** — $9,000–$15,000, 2-3 weeks. Builds the fixes into their actual codebase.
  Audit fee credited if they proceed within 30 days.
- Pricing was set deliberately below the middle of the comparable market range (DevSecOps/AI-
  governance fixed-fee assessments run $3,500–$8,500; implementations run $8,000–$20,000+) because
  there are no case studies or client logos yet. Raise it once there are 2-3 real ones.
- Contact on the page: Calendly (primary CTA), email, phone, LinkedIn — all as given by the user,
  not invented.

## Related repo

`agent-concurrency-kit` (https://github.com/mcowdery/agent-concurrency-kit) — the open-sourced
worktree + resource-queue tool, referenced from the offer page as proof the governance claims are
built, not theorized. A separate session has since added a third tool to it (`agent-notify`,
desktop/phone/Discord notifications) — unrelated to this file, just noted so it isn't a surprise.

## Not done yet

- Neither page has actually been sent to anyone. Nothing here produces a customer until that
  happens — publishing was never the hard part.
- `gather.mjs` / `digest.mjs` (this repo) are ready to turn recent commits into a draft post that
  can link to the quiz, but no post has been drafted or published from them yet.
- No one has booked a call. No pricing has been tested against a real prospect's reaction.
