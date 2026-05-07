"use client";

import { useEffect, useState } from "react";
import { Signal, Wifi, BatteryFull } from "lucide-react";

export function StatusBar({
  tone = "light",
  time,
}: {
  tone?: "light" | "dark";
  /** If provided, locks the displayed time. Otherwise it tracks the wall clock. */
  time?: string;
}) {
  const [liveTime, setLiveTime] = useState("7:14");
  useEffect(() => {
    if (time) return;
    const f = () => {
      const d = new Date();
      const h = d.getHours();
      const m = d.getMinutes().toString().padStart(2, "0");
      const hr12 = ((h + 11) % 12) + 1;
      setLiveTime(`${hr12}:${m}`);
    };
    f();
    const id = setInterval(f, 30_000);
    return () => clearInterval(id);
  }, [time]);

  const display = time ?? liveTime;
  const color = tone === "dark" ? "text-black" : "text-white";

  return (
    <div className={`flex items-center justify-between px-7 pt-2.5 text-[15px] font-semibold ${color}`}>
      <span className="tabular-nums tracking-tight">{display}</span>
      <div className="flex items-center gap-1.5 opacity-90">
        <Signal size={14} strokeWidth={2.5} />
        <Wifi size={14} strokeWidth={2.5} />
        <BatteryFull size={20} strokeWidth={2.2} />
      </div>
    </div>
  );
}
