import { Heart, Brain } from 'lucide-react';

function Footer() {
  return (
    <footer className="border-t border-dark-600/50 bg-dark-900/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-300">
              CodeMind AI
            </span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> using React &amp; Spring Boot
          </p>

          {/* Year */}
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} CodeMind AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
