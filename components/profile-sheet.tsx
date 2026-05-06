"use client";

import { ChevronRight, Settings, LogOut } from "lucide-react";
import { Sheet } from "./sheet";
import { cn } from "@/lib/cn";
import type { HouseholdMember } from "@/lib/data";

const dotColor = (presence: HouseholdMember["presence"]) =>
  presence === "Home"
    ? "bg-emerald-500"
    : presence === "Approaching"
      ? "bg-amber-400"
      : "bg-white/30";

export function ProfileSheet({
  open,
  onClose,
  me,
  members,
}: {
  open: boolean;
  onClose: () => void;
  me: HouseholdMember;
  members: HouseholdMember[];
}) {
  return (
    <Sheet open={open} onClose={onClose}>
      <div className="px-5 pt-2 pb-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
          Account
        </p>
      </div>

      {/* current user card */}
      <div className="mx-3 mt-2 flex items-center gap-3 rounded-2xl bg-gradient-to-br from-[#8ab4f8]/15 to-[#16191c] p-3 ring-1 ring-white/8">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full text-[16px] font-semibold text-black"
          style={{ background: me.color }}
        >
          {me.initial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-white">{me.name}</p>
          <p className="text-[11px] text-white/55">heruisong0302@gmail.com</p>
        </div>
        <button className="rounded-full bg-white/8 px-3 py-1.5 text-[11px] font-medium text-white/85 ring-1 ring-white/10">
          Switch
        </button>
      </div>

      {/* household */}
      <div className="mt-5 px-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
          Household · {members.length} people
        </p>
      </div>
      <div className="mt-2 space-y-1.5 px-3">
        {members.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-3 rounded-2xl bg-[#1f2327] px-3 py-2.5 ring-1 ring-white/5"
          >
            <div className="relative">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-semibold text-black"
                style={{ background: m.color }}
              >
                {m.initial}
              </div>
              <span
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-[#1f2327]",
                  dotColor(m.presence)
                )}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[14px] font-semibold text-white">{m.name}</p>
                <span className="rounded-full bg-white/6 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/55">
                  {m.role}
                </span>
              </div>
              <p className="text-[11px] text-white/55">
                {m.presence} · {m.presenceDetail}
              </p>
            </div>
          </div>
        ))}
        <button className="mt-1 flex w-full items-center justify-between rounded-2xl bg-[#1f2327] px-3 py-3 ring-1 ring-white/5">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-white/65 text-[14px]">
              +
            </span>
            <p className="text-[13px] font-medium text-white">Invite household member</p>
          </div>
          <ChevronRight size={16} className="text-white/30" />
        </button>
      </div>

      {/* account actions */}
      <div className="mt-5 px-3 pb-3">
        <button className="flex w-full items-center justify-between rounded-t-2xl bg-[#1f2327] px-4 py-3 ring-1 ring-white/5">
          <div className="flex items-center gap-3 text-white/85">
            <Settings size={16} strokeWidth={2.2} />
            <span className="text-[13px] font-medium">Manage Google Account</span>
          </div>
          <ChevronRight size={16} className="text-white/30" />
        </button>
        <button className="-mt-px flex w-full items-center justify-between rounded-b-2xl bg-[#1f2327] px-4 py-3 ring-1 ring-white/5">
          <div className="flex items-center gap-3 text-rose-300">
            <LogOut size={16} strokeWidth={2.2} />
            <span className="text-[13px] font-medium">Sign out</span>
          </div>
          <ChevronRight size={16} className="text-white/30" />
        </button>
      </div>
    </Sheet>
  );
}
