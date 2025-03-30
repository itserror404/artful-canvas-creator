
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-artify-primary py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold text-artify-white flex items-center gap-2">
              Artify <span className="text-artify-secondary">Studio</span>
            </h3>
            <p className="text-gray-400 mt-2">Create. Express. Artify.</p>
          </div>
          
          <div className="flex gap-8">
            <div>
              <h4 className="text-sm font-semibold text-artify-secondary mb-3">Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-400 hover:text-artify-secondary transition">Home</Link></li>
                <li><Link to="/canvas" className="text-gray-400 hover:text-artify-secondary transition">Canvas</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-artify-secondary transition">About</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-artify-secondary mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-artify-secondary transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-artify-secondary transition">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-artify-secondary transition">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Artify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
