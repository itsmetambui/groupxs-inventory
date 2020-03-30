import { configureStore, getDefaultMiddleware, Action } from "@reduxjs/toolkit"
import { ThunkAction } from "redux-thunk"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"

import rootReducer, { AppState } from "./reducers/rootReducer"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["material"],
}

const middleware = [
  ...getDefaultMiddleware({
    thunk: true,
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
]

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`)
  middleware.push(logger)
}

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware,
})

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>

export const persistor = persistStore(store)

export default store
