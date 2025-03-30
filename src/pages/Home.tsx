
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brush } from 'lucide-react';
import Footer from '@/components/Footer';

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Parallax effect for hero section
      elementsRef.current.forEach((element, index) => {
        const speed = 0.1 * (index + 1);
        const yPos = scrollY * speed;
        if (element) {
          element.style.transform = `translateY(${yPos}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden" ref={heroRef}>
        <div ref={addToRefs} className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-artify-secondary/20 blur-3xl parallax-element"></div>
        <div ref={addToRefs} className="absolute top-1/4 -left-24 h-72 w-72 rounded-full bg-artify-accent/10 blur-3xl parallax-element"></div>
        <div ref={addToRefs} className="absolute bottom-16 right-1/4 h-56 w-56 rounded-full bg-artify-secondary/15 blur-3xl parallax-element"></div>
        
        <div className="container px-4 mx-auto z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Create. Express. <span className="text-gradient">Artify.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-in">
            A modern digital canvas for artists and creators to bring their imagination to life
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-artify-secondary text-artify-primary hover:bg-artify-secondary/90 font-medium animate-fade-in"
          >
            <Link to="/canvas" className="flex items-center gap-2">
              Start Drawing <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-artify-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Powerful <span className="text-artify-secondary">Features</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Intuitive Canvas",
                icon: "🎨",
                description: "A responsive drawing surface with precision tools for digital art creation."
              },
              {
                title: "Layer Management",
                icon: "📑",
                description: "Organize your artwork with flexible layers, blending modes and opacity controls."
              },
              {
                title: "Export Options",
                icon: "💾",
                description: "Save your creations in multiple formats for sharing or continued editing."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-artify-background/80 p-6 rounded-lg border border-gray-800 hover:border-artify-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-artify-secondary/5"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-artify-primary to-artify-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Start your artistic journey with Artify today.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-artify-accent text-white hover:bg-artify-accent/90 font-medium"
          >
            <Link to="/canvas" className="flex items-center gap-2">
              <Brush className="h-5 w-5" /> Launch Canvas
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
