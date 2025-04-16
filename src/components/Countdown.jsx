import React, { useEffect, useState } from "react";

function Countdown({ startDate, endDate }) {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    function getTimeLeft() {
        const now = Date.now();
        const end = new Date(endDate).getTime();
        const start = new Date(startDate).getTime();
        const total = end - start;
        const remaining = Math.max(0, end - now);

        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remaining / (1000 * 60)) % 60);
        const seconds = Math.floor((remaining / 1000) % 60);

        const percentage = Math.min(100, Math.max(0, ((now - start) / total) * 100));

        return { days, hours, minutes, seconds, percentage };
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mt-2">
            <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
                <div
                    className="bg-purple-500 h-full transition-all duration-300"
                    style={{ width: `${timeLeft.percentage}%` }}
                ></div>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s left
            </p>
        </div>
    );
}

export default Countdown;
