
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brush, PenTool, Palette, Layers, Download } from 'lucide-react';
import Footer from '@/components/Footer';

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
    features: false,
    cta: false
  });
  
  // Parallax effect
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
      
      // Check if sections are visible for animations
      const featuresSection = document.getElementById('features-section');
      const ctaSection = document.getElementById('cta-section');
      
      if (featuresSection) {
        const rect = featuresSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75 && !isVisible.features) {
          setIsVisible(prev => ({ ...prev, features: true }));
        }
      }
      
      if (ctaSection) {
        const rect = ctaSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75 && !isVisible.cta) {
          setIsVisible(prev => ({ ...prev, cta: true }));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };
  
  const features = [
    {
      title: "Intuitive Canvas",
      icon: <PenTool className="h-8 w-8 text-artify-primary" />,
      description: "A responsive drawing surface with precision tools for digital art creation."
    },
    {
      title: "Layer Management",
      icon: <Layers className="h-8 w-8 text-artify-primary" />,
      description: "Organize your artwork with flexible layers, blending modes and opacity controls."
    },
    {
      title: "Export Options",
      icon: <Download className="h-8 w-8 text-artify-primary" />,
      description: "Save your creations in multiple formats for sharing or continued editing."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden" ref={heroRef}>
        <div ref={addToRefs} className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-artify-primary/20 blur-3xl parallax-element"></div>
        <div ref={addToRefs} className="absolute top-1/4 -left-24 h-72 w-72 rounded-full bg-artify-accent/10 blur-3xl parallax-element"></div>
        <div ref={addToRefs} className="absolute bottom-16 right-1/4 h-56 w-56 rounded-full bg-artify-secondary/15 blur-3xl parallax-element"></div>
        
        <div className="page-container z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Create. Express. <span className="text-gradient">Artify.</span>
          </h1>
          <p className="text-xl md:text-2xl text-artify-text/70 max-w-2xl mx-auto mb-8 animate-fade-in">
            A modern digital canvas for artists and creators to bring their imagination to life
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-artify-primary text-white hover:bg-artify-primary/90 font-medium animate-fade-in hover-scale hover-glow"
          >
            <Link to="/canvas" className="flex items-center gap-2">
              Start Drawing <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          
          <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-8">
            <div className="w-20 h-20 hover:scale-110 transition-all duration-300 cursor-pointer">
              <div className="w-full h-full rounded-full flex items-center justify-center bg-artify-primary/10 hover:bg-artify-primary/20">
                <PenTool className="h-10 w-10 text-artify-primary" />
              </div>
            </div>
            <div className="w-20 h-20 hover:scale-110 transition-all duration-300 cursor-pointer">
              <div className="w-full h-full rounded-full flex items-center justify-center bg-artify-secondary/10 hover:bg-artify-secondary/20">
                <Palette className="h-10 w-10 text-artify-secondary" />
              </div>
            </div>
            <div className="w-20 h-20 hover:scale-110 transition-all duration-300 cursor-pointer">
              <div className="w-full h-full rounded-full flex items-center justify-center bg-artify-accent/10 hover:bg-artify-accent/20">
                <Layers className="h-10 w-10 text-artify-accent" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-14 border-2 border-artify-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-artify-primary rounded-full mt-2 animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features-section" className="py-20 bg-white">
        <div className="page-container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Powerful <span className="text-artify-primary">Features</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`bg-artify-background p-8 rounded-lg border border-gray-200 hover:border-artify-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-artify-primary/5 ${isVisible.features ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="mb-4 p-3 inline-block rounded-full bg-artify-primary/10">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-artify-text/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta-section" className="py-20 bg-gradient-to-b from-artify-primary/5 to-artify-background">
        <div className="page-container text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isVisible.cta ? 'animate-fade-in' : 'opacity-0'}`}>Ready to Create?</h2>
          <p className={`text-xl text-artify-text/70 max-w-2xl mx-auto mb-8 ${isVisible.cta ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            Start your artistic journey with Artify today.
          </p>
          <div className={`${isVisible.cta ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
            <Button 
              asChild
              size="lg"
              className="bg-artify-secondary text-artify-text hover:bg-artify-secondary/90 font-medium hover-scale hover-glow"
            >
              <Link to="/canvas" className="flex items-center gap-2">
                <Brush className="h-5 w-5" /> Launch Canvas
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
