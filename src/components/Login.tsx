import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, ArrowLeft } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center text-white/70 hover:text-white mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <div className="flex items-center justify-center mb-8">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <span className="ml-3 text-white font-bold text-2xl">Nerv</span>
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-6">Welcome Back</h2>
          
          <form className="space-y-6">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 rounded border-white/10" />
                <span className="ml-2 text-sm text-white/70">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-white/70">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;