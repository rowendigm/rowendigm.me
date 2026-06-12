# Commit message — template

Conventional Commit subject + a prose body. Write like a senior dev: explain the
change and the *why*, not a bullet dump. **Scale to the diff** — a trivial change is
subject-only.

## Shape

```
<type>(<scope>): <subject>
```
Subject: ≤50 chars · imperative · lowercase · no trailing period · **no AI attribution**.

Blank line, then the body — 1–2 short paragraphs:
- **¶1** — what the change does and the context/why. Reference the PR/issue it builds
  on as `#N` when relevant.
- **¶2** — a notable implementation detail and how it was verified (the test).

Breaking change → footer: `BREAKING CHANGE: <what breaks + migration>`.

## Example (shape only — ignore the content)

```
feat: write a future-owned inline buffer to a file

FileWriteFuture writes the first len bytes of an inline buffer to an fd through
frame::submit, the kernel-reads-buffer counterpart of the buffered read (#188).
The future hands the kernel an InlineBuf over its own pinned buffer with set_init
marking the write length, parks, and on completion reads the byte count back.

frame::submit<B: IoBuf> mirrors submit_read with the same shared driver-pointer
reborrow. An integration test writes a known buffer to a file and reads it back
to assert the contents.
```

Style: see CLAUDE.md "Writing style".
