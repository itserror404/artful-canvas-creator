
import React from 'react';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen pt-20 bg-artify-accent/70">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-black">
          About <span className="text-artify-error">Artify</span>
        </h1>
        
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <p className="text-lg mb-6 text-black">
            Artify is a modern digital art canvas built for creators who want to express their creativity without limitations. 
            Our platform combines powerful drawing tools with an intuitive interface, making digital art accessible to everyone.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-artify-error">Our Mission</h2>
          <p className="text-lg mb-6 text-black">
            We believe that creative expression should be accessible to everyone. Our mission is to provide 
            artists of all skill levels with professional-grade tools that are both powerful and easy to use.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-artify-error">The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              {
                name: "Alex Morgan",
                role: "Founder & Lead Developer",
                bio: "Digital artist and full-stack developer with a passion for creating tools that empower creators."
              },
              {
                name: "Sarah Chen",
                role: "UX Designer",
                bio: "Specialist in creating intuitive interfaces that balance functionality with aesthetic appeal."
              }
            ].map((member, index) => (
              <div key={index} className="bg-artify-secondary/30 p-5 rounded-lg border border-artify-error/30">
                <h3 className="text-xl font-semibold mb-1 text-black">{member.name}</h3>
                <p className="text-artify-error mb-2">{member.role}</p>
                <p className="text-black/80">{member.bio}</p>
              </div>
            ))}
          </div>
          
          <h2 className="text-2xl font-semibold mb-4 text-artify-error">Technology</h2>
          <p className="text-lg mb-4 text-black">
            Artify is built with modern web technologies to ensure a smooth, responsive experience:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2 text-black/80">
            <li>React with TypeScript for a robust frontend</li>
            <li>Fabric.js for advanced canvas manipulation</li>
            <li>Tailwind CSS for responsive design</li>
            <li>Shadcn UI components for a consistent interface</li>
          </ul>
          
          <div className="mt-8 p-4 bg-artify-secondary/10 rounded-lg border border-artify-secondary/30">
            <p className="text-center text-lg text-black">
              Have questions or suggestions? <a href="#" className="text-artify-error underline">Contact us</a>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
