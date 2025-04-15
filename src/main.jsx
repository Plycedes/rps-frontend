import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import { Game, Leaderboard, Marketplace, Profile, Tournaments, SignIn, SignUp } from "./components";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import GuestRoute from "./routes/GuestRoute.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/signin"
                element={
                    <GuestRoute>
                        <SignIn />
                    </GuestRoute>
                }
            />
            <Route
                path="/signup"
                element={
                    <GuestRoute>
                        <SignUp />
                    </GuestRoute>
                }
            />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <App />
                    </ProtectedRoute>
                }
            >
                <Route path="" element={<Game />} />
                <Route path="/tournaments" element={<Tournaments />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/marketplace" element={<Marketplace />} />
            </Route>
        </>
    )
);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <SocketProvider>
            <RouterProvider router={router}>
                <App />
            </RouterProvider>
        </SocketProvider>
    </Provider>
);

