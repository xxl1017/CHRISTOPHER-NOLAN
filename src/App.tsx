/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';

function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log("Autoplay blocked:", e));
      }
    };
    
    // Attempt play on any interaction
    window.addEventListener('click', playAudio);
    window.addEventListener('scroll', playAudio);
    window.addEventListener('keydown', playAudio);
    
    // Initial attempt
    playAudio();
    
    return () => {
      window.removeEventListener('click', playAudio);
      window.removeEventListener('scroll', playAudio);
      window.removeEventListener('keydown', playAudio);
    };
  }, []);

  return (
    <>
      <audio 
        ref={audioRef} 
        loop 
        src="https://cdn1.suno.ai/ed3573c5-bf5d-4ab9-8f59-2f7065eca900.mp3" 
        crossOrigin="anonymous" 
      />
      <div 
        className="fixed bottom-12 right-8 md:right-[60px] z-50 flex items-center gap-4 cursor-pointer group"
        onClick={() => {
          if (audioRef.current) {
            if (isPlaying) {
              audioRef.current.pause();
              setIsPlaying(false);
            } else {
              audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(console.error);
            }
          }
        }}
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/50 group-hover:text-black transition-colors">
          {isPlaying ? "[ AUDIO ON ]" : "[ AUDIO OFF ]"}
        </span>
      </div>
    </>
  );
}

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => (

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const DualText: React.FC<{ en: React.ReactNode; zh: React.ReactNode; className?: string; enClassName?: string; zhClassName?: string; gap?: string }> = ({ en, zh, className = "", enClassName="opacity-100", zhClassName="font-light opacity-60 text-[0.85em] tracking-normal normal-case", gap="gap-1" }) => (
  <div className={`flex flex-col ${gap} ${className}`}>
    <span className={`font-medium ${enClassName}`}>{en}</span>
    <span className={zhClassName}>{zh}</span>
  </div>
);

const archiveFilms = [
  { id: "following", title: { en: "FOLLOWING", zh: "追随" }, img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=1000&auto=format&fit=crop&grayscale=true" },
  { id: "memento", title: { en: "MEMENTO", zh: "记忆碎片" }, img: "/memento.jpg" },
  { id: "inception", title: { en: "INCEPTION", zh: "盗梦空间" }, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1000&auto=format&fit=crop&grayscale=true" },
  { id: "interstellar", title: { en: "INTERSTELLAR", zh: "星际穿越" }, img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop&grayscale=true" },
  { id: "tenet", title: { en: "TENET", zh: "信条" }, img: "https://images.unsplash.com/photo-1536697246787-1f27d3530fcd?q=80&w=1000&auto=format&fit=crop&grayscale=true" }
];

function Home() {
  const [activeFilm, setActiveFilm] = useState(archiveFilms[2]);
  
  return (
    <div className="w-full text-black selection:bg-black selection:text-white font-sans pb-32 bg-grid min-h-screen relative overflow-hidden">
      
      {/* Decorative Structural Lines & Labels */}
      <div className="fixed top-0 bottom-0 left-[120px] w-[1px] bg-black opacity-5 pointer-events-none z-0 hidden md:block"></div>
      <div className="fixed left-0 right-0 top-[80px] h-[1px] bg-black opacity-5 pointer-events-none z-0 hidden md:block"></div>
      <div className="fixed left-[40px] top-[40px] bottom-[40px] hidden lg:flex flex-col justify-between font-mono text-[10px] uppercase tracking-[0.2em] z-50 pointer-events-none text-black">
        <div>01 / INDEX</div>
        <div style={{ writingMode: 'vertical-rl' }} className="rotate-180">CN ARCHIVE — 2024</div>
        <div style={{ opacity: 0 }}>_</div>
      </div>
      <header className="fixed top-[40px] right-[60px] font-mono text-[10px] tracking-[0.2em] text-black z-50 hidden md:block pointer-events-none">
        EST. 1970 / LONDON, UK
      </header>

      {/* LANDING */}
      <section className="min-h-screen flex flex-col justify-center items-start px-8 md:px-[165px] relative z-10 w-full">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
          <motion.img 
            src="https://images.unsplash.com/photo-1541086088365-1d6cfb33568c?q=80&w=1600&auto=format&fit=crop&grayscale=true" 
            alt="Background" 
            className="absolute top-0 left-0 w-full h-full object-cover grayscale contrast-110 opacity-[0.2]"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
          />
          <div className="absolute inset-0 grain-overlay"></div>
        </div>

        <FadeIn delay={0.1}>
          <DualText 
            en="CHRISTOPHER NOLAN"
            zh="克里斯托弗·诺兰" 
            enClassName="text-6xl md:text-[110px] font-black leading-[0.85] tracking-[-0.04em] uppercase"
            zhClassName="text-2xl md:text-[40px] font-light opacity-60 tracking-normal mt-4 md:mt-8 block"
            gap="gap-0"
            className="mb-[20px] max-w-[600px]"
          />
        </FadeIn>
        <FadeIn delay={0.3} className="ml-0">
          <DualText
            en="TIME IS NOT LINEAR"
            zh="时间并非线性"
            enClassName="text-[12px] font-mono tracking-[0.1em] text-[#888888] uppercase"
            zhClassName="text-[14px] font-light opacity-60 mt-1"
            className="max-w-[400px]"
          />
        </FadeIn>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-12 left-8 md:left-[165px] font-mono text-[10px] text-black tracking-[0.2em] uppercase font-bold"
        >
          ↓ SCROLL TO ENTER / 向下进入系统
        </motion.div>
      </section>

      {/* PROFILE */}
      <section className="min-h-screen flex flex-col items-start px-8 md:px-[165px] py-32 relative z-10 w-full border-t border-black/10">
        <FadeIn className="w-full mb-16">
          <DualText
            en="02 / PROFILE"
            zh="人物层"
            enClassName="text-[10px] font-mono text-[#888888] tracking-[0.2em] uppercase"
            zhClassName="text-[10px] font-light opacity-60 tracking-normal mt-1"
          />
        </FadeIn>
        <div className="flex flex-col md:flex-row items-start justify-between w-full gap-16 md:gap-32">
          <FadeIn className="w-full md:w-1/2 flex justify-center md:justify-start">
            <div className="relative group overflow-hidden w-full max-w-[400px] aspect-[3/4]">
              <img 
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop&grayscale=true" 
                alt="Christopher Nolan" 
                className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-white font-mono text-[10px] tracking-[0.2em] uppercase">Christopher Nolan</span>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="w-full md:w-1/2">
            <div className="flex flex-col font-mono text-[12px] md:text-[14px] leading-[2] tracking-[0.2em] uppercase text-black mb-16">
               <p>CHRISTOPHER NOLAN</p>
               <p className="h-6"></p>
               <p>FILMMAKER</p>
               <p>DIRECTOR</p>
               <p>WRITER</p>
               <p className="h-6"></p>
               <p>1970 —</p>
               <p className="h-6"></p>
               <p className="normal-case font-sans tracking-normal text-[14px] text-[#888]">Works between structure and perception.</p>
            </div>
            
            <div className="text-[14px] md:text-[16px] font-normal tracking-wide leading-[1.8] max-w-[500px]">
              {[
                {en: "Christopher Nolan is a filmmaker", zh: "诺兰是一位电影导演"},
                {en: "whose work constructs systems of time.", zh: "其作品构建时间的系统"},
                {en: "", zh: ""},
                {en: "But more importantly —", zh: "但更重要的是 —"},
                {en: "his films reject linear perception.", zh: "他的电影拒绝线性叙事"},
                {en: "", zh: ""},
                {en: "They operate as structures.", zh: "它们以结构运作"},
                {en: "Not stories.", zh: "而非单纯故事"}
              ].map((frag, i) => (
                frag.en === "" ? (
                  <div key={i} className="h-4" />
                ) : (
                  <DualText
                    key={i}
                    en={frag.en}
                    zh={frag.zh}
                    enClassName="font-medium"
                    zhClassName="font-light opacity-60 text-[0.85em] mt-1 mb-2 block"
                    gap="gap-0"
                  />
                )
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ARCHIVE */}
      <section className="py-32 relative z-10 w-full min-h-[80vh] flex flex-col justify-center border-t border-black/10 px-8 md:px-[165px]">
        <FadeIn>
          <DualText
            en="03 / ARCHIVE"
            zh="入口"
            enClassName="text-[10px] font-mono text-[#888888] tracking-[0.2em] uppercase"
            zhClassName="text-[10px] font-light opacity-60 tracking-normal mt-1"
            className="mb-16"
          />
        </FadeIn>
        <div className="flex flex-col md:flex-row w-full gap-16 md:gap-32 items-center">
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 md:space-y-10 relative z-20">
            {archiveFilms.map((film, idx) => (
              <FadeIn key={film.id} delay={idx * 0.05}>
                <div 
                  onMouseEnter={() => setActiveFilm(film)}
                  className="group cursor-pointer block w-max"
                >
                  <Link to={`/film/${film.id}`}>
                    <div className="flex items-center transition-transform duration-500 group-hover:translate-x-4">
                      <span className="font-mono text-[10px] text-[#888] mr-4 opacity-0 group-hover:opacity-100 transition-opacity">{"//"}</span>
                      <DualText 
                        en={film.title.en} 
                        zh={film.title.zh} 
                        enClassName={`text-3xl md:text-5xl font-bold tracking-[0.05em] uppercase transition-colors duration-500 ${activeFilm.id === film.id ? 'text-black' : 'text-black/30 group-hover:text-black/80'}`}
                        zhClassName={`text-sm font-light transition-opacity duration-500 mt-2 block ${activeFilm.id === film.id ? 'opacity-80' : 'opacity-0 group-hover:opacity-60'}`}
                      />
                    </div>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="w-full md:w-1/2 relative aspect-[4/5] md:aspect-auto md:min-h-[60vh] overflow-hidden bg-black/5">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeFilm.id}
                src={activeFilm.img}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1.05 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-multiply opacity-80"
              />
            </AnimatePresence>
          </FadeIn>
        </div>
      </section>

      {/* STRUCTURE LAB */}
      <section className="min-h-screen py-32 flex flex-col justify-center relative z-10 max-w-[800px] border-t border-black/10 mx-8 md:mx-[165px]">
        <div className="mb-32">
          <FadeIn>
            <DualText
              en="05 / STRUCTURE LAB"
              zh="设计亮点"
              enClassName="text-[10px] font-mono text-[#888888] tracking-[0.2em] uppercase"
              zhClassName="text-[10px] font-light opacity-60 tracking-normal mt-1"
            />
          </FadeIn>
        </div>

        <div className="space-y-32">
          {/* Tenet Layout */}
          <FadeIn>
            <div className="flex flex-col items-start border-t border-black/20 pb-8 pt-4">
              <h4 className="text-[10px] font-mono text-[#888] tracking-[0.2em] mb-12">TENET (BIDIRECTIONAL)</h4>
              <div className="space-y-4 font-mono text-[14px] md:text-[20px] tracking-[0.2em]">
                <div className="text-black transition-transform duration-700 hover:translate-x-4">{"→ → → → →"}</div>
                <div className="text-[#888888] transition-transform duration-700 hover:-translate-x-4">{"← ← ← ← ←"}</div>
              </div>
            </div>
          </FadeIn>

          {/* Dunkirk Layout */}
          <FadeIn>
            <div className="flex flex-col items-start border-t border-black/20 pb-8 pt-4">
              <h4 className="text-[10px] font-mono text-[#888] tracking-[0.2em] mb-12">DUNKIRK (MULTI-SCALE)</h4>
              <div className="flex flex-col space-y-4 items-start font-mono tracking-[0.2em] text-[14px] md:text-[20px]">
                <motion.div whileHover={{ x: 10 }} className="text-black cursor-crosshair">LAND — 1 WEEK</motion.div>
                <motion.div whileHover={{ x: 10 }} className="text-[#888888] cursor-crosshair">SEA — 1 DAY</motion.div>
                <motion.div whileHover={{ x: 10 }} className="text-black/20 cursor-crosshair">AIR — 1 HOUR</motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ABOUT PROJECT */}
      <section className="py-32 px-8 md:px-[165px] border-t border-black/10 relative z-10 w-full max-w-[1200px]">
        <FadeIn className="w-full mb-16">
          <DualText
            en="06 / ABOUT PROJECT"
            zh="作品说明"
            enClassName="text-[10px] font-mono text-[#888888] tracking-[0.2em] uppercase"
            zhClassName="text-[10px] font-light opacity-60 tracking-normal mt-1"
          />
        </FadeIn>
        <FadeIn delay={0.1}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 uppercase">
              <div className="font-mono text-[12px] leading-[2] tracking-[0.1em] text-black max-w-[400px]">
                 <p className="mb-8 text-[#888]">DESIGN NOTES</p>
                 <p>This project explores cinematic structures through visual interface design. Time progression, cinematic fades, and subtle feedback mechanisms are used to reflect Christopher Nolan's nonlinear storytelling.</p>
              </div>
              <div className="font-mono text-[12px] leading-[2] tracking-[0.1em] text-black">
                 <p className="mb-8 text-[#888]">TECHNICAL</p>
                 <p>Built with React, Tailwind CSS, and Motion.</p>
                 <p className="mt-16 text-[#888] border-b border-[#888]/30 pb-1 inline-block hover:text-black hover:border-black transition-colors cursor-pointer">// END OF ARCHIVE</p>
              </div>
           </div>
        </FadeIn>
      </section>
    </div>
  );
}

const FilmItem: React.FC<{ item: any; index: number }> = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-black/10 cursor-pointer group relative" onClick={() => setIsOpen(!isOpen)}>
      <div className="px-8 md:px-[165px] py-8 md:py-12 flex justify-between items-center hover:bg-black/[0.02] transition-colors">
        <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-16 w-full">
          <span className="font-mono text-[11px] text-[#888888] md:w-16 block shrink-0">{item.year}</span>
          <h3 className="text-2xl md:text-[32px] font-bold uppercase tracking-[0.05em] text-black relative pl-4 md:pl-0 md:before:hidden before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[2px] before:bg-black">
            <DualText
              en={item.title.en}
              zh={item.title.zh}
              enClassName="font-bold tracking-[0.05em]"
              zhClassName="font-light opacity-60 text-[0.6em] tracking-normal mt-1 block"
            />
          </h3>
        </div>
        <div className="font-mono text-[10px] text-[#888] transition-transform duration-500 hidden md:block shrink-0">
          <motion.div animate={{ rotate: isOpen ? 45 : 0 }}>[ + ]</motion.div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-[#fafafa]"
          >
            <div className="px-8 md:px-[165px] pt-8 pb-16 grid grid-cols-1 md:grid-cols-3 gap-12 font-mono text-[10px] tracking-[0.1em] text-[#888888] border-t border-black/5">
              <div>
                <h4 className="text-black font-bold mb-6">KEYWORDS</h4>
                <ul className="space-y-4">
                  {item.details.keywords.map((k: any, i: number) => (
                    <li key={i}>
                      <DualText
                        en={`— ${k.en}`}
                        zh={k.zh}
                        enClassName=""
                        zhClassName="font-light opacity-60 tracking-normal normal-case block ml-4 mt-1"
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-black font-bold mb-6">STRUCTURE</h4>
                <ul className="space-y-3">
                  {item.details.structure.map((s: string) => <li key={s} className="uppercase">— {s}</li>)}
                </ul>
              </div>
              <div className="md:border-l md:border-black/10 md:pl-12 flex flex-col justify-between">
                <div>
                  <h4 className="text-black font-bold mb-6">OBSERVATION</h4>
                  <div className="leading-[2] font-sans tracking-normal text-[13px] text-black/80">
                    <DualText
                      en={item.details.note.en}
                      zh={item.details.note.zh}
                      enClassName="font-medium"
                      zhClassName="font-light opacity-60 text-[0.85em] mt-1 block tracking-normal normal-case"
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <Link to={`/film/${item.title.en.toLowerCase()}`} className="text-black border-b border-black pb-1 hover:text-[#888] hover:border-[#888] transition-colors inline-block tracking-[0.2em] font-bold">
                    EXPLORE ARCHIVE →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const filmPagesData: Record<string, any> = {
  inception: {
    title: { en: "INCEPTION", zh: "盗梦空间" },
    heroSrc: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1600&auto=format&fit=crop&grayscale=true",
    concept: { en: <>DREAM / LAYER /<br/>TIME</>, zh: "梦境 / 层级 / 时间" },
    note: { en: "Dream within dream.", zh: "梦中之梦" },
    structure: [
      { en: "LEVEL 1", style: "text-black", num: "01" },
      { en: "LEVEL 2", style: "text-[#666] ml-4", num: "02" },
      { en: "LEVEL 3", style: "text-[#aaa] ml-8", num: "03" },
      { en: "LIMBO", style: "text-black/20 ml-12", num: "04" }
    ]
  },
  following: {
    title: { en: "FOLLOWING", zh: "追随" },
    heroSrc: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=1600&auto=format&fit=crop&grayscale=true",
    concept: { en: <>IDENTITY /<br/>OBSESSION</>, zh: "身份 / 执念" },
    note: { en: "A man follows strangers to construct meaning.", zh: "一个男人通过跟踪他人来构建意义" },
    structure: null
  },
  memento: {
    title: { en: "MEMENTO", zh: "记忆碎片" },
    heroSrc: "https://images.unsplash.com/photo-1528696892704-5e1122832274?q=80&w=1600&auto=format&fit=crop&grayscale=true",
    concept: { en: <>MEMORY /<br/>REVERSE TIME</>, zh: "记忆 / 逆向时间" },
    note: { en: "Memory is unreliable.", zh: "记忆是不可靠的" },
    structure: [
      { en: "← ← ← ← ←", style: "text-[#888]", num: "01" },
      { en: "→ → → → →", style: "text-black ml-4", num: "02" }
    ]
  },
  interstellar: {
    title: { en: "INTERSTELLAR", zh: "星际穿越" },
    heroSrc: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1600&auto=format&fit=crop&grayscale=true",
    concept: { en: <>TIME / GRAVITY /<br/>LOVE</>, zh: "时间 / 重力 / 爱" },
    note: { en: "Time is relative. Love transcends dimensions.", zh: "时间是相对的。爱超越维度。" },
    structure: null
  },
  tenet: {
    title: { en: "TENET", zh: "信条" },
    heroSrc: "https://images.unsplash.com/photo-1536697246787-1f27d3530fcd?q=80&w=1600&auto=format&fit=crop&grayscale=true",
    concept: { en: <>INVERSION /<br/>ENTROPY</>, zh: "逆转 / 熵" },
    note: { en: "Time inversion.", zh: "时间逆行" },
    structure: [
      { en: "→ → → → →", style: "text-black", num: "01" },
      { en: "← ← ← ← ←", style: "text-[#888] ml-4", num: "02" }
    ]
  }
};

const FilmPage = () => {
  const { title } = useParams<{ title: string }>();
  const { pathname } = useLocation();

  const data = title ? filmPagesData[title] : null;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-[10px] tracking-[0.2em] text-[#888] bg-grid">
        <Link to="/" className="hover:text-black transition-colors border-b border-[#888] pb-1">← RETURN TO ARCHIVE</Link>
      </div>
    );
  }

  return (
    <motion.div key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-full text-black selection:bg-black selection:text-white font-sans bg-grid min-h-screen relative overflow-x-hidden"
    >
      {/* Decorative Label */}
      <div className="fixed top-0 bottom-0 left-[120px] w-[1px] bg-black opacity-5 pointer-events-none z-0 hidden md:block"></div>
      <div className="fixed left-0 right-0 top-[80px] h-[1px] bg-black opacity-5 pointer-events-none z-0 hidden md:block"></div>
      
      <div className="fixed top-[40px] left-[40px] z-50">
        <Link to="/" className="font-mono text-[10px] tracking-[0.4em] uppercase hover:text-[#888] transition-colors border-b border-black/10 pb-1">
          ← BACK
        </Link>
      </div>

      <section className="min-h-screen flex flex-col justify-center px-8 md:px-[165px] pt-32 relative z-10 w-full max-w-[1200px]">
        <FadeIn>
          <DualText
            en={data.title.en}
            zh={data.title.zh}
            enClassName="text-6xl md:text-[110px] font-black leading-[0.85] tracking-[-0.04em] uppercase"
            zhClassName="text-2xl md:text-[40px] font-light opacity-60 tracking-normal mt-4 md:mt-8 block"
            gap="gap-0"
            className="mb-16"
          />
        </FadeIn>
        
        <FadeIn delay={0.2} className="w-full relative aspect-video md:aspect-[21/9] overflow-hidden mb-24 border border-black/5 bg-[#fafafa]">
          <img 
            src={data.heroSrc} 
            alt={`${data.title.en} Scene`} 
            className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-[2s] hover:scale-105"
          />
        </FadeIn>

        <div className="flex flex-col md:flex-row gap-16 md:gap-32 pb-32">
          <FadeIn delay={0.4} className="flex-[0.8]">
            <DualText
              en="CONCEPT"
              zh="概念"
              enClassName="text-[10px] font-mono text-[#888888] tracking-[0.2em] uppercase"
              zhClassName="text-[10px] font-light opacity-60 tracking-normal mt-1 block"
              className="mb-12 border-b border-black/10 pb-4"
            />
            <div className="font-mono text-[14px] md:text-[20px] tracking-[0.2em] uppercase leading-[2]">
              <DualText
                en={data.concept.en}
                zh={data.concept.zh}
                enClassName=""
                zhClassName="font-light opacity-60 text-[0.7em] block mt-4 tracking-normal normal-case"
              />
            </div>
            
            <DualText
              en={data.note.en}
              zh={data.note.zh}
              enClassName="text-[14px] font-medium tracking-normal normal-case leading-[1.8]"
              zhClassName="font-light opacity-60 text-[13px] mt-2 block tracking-normal normal-case"
              className="mt-16 text-black/80 font-sans"
            />
          </FadeIn>

          {data.structure && (
            <FadeIn delay={0.6} className="flex-1">
              <DualText
                en="STRUCTURE DIAGRAM"
                zh="结构图"
                enClassName="text-[10px] font-mono text-[#888888] tracking-[0.2em] uppercase"
                zhClassName="text-[10px] font-light opacity-60 tracking-normal mt-1 block"
                className="mb-12 border-b border-black/10 pb-4"
              />
              <div className="flex flex-col space-y-6 font-mono tracking-[0.2em] text-[14px] md:text-[20px]">
                {data.structure.map((item: any, idx: number) => (
                  <motion.div key={idx} whileHover={{ x: 10 }} className={`${item.style} cursor-crosshair flex items-center gap-4`}><span className="text-[10px] text-[#888]">{item.num}</span> {item.en}</motion.div>
                ))}
              </div>
            </FadeIn>
          )}
        </div>
      </section>

    </motion.div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AudioPlayer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:title" element={<FilmPage />} />
      </Routes>
    </BrowserRouter>
  );
}
