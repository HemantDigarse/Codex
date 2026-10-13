import Editor from '@monaco-editor/react';

/**
 * Monaco-based code editor with dark theme and language awareness.
 */
function CodeEditor({ language, value, onChange, disabled }) {
  // Map our language keys to Monaco language identifiers
  const monacoLang = language === 'python' ? 'python' : 'java';

  return (
    <div className="relative rounded-xl overflow-hidden border border-dark-500 focus-within:border-indigo-500/40 transition-colors duration-200">
      {/* Editor toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-600/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs text-gray-500 ml-2 font-mono">
            {monacoLang === 'java' ? 'Main.java' : 'main.py'}
          </span>
        </div>
        <span className="text-xs text-gray-600">
          {value ? value.split('\n').length : 0} lines · {value ? value.length : 0} chars
        </span>
      </div>

      {/* Monaco Editor */}
      <Editor
        height="360px"
        language={monacoLang}
        value={value}
        onChange={(val) => onChange(val || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          lineNumbers: 'on',
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          renderLineHighlight: 'gutter',
          wordWrap: 'on',
          tabSize: 4,
          readOnly: disabled,
          placeholder: 'Paste your code here...',
        }}
        loading={
          <div className="flex items-center justify-center h-[360px] bg-dark-800">
            <div className="dot-pulse">
              <span /><span /><span />
            </div>
          </div>
        }
      />
    </div>
  );
}

export default CodeEditor;
