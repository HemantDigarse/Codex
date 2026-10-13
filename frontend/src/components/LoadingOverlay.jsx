import { Brain } from 'lucide-react';

/**
 * Full-screen loading overlay shown while the LLM generates a response.
 */
function LoadingOverlay() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center py-16 animate-fade-in">
      {/* Animated brain */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center animate-pulse-slow">
          <Brain className="w-10 h-10 text-indigo-400" />
        </div>
        {/* Orbiting dots */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-400 rounded-full" />
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">
        Analyzing your code...
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        The AI is reading and understanding your code
      </p>

      {/* Progress dots */}
      <div className="dot-pulse">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default LoadingOverlay;
