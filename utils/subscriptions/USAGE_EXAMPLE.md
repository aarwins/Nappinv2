# Subscription Entitlements Usage Example

## Setup

### 1. Wrap your app with SubscriptionProvider

In your `App.js` (or root component):

```javascript
import { SubscriptionProvider } from './utils/subscriptions/SubscriptionContext';

function App() {
  return (
    <SubscriptionProvider>
      {/* Your existing app components */}
      <NavigationContainer>
        {/* ... */}
      </NavigationContainer>
    </SubscriptionProvider>
  );
}
```

Or if you already have other providers:

```javascript
import { PersonalizationProvider } from './components/PersonalizationProvider';
import { SubscriptionProvider } from './utils/subscriptions/SubscriptionContext';

function App() {
  return (
    <PersonalizationProvider>
      <SubscriptionProvider>
        <NavigationContainer>
          {/* ... */}
        </NavigationContainer>
      </SubscriptionProvider>
    </PersonalizationProvider>
  );
}
```

### 2. Use the hook in any component

```javascript
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useSubscription } from '../utils/subscriptions/SubscriptionContext';

function MyScreen() {
  const { entitlements, isLoading, refreshEntitlements } = useSubscription();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  // Check if content should be locked
  if (entitlements?.locked) {
    // Show paywall or upgrade prompt
    return (
      <View>
        <Text>Please upgrade to access this feature</Text>
        {/* Navigate to paywall */}
      </View>
    );
  }

  // User has access - show content
  return (
    <View>
      <Text>Welcome! Plan: {entitlements?.plan_type}</Text>
      {entitlements?.is_trial && (
        <Text>Trial: {entitlements.trial_days} days remaining</Text>
      )}
      {/* Your premium content */}
    </View>
  );
}
```

### 3. Manual refresh after purchase

After a successful purchase/restore:

```javascript
import { useSubscription } from '../utils/subscriptions/SubscriptionContext';

function PurchaseCompleteScreen() {
  const { refreshEntitlements } = useSubscription();

  const handlePurchaseComplete = async () => {
    // ... handle purchase logic ...
    
    // Refresh entitlements to reflect new subscription
    await refreshEntitlements();
    
    // Navigate to success screen or back to app
  };

  return (/* ... */);
}
```

## Entitlements Object

The `entitlements` object contains:

```typescript
{
  has_access: boolean;           // True if user has active subscription or trial
  is_trial: boolean;             // True if currently in trial period
  plan_type: 'advanced' | 'precision' | null;
  billing_interval: 'month' | 'year' | null;
  trial_days: number;            // Total trial days for the plan
  device_type: 'apple_watch' | 'non_watch' | 'fitbit' | 'oura' | 'garmin' | 'other' | null;
  includes_watch_features: boolean; // True if plan_type === 'precision'
  locked: boolean;               // True if !has_access (inverse of has_access)
}
```

## Integration with Auth Flow

The `SubscriptionProvider` automatically:
- Fetches entitlements on mount
- Refreshes when user signs in/out
- Refreshes when auth token is refreshed
- Returns locked entitlements for unauthenticated users

No additional setup needed!

