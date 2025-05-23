import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import {
    TournamentSelection,
    Leaderboard,
    Marketplace,
    Profile,
    Tournaments,
    SignIn,
    SignUp,
    Tournament,
    ContactUs,
    GamePlay,
    Admin,
    Mint,
    ViewNFTs,
    CompleteTournament,
    CreateTournament,
} from "./components";
import { store } from "./redux/store.js";
import { Provider, useSelector } from "react-redux";
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
                <Route path="" element={<TournamentSelection />} />
                <Route path="/game/:matchId" element={<GamePlay />} />
                <Route path="/tournaments" element={<Tournaments />} />
                <Route path="/tournament/:id" element={<Tournament />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/contact-us" element={<ContactUs />} />
            </Route>
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>
                }
            >
                <Route path="" element={<CompleteTournament />} />
                <Route path="mint" element={<Mint />} />
                <Route path="create" element={<CreateTournament />} />
                <Route path="view-nfts" element={<ViewNFTs />} />
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

