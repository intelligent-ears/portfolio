import React, { useState, useEffect } from 'react';
import { FileText, Download, Briefcase, GraduationCap } from 'lucide-react';

const ResumeView: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'skills'>('experience');

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={`p-6 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileText className="h-5 w-5 text-green-500 mr-2" />
          <h2 className="text-xl text-green-500">CLASSIFIED DOSSIER</h2>
        </div>
        
        <a 
          href="https://drive.google.com/file/d/15cUYwkyLFWl_VM84AULVGh5dMMJa-DZ5/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-green-800 hover:bg-green-700 text-green-100 py-1 px-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
        >
          <Download className="h-4 w-4 mr-1" />
          DOWNLOAD CV
        </a>
      </div>

      <div className="mb-6 flex border-b border-green-800">
        <button 
          onClick={() => setActiveTab('experience')}
          className={`py-2 px-4 text-sm font-mono ${
            activeTab === 'experience' 
              ? 'text-green-400 border-b-2 border-green-500' 
              : 'text-green-600 hover:text-green-400'
          }`}
        >
          EXPERIENCE
        </button>
        <button 
          onClick={() => setActiveTab('education')}
          className={`py-2 px-4 text-sm font-mono ${
            activeTab === 'education' 
              ? 'text-green-400 border-b-2 border-green-500' 
              : 'text-green-600 hover:text-green-400'
          }`}
        >
          EDUCATION
        </button>
        <button 
          onClick={() => setActiveTab('skills')}
          className={`py-2 px-4 text-sm font-mono ${
            activeTab === 'skills' 
              ? 'text-green-400 border-b-2 border-green-500' 
              : 'text-green-600 hover:text-green-400'
          }`}
        >
          TECHNICAL SKILLS
        </button>
      </div>

      {activeTab === 'experience' && (
        <div className="space-y-6">
          <div className="border border-green-700 bg-black p-4 rounded-md">
            <div className="flex items-start">
              <Briefcase className="h-5 w-5 text-green-500 mr-3 mt-1" />
              <div>
                <h3 className="text-green-400 font-bold">Research Intern</h3>
                <div className="text-green-300 text-sm mb-1">IIT Jodhpur</div>
                <div className="text-green-500 text-xs mb-2">May 2025 - July 2025</div>
                <ul className="text-green-400 text-sm list-disc list-inside space-y-1">
                  <li>Quantum Computing & Teleportation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-green-700 bg-black p-4 rounded-md">
            <div className="flex items-start">
              <Briefcase className="h-5 w-5 text-green-500 mr-3 mt-1" />
              <div>
                <h3 className="text-green-400 font-bold">Subject Matter Expert</h3>
                <div className="text-green-300 text-sm mb-1">PhysicsWallah</div>
                <div className="text-green-500 text-xs mb-2">Aug 2024 - Jan 2025</div>
                <ul className="text-green-400 text-sm list-disc list-inside space-y-1">
                  <li>Assissted many experts in making and solving Maths problems for NDA written exam</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'education' && (
        <div className="space-y-6">
          <div className="border border-green-700 bg-black p-4 rounded-md">
            <div className="flex items-start">
              <GraduationCap className="h-5 w-5 text-green-500 mr-3 mt-1" />
              <div>
                <h3 className="text-green-400 font-bold">Bachelor of Technology</h3>
                <div className="text-green-300 text-sm mb-1">The LNM Institute of Information Technology</div>
                <div className="text-green-500 text-xs mb-2">2024 - 2028</div>
                <p className="text-green-400 text-sm">
                  Specialisation: Electronics and Communication Engineering
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="border border-green-700 bg-black p-4 rounded-md">
          <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap">
{`// TECHNICAL EXPERTISE

// Cryptography
- Encryption  
- key management
- cryptographic protocols

// Languages & Scripting
- Python, Bash, PowerShell
- C/C++, Java
- JavaScript, Node.js
- SQL

// Security Tools
- Metasploit, Burp Suite, OWASP ZAP
- Wireshark, Nmap
- ELK Stack

`}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ResumeView;
