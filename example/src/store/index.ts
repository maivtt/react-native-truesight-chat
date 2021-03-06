import { configureStore } from '@reduxjs/toolkit';
import { themeSlice } from './theme';
import { conversationSlice } from './conversation';

const middleware = [
  /* other middlewares */
];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middleware.push(createDebugger());
  const createFlipperMiddleware =
    require('rn-redux-middleware-flipper').default;
  middleware.push(createFlipperMiddleware());
}

const store = configureStore({
  reducer: {
    theming: themeSlice.reducer,
    conversation: conversationSlice.reducer,
  },
  middleware,
});

export default store;
