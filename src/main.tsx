import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";
import App from "./App";
import "swiper/css";
import "swiper/css/navigation";
import Loader from "./pages/others/Loader";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense
        fallback={
          <Loader/>
        }
      >
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>
);
