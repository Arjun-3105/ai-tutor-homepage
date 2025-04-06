import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Brain, Sparkles, Code, Atom } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    let animationFrameId: number;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => {
      const colors = ['#60A5FA', '#818CF8', '#A78BFA'];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    };

    const initParticles = () => {
      for (let i = 0; i < 150; i++) {
        particles.push(createParticle());
      }
    };

    const drawParticle = (particle: typeof particles[0]) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
      ctx.fill();
    };

    const drawConnection = (p1: typeof particles[0], p2: typeof particles[0]) => {
      const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(96, 165, 250, ${0.2 * (1 - distance / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    };

    const updateParticle = (particle: typeof particles[0]) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

      particle.opacity = Math.sin(Date.now() * 0.001) * 0.2 + 0.3;
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(17, 24, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        updateParticle(particle);
        drawParticle(particle);

        for (let j = i + 1; j < particles.length; j++) {
          drawConnection(particle, particles[j]);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-blue-950 to-gray-950">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-gray-950/80 z-10" />
      
      <div className="relative z-20 container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center"
            >
              <Brain className="h-7 w-7 text-white" />
            </motion.div>
            <span className="ml-3 text-white font-bold text-2xl">Nerv</span>
          </motion.div>

          <div className="flex items-center space-x-4">
            <Link to="/login">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 text-white/90 hover:text-white border border-white/20 rounded-lg hover:border-white/40 transition-colors"
              >
                Login
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-white/5 text-white rounded-lg font-medium hover:bg-white/10 transition-all border border-white/10"
              >
                Sign Up
              </motion.button>
            </Link>
          </div>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-950/50 rounded-full w-fit mb-8 border border-blue-800/30"
            >
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm">AI-Powered Learning Platform</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Elevate Your Mind with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Neural AI
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl text-white/70 leading-relaxed mb-10"
            >
              Experience the future of learning with our advanced AI platform that adapts to your unique style and pace.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl text-white font-medium shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center group"
            >
              Start Learning
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.div>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.02, 1],
                rotate: [0, 1, 0] 
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-700/20 rounded-3xl blur-3xl"
            />
            <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Brain, title: "Neural Learning", desc: "Adaptive AI that grows with you", color: "text-blue-400" },
                  { icon: Code, title: "Smart Practice", desc: "Interactive coding exercises", color: "text-purple-400" },
                  { icon: Atom, title: "Deep Learning", desc: "Advanced concept mastery", color: "text-green-400" },
                  { icon: Sparkles, title: "AI Insights", desc: "Personalized feedback", color: "text-yellow-400" }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    className="p-6 bg-gray-800/50 rounded-2xl border border-white/5 hover:border-white/10 transition-all"
                  >
                    <item.icon className={`h-8 w-8 ${item.color} mb-4`} />
                    <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;