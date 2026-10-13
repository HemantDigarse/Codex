import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Play, Trash2, Sparkles } from 'lucide-react';

import LanguageSelector from '../components/LanguageSelector';
import CodeEditor from '../components/CodeEditor';
import ExampleLoader from '../components/ExampleLoader';
import ExplanationPanel from '../components/ExplanationPanel';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorMessage from '../components/ErrorMessage';
import { explainCode } from '../services/codeExplainerApi';

const MAX_CODE_LENGTH = 10000;

function CodeExplainer() {
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Track last request for retry
  const [lastRequest, setLastRequest] = useState(null);

  const handleExplain = useCallback(async () => {
    // Validation
    const trimmed = code.trim();
    if (!trimmed) {
      toast.error('Please paste some code first!');
      return;
    }
    if (trimmed.length > MAX_CODE_LENGTH) {
      toast.error(`Code is too long. Maximum ${MAX_CODE_LENGTH} characters allowed.`);
      return;
    }

    setLoading(true);
    setError(null);
    setExplanation(null);
    setLastRequest({ language, code: trimmed });

    try {
      const result = await explainCode(language, trimmed);
      setExplanation(result);
      toast.success('Code explained successfully!');
    } catch (err) {
      let message = 'An unexpected error occurred.';
      if (err.response) {
        // Server responded with an error
        const status = err.response.status;
        const data = err.response.data;
        if (status === 429) {
          message = 'Too many requests. Please wait a moment and try again.';
        } else if (status === 400) {
          message = data?.message || 'Invalid request. Please check your code.';
        } else if (status === 504 || status === 408) {
          message = 'The AI took too long to respond. Please try again.';
        } else {
          message = data?.message || `Server error (${status}). Please try again.`;
        }
      } else if (err.code === 'ECONNABORTED') {
        message = 'Request timed out. The AI might be busy — please retry.';
      } else if (!err.response) {
        message = 'Cannot reach the server. Make sure the backend is running.';
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [language, code]);

  const handleRetry = useCallback(() => {
    if (lastRequest) {
      setCode(lastRequest.code);
      setLanguage(lastRequest.language);
      // Re-trigger with a small delay so state updates
      setTimeout(() => handleExplain(), 50);
    }
  }, [lastRequest, handleExplain]);

  const handleClear = () => {
    setCode('');
    setExplanation(null);
    setError(null);
    toast('Editor cleared', { icon: '🗑️' });
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    // Don't clear code on language switch — user may want to keep it
  };

  return (
    <div className="relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] left-[50%] w-[600px] h-[600px] bg-indigo-500/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-medium text-indigo-300">AI-Powered Tool</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            AI Code Explainer
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            Understand any code, one line at a time.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <LanguageSelector
            value={language}
            onChange={handleLanguageChange}
            disabled={loading}
          />
          <ExampleLoader
            language={language}
            onSelect={setCode}
            disabled={loading}
          />
          <div className="flex-1" />
          <button
            id="clear-btn"
            onClick={handleClear}
            disabled={loading || !code}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-700 border border-dark-500 text-sm font-medium text-gray-400 hover:text-red-300 hover:border-red-500/30 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>

        {/* Editor */}
        <CodeEditor
          language={language}
          value={code}
          onChange={setCode}
          disabled={loading}
        />

        {/* Explain Button */}
        <div className="mt-5 flex justify-center">
          <button
            id="explain-btn"
            onClick={handleExplain}
            disabled={loading || !code.trim()}
            className="btn-glow px-8 py-3.5 text-base flex items-center gap-2.5"
          >
            {loading ? (
              <>
                <span className="spinner" />
                Analyzing...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Explain Code
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {loading && <LoadingOverlay />}
        {error && !loading && <ErrorMessage message={error} onRetry={handleRetry} />}
        {explanation && !loading && <ExplanationPanel data={explanation} />}
      </div>
    </div>
  );
}

export default CodeExplainer;
