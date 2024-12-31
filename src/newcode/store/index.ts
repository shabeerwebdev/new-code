import { configureStore } from "@reduxjs/toolkit";
import { lookups } from "../services/lookups";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import { ownersApi } from "../services/ownersApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cacheApi"],
};

const rootReducer = combineReducers({
  [lookups.reducerPath]: lookups.reducer,
  [ownersApi.reducerPath]: ownersApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(lookups.middleware, ownersApi.middleware),
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
