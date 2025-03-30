import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brush, Layers, Download, Palette } from 'lucide-react';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-artify-accent">
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-artify-secondary/20 blur-3xl"></div>
        <div className="absolute top-1/4 -left-24 h-72 w-72 rounded-full bg-artify-error/10 blur-3xl"></div>
        <div className="absolute bottom-16 right-1/4 h-56 w-56 rounded-full bg-artify-secondary/15 blur-3xl"></div>
        
        {/* Floating 3D elements */}
        <div className="absolute top-1/3 right-1/4 floating-card h-16 w-16 bg-artify-error/10 rounded-lg shadow-lg animate-float">
          <Brush className="h-8 w-8 text-artify-error absolute inset-0 m-auto" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 floating-card h-12 w-12 bg-artify-secondary/10 rounded-lg shadow-lg animate-float-delay">
          <Palette className="h-6 w-6 text-artify-secondary absolute inset-0 m-auto" />
        </div>
        <div className="absolute top-1/2 left-1/5 floating-card h-14 w-14 bg-artify-error/10 rounded-lg shadow-lg animate-float-alt">
          <Layers className="h-7 w-7 text-artify-error absolute inset-0 m-auto" />
        </div>
        
        <div className="container px-4 mx-auto z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
            Create. Express. <span className="text-[rgb(201,104,104)]">Artify.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8">
            A modern digital canvas for artists and creators to bring their imagination to life
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-artify-error text-white hover:bg-artify-error/90 font-medium hover-scale"
          >
            <Link to="/canvas" className="flex items-center gap-2">
              Start Drawing <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 w-full bg-artify-primary text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Ready to Create?</h2>
          <p className="text-xl text-black max-w-2xl mx-auto mb-8">
            Start your artistic journey with Artify today.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-artify-error text-white hover:bg-artify-error/90 font-medium hover-scale"
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
