import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/index";
import AppRouter from "@routes/AppRouter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
