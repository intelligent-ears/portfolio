import React, { useState, useEffect } from 'react';
import { Folder, Code, Shield, LinkIcon } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  details: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: "SolSniffer",
    name: "SolSniffer",
    description: "A SAST Tool for Solidity smart contracts",
    tags: ["Solidity", "SAST", "Security", "Python"],
    details: `
A static analysis tool for Solidity smart contracts, built in Python

Features:
- Parses Solidity smart contracts using a JS-based parser
- Detects critical vulnerabilities like unchecked send() calls
- Outputs findings in:
      Console view
      JSON report
      SARIF (Static Analysis Results Interchange Format) report


Technologies:
- Python
- Solidity
- Node.js
- Slither
    `,
    link: "https://github.com/intelligent-ears/SolSniffer"
  },
  {
    id: "side channel attack",
    name: " ESP32 Precise Timing Side-Channel Attack",
    description: "Timing side-channel attack using an ESP32 as the attacker and an ESP8266 as the vulnerable target",
    tags: ["Side Channel Attack", "Arduino", "C++"],
    details: `
A practical timing side-channel attack using an ESP32 as the attacker and an ESP8266 as the vulnerable target. The attacker deduces a secret password character-by-character by analyzing response time variations over Wi-Fi.

Attack Flow:
1. ESP32 connects to Wi-Fi and targets the ESP8266 server.
2. It sends login attempts with different guesses at each character position.
3. Measures the time taken for each response using micros().
4. Builds a statistical profile of response times per character.
5. Chooses the character with the highest average time as the likely correct one.
6. Repeats for each subsequent position until the full password is revealed.

Defenses & Mitigations:
- Use constant-time string comparisons
- Introduce artificial random delays
- Perform rate-limiting and lockouts on repeated guesses
- Avoid using strcmp() or similar early-return logic in auth routines
    `,
    link: "https://github.com/intelligent-ears/esp32_timing-attack_simulation"
  },
  {
    id: "fault injection attack",
    name: " ESP32-ESP8266 Fault Injection Attack",
    description: "Fault Injection attack using an ESP32 as the glitcher and an ESP8266 as the vulnerable target",
    tags: ["Fault Injection", "Arduino", "C++"],
    details: `
 A hardware-based voltage glitching attack using an ESP32 to bypass authentication on an ESP8266 by momentarily disturbing its power supply at precise moments

Attack Flow:
1. ESP8266 waits for a password input.
2. ESP32 triggers a power glitch at a precise time.
3. This disrupts a conditional check inside the ESP8266 firmware.
4. If the glitch is timed right, authentication is bypassed.

Defenses & Mitigations:
- Voltage and Clock Monitoring
- Randomized Execution Timing
- Redundant Checks
- Obfuscate Critical Code
    `,
    link: "https://github.com/intelligent-ears/fault_injection_attack_simulation"
  },
 
 
];

const ProjectsView: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const viewProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      setSelectedProject(project);
    }
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <div className={`p-6 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {selectedProject ? (
        <div className="border border-green-700 bg-black p-4 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Code className="h-5 w-5 text-green-500 mr-2" />
              <h2 className="text-xl text-green-500">{selectedProject.name}</h2>
            </div>
            <button 
              onClick={closeProject}
              className="text-green-400 hover:text-green-300 text-sm border border-green-700 px-2 py-1 rounded"
            >
              CLOSE
            </button>
          </div>

          <div className="mb-4">
            <div className="text-green-300 font-bold mb-1">// PROJECT OVERVIEW</div>
            <p className="text-green-400 mb-3">{selectedProject.description}</p>
          </div>

          <div className="mb-4">
            <div className="text-green-300 font-bold mb-1">// TAGS</div>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map((tag, index) => (
                <span key={index} className="bg-green-900 text-green-300 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-green-300 font-bold mb-1">// DETAILS</div>
            <pre className="text-sm text-green-400 whitespace-pre-wrap bg-gray-900 p-3 rounded-md overflow-x-auto">
              {selectedProject.details}
            </pre>
          </div>

          {selectedProject.link && selectedProject.link !== "#" && (
            <div>
              <div className="text-green-300 font-bold mb-1">// PROJECT LINK</div>
              <a 
                href={selectedProject.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 flex items-center"
              >
                <LinkIcon className="h-4 w-4 mr-1" />
                Visit Project
              </a>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-6">
            <Folder className="h-5 w-5 text-green-500 mr-2" />
            <h2 className="text-xl text-green-500">PROJECT DIRECTORY</h2>
          </div>

          <div className="grid gap-4">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="border border-green-700 bg-black p-4 rounded-md hover:border-green-500 transition-colors cursor-pointer"
                onClick={() => viewProject(project.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-green-500 mr-2" />
                    <h3 className="text-green-400 font-bold">{project.name}</h3>
                  </div>
                  <button 
                    className="text-green-400 hover:text-green-300 text-xs border border-green-700 px-2 py-1 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      viewProject(project.id);
                    }}
                  >
                    VIEW
                  </button>
                </div>
                <p className="text-green-300 text-sm mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="bg-green-900 text-green-300 text-xs px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsView;
