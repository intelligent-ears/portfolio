import React, { useState, useEffect, useRef } from 'react';

interface TerminalPromptProps {
  onCommand: (command: string) => void;
  username: string;
}

const TerminalPrompt: React.FC<TerminalPromptProps> = ({ onCommand, username }) => {
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      onCommand(command);
      setCommandHistory(prev => [...prev, command]);
      setCommand('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion for commands
      const commands = ['help', 'ls', 'cd', 'about', 'skills', 'projects', 'contact', 'resume', 'clear', 'exit'];
      const matchingCommand = commands.find(cmd => cmd.startsWith(command.toLowerCase()));
      if (matchingCommand) {
        setCommand(matchingCommand);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <span className="text-green-500 mr-2">{username}@digital-fortress:~$</span>
      <input
        ref={inputRef}
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono"
        autoFocus
        autoComplete="off"
        spellCheck="false"
      />
    </form>
  );
};

export default TerminalPrompt;