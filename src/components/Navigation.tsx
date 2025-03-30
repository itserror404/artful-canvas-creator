
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Brush, Home, Info } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const isCanvasPage = location.pathname === '/canvas';
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center animate-fade-in ${isCanvasPage ? 'bg-black' : 'glass-nav'}`}>
      <Link to="/" className="flex items-center gap-2">
        <Brush className={`h-6 w-6 ${isCanvasPage ? 'text-artify-secondary' : 'text-artify-error'}`} />
        <span className={`text-xl font-bold ${isCanvasPage ? 'text-white' : 'text-black'}`}>Artify</span>
      </Link>
      
      <div className="flex gap-4 items-center">
        <Link 
          to="/" 
          className={`p-2 rounded-lg transition-all duration-200 ${location.pathname === '/' ? 'bg-artify-error text-white' : isCanvasPage ? 'text-white hover:bg-artify-error hover:text-white' : 'text-black hover:bg-artify-error hover:text-white'}`}
        >
          <Home className="h-5 w-5" />
        </Link>
        
        <Link 
          to="/canvas" 
          className={`p-2 rounded-lg transition-all duration-200 ${location.pathname === '/canvas' ? 'bg-artify-error text-white' : isCanvasPage ? 'text-white hover:bg-artify-error hover:text-white' : 'text-black hover:bg-artify-error hover:text-white'}`}
        >
          <Brush className="h-5 w-5" />
        </Link>
        
        <Link 
          to="/about" 
          className={`p-2 rounded-lg transition-all duration-200 ${location.pathname === '/about' ? 'bg-artify-error text-white' : isCanvasPage ? 'text-white hover:bg-artify-error hover:text-white' : 'text-black hover:bg-artify-error hover:text-white'}`}
        >
          <Info className="h-5 w-5" />
        </Link>
        
        {location.pathname !== '/canvas' && (
          <Button 
            asChild
            className="bg-artify-error text-white hover:bg-artify-error/90 font-medium"
          >
            <Link to="/canvas">Start Drawing</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
