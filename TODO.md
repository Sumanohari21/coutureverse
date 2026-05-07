# TODO - Material Library Implementation

- [ ] Update `src/components/studio/state/studioReducer.ts` with `APPLY_MATERIAL` action.
- [ ] Extend `src/components/studio/materials/data/materialLibrary.ts` with lookup/helpers to map UI material IDs to fabric type + properties.
- [ ] Create `src/components/studio/materials/MaterialLibraryPanel.tsx`.
- [ ] Create `src/components/studio/materials/MaterialTile.tsx`.
- [x] Wire the new Material Library panel into `src/components/studio/StudioApp.tsx` as the right-side column (alongside existing Layer & History bar).

- [ ] Validate dynamic updates in `StudioCanvas` (should re-render based on `fabricCustomization`).
- [ ] Run `npm run lint` and `npm run build` (or available scripts) to ensure TS/ESLint are clean.

