import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import categories from "./categories/categoriesSlice";
import products from "./products/productsSlice";
import cart from "./cart/cartSlice";
import wishlist from "./wishlist/wishlistSlice";
import auth from "./auth/authslice";
const rootPersistConfig = {
  key: "root",
  storage,
  whiteList: ["cart", "auth"],
};

const cartpersistConfig = {
  key: "cart",
  storage,
  whiteList: ["items"],
};
const authPersistConfig = {
  key: "auth",
  storage,
  whiteList: ["accessToken", "user"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  cart: persistReducer(cartpersistConfig, cart),
  categories,
  products,
  wishlist,
});

const rootPersistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: rootPersistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
