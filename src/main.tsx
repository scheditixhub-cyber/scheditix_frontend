import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";

import "./index.css";
import {routers} from "./routes/routers";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Suspense
            fallback={
                <div className="w-full h-screen flex items-center justify-center animate-pulse">
                    Loading...
                </div>
            }
        >
            <RouterProvider router={routers} />
        </Suspense>
    </React.StrictMode>,
);
