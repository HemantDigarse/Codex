import { ChevronDown } from 'lucide-react';
import { supportedLanguages } from '../data/sampleCode';

/**
 * Dropdown for selecting the programming language.
 */
function LanguageSelector({ value, onChange, disabled }) {
  return (
    <div className="relative">
      <select
        id="language-selector"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="appearance-none w-full sm:w-48 px-4 py-2.5 pr-10 rounded-xl bg-dark-700 border border-dark-500 text-sm font-medium text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all duration-200 cursor-pointer disabled:opacity-50"
      >
        {supportedLanguages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}

export default LanguageSelector;
