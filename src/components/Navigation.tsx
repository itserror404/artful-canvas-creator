
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Brush, Home, Info } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const isCanvasPage = location.pathname === '/canvas';
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center ${isCanvasPage ? 'dark-glass' : 'glass'} animate-fade-in`}>
      <Link to="/" className="flex items-center gap-2">
        <Brush className={`h-6 w-6 ${isCanvasPage ? 'text-artify-secondary' : 'text-artify-primary'}`} />
        <span className="text-xl font-bold">Artify</span>
      </Link>
      
      <div className="flex gap-4 items-center">
        <Link 
          to="/" 
          className={`toolbar-button ${location.pathname === '/' ? 'active' : ''}`}
        >
          <Home className="h-5 w-5" />
        </Link>
        
        <Link 
          to="/canvas" 
          className={`toolbar-button ${location.pathname === '/canvas' ? 'active' : ''}`}
        >
          <Brush className="h-5 w-5" />
        </Link>
        
        <Link 
          to="/about" 
          className={`toolbar-button ${location.pathname === '/about' ? 'active' : ''}`}
        >
          <Info className="h-5 w-5" />
        </Link>
        
        {location.pathname !== '/canvas' && (
          <Button 
            asChild
            className="bg-artify-primary text-white hover:bg-artify-primary/90 font-medium"
          >
            <Link to="/canvas">Start Drawing</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
