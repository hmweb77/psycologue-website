"use client"
import React, { useState, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Menu, X, Heart, Users, User, BookOpen, Star, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const AnimatedSection = ({ children, className = "" }) => {
    const controls = useAnimation();
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: true, threshold: 0.1 });

    useEffect(() => {
      if (inView) {
        controls.start('visible');
      }
    }, [controls, inView]);

    return (
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={fadeInUp}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  const handleEbookSubmit = () => {
    if (name && email) {
      alert(`Thank you ${name}! Your free eBook will be sent to ${email}`);
      setName('');
      setEmail('');
    } else {
      alert('Please fill in both your name and email address.');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <span className="text-xl font-semibold text-gray-800">Laila Gmaihi</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Services', 'eBook', 'Testimonials', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-green-700 transition-colors font-medium"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button 
                className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Session
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-green-700 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div 
          className={`md:hidden bg-white border-t ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-4 space-y-3">
            {['Home', 'About', 'Services', 'eBook', 'Testimonials', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-700 hover:text-green-700 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="w-full bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors font-medium mt-4">
              Book a Session
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 bg-gradient-to-br from-green-50 to-yellow-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.h1 
                  className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Find Balance and Mental <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600">Clarity</span>
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Professional guidance to help you overcome obstacles and grow.
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.button 
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Your First Session
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="relative"
            >
              <div className="w-full h-96 bg-gradient-to-br from-yellow-100 via-green-100 to-orange-100 rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Heart className="w-12 h-12 text-white" fill="currentColor" />
                  </div>
                  <p className="text-gray-600 font-medium">Your Journey to Wellness</p>
                </div>
              </div>
              <motion.div
                className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-300 rounded-full"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 180, 360] 
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-orange-300 rounded-full"
                animate={{ 
                  x: [0, 20, 0],
                  scale: [1, 1.2, 1] 
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AnimatedSection>
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid lg:grid-cols-2 gap-16 items-center"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp}>
                <div className="w-full h-96 bg-gradient-to-br from-green-100 to-yellow-100 rounded-3xl flex items-center justify-center shadow-xl">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <User className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-gray-600 font-medium">Laila Gmaihi</p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="space-y-6" variants={fadeInUp}>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">Meet Laila Gmaihi</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  I am a licensed psychologist dedicated to helping individuals and groups navigate challenges, build resilience, and achieve mental clarity. My approach is compassionate, evidence-based, and tailored to your unique journey.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  With years of experience in therapeutic practice, I believe in creating a safe, non-judgmental space where healing and growth can flourish naturally.
                </p>
                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="inline-flex items-center text-green-600 font-semibold text-lg cursor-pointer">
                    Learn more about my approach →
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection>
        <section id="services" className="py-20 bg-gradient-to-br from-cream-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={fadeInUp}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">My Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive mental health support tailored to your individual needs and goals.
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: User,
                  title: "1-on-1 Therapy",
                  description: "Personalized sessions for individual growth and healing in a safe, confidential environment.",
                  color: "from-green-400 to-green-600"
                },
                {
                  icon: Users,
                  title: "Group Sessions",
                  description: "Safe spaces to share, connect, and learn together with others on similar journeys.",
                  color: "from-yellow-400 to-orange-500"
                },
                {
                  icon: BookOpen,
                  title: "Workshops & Activities",
                  description: "Practical exercises for stress management, mindfulness, and emotional well-being.",
                  color: "from-orange-400 to-red-500"
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                  <motion.button
                    className="text-green-600 font-semibold hover:text-green-700 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Learn More →
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="text-center mt-12"
              variants={fadeInUp}
            >
              <motion.button 
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore All Services
              </motion.button>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* eBook Section */}
      <AnimatedSection>
        <section id="ebook" className="py-20 bg-gradient-to-r from-yellow-100 to-yellow-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              variants={fadeInUp}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">
                  Free eBook – 10 Steps to Emotional Balance
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Download your free guide and start your journey toward a healthier mind.
                </p>
              </div>

              <motion.div
                className="bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                    />
                  </div>
                  
                  <motion.button
                    onClick={handleEbookSubmit}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-4 rounded-xl text-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get My Free eBook
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection>
        <section id="testimonials" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={fadeInUp}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">What Clients Say</h2>
              <p className="text-xl text-gray-600">Real stories from people who found their path to wellness</p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  text: "Laila helped me regain confidence and clarity. I feel more in control of my emotions.",
                  name: "Sarah, 32",
                  rating: 5
                },
                {
                  text: "The group sessions created a safe space where I could share and heal alongside others.",
                  name: "Ahmed, 28",
                  rating: 5
                },
                {
                  text: "Her compassionate approach and practical tools transformed my perspective on life.",
                  name: "Maria, 45",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl p-8 shadow-lg"
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                  <p className="text-gray-600 font-semibold">– {testimonial.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Contact/Footer */}
      <AnimatedSection>
        <footer id="contact" className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="space-y-4" variants={fadeInUp}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" fill="currentColor" />
                  </div>
                  <span className="text-xl font-semibold">Laila Gmaihi</span>
                </div>
                <p className="text-gray-300">
                  Professional psychological support for your mental wellness journey.
                </p>
              </motion.div>

              <motion.div className="space-y-4" variants={fadeInUp}>
                <h3 className="text-lg font-semibold">Quick Links</h3>
                <div className="space-y-2">
                  {['About', 'Services', 'eBook', 'Contact'].map((link) => (
                    <a 
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      className="block text-gray-300 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div className="space-y-4" variants={fadeInUp}>
                <h3 className="text-lg font-semibold">Contact Info</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300">contact@lailagmaihi.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300">+212 6XX XXX XXX</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300">Casablanca, Morocco</span>
                  </div>
                </div>
              </motion.div>

              <motion.div className="space-y-4" variants={fadeInUp}>
                <h3 className="text-lg font-semibold">Follow Me</h3>
                <div className="flex space-x-4">
                  {[Facebook, Instagram, Linkedin].map((Icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
                <motion.button 
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book a Session
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="border-t border-gray-700 pt-8 mt-12 text-center"
              variants={fadeInUp}
            >
              <p className="text-gray-300">© 2025 Laila Gmaihi – Psychologue. All rights reserved.</p>
            </motion.div>
          </div>
        </footer>
      </AnimatedSection>
    </div>
  );
};

export default Home;