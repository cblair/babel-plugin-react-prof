let profs = new Map();

export function incrementRenderCount(name) {
  const prof = profs.get(name);
  const renderCount = prof ? (prof.renderCount || 0) + 1 : 1;
  profs.renderCount = profs.set(name, Object.assign({}, prof, { renderCount }));
  
}

export function getResultJSON() {
  return JSON.stringify(Object.fromEntries(profs));
}

export function getSortedByRenderCount() {
  const entries = Object.fromEntries(profs);
  const sorted = Object.keys(entries).map(name => ({ name, renderCount: entries[name].renderCount })).sort((a, b) => -1 * ( a.renderCount - b.renderCount));
  return sorted;
}

export function reset() {
  profs = new Map();
}

globalThis.getResultJSON = getResultJSON;
globalThis.getSortedByRenderCount = getSortedByRenderCount;
globalThis.reactProf = {
  profs
};