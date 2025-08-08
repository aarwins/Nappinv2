// Placeholder analytics integration (e.g., Mixpanel)
// Exports no-op functions so existing app behavior is unaffected until native SDKs are wired up.

/**
 * Track an analytics event.
 * Placeholder: logs a warning and does not send data anywhere.
 *
 * @param {string} eventName - The analytics event name.
 * @param {object} [params={}] - Optional key/value properties for the event.
 */
export function trackEvent(eventName, params = {}) {
  console.warn(
    '[Analytics Placeholder] Native SDK (e.g., Mixpanel) not connected yet. "trackEvent" called with:',
    { eventName, params }
  );

  // TODO: After prebuild/eject, replace this with the actual native analytics call, e.g.:
  // import Mixpanel from '@mixpanel/react-native';
  // Mixpanel.track(eventName, params);
}

export default { trackEvent };


