import { useState } from 'react';
import { sampleCode } from '../data/sampleCode';
import { BookOpen, ChevronDown } from 'lucide-react';

/**
 * Dropdown that loads pre-built example code into the editor.
 */
function ExampleLoader({ language, onSelect, disabled }) {
  const [open, setOpen] = useState(false);
  const examples = sampleCode[language] || [];

  const handleSelect = (example) => {
    onSelect(example.code);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        id="load-example-btn"
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-700 border border-dark-500 text-sm font-medium text-gray-300 hover:text-white hover:border-indigo-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <BookOpen className="w-4 h-4" />
        Load Example
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 z-40 w-56 py-2 rounded-xl bg-dark-700 border border-dark-500 shadow-2xl shadow-black/40 animate-slide-down">
          <div className="px-3 py-1.5">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
              {language === 'java' ? 'Java' : 'Python'} Examples
            </span>
          </div>
          {examples.map((ex, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(ex)}
              className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-600 transition-colors duration-150"
            >
              {ex.label}
            </button>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {open && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default ExampleLoader;
