import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [bootSequence, setBootSequence] = useState<string[]>([]);
  const [bootComplete, setBootComplete] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const bootMessages = [
      'Initializing system...',
      'Loading secure kernel modules...',
      'Checking system integrity...',
      'Mounting encrypted partitions...',
      'Starting network services...',
      'Initializing security protocols...',
      'System ready.'
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < bootMessages.length) {
        setBootSequence(prev => [...prev, bootMessages[index]]);
        index++;
      } else {
        clearInterval(interval);
        setBootComplete(true);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login (no real auth)
    if (username && password) {
      login(username);
      navigate('/terminal');
    } else {
      setMessage('Access denied: All fields required');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Shield className="h-16 w-16 text-green-500" />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-green-500 mb-2">DIGITAL FORTRESS</h1>
          <p className="text-green-300 text-sm">SECURE AUTHENTICATION REQUIRED</p>
        </div>

        {!bootComplete ? (
          <div className="border border-green-500 bg-black p-4 rounded">
            <div className="text-green-400 font-mono text-sm">
              {bootSequence.map((msg, i) => (
                <div key={i} className="mb-1">[SYSTEM] {msg}</div>
              ))}
              {bootSequence.length < 7 && (
                <div className="inline-flex">
                  <span className="mr-1">&gt;</span>
                  <span className="animate-pulse">_</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="border border-green-500 bg-black p-4 rounded">
              <div className="mb-4">
                <label className="block text-green-400 text-sm mb-2" htmlFor="username">
                  USERNAME
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-black border border-green-700 text-green-300 px-3 py-2 rounded focus:outline-none focus:border-green-400"
                    autoComplete="off"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-green-400 text-sm mb-2" htmlFor="password">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black border border-green-700 text-green-300 px-3 py-2 rounded focus:outline-none focus:border-green-400"
                  />
                  <Lock className="absolute right-3 top-2 h-5 w-5 text-green-700" />
                </div>
              </div>
              
              {message && (
                <div className="mb-4 flex items-center text-amber-500 text-sm">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {message}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-green-800 hover:bg-green-700 text-green-100 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
              >
                AUTHENTICATE
              </button>
            </form>
            
            <div className="mt-6 text-center text-green-600 text-xs">
              <p>NOTICE: ALL SYSTEM ACTIVITY IS MONITORED</p>
              <p className="mt-1">UNAUTHORIZED ACCESS WILL BE PROSECUTED</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;