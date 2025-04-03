
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brush, Layers, Download, Palette, PenTool, Image, Share2 } from 'lucide-react';
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
        <div className="absolute top-1/3 right-1/4 floating-card h-16 w-16 bg-artify-error/25 rounded-lg shadow-lg animate-float">
          <Brush className="h-8 w-8 text-artify-error absolute inset-0 m-auto" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 floating-card h-12 w-12 bg-artify-secondary/10 rounded-lg shadow-lg animate-float-delay">
          <Palette className="h-6 w-6 text-artify-secondary absolute inset-0 m-auto" />
        </div>
        <div className="absolute top-1/2 left-1/5 floating-card h-14 w-14 bg-artify-error/20 rounded-lg shadow-lg animate-float-alt">
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

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-black">
            Why <span className="text-[rgb(201,104,104)]">Artify</span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-artify-accent/10 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="bg-artify-error/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <PenTool className="h-7 w-7 text-artify-error" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Intuitive Tools</h3>
              <p className="text-gray-600">
                Create stunning artwork with our easy-to-use drawing tools designed for both beginners and professionals.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-artify-accent/10 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="bg-artify-secondary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Layers className="h-7 w-7 text-artify-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Layer Management</h3>
              <p className="text-gray-600">
                Take control of your creation with advanced layer management that gives you complete creative freedom.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-artify-accent/10 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="bg-artify-error/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Share2 className="h-7 w-7 text-artify-error" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Easy Sharing</h3>
              <p className="text-gray-600">
                Export and share your masterpieces with friends, family, or clients with just a few clicks.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-artify-error text-artify-error hover:bg-artify-error hover:text-white"
            >
              <Link to="/about" className="flex items-center gap-2">
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

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
