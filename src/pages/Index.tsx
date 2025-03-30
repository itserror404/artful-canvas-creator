
const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center px-4 max-w-4xl">
        <h1 className="text-5xl font-bold mb-6 text-black">Welcome to <span className="text-artify-primary">Artify</span></h1>
        <p className="text-xl text-gray-700 mb-8">Express your creativity with our intuitive drawing application</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-artify-primary p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-black">Create</h3>
            <p className="text-black/80">Bring your imagination to life with our powerful tools</p>
          </div>
          
          <div className="bg-artify-secondary p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-black">Share</h3>
            <p className="text-black/80">Share your artwork with friends and family</p>
          </div>
          
          <div className="bg-artify-accent p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-black">Explore</h3>
            <p className="text-black/80">Discover new techniques and inspiration</p>
          </div>
        </div>
        
        <div className="bg-artify-error text-white p-4 rounded-lg inline-block">
          <p className="font-semibold">Start your artistic journey today!</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
