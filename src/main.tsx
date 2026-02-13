import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./store/store";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Suspense
                fallback={
                    <div className="w-full h-screen flex items-center justify-center animate-pulse">
                        Loading...
                    </div>
                }
            >
                <App />
            </Suspense>
        </Provider>
    </React.StrictMode>,
);
