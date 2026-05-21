# Format Commit — Examples

## Single logical change

**Diff:** New login form component and API hook.

```
feat(auth): add login form with credential validation

Wire form to auth API hook for server-side session flow
```

**Type:** feat — new user-facing capability.

---

## Bug fix

**Diff:** Token expiry check used wrong clock comparison.

```
fix(auth): validate token expiry against server time

Prevent false logouts when client clock drifts
```

**Type:** fix — corrects incorrect behavior.

---

## Docs only

**Diff:** `Documentation/end-points/login.md` added.

```
docs(api): document login endpoint contract
```

**Type:** docs — no runtime code change.

---

## Split commits (mixed diff)

**Diff:** Prettier on `Button.tsx` + new register endpoint.

Suggest two messages:

1. `style(ui): format button component with prettier`
2. `feat(api): add user registration endpoint`

---

## Chore

**Diff:** `package.json` dependency bumps only.

```
chore(deps): bump next and react versions
```
