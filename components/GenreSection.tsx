import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "motion/react";
import { QuoteModal } from "./QuoteModal";

export interface GenreItem {
  name: string;
  tagline: string;
  covers: string[];
  color: string;
  accent: string;
}

const GENRE_DATA: GenreItem[] = [
  {
    name: "Horror",
    tagline: "Books that keep you up at night",
    covers: [
      "/genre-horror-1.png",
      "/genre-horror-2.png"
    ],
    color: "from-red-900/80 to-black/90",
    accent: "#ef4444"
  },
  {
    name: "Fantasy",
    tagline: "Epic worlds beyond imagination",
    covers: [
      "/genre-fantasy-1.png",
      "/genre-fantasy-2.png"
    ],
    color: "from-purple-900/80 to-indigo-900/90",
    accent: "#a855f7"
  },
  {
    name: "Romance",
    tagline: "Stories that touch the heart",
    covers: [
      "/genre-romance-1.png",
      "/genre-memoir-1.png"
    ],
    color: "from-pink-800/80 to-rose-900/90",
    accent: "#f43f5e"
  },
  {
    name: "Thriller",
    tagline: "Edge-of-your-seat suspense",
    covers: [
      "/genre-thriller-1.png",
      "/genre-truecrime-1.png"
    ],
    color: "from-gray-900/80 to-slate-800/90",
    accent: "#f5c518"
  },
  {
    name: "Sci-Fi",
    tagline: "The future written today",
    covers: [
      "/genre-scifi-1.png",
      "/genre-thriller-1.png"
    ],
    color: "from-cyan-900/80 to-blue-900/90",
    accent: "#06b6d4"
  },
  {
    name: "Western",
    tagline: "American frontier stories",
    covers: [
      "/genre-western-1.png",
      "/genre-memoir-1.png"
    ],
    color: "from-amber-900/80 to-orange-900/90",
    accent: "#f59e0b"
  },
  {
    name: "True Crime",
    tagline: "Real stories. Real drama.",
    covers: [
      "/genre-truecrime-1.png",
      "/genre-horror-1.png"
    ],
    color: "from-zinc-900/80 to-stone-900/90",
    accent: "#84cc16"
  },
  {
    name: "Memoir",
    tagline: "Your life. Your legacy.",
    covers: [
      "/genre-memoir-1.png",
      "/genre-romance-1.png"
    ],
    color: "from-yellow-800/80 to-amber-900/90",
    accent: "#eab308"
  }
];

export const GenreSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      className="relative py-24 overflow-hidden bg-navy text-white"
      style={{
        backgroundImage: "url('/bg-steps.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      id="home-genres-section"
    >
      <div className="absolute inset-0 bg-[#07082a]/94 z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Text */}
        <div className="text-center mb-16">
          <span className="inline-block text-gold text-sm font-bold uppercase tracking-widest mb-3">
            Every Voice Has a Genre
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
            We Write Across Every American Genre
          </h2>
          <p className="text-gray-300 text-sm md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            From spine-chilling horror to sweeping frontier epics — our expert ghostwriters master every niche so your book fits perfectly on any shelf.
          </p>
        </div>

        {/* Grid cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {GENRE_DATA.map((genre, idx) => (
            <div
              key={genre.name}
              onClick={() => setModalOpen(true)}
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-end"
              style={{ minHeight: "280px" }}
              id={`genre-card-${genre.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Main Cover background image */}
              <img
                src={genre.covers[0]}
                alt={`${genre.name} background`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Cover layout overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${genre.color} opacity-85 group-hover:opacity-75 transition-opacity duration-300`} />

              {/* Side book cover mock pop up on hover */}
              <div className="absolute bottom-0 right-0 w-16 h-24 opacity-0 group-hover:opacity-75 transition-all duration-500 transform translate-x-4 group-hover:translate-x-1 translate-y-2 group-hover:translate-y-0 rounded-tl-md overflow-hidden shadow-2xl z-20">
                <img
                  src={genre.covers[1]}
                  alt={`${genre.name} cover teaser`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text content details */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 z-10 select-none">
                <div
                  className="w-8 h-1 rounded-full mb-3 transition-all duration-300 group-hover:w-12"
                  style={{ background: genre.accent }}
                />
                <h3 className="text-white font-serif font-bold text-xl md:text-2xl leading-tight">
                  {genre.name}
                </h3>
                <p className="text-gray-300 text-[10px] md:text-xs mt-1 font-medium leading-tight">
                  {genre.tagline}
                </p>
                <span
                  className="mt-3 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: genre.accent }}
                >
                  Start Writing &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-gold hover:bg-yellow-400 text-navy font-bold px-10 h-14 text-base rounded-md shadow-lg transition-transform hover:scale-102 cursor-pointer"
          >
            Explore All Genres
          </button>
        </div>
      </div>

      <QuoteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        source="genre-section-explore"
      />
    </section>
  );
};
