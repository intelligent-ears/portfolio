import React, { useState, useEffect } from 'react';
import { User, Info, Server } from 'lucide-react';

const AboutView: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={`p-6 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="border border-green-700 bg-black p-4 rounded-md mb-6">
        <div className="flex items-center mb-4">
          <User className="h-5 w-5 text-green-500 mr-2" />
          <h2 className="text-xl text-green-500">SYSADMIN PROFILE</h2>
        </div>

        <div className="grid gap-4">
          <div className="terminal-output">
            <div className="text-green-300 font-bold mb-1">// PERSONAL INFO</div>
            <pre className="text-sm text-green-400 whitespace-pre-wrap">
{`{
  "./name": "K Arya Sekhar Das",
  "./title": "Cybersecurity Student",
  "./location": "Jaipur, India",
  "./me": "Builder • Hacker • Learner"
}`}
            </pre>
          </div>
          
          <div className="terminal-output">
            <div className="text-green-300 font-bold mb-1">// MISSION STATEMENT</div>
            <p className="text-green-400 mb-3">
              Enthusiastic and skilled Linux expert with experience in embedded systems, cybersecurity, and blockchain. Passionate about open-source technologies and system optimization. Seeking an internship opportunity in cryptography and cybersecurity to apply and enhance technical expertise.
            </p>
          </div>
        </div>
      </div>

      <div className="border border-green-700 bg-black p-4 rounded-md mb-6">
        <div className="flex items-center mb-4">
          <Info className="h-5 w-5 text-green-500 mr-2" />
          <h2 className="text-xl text-green-500">SYSTEM DETAILS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-green-300 font-bold mb-2">// BACKGROUND</h3>
            <p className="text-green-400 text-sm mb-4">
              Currently a begginer, enthusiast, unbounded and curious about latest tech and always ready and pumped to complete hard tasks
            </p>
          </div>
          
          <div>
            <h3 className="text-green-300 font-bold mb-2">// SPECIALIZATIONS</h3>
            <ul className="text-green-400 text-sm list-disc list-inside">
              <li>Cryptography</li>
              <li>Forensics</li>
             
            </ul>
          </div>
        </div>
      </div>

      <div className="border border-green-700 bg-black p-4 rounded-md">
        <div className="flex items-center mb-4">
          <Server className="h-5 w-5 text-green-500 mr-2" />
          <h2 className="text-xl text-green-500">SYSTEM ACHIEVEMENTS</h2>
        </div>

        <div className="terminal-output">
          <div className="text-green-300 font-bold mb-1">// CTFs</div>
          <ul className="text-green-400 text-sm space-y-2">
            <li>
              <span className="text-amber-400">[2025]</span> Ranked 288 among 8k+ teams participating in picoCTF 2025
            </li>
            <li>
              <span className="text-amber-400">[2025]</span> Ranked 845 among 6k+teams in HTB Cyber Apocalypse 2025
            </li>
            <li>
              <span className="text-amber-400">[2025]</span> Many more top ranks in various CTFs across globe
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutView;