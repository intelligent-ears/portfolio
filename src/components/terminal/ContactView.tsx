import React, { useState, useEffect } from 'react';
import { Mail, Send, AlertTriangle } from 'lucide-react';

const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        status: 'error',
        message: 'Please fill out all required fields.'
      });
      return;
    }

    // Simulate form submission
    setFormStatus({ status: 'submitting', message: 'Transmitting message...' });
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus({
        status: 'success',
        message: 'Message transmitted successfully! Expect a response within 48 hours.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus({ status: 'idle', message: '' });
      }, 5000);
    }, 2000);
  };

  return (
    <div className={`p-6 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center mb-6">
        <Mail className="h-5 w-5 text-green-500 mr-2" />
        <h2 className="text-xl text-green-500">SECURE COMMUNICATION CHANNEL</h2>
      </div>

      <div className="border border-green-700 bg-black p-4 rounded-md mb-6">
        <h3 className="text-green-400 font-bold mb-3">// TRANSMISSION FORM</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-green-300 text-sm mb-1">
                IDENTIFIER <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-green-700 text-green-300 px-3 py-2 rounded focus:outline-none focus:border-green-500"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-green-300 text-sm mb-1">
                RETURN ADDRESS <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-green-700 text-green-300 px-3 py-2 rounded focus:outline-none focus:border-green-500"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="subject" className="block text-green-300 text-sm mb-1">
              SUBJECT
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-green-700 text-green-300 px-3 py-2 rounded focus:outline-none focus:border-green-500"
              placeholder="Message subject"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="message" className="block text-green-300 text-sm mb-1">
              MESSAGE CONTENT <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full bg-gray-900 border border-green-700 text-green-300 px-3 py-2 rounded focus:outline-none focus:border-green-500 resize-none"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          
          {formStatus.status === 'error' && (
            <div className="mb-4 flex items-center text-red-500 text-sm">
              <AlertTriangle className="h-4 w-4 mr-2" />
              {formStatus.message}
            </div>
          )}
          
          {formStatus.status === 'success' && (
            <div className="mb-4 bg-green-900 border border-green-700 text-green-300 p-3 rounded text-sm">
              {formStatus.message}
            </div>
          )}
          
          <button
            type="submit"
            disabled={formStatus.status === 'submitting'}
            className={`flex items-center justify-center w-full md:w-auto bg-green-800 hover:bg-green-700 text-green-100 py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 ${
              formStatus.status === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {formStatus.status === 'submitting' ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-green-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                TRANSMITTING
              </span>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                TRANSMIT MESSAGE
              </>
            )}
          </button>
        </form>
      </div>

      <div className="border border-green-700 bg-black p-4 rounded-md">
        <h3 className="text-green-400 font-bold mb-3">// ALTERNATE COMMUNICATION CHANNELS</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-green-300">
            <div className="font-bold mb-1">ENCRYPTED EMAIL</div>
            <p className="text-sm mb-2">24uec247@lnmiit.ac.in</p>
            <div className="text-xs">PGP KEY FINGERPRINT</div>
            <code className="text-xs text-green-400 block bg-gray-900 p-1 mt-1 rounded">
              850D 6EE6 F428 671C 63CE 23B4 4E4F 2D97 7BAA 3747
            </code>
          </div>
          
          <div className="text-green-300">
            <div className="font-bold mb-1">SECURE SOCIALS</div>
            <ul className="text-sm space-y-1">
              <li>GitHub: <a href="#" className="text-blue-400 hover:underline">github.com/intelligent-ears</a></li>
              <li>LinkedIn: <a href="#" className="text-blue-400 hover:underline">www.linkedin.com/in/intelligentears/</a></li>
              <li>Twitter: <a href="#" className="text-blue-400 hover:underline">@intel_ears</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;