// Placeholder Superwall integration
// This file intentionally exports a no-op implementation so app behavior remains unchanged
// and no native dependencies are required during development.

/**
 * Show a paywall for a given Superwall event.
 * Placeholder: logs a warning and performs no native action.
 *
 * @param {string} eventName - The Superwall event name to trigger the paywall.
 * @param {object} [params={}] - Optional parameters/traits associated with the event.
 */
export function showPaywall(eventName, params = {}) {
  // Warn so developers know this is a stubbed call
  console.warn(
    '[Superwall Placeholder] Native SDK not connected yet. "showPaywall" was called with:',
    { eventName, params }
  );

  // TODO: After prebuild/eject, replace this with the actual native Superwall call, e.g.:
  // import Superwall from 'react-native-superwall';
  // return Superwall.presentPaywall(eventName, params);
}

export default { showPaywall };


