import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Error message displayed when the backend or LLM request fails.
 * Includes a retry button.
 */
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="mt-10 animate-fade-in">
      <div className="glass-card p-6 border-red-500/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-red-300 mb-1">
              Something went wrong
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              {message || 'An unexpected error occurred. Please try again.'}
            </p>
            {onRetry && (
              <button
                id="retry-btn"
                onClick={onRetry}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-700 border border-red-500/20 text-sm font-medium text-red-300 hover:text-red-200 hover:border-red-500/40 transition-all duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
