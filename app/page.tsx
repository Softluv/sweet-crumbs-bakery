'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Cake,
  Cookie,
  ChefHat,
  Heart,
  Award,
  Sparkles,
  Clock,
  Truck,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Send,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Utensils,
  Building,
  Check,
  Gift
} from 'lucide-react';

// --- DATA STRUCTURES ---

interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string;
  startingPrice: string;
  timeframe: string;
  flavors: string[];
}

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function SweetCrumbsBakery() {
  // --- STATES ---
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Service detailed modal state
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // Gallery category state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  
  // Testimonial slider state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonialDirection, setTestimonialDirection] = useState(0); // -1 or 1

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false);
  
  // Stats counter animated triggers
  const [statsTriggered, setStatsTriggered] = useState(false);
  const [stats, setStats] = useState({ years: 0, customers: 0, recipes: 0 });

  // --- IMAGES ---
  const heroImage = "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&q=80&w=1920"; // Premium confectioner styling a cake
  const aboutImage = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000"; // Meticulous chef hands kneading or baking

  const services: Service[] = [
    {
      id: 'celebration',
      title: 'Custom Celebration Cakes',
      icon: <Cake className="w-8 h-8 text-brand-gold" />,
      description: 'Bespoke designer cakes customized perfectly for your birthdays, anniversaries, and milestones.',
      details: 'Our celebration cakes are tailored to reflect your exact personality and theme, with exquisite sugar-art flower pairings, custom gold-leaf calligraphy, and custom structural tiers.',
      startingPrice: 'From $180',
      timeframe: 'Requires 1 week lead time',
      flavors: ['Madagascar Vanilla & Fresh Strawberry Raspberries', 'Belgian Chocolate Fudge & Salted Caramel', 'Champagne Pear & Lavender Honey Velvet']
    },
    {
      id: 'wedding',
      title: 'Luxury Wedding Cakes',
      icon: <Gift className="w-8 h-8 text-brand-gold" />,
      description: 'Exquisite multi-tiered masterpieces hand-crafted to represent your unique love story.',
      details: 'Working directly with our head artist, you will design a stunning table centerpiece. Includes custom watercolor sketch designs, detailed sugar-paste sculpturing, and elegant floral installations.',
      startingPrice: 'From $650',
      timeframe: 'Requires 4 weeks lead time',
      flavors: ['White Chocolate Pistachio & Rosewater Cream', 'Elegance Lemon Elderflower & Berry Gelee', 'Traditional Rich Espresso & Hazelnut praline']
    },
    {
      id: 'pastries',
      title: 'Fresh French Pastries',
      icon: <Cookie className="w-8 h-8 text-brand-gold" />,
      description: 'Delicate flaky croissants, danishes, tarts, and macarons baked fresh every single morning.',
      details: 'Made utilizing imported high-fat Normandy butter, our bakery team begins rolling the puff pastry in the early hours to provide 81 distinct layers of crispy perfection.',
      startingPrice: 'From $4.50 each',
      timeframe: 'Walk-ins welcome / Catering orders require 48 hours',
      flavors: ['Classic Butter Croissant', 'Valrhona Chocolate Pain au Chocolat', 'Cardamom Pistachio Morning Bun']
    },
    {
      id: 'bread',
      title: 'Artisan Bread',
      icon: <ChefHat className="w-8 h-8 text-brand-gold" />,
      description: 'Naturally leavened sourdough, baguettes, and rustic grain loaves with perfect golden crusts.',
      details: 'Baked on heated deck ovens utilizing wild yeast cultures that are over 12 years old. This slow ferment process guarantees outstanding cell structure, digestibility, and deep flavor notes.',
      startingPrice: 'From $8.50 per loaf',
      timeframe: 'Baked fresh daily at 7:00 AM',
      flavors: ['Sourdough Country Loaf', 'Fig, Walnut & Blue Cheese Crust', 'Roasted Garlic & Rosemary Sourdough']
    },
    {
      id: 'catering',
      title: 'Dessert Catering',
      icon: <Utensils className="w-8 h-8 text-brand-gold" />,
      description: 'Gourmet dessert tables, mini-pastry platters, and sweet spreads crafted for private events.',
      details: 'Impress your guests with an interactive, gorgeous table setup featuring micro-pastries, elegant tarts, premium macarons, and luxury chocolate cups styled on premium wood and marble towers.',
      startingPrice: 'From $15 per person',
      timeframe: 'Requires 2 weeks lead time',
      flavors: ['Assorted Fine Macarons', 'Mini Dark Chocolate Ganache Tarts', 'Espresso Kahlúa Choux Buns']
    },
    {
      id: 'corporate',
      title: 'Corporate Orders',
      icon: <Building className="w-8 h-8 text-brand-gold" />,
      description: 'Elegant custom gifting tins, branded pastry boxes, and curated catering for corporate gatherings.',
      details: 'Treat your clients or teams to the Sweet Crumbs experience. Includes custom box branding, corporate logo-topped macarons, and custom delivery to multiple headquarters locations.',
      startingPrice: 'Custom quote available',
      timeframe: 'Requires 5 days lead time',
      flavors: ['Branded Vanilla Cardamom Macarons', 'Corporate Luxury Croissant Pastry Platter']
    }
  ];

  const galleryItems: GalleryItem[] = [
    {
      id: 'g1',
      title: 'Royal Raspberry Gateau',
      category: 'cakes',
      image: '/images/royal_raspberry_gateau.png',
      description: 'Elegant single-tier fresh raspberry buttercream cake, topped with seasonal orchids.'
    },
    {
      id: 'g2',
      title: 'Blossoming Romance Tier',
      category: 'wedding',
      image: '/images/blossoming_romance_tier.png',
      description: 'A structural three-tier wedding cake in smooth ivory fondant and handcrafted sugar blossoms.'
    },
    {
      id: 'g3',
      title: 'Parisian Macarons',
      category: 'pastries',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800',
      description: 'Handmade colorful macarons filled with slow-cooked fruit butter and rich chocolate ganache.'
    },
    {
      id: 'g4',
      title: 'Heritage Butter Croissant',
      category: 'pastries',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
      description: 'Golden-baked puff laminated French pastry with rich French butter fragrance.'
    },
    {
      id: 'g5',
      title: 'Rustic Country Sourdough',
      category: 'bread',
      image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800',
      description: 'Dusty flour wild-yeast sourdough baked in classic stone deck ovens.'
    },
    {
      id: 'g6',
      title: 'Decadent Gold-Leaf Mousse',
      category: 'desserts',
      image: 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&q=80&w=800',
      description: 'Dark-chocolate cups filled with airy espresso mousse, decorated with 24k gold leaf.'
    },
    {
      id: 'g7',
      title: 'Summer Berry Velvet Tart',
      category: 'desserts',
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800',
      description: 'Sweet shortcrust pastry filled with Madagascar vanilla bean pastry cream and glazed wild fruits.'
    },
    {
      id: 'g8',
      title: 'Modern Abstract Gilded Tier',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800',
      description: 'Minimalist metallic gold accents and rough-textured fondant wedding dessert tower.'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: 't1',
      name: 'Seraphina Laurent',
      location: 'Beverly Hills',
      rating: 5,
      text: 'The best bakery in town! Every single celebration cake is an absolute masterpiece. The lavender-infused frosting is delightfully floral without being overpowering. Our guests are still raving about it!',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 't2',
      name: 'Evelyn Dubois',
      location: 'Paris & Boston',
      rating: 5,
      text: 'Their pastries are absolutely amazing! The laminated layers on the chocolate croissant are remarkably crisp yet buttery and pull apart beautifully. It brings me straight back to my childhood mornings in Saint-Germain.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 't3',
      name: 'Marcus Montgomery',
      location: 'Manhattan',
      rating: 5,
      text: 'Outstanding white-glove service and truly unforgettable flavors. Sweet Crumbs designed our custom multi-tiered wedding cake. It was visually breath-taking and tasted incredibly decadent. It felt like fine-dining art!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    }
  ];

  const features: Feature[] = [
    {
      id: 'f1',
      title: 'Premium Ingredients',
      description: 'We source organic flour, organic Madagascar gourmet vanilla beans, and the highest standard Belgian chocolate.',
      icon: <Award className="w-6 h-6 text-brand-cream" />
    },
    {
      id: 'f2',
      title: 'Expert Bakers',
      description: 'Our core baking team has decades of collective experience inside French patisseries and world-class kitchens.',
      icon: <ChefHat className="w-6 h-6 text-brand-cream" />
    },
    {
      id: 'f3',
      title: 'Fresh Daily Production',
      description: 'Every morning at 4:00 AM, our bakers fire up the deck ovens to ensure your pastry crunch is genuine.',
      icon: <Clock className="w-6 h-6 text-brand-cream" />
    },
    {
      id: 'f4',
      title: 'Climate-Controlled Delivery',
      description: 'Your delicate tier cakes are transported in custom suspended-shock, climate-regulated delivery vans.',
      icon: <Truck className="w-6 h-6 text-brand-cream" />
    },
    {
      id: 'f5',
      title: 'Exquisite Bespoke Design',
      description: 'We collaborate to customize textures, sugar floristry, and geometric accents to match your wedding style perfectly.',
      icon: <Sparkles className="w-6 h-6 text-brand-cream" />
    },
    {
      id: 'f6',
      title: 'Unrivaled Customer Care',
      description: 'From exclusive cake tasting appointments to hand-sketched prototypes, your journey is beautiful and seamless.',
      icon: <Heart className="w-6 h-6 text-brand-cream" />
    }
  ];

  // --- EFFECTS ---
  
  // Simulated initial load for that ultra-premium UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  // Sticky transparent nav scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Auto-update active section based on scroll offset
      const sections = ['home', 'about', 'services', 'gallery', 'why', 'contact'];
      const scrollPos = window.scrollY + 120;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Testimonials autoplay
  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(() => {
      setTestimonialDirection(1);
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isLoading, testimonials.length]);

  // Statistics count up simulation on viewport enter
  useEffect(() => {
    if (activeSection === 'about' && !statsTriggered) {
      setTimeout(() => {
        setStatsTriggered(true);
      }, 0);
      
      let yr = 0;
      let cust = 0;
      let recp = 0;
      
      const interval = setInterval(() => {
        let changed = false;
        if (yr < 10) { yr += 1; changed = true; }
        if (cust < 5000) { cust += 250; changed = true; }
        if (recp < 120) { recp += 6; changed = true; }
        
        setStats({ years: yr, customers: cust, recipes: recp });
        
        if (!changed) {
          clearInterval(interval);
        }
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [activeSection, statsTriggered]);

  // Handle contact submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsFormSubmitted(true);
      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        message: '',
      });
    }, 1800);
  };

  // Handle newsletter newsletter submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsNewsletterSubscribed(true);
  };

  const filteredGallery = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const formatWithK = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace('.0', '')}K+`;
    }
    return `${num}+`;
  };

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of compressed sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Helper inside Gallery / lightbox to click inquire
  const inquireFromLightbox = (item: GalleryItem) => {
    setLightboxItem(null);
    setContactForm(prev => ({
      ...prev,
      eventType: item.category === 'wedding' ? 'wedding' : item.category === 'cakes' ? 'celebration' : 'Other Celebration',
      message: `Hi, I am absolutely in love with your "${item.title}" gallery piece and would love to acquire a similar custom cake/dessert for my event! Please provide availability.`
    }));
    scrollTo('contact');
  };

  return (
    <div className="relative min-h-screen text-brand-chocolate overflow-x-hidden">
      
      {/* 1. LOADING SCREEN */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            id="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-brand-chocolate-dark"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                {/* Golden rotating circles representing pastry lamination rings */}
                <span className="absolute inset-0 rounded-full border-2 border-brand-gold/30 border-t-brand-gold animate-spin" />
                <span className="absolute inset-2 rounded-full border border-brand-gold/20 border-b-brand-gold animate-spin [animation-duration:1.5s]" />
                <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-lg">
                  <img src="/images/logo.png" alt="Sweet Crumbs Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <motion.h1 
                initial={{ letterSpacing: '0.1em', opacity: 0 }}
                animate={{ letterSpacing: '0.2em', opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-serif text-3xl font-bold text-brand-cream"
              >
                SWEET CRUMBS
              </motion.h1>
              <div className="h-[1px] w-12 bg-brand-gold my-2" />
              <p className="font-sans text-xs tracking-widest text-brand-beige/60 uppercase">Luxury Pâtisserie</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. STICKY GLASSMORPHIC NAVBAR */}
      <header 
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-3 bg-brand-cream/95 backdrop-blur-md shadow-md/5 border-b border-brand-gold/10' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Brand Logo text and icon */}
          <div 
            onClick={() => scrollTo('home')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden border border-brand-gold/30 flex items-center justify-center bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img src="/images/logo.png" alt="Sweet Crumbs Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="block font-serif text-lg md:text-xl font-bold tracking-wider uppercase group-hover:text-brand-gold-dark transition-colors">
                Sweet Crumbs
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-brand-gold font-sans -mt-1 font-semibold">
                Luxury Artisan Bakery
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'Our Story' },
              { id: 'services', label: 'Services' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'why', label: 'Why Us' },
              { id: 'contact', label: 'Inquire' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm tracking-wide font-medium transition-all duration-300 relative py-1 capitalize cursor-pointer ${
                  activeSection === link.id 
                    ? 'text-brand-gold font-semibold' 
                    : 'text-brand-chocolate/80 hover:text-brand-chocolate'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-gold"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Call To Action button on Desktop */}
          <div className="hidden lg:block">
            <button 
              onClick={() => scrollTo('contact')}
              className="px-5 py-2.5 rounded-full border border-brand-gold hover:bg-brand-gold hover:text-brand-cream text-xs font-semibold uppercase tracking-wider transition-all duration-350 cursor-pointer shadow-sm hover:shadow-md"
            >
              Consult an Artist
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-brand-chocolate/10 text-brand-chocolate hover:text-brand-gold hover:bg-brand-beige/20 transition-all cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation overlay (Glassmorphic drawer) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-brand-cream/98 border-b border-brand-gold/15 backdrop-blur-lg shadow-xl overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col space-y-4">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'Our Story' },
                  { id: 'services', label: 'Services' },
                  { id: 'gallery', label: 'Gallery' },
                  { id: 'why', label: 'Why Us' },
                  { id: 'contact', label: 'Contact & Booking' }
                ].map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`text-left text-base font-medium py-2 px-3 rounded-md transition-colors cursor-pointer ${
                      activeSection === link.id 
                        ? 'bg-brand-beige/50 text-brand-gold font-bold' 
                        : 'text-brand-chocolate hover:bg-brand-beige/20'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo('contact')}
                  className="w-full mt-2 py-3 bg-brand-chocolate hover:bg-brand-chocolate-light text-brand-cream font-bold text-center rounded-xl text-sm uppercase tracking-widest transition-all cursor-pointer"
                >
                  Book Private Tasting
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. HERO SECTION */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center py-20 bg-brand-cream overflow-hidden"
      >
        {/* Background photo with darker amber glass overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Artisanal Bakery Setting" 
            className="w-full h-full object-cover brightness-[0.45] saturate-75"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gold elegant gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-cream via-brand-chocolate-dark/50 to-brand-chocolate-dark/80" />
        </div>

        {/* Floating elements inside hero */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <motion.div 
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[20%] left-[8%] hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-brand-cream/10 backdrop-blur-md border border-brand-cream/20 shadow-xl"
          >
            <Sparkles className="w-6 h-6 text-brand-gold/80" />
          </motion.div>
          <motion.div 
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -8, 0]
            }}
            transition={{ duration: 7, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[25%] right-[10%] hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-brand-cream/10 backdrop-blur-md border border-brand-cream/20 shadow-xl"
          >
            <Cookie className="w-7 h-7 text-brand-gold/70" />
          </motion.div>
          <motion.div 
            animate={{ 
              y: [0, -12, 0] 
            }}
            transition={{ duration: 5, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[35%] right-[15%] hidden lg:block w-3 h-3 rounded-full bg-brand-gold/40 blur-[1px]"
          />
          <motion.div 
            animate={{ 
              y: [0, 18, 0] 
            }}
            transition={{ duration: 8, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[35%] left-[16%] hidden lg:block w-4 h-4 rounded-full bg-brand-beige/30"
          />
        </div>

        {/* Content Box */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-brand-cream flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Elegant luxury brand tag */}
            <div className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-cream/10 backdrop-blur-md border border-brand-cream/10 text-brand-gold mb-6 md:mb-8 text-xs font-semibold tracking-widest uppercase">
              <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
              <span>Sweet Crumbs Luxury Pâtisserie</span>
              <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
            </div>

            {/* Display Headings with Playfair Display */}
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-cream max-w-4xl leading-[1.1] mb-6 drop-shadow-lg">
              Freshly Baked <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-beige to-brand-gold">Happier Moments</span> Delivered Daily
            </h1>

            {/* Body */}
            <p className="font-sans text-base md:text-xl text-brand-cream/80 max-w-2xl font-light tracking-wide leading-relaxed mb-10 drop-shadow-md">
              Handcrafted bespoke cakes, delicate French pastries, and wild rustic sourdough breads made with love and the world&apos;s finest organic ingredients.
            </p>

            {/* Double action layout buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <button 
                onClick={() => scrollTo('contact')}
                className="group relative px-8 py-4 bg-brand-gold hover:bg-brand-gold-dark text-brand-chocolate-dark font-bold text-sm tracking-widest uppercase rounded-full transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg hover:shadow-brand-gold/25"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={() => scrollTo('gallery')}
                className="px-8 py-4 border border-brand-cream/40 hover:border-brand-gold hover:bg-brand-cream/10 text-brand-cream font-bold text-sm tracking-widest uppercase rounded-full transition-all duration-300 cursor-pointer"
              >
                View Our Creations
              </button>
            </div>
          </motion.div>

          {/* Smooth scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
            onClick={() => scrollTo('about')}
          >
            <span className="font-sans text-[10px] tracking-widest uppercase text-brand-cream/50 mb-2">Scroll To Discover</span>
            <div className="w-5 h-9 rounded-full border-2 border-brand-cream/30 flex justify-center p-1">
              <motion.div 
                animate={{ 
                  y: [0, 10, 0],
                  opacity: [1, 0.4, 1]
                }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-1 h-2 rounded-full bg-brand-gold"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section 
        id="about" 
        className="py-16 md:py-24 bg-brand-cream transition-colors"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Visual Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative pl-4"
            >
              {/* Back luxury decorative frame */}
              <div className="absolute -inset-1 border border-brand-gold/30 rounded-2xl -translate-x-4 translate-y-4 -z-10" />
              <img 
                src={aboutImage} 
                alt="Luxury Baker crafting fresh sourdough bread at bakery counter" 
                className="w-full h-[320px] md:h-[480px] object-cover rounded-2xl shadow-xl border border-brand-gold/10"
                referrerPolicy="no-referrer"
              />
              {/* Overlapping small badge for 10 years experience */}
              <div className="absolute bottom-6 left-10 glass-panel py-3.5 px-6 rounded-xl border border-brand-gold/20 flex items-center space-x-3 shadow-lg">
                <ChefHat className="w-8 h-8 text-brand-gold" />
                <div>
                  <span className="font-serif text-lg font-bold block text-brand-chocolate">10+ Years</span>
                  <span className="text-[10px] uppercase font-sans tracking-widest text-brand-chocolate-light block">Of Craftsmanship</span>
                </div>
              </div>
            </motion.div>

            {/* Story Paragraph Column */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col"
            >
              <span className="text-xs uppercase font-sans tracking-widest text-brand-gold font-bold mb-3">Our Heritage</span>
              <h2 className="font-serif text-3.5xl md:text-5xl font-bold tracking-tight text-brand-chocolate mb-6 leading-[1.1]">
                Where Passion Meets <span className="italic text-brand-gold-dark">Artistry</span> in Every Single Crumb
              </h2>
              <p className="font-sans text-brand-chocolate-light leading-relaxed mb-6 font-light">
                Sweet Crumbs Bakery was born from a simple yet powerful dream: to resurrect the slow, classical tradition of master confectionery and leavened baking. We believe that cakes and pastries should represent more than just sweetness. They represent milestones, deep connection, and artistic passion.
              </p>
              <p className="font-sans text-brand-chocolate-light leading-relaxed mb-8 font-light">
                Every single tier cake we sculpt, every butter croissant we hand-laminate, and every artisan sourdough loaf that is hand-shaped inside our kitchens is treated as an individual piece of culinary sculpture. We source our organic vanilla from micro-farms in Madagascar, our premium structural chocolate from the legendary houses of Belgium, and we combine them using age-old ancestral techniques.
              </p>

              {/* Statistics Card Layout */}
              <div className="grid grid-cols-3 gap-4 border-t border-brand-gold/15 pt-8">
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-brand-gold select-none">
                    {statsTriggered ? stats.years : 10}+
                  </h3>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-brand-chocolate/70 font-sans block mt-1 font-medium">Years Active</span>
                </div>
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-brand-gold select-none">
                    {statsTriggered ? formatWithK(stats.customers) : '5K+'}
                  </h3>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-brand-chocolate/70 font-sans block mt-1 font-medium">Happy Guests</span>
                </div>
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-brand-gold select-none">
                    {statsTriggered ? stats.recipes : 100}+
                  </h3>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-brand-chocolate/70 font-sans block mt-1 font-medium">Unique Recipes</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section 
        id="services" 
        className="py-16 md:py-24 bg-brand-cream border-t border-brand-beige/50"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-sans tracking-widest text-brand-gold font-bold mb-3 block">What We Offer</span>
            <h2 className="font-serif text-3.5xl md:text-5xl font-bold text-brand-chocolate tracking-tight mb-4 leading-tight">
              Our Signature Services
            </h2>
            <div className="h-[2px] w-16 bg-brand-gold mx-auto mb-4" />
            <p className="font-sans text-sm md:text-base text-brand-chocolate-light font-light leading-relaxed">
              We cover every sweet aspect of life. Explore our range of tailored bakery services, custom-designed to bring unmatched luxury flavors to your table.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between bg-white rounded-2xl border border-brand-gold/10 p-8 shadow-sm hover:shadow-xl transition-all duration-350 hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-beige/20 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-300" />
                
                <div>
                  <div className="w-14 h-14 rounded-xl bg-brand-cream flex items-center justify-center mb-6 border border-brand-gold/15 group-hover:bg-brand-gold group-hover:text-brand-cream text-brand-gold transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brand-chocolate mb-3 group-hover:text-brand-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm text-brand-chocolate-light leading-relaxed font-light mb-6">
                    {service.description}
                  </p>
                </div>

                <div>
                  <button 
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center space-x-1.5 text-xs uppercase font-sans tracking-widest text-brand-gold font-bold hover:text-brand-chocolate transition-colors cursor-pointer group/btn"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE DETAIL MODAL (Learn More trigger) */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-chocolate-dark/60 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-brand-cream rounded-2xl border border-brand-gold/20 p-8 md:p-10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-brand-chocolate/10 text-brand-chocolate hover:text-brand-gold hover:bg-brand-beige/30 transition-all cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-brand-gold/15">
                  {selectedService.icon}
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-chocolate">
                  {selectedService.title}
                </h3>
              </div>

              <div className="space-y-4 mb-8">
                <p className="font-sans text-sm text-brand-chocolate/90 leading-relaxed font-light bg-white p-4 rounded-xl border border-brand-gold/5 shadow-inner">
                  {selectedService.details}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-brand-beige/30 border border-brand-gold/10 rounded-lg">
                    <span className="block text-[9px] uppercase font-sans tracking-widest text-brand-chocolate-light">Starting Base Price</span>
                    <span className="font-serif text-base font-bold text-brand-chocolate">{selectedService.startingPrice}</span>
                  </div>
                  <div className="p-3 bg-brand-beige/30 border border-brand-gold/10 rounded-lg">
                    <span className="block text-[9px] uppercase font-sans tracking-widest text-brand-chocolate-light">Lead Time</span>
                    <span className="font-sans text-xs font-semibold text-brand-chocolate">{selectedService.timeframe}</span>
                  </div>
                </div>

                <div>
                  <span className="block text-[10px] uppercase font-sans tracking-widest text-brand-chocolate-light mb-2 font-bold">Recommended Signature Flavors</span>
                  <ul className="space-y-1.5">
                    {selectedService.flavors.map((flavor, i) => (
                      <li key={i} className="flex items-center space-x-2 text-xs text-brand-chocolate">
                        <Check className="w-4 h-4 text-brand-gold shrink-0" />
                        <span className="font-sans font-light">{flavor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    setSelectedService(null);
                    setContactForm(prev => ({
                      ...prev,
                      eventType: selectedService.id === 'wedding' ? 'wedding' : selectedService.id === 'celebration' ? 'celebration' : 'Other Celebration',
                      message: `Hi, I am interested in private catering or custom cake creations for your standard "${selectedService.title}" service! Please contact me.`
                    }));
                    scrollTo('contact');
                  }}
                  className="flex-1 py-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-chocolate-dark font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md text-center cursor-pointer"
                >
                  Book Consultation
                </button>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-3 border border-brand-gold text-brand-chocolate hover:bg-brand-beige/20 font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. PORTFOLIO / GALLERY SECTION */}
      <section 
        id="gallery" 
        className="py-16 md:py-24 bg-brand-cream border-t border-brand-beige/50"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase font-sans tracking-widest text-brand-gold font-bold mb-3 block">Bespoke Portfolio</span>
              <h2 className="font-serif text-3.5xl md:text-5xl font-bold tracking-tight text-brand-chocolate mb-2 md:mb-0">
                Gallery of Sweet Masterpieces
              </h2>
            </div>
            
            {/* Category selection */}
            <div className="flex flex-wrap gap-2 md:self-end">
              {[
                { id: 'all', label: 'All' },
                { id: 'cakes', label: 'Cakes' },
                { id: 'pastries', label: 'Pastries' },
                { id: 'bread', label: 'Breads' },
                { id: 'desserts', label: 'Desserts' },
                { id: 'wedding', label: 'Wedding Cakes' }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer border ${
                    selectedCategory === category.id 
                      ? 'bg-brand-chocolate text-brand-cream border-brand-chocolate shadow-sm' 
                      : 'bg-white text-brand-chocolate/80 hover:bg-brand-beige/40 border-brand-gold/20'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry-Style Grid with Hover Overlay and Smooth Rearranging */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setLightboxItem(item)}
                  className="group relative h-72 md:h-80 rounded-2xl overflow-hidden border border-brand-gold/15 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 saturate-100"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle dark warm cover on hover detailing title */}
                  <div className="absolute inset-0 bg-brand-chocolate-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />
                  
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 p-5 z-10">
                    <span className="inline-block text-[9px] uppercase font-sans tracking-widest text-brand-cream/80 bg-brand-gold/80 px-2 py-0.5 rounded-sm mb-1.5">
                      {item.category === 'wedding' ? 'wedding cake' : item.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-brand-cream tracking-wide">{item.title}</h3>
                    <p className="font-sans text-xs text-brand-cream/80 font-light truncate mt-0.5">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* PORTFOLIO LIGHTBOX */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-chocolate-dark/85 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-4xl bg-brand-cream rounded-2xl overflow-hidden border border-brand-gold/25 shadow-2xl grid md:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button Inside Lightbox */}
              <button 
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-brand-chocolate-dark/80 text-brand-cream hover:text-brand-gold transition-colors cursor-pointer border border-brand-cream/10"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-[320px] md:h-[480px]">
                <img 
                  src={lightboxItem.image} 
                  alt={lightboxItem.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Information Panel */}
              <div className="p-8 flex flex-col justify-between bg-brand-cream">
                <div>
                  <span className="text-xs uppercase font-sans tracking-widest text-brand-gold font-bold block mb-2">
                    {lightboxItem.category.toUpperCase()} SELECTION
                  </span>
                  <h3 className="font-serif text-3xl font-extrabold text-brand-chocolate tracking-tight mb-4">
                    {lightboxItem.title}
                  </h3>
                  <div className="h-[1px] w-12 bg-brand-gold mb-6" />
                  <p className="font-sans text-sm md:text-base text-brand-chocolate-light leading-relaxed font-light mb-6">
                    {lightboxItem.description}
                  </p>
                  
                  <div className="p-4 bg-white/70 border border-brand-gold/10 rounded-xl space-y-2">
                    <span className="text-[10px] uppercase font-sans tracking-widest text-brand-chocolate-light block font-semibold">Special Order Information</span>
                    <p className="font-sans text-xs text-brand-chocolate/90 leading-relaxed font-light">
                      This design is fully scalable into multi-tiered cakes, individual party sizes, and customized branding tins. Flavors and outer detailing colors are adjustable.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => inquireFromLightbox(lightboxItem)}
                    className="flex-1 py-3 bg-brand-chocolate hover:bg-brand-chocolate-light text-brand-cream font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md text-center cursor-pointer"
                  >
                    Inquire About This Design
                  </button>
                  <button 
                    onClick={() => setLightboxItem(null)}
                    className="px-6 py-3 border border-brand-chocolate text-brand-chocolate hover:bg-brand-beige/25 font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. TESTIMONIALS SECTION */}
      <section 
        id="testimonials" 
        className="py-16 md:py-24 bg-brand-chocolate text-brand-cream relative overflow-hidden"
      >
        {/* Subtle decorative gold line rings */}
        <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full border border-brand-gold/10 translate-x-20 translate-y-20 pointer-events-none" />
        <div className="absolute left-0 top-0 w-80 h-80 rounded-full border border-brand-gold/10 -translate-x-20 -translate-y-20 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-sans tracking-widest text-brand-gold font-bold mb-3 block">Guest Experiences</span>
            <h2 className="font-serif text-3.5xl md:text-5xl font-bold tracking-tight mb-2">
              Kind Words From Patrons
            </h2>
            <div className="h-[2px] w-12 bg-brand-gold mx-auto mt-3" />
          </div>

          {/* Testimonial slider */}
          <div className="relative min-h-[280px] md:min-h-[220px] mb-8 flex items-center justify-center">
            <AnimatePresence mode="wait" custom={testimonialDirection}>
              <motion.div
                key={currentTestimonial}
                custom={testimonialDirection}
                initial={{ opacity: 0, x: testimonialDirection * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -testimonialDirection * 50 }}
                transition={{ duration: 0.45 }}
                className="text-center flex flex-col items-center"
              >
                {/* 5 stars */}
                <div className="flex space-x-1 mb-6">
                  {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-brand-gold fill-brand-gold" />
                  ))}
                </div>

                <blockquote className="font-serif text-lg md:text-2xl font-light italic leading-relaxed text-brand-cream/95 max-w-3xl mb-8">
                  &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                </blockquote>

                <div className="flex items-center space-x-3 text-left">
                  <img 
                    src={testimonials[currentTestimonial].avatar} 
                    alt={testimonials[currentTestimonial].name} 
                    className="w-12 h-12 rounded-full object-cover border border-brand-gold/30 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <cite className="not-italic font-serif text-base font-bold text-brand-cream block">
                      {testimonials[currentTestimonial].name}
                    </cite>
                    <span className="text-xs font-sans tracking-wider text-brand-gold block uppercase font-light">
                      {testimonials[currentTestimonial].location}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider controls */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => {
                setTestimonialDirection(-1);
                setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
              }}
              className="p-3 border border-brand-gold/25 hover:border-brand-gold rounded-full bg-brand-chocolate-dark hover:bg-brand-chocolate-light transition-colors cursor-pointer text-brand-cream"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Slider Dots indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setTestimonialDirection(index > currentTestimonial ? 1 : -1);
                    setCurrentTestimonial(index);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    currentTestimonial === index ? 'bg-brand-gold w-6' : 'bg-brand-cream/30 hover:bg-brand-cream/60'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setTestimonialDirection(1);
                setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
              }}
              className="p-3 border border-brand-gold/25 hover:border-brand-gold rounded-full bg-brand-chocolate-dark hover:bg-brand-chocolate-light transition-colors cursor-pointer text-brand-cream"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* 8. WHY CHOOSE US SECTION */}
      <section 
        id="why" 
        className="py-16 md:py-24 bg-brand-cream"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-sans tracking-widest text-brand-gold font-bold mb-3 block">Pure Excellence</span>
            <h2 className="font-serif text-3.5xl md:text-5xl font-bold tracking-tight text-brand-chocolate mb-4 leading-tight">
              Why Sweet Crumbs Stands Alone
            </h2>
            <div className="h-[2px] w-12 bg-brand-gold mx-auto" />
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 bg-white border border-brand-gold/10 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-brand-chocolate group-hover:bg-brand-gold transition-colors rounded-xl flex items-center justify-center mb-6 shadow-md shadow-brand-chocolate/5">
                  {feature.icon}
                </div>
                
                <h3 className="font-serif text-xl font-bold text-brand-chocolate mb-3">
                  {feature.title}
                </h3>
                
                <p className="font-sans text-sm text-brand-chocolate-light leading-relaxed font-light">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. CONTACT & BOOKING SECTION */}
      <section 
        id="contact" 
        className="py-16 md:py-24 bg-brand-cream border-t border-brand-beige/50 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Split layout */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Business details & custom map */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs uppercase font-sans tracking-widest text-brand-gold font-bold mb-3 block">Consultations & Private Tastings</span>
                <h2 className="font-serif text-3.5xl md:text-5xl font-bold tracking-tight text-brand-chocolate leading-tight">
                  Design Your Next Celebration Cake
                </h2>
                <div className="h-[2px] w-12 bg-brand-gold mt-4 mb-6" />
                <p className="font-sans text-sm md:text-base text-brand-chocolate-light leading-relaxed font-light">
                  Have a custom idea or looking to design the focal centerpiece of your dream wedding? Fill out our inquiry form. We host private, boutique dessert tastings and watercolor consultations by appointment.
                </p>
              </div>

              {/* Direct Details list */}
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-brand-beige/50 border border-brand-gold/25 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brand-chocolate" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-sans tracking-widest text-brand-chocolate-light">Atelier Address</span>
                    <address className="not-italic font-sans text-sm font-semibold text-brand-chocolate">
                      Ifite Awka, Anambra State
                    </address>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-brand-beige/50 border border-brand-gold/25 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-chocolate" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-sans tracking-widest text-brand-chocolate-light">Direct Line</span>
                    <a href="tel:09137299309" className="block font-sans text-sm font-semibold text-brand-chocolate hover:text-brand-gold transition-colors">
                      09137299309
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-brand-beige/50 border border-brand-gold/25 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-chocolate" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-sans tracking-widest text-brand-chocolate-light">Inquiries Email</span>
                    <a href="mailto:hello@sweetcrumbsbakery.com" className="block font-sans text-sm font-semibold text-brand-chocolate hover:text-brand-gold transition-colors">
                      hello@sweetcrumbsbakery.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-brand-beige/50 border border-brand-gold/25 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-brand-chocolate" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-sans tracking-widest text-brand-chocolate-light">Opening Hours</span>
                    <span className="block font-sans text-xs text-brand-chocolate">
                      Weekdays: 7:00 AM - 7:00 PM
                    </span>
                    <span className="block font-sans text-xs text-brand-chocolate">
                      Weekends: 8:00 AM - 5:00 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Hand-Crafted Premium Luxury Map Illustration Placeholder */}
              <div className="rounded-2xl border border-brand-gold/15 bg-white shadow-inner p-4 relative overflow-hidden h-52 flex flex-col justify-between">
                {/* Stylized geometric background representing map street grids */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4A373 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                <div className="absolute top-[30%] left-[20%] w-[1.5px] h-[75%] bg-brand-gold/20 -rotate-12 pointer-events-none" />
                <div className="absolute top-[40%] right-[30%] w-[1.5px] h-[80%] bg-brand-gold/20 rotate-45 pointer-events-none" />
                <div className="absolute top-[45%] left-0 w-full h-[1.5px] bg-brand-gold/20 -rotate-6 pointer-events-none" />
                
                {/* Floating gold destination ring */}
                <div className="absolute top-[42%] left-[45%] p-1.5 rounded-full bg-brand-chocolate/10 border border-brand-gold z-10 flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-brand-gold"
                  />
                  <MapPin className="w-4 h-4 text-brand-chocolate relative z-10 fill-brand-gold" />
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <span className="text-[9px] uppercase font-sans tracking-widest bg-brand-gold/80 px-2 py-1 rounded inline-block text-brand-cream/95 self-start shadow-sm font-semibold">
                    Sweet Crumbs Atelier Map
                  </span>
                  <div>
                    <span className="block font-serif font-bold text-brand-chocolate text-sm">Awka, Tempsite</span>
                    <span className="block font-sans text-[11px] text-brand-chocolate-light font-light">Complimentary delivery and consultation parking available.</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Contact form with lovely states */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-brand-gold/10 p-8 md:p-12 shadow-xl relative overflow-hidden">
              
              {/* Success Notification */}
              {isFormSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-beige border border-brand-gold/20 flex items-center justify-center mb-6">
                    <Check className="w-8 h-8 text-brand-gold" />
                  </div>
                  
                  <h3 className="font-serif text-3xl font-bold text-brand-chocolate mb-3">
                    Thank You for Your Inquiry
                  </h3>
                  
                  <p className="font-sans text-sm md:text-base text-brand-chocolate-light leading-relaxed max-w-md font-light mb-8">
                    We have successfully received your request! Our lead sugar artist or events coordinator will review and contact you with custom flavor sketches within 24 hours.
                  </p>

                  <button 
                    onClick={() => setIsFormSubmitted(false)}
                    className="px-6 py-2.5 bg-brand-chocolate hover:bg-brand-chocolate-light text-brand-cream font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name-input" className="block text-[10px] uppercase font-sans tracking-widest text-brand-chocolate-light mb-2 font-bold focus:text-brand-gold">
                        Your Full Name
                      </label>
                      <input 
                        id="name-input"
                        type="text" 
                        required
                        placeholder="John Miller"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 border border-brand-gold/20 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-gold bg-brand-cream/20 font-light"
                      />
                    </div>

                    <div>
                      <label htmlFor="email-input" className="block text-[10px] uppercase font-sans tracking-widest text-brand-chocolate-light mb-2 font-bold">
                        Email Address
                      </label>
                      <input 
                        id="email-input"
                        type="email" 
                        required
                        placeholder="john@example.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 border border-brand-gold/20 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-gold bg-brand-cream/20 font-light"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone-input" className="block text-[10px] uppercase font-sans tracking-widest text-brand-chocolate-light mb-2 font-bold">
                        Phone Number
                      </label>
                      <input 
                        id="phone-input"
                        type="tel" 
                        placeholder="+1 (555) 234-5678"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-brand-gold/20 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-gold bg-brand-cream/20 font-light"
                      />
                    </div>

                    <div>
                      <label htmlFor="event-type-select" className="block text-[10px] uppercase font-sans tracking-widest text-brand-chocolate-light mb-2 font-bold">
                        Event Type
                      </label>
                      <select 
                        id="event-type-select"
                        required
                        value={contactForm.eventType}
                        onChange={(e) => setContactForm({ ...contactForm, eventType: e.target.value })}
                        className="w-full px-4 py-3 border border-brand-gold/20 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-gold bg-brand-cream/20 font-light"
                      >
                        <option value="">Select event occasion</option>
                        <option value="wedding">Wedding Tier Cake</option>
                        <option value="celebration">Birthday Celebration</option>
                        <option value="anniversary">Anniversary Cake</option>
                        <option value="catering">Gourmet Catering Platter</option>
                        <option value="corporate">Corporate Giftings</option>
                        <option value="sourdough">Sourdough bulk pre-order</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message-textarea" className="block text-[10px] uppercase font-sans tracking-widest text-brand-chocolate-light mb-2 font-bold">
                      Your Event / Design Dream
                    </label>
                    <textarea 
                      id="message-textarea"
                      rows={4}
                      required
                      placeholder="Please tell us about your flavor preferences, aesthetic decorations, guests headcount, or scheduled delivery date..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 border border-brand-gold/20 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-gold bg-brand-cream/20 font-light resize-none"
                    />
                  </div>

                  <button 
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-brand-chocolate hover:bg-brand-chocolate-light text-brand-cream font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="block w-5 h-5 rounded-full border border-brand-gold border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <span>Submit Private Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* 10. PREMIUM COLLABORATIVE FOOTER */}
      <footer 
        id="footer" 
        className="bg-brand-chocolate-dark text-brand-cream border-t border-brand-gold/15 py-12 md:py-16"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 mb-12">
            
            {/* Atelier details */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-gold/30 flex items-center justify-center bg-white">
                  <img src="/images/logo.png" alt="Sweet Crumbs Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <span className="font-serif text-lg font-bold tracking-wider uppercase">
                  Sweet Crumbs
                </span>
              </div>
              <p className="font-sans text-xs md:text-sm text-brand-cream/70 leading-relaxed font-light">
                Handcrafted bespoke celebration and wedding cakes, seasonal fresh-rolled French pastries, and double-fermented sourdough deck-oven breads baked with passion and classic heritage.
              </p>
              
              <div className="flex items-center space-x-3.5 pt-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-brand-cream/10 hover:border-brand-gold rounded-full bg-white/[0.03] text-brand-cream/80 hover:text-brand-gold transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-brand-cream/10 hover:border-brand-gold rounded-full bg-white/[0.03] text-brand-cream/80 hover:text-brand-gold transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-brand-cream/10 hover:border-brand-gold rounded-full bg-white/[0.03] text-brand-cream/80 hover:text-brand-gold transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick links to sections */}
            <div className="lg:col-span-2 space-y-4">
              <span className="text-[10px] uppercase font-sans tracking-widest text-brand-gold font-bold block">
                Quick Navigation
              </span>
              <ul className="space-y-2">
                {[
                  { id: 'home', label: 'Home Page' },
                  { id: 'about', label: 'Our Story' },
                  { id: 'services', label: 'Chef Services' },
                  { id: 'gallery', label: 'Creations Gallery' },
                  { id: 'why', label: 'Why Select Us' },
                  { id: 'contact', label: 'Private Inquiry' }
                ].map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => scrollTo(item.id)}
                      className="text-xs text-brand-cream/65 hover:text-brand-gold transition-colors font-light cursor-pointer text-left block"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category quick links */}
            <div className="lg:col-span-2 space-y-4">
              <span className="text-[10px] uppercase font-sans tracking-widest text-brand-gold font-bold block">
                Signature Menu
              </span>
              <ul className="space-y-2">
                {[
                  { id: 'cakes', label: 'Custom Cakes' },
                  { id: 'wedding', label: 'Wedding Cakes' },
                  { id: 'pastries', label: 'French Pastries' },
                  { id: 'bread', label: 'Artisan Breads' },
                  { id: 'desserts', label: 'Gold Moss Desserts' },
                  { id: 'catering', label: 'Catering Trays' }
                ].map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => {
                        setSelectedCategory(item.id === 'catering' ? 'desserts' : item.id);
                        scrollTo('gallery');
                      }}
                      className="text-xs text-brand-cream/65 hover:text-brand-gold transition-colors font-light cursor-pointer text-left block"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Subscription input */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] uppercase font-sans tracking-widest text-brand-gold font-bold block">
                Subscribe to Sweet Notes
              </span>
              <p className="font-sans text-xs text-brand-cream/65 font-light leading-relaxed">
                Receive secret weekend recipes, premium early booking alerts, and priority event tasting invitations.
              </p>
              
              {isNewsletterSubscribed ? (
                <div className="p-3 border border-brand-gold/30 bg-white/5 rounded-xl text-xs text-brand-gold font-sans font-light">
                  Successfully subscribed! Welcome inside our secret kitchen.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input 
                    id="newsletter-email-input"
                    type="email" 
                    required
                    placeholder="Enter email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-lg font-sans text-xs border border-brand-cream/15 focus:border-brand-gold focus:outline-none bg-white/5 text-brand-cream font-light"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-chocolate-dark font-bold text-xs uppercase tracking-widest rounded-lg transition-all cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

          </div>

          <div className="h-[1px] w-full bg-brand-cream/10 my-8" />

          {/* Core Footer legal and credit links */}
          <div className="flex flex-col md:flex-row items-center justify-between text-[11px] text-brand-cream/45 space-y-4 md:space-y-0">
            <span>
              &copy; 2026 Sweet Crumbs Bakery. Crafted for extraordinary moments. All rights reserved.
            </span>
            <div className="flex space-x-6">
              <a href="#privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-brand-gold transition-colors">Ordering & Terms</a>
              <a href="#faq" className="hover:text-brand-gold transition-colors">Patron FAQ</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
