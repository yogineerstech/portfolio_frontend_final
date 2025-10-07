import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Brain, Zap, MessageSquare, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

const VideoShowcase: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Auto-play prevented:', error);
      });
    }
  }, []);

  const features = [
    { icon: Brain, label: 'Neural Intelligence', desc: 'Deep learning architecture' },
    { icon: Zap, label: 'Lightning Fast', desc: 'Real-time processing' },
    { icon: MessageSquare, label: 'Conversational AI', desc: 'Natural dialogue flow' }
  ];

  return (
    <section className="py-20 px-4 lg:py-32 bg-white dark:bg-background relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'grid-flow 20s linear infinite'
        }}></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-montserrat text-orange-300 tracking-wider">CUTTING-EDGE TECHNOLOGY</span>
          </div>
          
          <h2 className="text-6xl lg:text-8xl font-AftikaBold bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent mb-6 leading-tight">
            Language Models
          </h2>
          
          <p className="text-xl lg:text-2xl font-serif text-black max-w-3xl mx-auto leading-relaxed italic">
            Witnessing the future of intelligent communication through
            <span className="text-transparent bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text font-semibold"> advanced neural architectures</span>
          </p>
        </div>

        {/* Innovative Layout */}
        <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Video in Artistic Frame */}
            <div className="relative order-2 lg:order-1">
              {/* Decorative Corner Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-orange-500 rounded-tl-3xl"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-orange-500 rounded-br-3xl"></div>
              
              {/* Glow Effects */}
              <div className="absolute -inset-8 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-600/20 blur-3xl animate-pulse"></div>
              
              {/* Video Container with Artistic Border */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/30 border-2 border-orange-500/30">
                  <video
                    ref={videoRef}
                    className="w-full aspect-video object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  </video>
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Play Indicator */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-full border border-orange-500/30">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-montserrat text-stone-200">LIVE DEMO</span>
                  </div>
                </div>
                
                {/* Floating Number Badge */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-br from-orange-500 to-amber-600 text-white w-20 h-20 rounded-2xl shadow-2xl shadow-orange-500/50 flex items-center justify-center rotate-12 hover:rotate-0 transition-transform">
                  <div className="text-center">
                    <div className="text-2xl font-AftikaBold">AI</div>
                    <div className="text-xs font-montserrat">POWERED</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Feature Cards */}
            <div className="space-y-6 order-1 lg:order-2">
              {features.map((feature, idx) => (
                <Card 
                  key={idx} 
                  className="bg-gradient-to-br from-black to-black border-orange-500/30 p-6 shadow-xl shadow-orange-500/10 hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105 group cursor-pointer"
                  style={{ 
                    animationDelay: `${idx * 0.2}s`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
                    transition: `all 0.6s ease ${idx * 0.2}s`
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg shadow-orange-500/50 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-AftikaBold text-stone-200 mb-2">{feature.label}</h3>
                      <p className="text-sm font-montserrat text-stone-400">{feature.desc}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Bottom Stats - Redesigned */}
          <div className={`grid grid-cols-3 gap-8 mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {[
              { label: 'Parameters', value: '175B+', detail: 'Neural connections' },
              { label: 'Accuracy', value: '99.9%', detail: 'Precision rate' },
              { label: 'Speed', value: '<100ms', detail: 'Response time' }
            ].map((stat, idx) => (
              <div key={idx} className="relative group cursor-pointer">
                {/* Background Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 rounded-2xl border border-orange-500/20 group-hover:border-orange-500/40 transition-all"></div>
                
                <div className="relative text-center p-6">
                  <div className="text-4xl lg:text-5xl font-AftikaBold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-sm font-montserrat text-black tracking-wider uppercase mb-1">{stat.label}</div>
                  <div className="text-xs font-montserrat text-stone-400">{stat.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes grid-flow {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
        
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        
        .font-AftikaBold {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
      `}</style>
    </section>
  );
};

export default VideoShowcase;