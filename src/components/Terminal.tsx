import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import TerminalPrompt from './terminal/TerminalPrompt';
import ProjectsView from './terminal/ProjectsView';
import AboutView from './terminal/AboutView';
import SkillsView from './terminal/SkillsView';
import ContactView from './terminal/ContactView';
import ResumeView from './terminal/ResumeView';
import { useAuth } from '../context/AuthContext';
import { TerminalOutput } from '../types/terminal';
import { Shield, LogOut } from 'lucide-react';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalOutput[]>([
    { type: 'system', content: 'Welcome to Digital Fortress. Type "help" for available commands.' }
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { username, logout } = useAuth();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (command: string) => {
    const newEntry: TerminalOutput = { type: 'command', content: command };
    let response: TerminalOutput = { type: 'error', content: 'Command not recognized. Type "help" for available commands.' };

    const cmd = command.toLowerCase().trim();
    const args = cmd.split(' ').slice(1);

    if (cmd === 'help') {
      response = {
        type: 'system',
        content: `
Available commands:
  help                      - Display this help message
  ls                        - List sections
  cd [section]              - Navigate to a section
  about                     - Display about information
  skills                    - Display skills information
  projects                  - Display projects
  contact                   - Contact information
  resume                    - View resume
  clear                     - Clear the terminal
  exit                      - Logout
        `
      };
    } else if (cmd === 'ls') {
      response = {
        type: 'list',
        content: ['about', 'skills', 'projects', 'contact', 'resume']
      };
    } else if (cmd.startsWith('cd ')) {
      const section = args[0];
      if (['about', 'skills', 'projects', 'contact', 'resume'].includes(section)) {
        navigate(`/terminal/${section}`);
        response = { type: 'system', content: `Navigating to ${section}` };
      } else {
        response = { type: 'error', content: 'Directory not found' };
      }
    } else if (['about', 'skills', 'projects', 'contact', 'resume'].includes(cmd)) {
      navigate(`/terminal/${cmd}`);
      response = { type: 'system', content: `Displaying ${cmd}` };
    } else if (cmd === 'clear') {
      setHistory([]);
      return;
    } else if (cmd === 'exit') {
      logout();
      navigate('/login');
      return;
    }

    setHistory(prev => [...prev, newEntry, response]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 border-b border-green-700 p-2 flex justify-between items-center">
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-green-500 font-bold">DIGITAL FORTRESS</span>
        </div>
        <div className="flex items-center">
          <span className="text-green-400 text-sm mr-4">User: {username}</span>
          <button 
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="text-green-400 hover:text-green-300 flex items-center"
          >
            <LogOut className="h-4 w-4 mr-1" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <div 
          ref={terminalRef}
          className="w-full md:w-1/2 bg-black text-green-400 p-4 overflow-y-auto font-mono"
        >
          {history.map((entry, index) => (
            <div key={index} className="mb-2">
              {entry.type === 'command' && (
                <div>
                  <span className="text-green-500">{username}@digital-fortress:~$</span> {entry.content}
                </div>
              )}
              {entry.type === 'system' && (
                <div className="whitespace-pre-line">{entry.content}</div>
              )}
              {entry.type === 'error' && (
                <div className="text-red-500">{entry.content}</div>
              )}
              {entry.type === 'list' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Array.isArray(entry.content) && entry.content.map((item, i) => (
                    <div key={i} className="text-blue-400">{item}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <TerminalPrompt onCommand={handleCommand} username={username} />
        </div>
        
        <div className="hidden md:block md:w-1/2 bg-gray-900 border-l border-green-700 overflow-y-auto">
          <Routes>
            <Route path="/about" element={<AboutView />} />
            <Route path="/skills" element={<SkillsView />} />
            <Route path="/projects" element={<ProjectsView />} />
            <Route path="/contact" element={<ContactView />} />
            <Route path="/resume" element={<ResumeView />} />
            <Route path="/" element={
              <div className="h-full flex items-center justify-center p-4">
                <div className="text-center">
                  <h2 className="text-xl text-green-500 mb-4">Terminal Navigation</h2>
                  <p className="text-green-300 mb-2">Use commands to navigate the system</p>
                  <p className="text-green-400">Type <span className="bg-gray-800 px-1">help</span> for available commands</p>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Terminal;