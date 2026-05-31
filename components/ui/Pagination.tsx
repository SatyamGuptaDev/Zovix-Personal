'use client';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(
        <button key="1" onClick={() => onPageChange(1)} className="w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium text-white/50 hover:text-white hover:bg-white/10 transition-colors">
          1
        </button>
      );
      if (start > 2) {
        pages.push(<span key="ellipsis-start" className="w-8 h-8 flex items-center justify-center text-white/30"><MoreHorizontal size={14}/></span>);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
            currentPage === i
              ? 'bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
              : 'text-white/50 hover:text-white hover:bg-white/10'
          }`}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push(<span key="ellipsis-end" className="w-8 h-8 flex items-center justify-center text-white/30"><MoreHorizontal size={14}/></span>);
      }
      pages.push(
        <button key={totalPages} onClick={() => onPageChange(totalPages)} className="w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium text-white/50 hover:text-white hover:bg-white/10 transition-colors">
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 py-8 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all backdrop-blur-md"
      >
        <ChevronLeft size={16} />
      </button>
      
      <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-full px-2 py-1 backdrop-blur-md">
        {renderPageNumbers()}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all backdrop-blur-md"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
