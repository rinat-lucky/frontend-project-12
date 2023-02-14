import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
  // environment: 'testenv',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const RollbarProvider = ({ children }) => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  </Provider>
);

export default RollbarProvider;
