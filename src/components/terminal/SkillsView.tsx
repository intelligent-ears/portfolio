import React, { useState, useEffect } from 'react';
import { Cpu, ShieldCheck, Zap, Code } from 'lucide-react';

interface Skill {
  name: string;
  proficiency: number;
  category: 'Cryptography' | 'tools' | 'languages';
}

const skills: Skill[] = [
  // Cryptography
  { name: 'Encryption & Decryption', proficiency: 95, category: 'Cryptography' },
  { name: 'Key Management', proficiency: 90, category: 'Cryptography' },
  { name: 'Algorithms', proficiency: 85, category: 'Cryptography' },
  
  
  // Tools & Technologies
  { name: 'Kali Linux', proficiency: 95, category: 'tools' },
  { name: 'Wireshark', proficiency: 90, category: 'tools' },
  { name: 'Metasploit', proficiency: 95, category: 'tools' },
  { name: 'Burp Suite', proficiency: 90, category: 'tools' },
  { name: 'SIEM Tools', proficiency: 85, category: 'tools' },
  
  // Programming Languages
  { name: 'Python', proficiency: 95, category: 'languages' },
  { name: 'Bash/Shell', proficiency: 90, category: 'languages' },
  { name: 'C/C++', proficiency: 80, category: 'languages' },
  { name: 'JavaScript', proficiency: 75, category: 'languages' },
  { name: 'Rust', proficiency: 70, category: 'languages' },
];

const SkillsView: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Cryptography');
  const [animateSkills, setAnimateSkills] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setAnimateSkills(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getSkillColor = (proficiency: number): string => {
    if (proficiency >= 90) return 'bg-green-500';
    if (proficiency >= 80) return 'bg-green-400';
    if (proficiency >= 70) return 'bg-green-300';
    return 'bg-green-200';
  };

  const filterSkills = (category: string) => {
    setActiveCategory(category);
    setAnimateSkills(false);
    setTimeout(() => setAnimateSkills(true), 100);
  };

  const filteredSkills = skills.filter(skill => skill.category === activeCategory);

  return (
    <div className={`p-6 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center mb-6">
        <Cpu className="h-5 w-5 text-green-500 mr-2" />
        <h2 className="text-xl text-green-500">SKILL MATRIX</h2>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button 
          onClick={() => filterSkills('Cryptography')}
          className={`px-3 py-1 text-sm rounded-md ${activeCategory === 'offensive' ? 'bg-green-700 text-green-100' : 'bg-gray-800 text-green-400'}`}
        >
          Cryptography
        </button>
        
        <button 
          onClick={() => filterSkills('tools')}
          className={`px-3 py-1 text-sm rounded-md ${activeCategory === 'tools' ? 'bg-green-700 text-green-100' : 'bg-gray-800 text-green-400'}`}
        >
          Tools & Technologies
        </button>
        <button 
          onClick={() => filterSkills('languages')}
          className={`px-3 py-1 text-sm rounded-md ${activeCategory === 'languages' ? 'bg-green-700 text-green-100' : 'bg-gray-800 text-green-400'}`}
        >
          Programming Languages
        </button>
      </div>

      <div className="border border-green-700 bg-black p-4 rounded-md">
        <div className="mb-4 flex items-center">
          {activeCategory === 'offensive' && <Zap className="h-4 w-4 text-green-500 mr-2" />}
          {activeCategory === 'defensive' && <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />}
          {activeCategory === 'tools' && <Cpu className="h-4 w-4 text-green-500 mr-2" />}
          {activeCategory === 'languages' && <Code className="h-4 w-4 text-green-500 mr-2" />}
          
          <h3 className="text-green-400 font-bold capitalize">{activeCategory} Skills</h3>
        </div>

        <div className="space-y-4">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-green-300">{skill.name}</span>
                <span className="text-green-400">{skill.proficiency}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${getSkillColor(skill.proficiency)} transition-all duration-1000 ease-out`} 
                  style={{ 
                    width: animateSkills ? `${skill.proficiency}%` : '0%',
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border border-green-700 bg-black p-4 rounded-md">
        <div className="text-green-300 font-bold mb-2">// CERTIFICATIONS</div>
        <ul className="text-green-400 space-y-2">
          <li className="flex items-center">
            <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
            ISC2 Certified in Cybersecurity
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SkillsView;