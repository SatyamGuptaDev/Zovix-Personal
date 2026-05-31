'use client';
import { ChevronDown, Filter } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterPillProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (val: string) => void;
  icon?: React.ReactNode;
}

export function FilterPill({ label, options, value, onChange, icon }: FilterPillProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative z-50" ref={containerRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.08)] px-4 py-2 rounded-full text-xs font-semibold text-white/90 transition-all shadow-lg backdrop-blur-md"
      >
        {icon && <span className="text-white/50">{icon}</span>}
        {!icon && <Filter size={13} className="text-white/50" />}
        {selectedOption ? selectedOption.label : label}
        <ChevronDown size={14} className={`text-white/50 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div data-lenis-prevent="true" className="absolute top-full mt-2 left-0 min-w-[160px] max-h-[300px] overflow-y-auto bg-[#121018]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-1 z-50 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors ${
                opt.value === value 
                  ? 'bg-purple-600/30 text-white' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
