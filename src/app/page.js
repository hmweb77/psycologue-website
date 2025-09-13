"use client"
import React, { useState, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Menu, X, Heart, Users, User, BookOpen, Star, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  
  // Booking form states
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    description: '',
    selectedDate: null,
    selectedTime: null
  });
  
  // Calendar states
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableTimes] = useState([
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ]);

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

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
    const today = new Date();
    const day = date.getDay();
    // Available Monday to Friday, not in the past
    return date >= today && day >= 1 && day <= 5;
  };

  const handleDateSelect = (date) => {
    if (isDateAvailable(date)) {
      setBookingForm(prev => ({
        ...prev,
        selectedDate: date,
        selectedTime: null
      }));
    }
  };

  const handleTimeSelect = (time) => {
    setBookingForm(prev => ({
      ...prev,
      selectedTime: time
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, service, description, selectedDate, selectedTime } = bookingForm;
    
    if (!name || !email || !phone || !service || !selectedDate || !selectedTime) {
      alert('Please fill in all required fields and select a date and time.');
      return;
    }

    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    alert(`Booking confirmed!\n\nName: ${name}\nService: ${service}\nDate: ${formattedDate}\nTime: ${selectedTime}\n\nYou will receive a confirmation email shortly.`);
    
    // Reset form
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      service: '',
      description: '',
      selectedDate: null,
      selectedTime: null
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
              {['Home', 'About', 'Services', 'eBook', 'Booking', 'Testimonials', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-[#a1b14e] transition-colors font-medium"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.a
                href="#booking"
                className="bg-[#a1b14e] text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Session
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-[#a1b14e] transition-colors"
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
            {['Home', 'About', 'Services', 'eBook', 'Booking', 'Testimonials', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-700 hover:text-[#a1b14e] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="#booking"
              className="block w-full bg-[#a1b14e] text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors font-medium mt-4 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Book a Session
            </a>
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
                <motion.a
                  href="#booking"
                  className="inline-block bg-gradient-to-r from-green-600 to-[#a1b14e] text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-[#a1b14e] hover:to-green-800 transition-all shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Your First Session
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="relative"
            >
              <Image className='rounded' src="/thumbnailLeila.png" alt='profile' width={1000} height={100}></Image>
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
                <Image className='rounded-3xl' src="/thumbnailLeila.png" alt='profile' width={1000} height={100}></Image>
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
                    className="text-green-600 font-semibold hover:text-[#a1b14e] transition-colors"
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
              <motion.a
                href="#booking"
                className="inline-block bg-gradient-to-r from-green-600 to-[#a1b14e] text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-[#a1b14e] hover:to-green-800 transition-all shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Session
              </motion.a>
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

      {/* Booking Section */}
      <AnimatedSection>
        <section id="booking" className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={fadeInUp}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Book Your Session</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose a convenient time for your appointment. I'm here to support your journey to mental wellness.
              </p>
            </motion.div>

            <motion.div 
              className="grid lg:grid-cols-2 gap-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Calendar Section */}
              <motion.div
                className="bg-white rounded-3xl p-8 shadow-2xl"
                variants={fadeInUp}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                      <Calendar className="w-6 h-6 mr-2 text-green-600" />
                      Select Date
                    </h3>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        onClick={() => navigateMonth(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </motion.button>
                      <span className="text-lg font-semibold text-gray-800 min-w-[140px] text-center">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </span>
                      <motion.button
                        onClick={() => navigateMonth(1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {dayNames.map(day => (
                      <div key={day} className="p-2 text-center text-sm font-semibold text-gray-500">
                        {day}
                      </div>
                    ))}
                    {getDaysInMonth(currentMonth).map((date, index) => (
                      <motion.button
                        key={index}
                        onClick={() => date && handleDateSelect(date)}
                        disabled={!date || !isDateAvailable(date)}
                        className={`
                          p-3 text-center rounded-lg transition-all text-sm font-medium
                          ${!date ? 'invisible' : ''}
                          ${!isDateAvailable(date) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-green-100 cursor-pointer'}
                          ${bookingForm.selectedDate?.toDateString() === date?.toDateString() 
                            ? 'bg-green-600 text-white shadow-lg' 
                            : 'text-gray-700'
                          }
                        `}
                        whileHover={isDateAvailable(date) ? { scale: 1.1 } : {}}
                        whileTap={isDateAvailable(date) ? { scale: 0.9 } : {}}
                      >
                        {date?.getDate()}
                      </motion.button>
                    ))}
                  </div>

                  {/* Time Selection */}
                  {bookingForm.selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-green-600" />
                        Available Times
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        {availableTimes.map(time => (
                          <motion.button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            className={`
                              p-3 rounded-lg text-sm font-medium transition-all
                              ${bookingForm.selectedTime === time 
                                ? 'bg-green-600 text-white shadow-lg' 
                                : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                              }
                            `}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Booking Form */}
              <motion.div
                className="bg-white rounded-3xl p-8 shadow-2xl"
                variants={fadeInUp}
              >
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                        placeholder="+212 6XX XXX XXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Service Type *
                      </label>
                      <select
                        required
                        value={bookingForm.service}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, service: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      >
                        <option value="">Select a service</option>
                        <option value="individual">1-on-1 Therapy Session</option>
                        <option value="group">Group Session</option>
                        <option value="workshop">Workshop & Activities</option>
                        <option value="consultation">Initial Consultation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Brief Description
                      </label>
                      <textarea
                        value={bookingForm.description}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
                        placeholder="Please briefly describe what you'd like to discuss or any specific concerns..."
                      />
                    </div>
                  </div>

                  {/* Selected Date and Time Display */}
                  {(bookingForm.selectedDate || bookingForm.selectedTime) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 rounded-xl p-4 border border-green-200"
                    >
                      <h4 className="font-semibold text-green-800 mb-2">Selected Appointment:</h4>
                      <div className="space-y-1 text-[#a1b14e]">
                        {bookingForm.selectedDate && (
                          <p className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {bookingForm.selectedDate.toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        )}
                        {bookingForm.selectedTime && (
                          <p className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {bookingForm.selectedTime}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-[#a1b14e] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-[#a1b14e] hover:to-green-800 transition-all shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!bookingForm.selectedDate || !bookingForm.selectedTime}
                  >
                    Confirm Booking
                  </motion.button>

                  <p className="text-sm text-gray-500 text-center">
                    You will receive a confirmation email with session details and payment instructions.
                  </p>
                </form>
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
                  <p className="text-gray-700 leading-relaxed mb-6 italic">&quot;{testimonial.text}&quot;</p>
                  <p className="text-gray-600 font-semibold">{testimonial.name}</p>
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
                  {['About', 'Services', 'eBook', 'Booking', 'Contact'].map((link) => (
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
                    <Mail className="w-5 h-5 text-[#febf51]" />
                    <span className="text-gray-300">contact@lailagmaihi.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-[#febf51]" />
                    <span className="text-gray-300">+212 6XX XXX XXX</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-[#febf51]" />
                    <span className="text-gray-300">Casablanca, Morocco</span>
                  </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300">+212 6XX XXX XXX</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300">Casablanca, Morocco</span>
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
                <motion.a
                  href="#booking"
                  className="block w-full bg-gradient-to-r from-[#febf51] to-[#e8a940] text-white px-6 py-3 rounded-full font-semibold hover:from-[#e8a940] hover:to-[#d49530] transition-all text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book a Session
                </motion.a>
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