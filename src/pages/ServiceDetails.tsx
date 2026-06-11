import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useRoute } from "wouter";
import { Layout } from "../components/Layout";
import { QuoteModal } from "../components/QuoteModal";
import { BookCarousel } from "../components/BookCarousel";
import { SERVICES, ServiceItem } from "../data/servicesData";
import { motion } from "motion/react";
import { 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  Award, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2 
} from "lucide-react";

// Portfolio Gallery Slider with Fullscreen Lightbox Integration
interface GallerySliderProps {
  images: string[];
  serviceTitle: string;
}

const GallerySlider: React.FC<GallerySliderProps> = ({ images, serviceTitle }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Autoplay effect
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [images.length, handleNext]);

  if (images.length === 0) return null;

  return (
    <>
      <section className="py-20 bg-white border-t border-b border-gray-100" id="service-gallery-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-gold font-bold uppercase tracking-widest text-sm">Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-navy mt-2">Books We've Created</h2>
            <p className="text-gray-500 text-sm md:text-base mt-2 max-w-lg mx-auto">
              A glimpse of projects delivered through our {serviceTitle} service.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Main view frame */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl bg-navy border border-gray-150">
              {images.map((imgSrc, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    idx === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <img
                    src={imgSrc}
                    alt={`${serviceTitle} project cover ${idx + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:scale-[1.01] transition-transform duration-300"
                    onClick={() => setLightboxIndex(idx)}
                    loading="lazy"
                  />
                  {/* Zoom Badge overlay */}
                  <div 
                    className="absolute bottom-4 right-4 bg-navy/80 hover:bg-navy backdrop-blur-md rounded-full p-2.5 text-gold border border-gold/30 cursor-pointer shadow-lg transition-colors z-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(idx);
                    }}
                  >
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              ))}

              {/* Prev/Next buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-navy hover:text-gold rounded-full flex items-center justify-center shadow-lg transition-colors z-20 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-navy hover:text-gold rounded-full flex items-center justify-center shadow-lg transition-colors z-20 cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Slider Dots */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-25">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx === activeIndex ? "bg-gold w-6" : "bg-white/60 hover:bg-white"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex gap-2.5 mt-5 justify-center overflow-x-auto py-1 scrollbar-hide">
                {images.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      idx === activeIndex ? "border-gold scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={imgSrc} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close trigger */}
          <button
            className="absolute top-6 right-6 text-white/75 hover:text-white transition-colors cursor-pointer"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close fullscreen"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length);
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 text-white rounded-full flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev! + 1) % images.length);
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 text-white rounded-full flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Big Image box */}
          <div className="max-w-4xl max-h-[85vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIndex]}
              alt={`Zoom view ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
            />
          </div>
        </div>
      )}
    </>
  );
};

export const ServiceDetails: React.FC = () => {
  const [match, params] = useRoute("/services/:slug");
  const [modalOpen, setModalOpen] = useState(false);

  // Parse target service from catalog
  const service = useMemo(() => {
    if (!match || !params) return null;
    const { slug } = params as { slug: string };
    return SERVICES.find((s) => s.slug === slug) || null;
  }, [match, params]);

  // Derived related services
  const relatedServicesList = useMemo(() => {
    if (!service || !service.relatedServices) return [];
    return service.relatedServices
      .map((slug) => SERVICES.find((s) => s.slug === slug))
      .filter((s): s is ServiceItem => !!s);
  }, [service]);

  if (!service) {
    return (
      <Layout title="Service Not Found">
        <section className="py-24 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-black text-navy mb-4">Service Not Found</h2>
            <p className="text-gray-500 mb-8">We could not locate the publishing service you requested.</p>
            <Link href="/services" className="bg-navy text-white font-bold px-6 py-2.5 rounded-lg hover:bg-gold hover:text-navy transition-colors">
              Browse All Services
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${service.title} - American Book Founders`}
      description={`${service.title} — ${service.tagline} Professional ${service.category.toLowerCase()} services at American Book Founders.`}
    >
      <QuoteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Get Started with ${service.title}`}
        subtitle={`Fill in your details and our ${service.title} experts will contact you within 24 hours.`}
        source={`service-${service.slug}`}
      />

      {/* Hero Header Section */}
      <section className="relative bg-navy text-white py-20 overflow-hidden" id="service-hero">
        <div className="absolute inset-0">
          <img
            src={service.img}
            alt={service.title}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold font-bold uppercase tracking-widest text-sm"
          >
            {service.category}
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif font-bold mt-3 max-w-3xl leading-tight"
          >
            {service.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gold italic mt-3"
          >
            {service.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 mt-4 max-w-2xl leading-relaxed"
          >
            {service.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-md hover:bg-yellow-400 transition-colors cursor-pointer"
            >
              Get Started Today <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+18005550199"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded-md hover:bg-white/10 transition-colors"
            >
              Call +1 (800) 555-0199
            </a>
          </motion.div>
        </div>
      </section>

      {/* Benefits Content Overview */}
      <section className="py-20 bg-cream" id="service-key-benefits">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-gold font-bold uppercase tracking-widest text-sm">What You Get</span>
              <h2 className="text-3xl font-serif font-bold text-navy mt-2 mb-8">Key Benefits</h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-base leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src={service.img}
                alt={`${service.title} — professional book service`}
                loading="lazy"
                decoding="async"
                className="rounded-2xl shadow-2xl w-full object-cover h-80"
              />
              <div className="absolute -bottom-4 -right-4 bg-navy text-white rounded-xl px-6 py-4 shadow-xl border border-white/10">
                <p className="text-2xl font-serif font-bold text-gold">3,400+</p>
                <p className="text-xs font-semibold">Satisfied Authors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Gallery Slider portfolio */}
      <GallerySlider images={service.gallery} serviceTitle={service.title} />

      {/* Why Choose Us / Trust Cards */}
      {service.whyChoose && service.whyChoose.length > 0 && (
        <section className="py-20 bg-white" id="service-why-choose">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <span className="text-gold font-bold uppercase tracking-widest text-sm">Why Choose Us</span>
              <h2 className="text-3xl font-serif font-bold text-navy mt-2">Why Authors Trust Us</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.whyChoose.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-cream rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5 text-navy" />
                  </div>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed font-semibold">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Step by Step Process */}
      <section className="py-20 bg-cream" id="service-works-process">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <span className="text-gold font-bold uppercase tracking-widest text-sm">How It Works</span>
            <h2 className="text-3xl font-serif font-bold text-navy mt-2">Our Step-by-Step Process</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {service.process.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center hover:translate-y-[-4px] transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gold text-navy font-bold text-xl flex items-center justify-center mx-auto mb-4 border border-navy/5 shadow-md">
                  {idx + 1}
                </div>
                <h3 className="font-serif font-bold text-navy text-base mb-2">{p.step}</h3>
                <p className="text-gray-550 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories / Case Highlights */}
      {service.examples && service.examples.length > 0 && (
        <section className="py-20 bg-white" id="service-success-cases">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <span className="text-gold font-bold uppercase tracking-widest text-sm">Success Stories</span>
              <h2 className="text-3xl font-serif font-bold text-navy mt-2">Real Projects We've Delivered</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.examples.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-cream rounded-xl p-6 border border-gray-200 shadow-xs hover:shadow-md hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center mb-4 border border-white/10 shadow-sm">
                    <BookOpen className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-serif font-bold text-navy text-base mb-2">{item.title}</h3>
                  <p className="text-gray-550 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Numeric Highlights Board */}
      {service.results && service.results.length > 0 && (
        <section className="py-20 bg-navy text-white relative" id="service-metrics-by-the-numbers">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-14">
              <span className="text-gold font-bold uppercase tracking-widest text-sm">Results</span>
              <h2 className="text-3xl font-serif font-bold mt-2">By The Numbers</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.results.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-xs hover:border-gold/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-sm">
                    <Award className="w-5 h-5 text-navy" />
                  </div>
                  <p className="text-gold font-bold text-lg">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Questions */}
      {service.faq && service.faq.length > 0 && (
        <section className="py-20 bg-cream" id="service-faq-panel">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="text-center mb-14">
              <span className="text-gold font-bold uppercase tracking-widest text-sm">FAQ</span>
              <h2 className="text-3xl font-serif font-bold text-navy mt-2">Common Questions</h2>
            </div>
            <div className="space-y-4">
              {service.faq.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-navy text-base mb-2">{item.q}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Explore Related services options */}
      {relatedServicesList.length > 0 && (
        <section className="py-20 bg-white border-t border-gray-100" id="service-explore-more">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <span className="text-gold font-bold uppercase tracking-widest text-sm">Explore More</span>
              <h2 className="text-3xl font-serif font-bold text-navy mt-2">Related Services</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedServicesList.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={`/services/${item.slug}`}
                    className="group block bg-cream rounded-xl overflow-hidden border border-gray-100 hover:border-gold transition-colors shadow-sm cursor-pointer"
                  >
                    <div className="h-40 overflow-hidden relative">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                        {item.category}
                      </span>
                      <h3 className="font-serif font-bold text-navy text-sm mt-1 group-hover:text-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Master Book Loop Carousel slider showcase */}
      <BookCarousel />

      {/* Bottom Conversion Sunrise action CTA section */}
      <section className="py-20 bg-gold text-navy text-center relative overflow-hidden" id="service-cta">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#07082a_1px,transparent_1px)] [background-size:12px_12px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-navy/70 text-base md:text-lg mb-8 max-w-lg mx-auto font-medium">
            Contact us today for a free consultation with our {service.title} experts.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-block bg-navy text-white font-bold px-10 py-4 rounded-md hover:bg-navy/90 hover:scale-[1.02] shadow-2xl transition-all cursor-pointer"
          >
            Get A Free Consultation
          </button>
        </div>
      </section>
    </Layout>
  );
};
