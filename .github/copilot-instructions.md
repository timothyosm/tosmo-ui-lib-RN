# Copilot directives – React Native + Expo (no **src** folder)

You are generating code for a **React Native Expo (SDK ≥ 50)** app **without** a `src/` directory.

---

## Folder layout

- **Root-level only**

  - `components/` → `atoms/`, `molecules/`, `organisms/`
  - `screens/`
  - `store/` (Zustand slices)
  - `theme/` (design tokens)
  - `hooks/`

- Keep depth **≤ 2 levels**.

- Use the alias **`@/`** for root-relative imports.

## Codebase hygiene

**Before making any code changes:**

- Always check all of the following folders to ensure:

  - No duplicate files, components, hooks, or state slices are created.
  - All existing components, hooks, and state slices are used effectively and reused where possible.
  - New code should integrate with or extend existing code when appropriate, not duplicate it.

  - `components/` → `atoms/`, `molecules/`, `organisms/`
  - `screens/`
  - `store/` (Zustand slices)
  - `theme/` (design tokens)
  - `hooks/`

## Architecture

Follow **Atomic Design** (atoms → molecules → organisms → screens).

## State

Use **Zustand** exclusively for global/shared state; **no** Redux, Context, or MobX.

## Coding conventions

- TypeScript, functional components, React hooks.
- **DRY**: extract reusable logic and constants.
- Prefer `Pressable` (not core `Button`) for custom styles.
- **Icons:** use **react-native-heroicons** as the default icon set.
- Remove unused imports to keep files small.

## Package management

Always suggest commands in the form:

```bash
npx expo install <package>
```

Typical installs:

```bash
npx expo install react-native-heroicons
```

Run `npx expo prebuild` **only** when explicitly requested.

## Alias configuration

**babel.config.js**

```js
plugins: [
  [
    "module-resolver",
    { alias: { "@": "./" }, extensions: [".tsx", ".ts", ".js"] },
  ],
];
```

**tsconfig.json**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  }
}
```

## Prohibited

- No `src/` prefix or deep nesting.
- No Redux, MobX, Context API, or other state libraries.
- No `npm install`; always use `npx expo install`.
