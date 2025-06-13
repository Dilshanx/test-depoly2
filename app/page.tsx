"use client";
import React, { useState, useEffect } from "react";

// Generate static particle data to avoid hydration mismatch
const generateParticles = () => {
  const particles = [];
  for (let i = 0; i < 20; i++) {
    particles.push({
      id: i,
      left: (i * 37 + 23) % 100, // Deterministic positioning
      top: (i * 47 + 17) % 100,
      duration: 3 + (i % 4), // Duration between 3-6s
      delay: (i * 0.3) % 2, // Delay between 0-2s
    });
  }
  return particles;
};

const PARTICLES = generateParticles();

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden relative'>
      {/* Animated background elements */}
      <div className='absolute inset-0'>
        <div
          className='absolute w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse'
          style={{
            left: mousePos.x * 0.02 + "px",
            top: mousePos.y * 0.02 + "px",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className='absolute w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse'
          style={{
            right: mousePos.x * 0.01 + "px",
            bottom: mousePos.y * 0.01 + "px",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />
        <div
          className='absolute w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse'
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) translate(${
              mousePos.x * 0.005
            }px, ${mousePos.y * 0.005}px)`,
            animation: "float 7s ease-in-out infinite",
          }}
        />
      </div>

      {/* Floating particles */}
      {isClient &&
        PARTICLES.map((particle) => (
          <div
            key={particle.id}
            className='absolute w-2 h-2 bg-white rounded-full opacity-20'
            style={{
              left: particle.left + "%",
              top: particle.top + "%",
              animation: `particle-float ${particle.duration}s linear infinite`,
              animationDelay: particle.delay + "s",
            }}
          />
        ))}

      {/* Main content */}
      <div className='relative z-10 flex items-center justify-center min-h-screen px-4'>
        <div className='text-center'>
          {/* Main heading */}
          <h1
            className={`text-6xl md:text-8xl font-black mb-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{
              background:
                "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradient-shift 3s ease infinite",
            }}
          >
            Hello World!
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Welcome to the future of web experiences. Where creativity meets
            technology.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <button className='group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25'>
              <span className='relative z-10'>Get Started</span>
              <div className='absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </button>

            <button className='group px-8 py-4 border-2 border-cyan-400 rounded-full text-cyan-400 font-bold text-lg transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/25'>
              Learn More
            </button>
          </div>

          {/* Feature cards */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto transition-all duration-1000 delay-900 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {[
              {
                icon: "🚀",
                title: "Lightning Fast",
                desc: "Optimized for speed",
              },
              {
                icon: "✨",
                title: "Beautiful Design",
                desc: "Stunning visuals",
              },
              { icon: "🔧", title: "Easy Setup", desc: "Ready in minutes" },
            ].map((feature, i) => (
              <div
                key={i}
                className='group p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-2'
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className='text-4xl mb-4 group-hover:scale-110 transition-transform duration-300'>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-bold text-white mb-2'>
                  {feature.title}
                </h3>
                <p className='text-gray-300'>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes particle-float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
