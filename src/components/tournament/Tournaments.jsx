import { useState } from "react";
import { ActiveTournaments, TournamentsHistory } from "..";

function Tournaments() {
    const [selected, setSelected] = useState("active");
    return (
        <div className="h-screen p-2">
            <div className="rounded-lg shadow bg-gray-800 border border-purple-500 h-full">
                <div className="flex flex-col h-full bg-zinc-900 text-white rounded-lg shadow-inner">
                    {/* Mini Navbar */}
                    <div className="flex justify-start h-15 border-b border-gray-700 bg-zinc-900 rounded-t-lg">
                        <div className="w-1/2 flex h-full justify-center">
                            <button
                                onClick={() => setSelected("active")}
                                className={`px-4 py-2 w-full h-full rounded-t-lg ${
                                    selected === "active"
                                        ? " text-purple-400 border-b border-purple-500"
                                        : "text-zinc-400 hover:bg-gray-700"
                                }`}
                            >
                                Active Tournaments
                            </button>
                        </div>
                        <div className="w-1/2 h-full flex justify-center">
                            <button
                                onClick={() => setSelected("history")}
                                className={`px-4 py-2 w-full h-full rounded-t-lg ${
                                    selected === "history"
                                        ? " text-purple-400 border-b border-purple-500"
                                        : "text-zinc-400 hover:bg-gray-700"
                                }`}
                            >
                                Tournament History
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-4 bg-zinc-900 rounded-b-lg scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent">
                        {selected === "active" ? <ActiveTournaments /> : <TournamentsHistory />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tournaments;
