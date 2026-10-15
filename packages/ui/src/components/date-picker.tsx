"use client";

import { Calendar as CalendarIcon, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { cn } from "../lib/cn";

export interface DatePickerProps {
  /** ISO date string, YYYY-MM-DD */
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  className?: string;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parseIso(value?: string): Date | null {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function toIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDisplay(date: Date): string {
  return `${MONTHS[date.getMonth()]?.slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
}

/** A themed, dependency-free calendar popover — replaces the native <input type="date"> UI. */
export function DatePicker({ value, onChange, placeholder = "Select date", id, className }: DatePickerProps) {
  const selected = parseIso(value);
  const [open, setOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState<Date>(selected ?? new Date());
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false);
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 110 }, (_, i) => currentYear + 1 - i);
  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { date: Date; inMonth: boolean }[] = [];
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, daysInPrevMonth - i), inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ date: new Date(year, month + 1, nextDay), inMonth: false });
    nextDay += 1;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayIso = toIso(today);
  const selectedIso = selected ? toIso(selected) : null;

  function selectDay(date: Date) {
    onChange(toIso(date));
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => {
          setViewDate(selected ?? new Date());
          setOpen((o) => !o);
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border border-teal-300/40 bg-white px-4 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:border-teal-600",
          className,
        )}
      >
        <span className={selected ? "text-teal-900" : "text-teal-900/40"}>
          {selected ? formatDisplay(selected) : placeholder}
        </span>
        <CalendarIcon className="h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose a date"
          className="animate-fade-rise absolute z-50 mt-2 w-72 rounded-2xl border border-teal-300/30 bg-white p-4 shadow-bloom-md"
        >
          <div className="flex items-center justify-between gap-1">
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              aria-label="Previous month"
              className="shrink-0 rounded-full p-1.5 text-teal-600 transition-colors hover:bg-teal-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-1">
              <div className="relative">
                <select
                  aria-label="Month"
                  value={month}
                  onChange={(e) => setViewDate(new Date(year, Number(e.target.value), 1))}
                  className="appearance-none rounded-md bg-transparent py-1 pl-2 pr-5 font-mono text-xs uppercase tracking-label-wide text-teal-900 transition-colors hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  {MONTHS.map((m, i) => (
                    <option key={m} value={i}>
                      {m}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 text-teal-600" />
              </div>
              <div className="relative">
                <select
                  aria-label="Year"
                  value={year}
                  onChange={(e) => setViewDate(new Date(Number(e.target.value), month, 1))}
                  className="appearance-none rounded-md bg-transparent py-1 pl-2 pr-5 font-mono text-xs uppercase tracking-label-wide text-teal-900 transition-colors hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 text-teal-600" />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              aria-label="Next month"
              className="shrink-0 rounded-full p-1.5 text-teal-600 transition-colors hover:bg-teal-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-y-1 text-center">
            {WEEKDAYS.map((w) => (
              <span key={w} className="py-1 font-mono text-[10px] uppercase text-teal-900/40">
                {w}
              </span>
            ))}
            {cells.map(({ date, inMonth }) => {
              const iso = toIso(date);
              const isSelected = iso === selectedIso;
              const isToday = iso === todayIso;
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => selectDay(date)}
                  className={cn(
                    "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs transition-colors duration-150",
                    !inMonth && "text-teal-900/25 hover:bg-teal-50/60",
                    inMonth && !isSelected && "text-teal-900 hover:bg-teal-50",
                    isSelected && "bg-teal-600 text-white hover:bg-teal-600",
                    isToday && !isSelected && "border border-amber-500",
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
