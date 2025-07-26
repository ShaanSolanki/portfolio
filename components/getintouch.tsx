'use client';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiMessageSquare } from 'react-icons/fi';

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >
          <h2 className="font-mono text-3xl md:text-4xl text-indigo-300 mb-4 text-shadow-glow">
            &gt; get_in_touch
          </h2>
          <p className="text-lg text-indigo-200/90 max-w-2xl">
            Have a project or collaboration in mind? Let's connect!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info Card */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="p-8 rounded-xl bg-gradient-to-br from-indigo-900/20 to-indigo-900/10 backdrop-blur-sm border border-indigo-400/30 hover:border-indigo-300/50 transition-all duration-300"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-white mb-2">Direct Contact</h3>
              
              <a 
                href="mailto:hello@example.com" 
                className="flex items-center gap-3 text-indigo-300 hover:text-white transition-colors"
              >
                <FiMail className="w-5 h-5" />
                <span>hello@example.com</span>
              </a>
              
              <div className="mt-8">
                <h4 className="text-lg text-white mb-4">Prefer direct email?</h4>
                <p className="text-indigo-200/80">
                  Feel free to reach out directly via email. I typically respond within 24 hours.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="p-8 rounded-xl bg-gradient-to-br from-indigo-900/20 to-indigo-900/10 backdrop-blur-sm border border-indigo-400/30 hover:border-indigo-300/50 transition-all duration-300"
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-indigo-200 mb-2">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-indigo-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    className="block w-full pl-10 pr-3 py-3 rounded-lg bg-indigo-900/30 border border-indigo-400/30 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-indigo-500/70 transition-all"
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-indigo-200 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-indigo-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="block w-full pl-10 pr-3 py-3 rounded-lg bg-indigo-900/30 border border-indigo-400/30 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-indigo-500/70 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-indigo-200 mb-2">
                  Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <FiMessageSquare className="h-5 w-5 text-indigo-400" />
                  </div>
                  <textarea
                    id="message"
                    rows={5}
                    className="block w-full pl-10 pr-3 py-3 rounded-lg bg-indigo-900/30 border border-indigo-400/30 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-indigo-500/70 transition-all"
                    placeholder="Tell me about your project..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 flex items-center justify-center gap-2"
              >
                Send Message
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}