/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {HashRouter, Link, Route, Routes, useLocation, useParams} from 'react-router-dom';

type DualCopy = {
  en: React.ReactNode;
  zh: React.ReactNode;
};

type FilmRecord = {
  id: string;
  title: DualCopy;
  year: string;
  metadata: string[];
  image: string;
  keywords: string[];
  concept: DualCopy;
  structure: string[];
  statement: DualCopy;
  notes: DualCopy[];
};

const nolanPortrait =
  'https://commons.wikimedia.org/wiki/Special:Redirect/file/Christopher%20Nolan%20at%20WonderCon%202010%203.JPG?width=1400';

const films: FilmRecord[] = [
  {
    id: 'following',
    title: {en: 'FOLLOWING', zh: '追随'},
    year: '1998',
    metadata: ['16MM', 'IDENTITY', 'SURVEILLANCE'],
    image:
      'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=1600&auto=format&fit=crop&grayscale=true',
    keywords: ['IDENTITY', 'OBSESSION', 'TRACE'],
    concept: {en: 'IDENTITY / OBSESSION', zh: '身份在凝视中被拆解'},
    structure: ['A MAN FOLLOWS', 'A PATTERN FORMS', 'THE PATTERN CONTROLS HIM'],
    statement: {
      en: 'Observation becomes possession.',
      zh: '当观看持续太久，观看者也会被困在结构里。',
    },
    notes: [
      {en: 'The city behaves like a maze.', zh: '空间不解释人物，只不断制造误认。'},
      {en: 'Cause and effect arrive out of order.', zh: '真相像一份被打乱的调查记录。'},
    ],
  },
  {
    id: 'memento',
    title: {en: 'MEMENTO', zh: '记忆碎片'},
    year: '2000',
    metadata: ['MEMORY', 'REVERSE TIME', 'IDENTITY'],
    image: '/memento.jpg',
    keywords: ['MEMORY', 'TIME', 'IDENTITY'],
    concept: {en: 'MEMORY / REVERSE TIME', zh: '意识被剪成无法复原的证词'},
    structure: ['← ← ← ← ←', '→ → → → →'],
    statement: {
      en: 'Memory is unreliable.',
      zh: '记忆会被不断重构。',
    },
    notes: [
      {en: 'The ending is placed at the beginning.', zh: '答案先抵达，意义却迟迟无法出现。'},
      {en: 'Every clue is also a trap.', zh: '证据越清晰，自我越不可信。'},
    ],
  },
  {
    id: 'inception',
    title: {en: 'INCEPTION', zh: '盗梦空间'},
    year: '2010',
    metadata: ['DREAM', 'LAYER', 'TIME DILATION'],
    image:
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1600&auto=format&fit=crop&grayscale=true',
    keywords: ['DREAM', 'LAYER', 'KICK'],
    concept: {en: 'DREAM WITHIN DREAM', zh: '层层嵌套的意识迷宫'},
    structure: ['LEVEL 01', '  LEVEL 02', '    LEVEL 03', '      LIMBO'],
    statement: {
      en: 'Reality is negotiated through architecture.',
      zh: '真实不是答案，而是一套暂时稳定的空间规则。',
    },
    notes: [
      {en: 'Each layer slows the pulse.', zh: '越往深处，时间越像一间封闭房间。'},
      {en: 'The image becomes evidence.', zh: '视觉不是装饰，而是判断现实的工具。'},
    ],
  },
  {
    id: 'interstellar',
    title: {en: 'INTERSTELLAR', zh: '星际穿越'},
    year: '2014',
    metadata: ['GRAVITY', 'DISTANCE', 'RELATIVITY'],
    image:
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1600&auto=format&fit=crop&grayscale=true',
    keywords: ['TIME', 'GRAVITY', 'LOVE'],
    concept: {en: 'TIME = GRAVITY', zh: '时间被重力弯折成情感的距离'},
    structure: ['EARTH', 'ORBIT', 'BLACK HOLE', 'BOOKSHELF'],
    statement: {
      en: 'Time is the real antagonist.',
      zh: '真正的阻隔不是宇宙，而是无法同步的时间。',
    },
    notes: [
      {en: 'Scale turns intimate.', zh: '宏大的天体运动最终落回一间卧室。'},
      {en: 'Distance becomes a measurement of grief.', zh: '离别被翻译成物理学，也仍然疼痛。'},
    ],
  },
  {
    id: 'tenet',
    title: {en: 'TENET', zh: '信条'},
    year: '2020',
    metadata: ['INVERSION', 'ENTROPY', 'PALINDROME'],
    image: '/tenet.jpg',
    keywords: ['INVERSION', 'ENTROPY', 'CONTROL'],
    concept: {en: 'INVERSION / ENTROPY', zh: '因果被折叠成互相追逐的轨道'},
    structure: ['→ → → → →', '← ← ← ← ←'],
    statement: {
      en: 'The future has already happened.',
      zh: '未来不是等待，而是正在反向接近。',
    },
    notes: [
      {en: 'Movement contradicts perception.', zh: '身体向前，世界却像在倒放。'},
      {en: 'The plot behaves like a machine.', zh: '情节不解释自己，只让你进入运转。'},
    ],
  },
];

const filmMap = films.reduce<Record<string, FilmRecord>>((map, film) => {
  map[film.id] = film;
  return map;
}, {});

function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src="https://cdn1.suno.ai/ed3573c5-bf5d-4ab9-8f59-2f7065eca900.mp3"
        crossOrigin="anonymous"
      />
      <button
        type="button"
        className="fixed bottom-8 right-6 z-50 font-mono text-[10px] uppercase tracking-[0.28em] text-black/45 transition-colors hover:text-black md:bottom-12 md:right-12"
        onClick={() => {
          if (!audioRef.current) return;
          if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            return;
          }

          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }}
      >
        {isPlaying ? '[ AUDIO ON ]' : '[ AUDIO OFF ]'}
      </button>
    </>
  );
}

const PageFade: React.FC<{children: React.ReactNode; className?: string}> = ({children, className = ''}) => (
  <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    transition={{duration: 0.8, ease: [0.16, 1, 0.3, 1]}}
    className={className}
  >
    {children}
  </motion.div>
);

const Reveal: React.FC<{children: React.ReactNode; delay?: number; className?: string}> = ({
  children,
  delay = 0,
  className = '',
}) => (
  <motion.div
    initial={{opacity: 0, y: 36}}
    whileInView={{opacity: 1, y: 0}}
    viewport={{once: true, margin: '-18%'}}
    transition={{duration: 1.1, delay, ease: [0.16, 1, 0.3, 1]}}
    className={className}
  >
    {children}
  </motion.div>
);

const DualText: React.FC<{
  en: React.ReactNode;
  zh: React.ReactNode;
  className?: string;
  enClassName?: string;
  zhClassName?: string;
}> = ({en, zh, className = '', enClassName = '', zhClassName = ''}) => (
  <div className={`flex flex-col gap-3 ${className}`}>
    <span className={enClassName}>{en}</span>
    <span className={`font-zh font-light text-black/45 ${zhClassName}`}>{zh}</span>
  </div>
);

function Home() {
  const [activeFilm, setActiveFilm] = useState<FilmRecord>(films[1]);

  return (
    <PageFade className="relative min-h-screen overflow-hidden bg-white text-black selection:bg-black selection:text-white">
      <div className="fixed inset-0 pointer-events-none bg-grid opacity-70" />
      <div className="fixed inset-0 pointer-events-none grain-overlay" />
      <div className="fixed left-6 top-6 z-40 hidden font-mono text-[10px] uppercase tracking-[0.32em] text-black/45 md:block">
        CN / ARCHIVE SYSTEM
      </div>
      <div className="fixed right-6 top-6 z-40 hidden font-mono text-[10px] uppercase tracking-[0.32em] text-black/45 md:block">
        1970 / LONDON
      </div>

      <section className="relative min-h-screen overflow-hidden px-6 pb-20 pt-24 md:px-20 lg:px-32">
        <div className="absolute bottom-0 right-[-14vw] top-0 w-[68vw] overflow-hidden opacity-20 md:opacity-[0.18]">
          <motion.img
            src={nolanPortrait}
            alt="Christopher Nolan"
            className="h-full w-full object-cover object-[42%_50%] grayscale blur-[0.7px] contrast-75"
            initial={{scale: 1.04, x: 0}}
            animate={{scale: 1.16, x: -18}}
            transition={{duration: 24, repeat: Infinity, repeatType: 'mirror', ease: 'linear'}}
          />
          <div className="absolute inset-0 bg-white/20" />
        </div>

        <div className="relative z-10 flex min-h-[calc(100vh-11rem)] max-w-[980px] flex-col justify-end">
          <Reveal>
            <DualText
              en="CHRISTOPHER NOLAN"
              zh="克里斯托弗·诺兰"
              enClassName="text-[52px] font-black uppercase leading-[0.9] tracking-[0.06em] md:text-[118px]"
              zhClassName="text-[22px] tracking-[0.24em] md:text-[34px]"
            />
          </Reveal>
          <Reveal delay={0.24} className="mt-16">
            <DualText
              en="TIME IS NOT LINEAR"
              zh="时间并非线性"
              enClassName="font-mono text-[12px] uppercase tracking-[0.36em] text-black/55"
              zhClassName="text-[13px] tracking-[0.22em]"
            />
          </Reveal>
          <Reveal delay={0.48} className="mt-28">
            <DualText
              en="SCROLL TO ENTER"
              zh="向下进入系统"
              enClassName="font-mono text-[10px] uppercase tracking-[0.4em]"
              zhClassName="text-[12px] tracking-[0.24em]"
            />
          </Reveal>
        </div>
      </section>

      <section className="relative min-h-screen px-6 py-32 md:px-20 lg:px-32">
        <div className="pointer-events-none absolute inset-x-0 top-20 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilm.id}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -20}}
              transition={{duration: 0.8}}
              className="font-mono text-[56px] uppercase leading-none tracking-[0.22em] text-black/[0.035] md:text-[120px]"
            >
              {activeFilm.keywords.join(' / ')}
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal>
          <DualText
            en="01 / ARCHIVE"
            zh="机密影像记录"
            enClassName="font-mono text-[10px] uppercase tracking-[0.36em] text-[#888888]"
            zhClassName="text-[11px] tracking-[0.2em]"
          />
        </Reveal>

        <div className="relative z-10 mt-28 grid gap-20 md:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.75fr)] md:items-center">
          <div className="space-y-10 md:space-y-14">
            {films.map((film, index) => {
              const isActive = activeFilm.id === film.id;
              return (
                <Reveal key={film.id} delay={index * 0.04}>
                  <Link
                    to={`/film/${film.id}`}
                    onMouseEnter={() => setActiveFilm(film)}
                    onFocus={() => setActiveFilm(film)}
                    className={`group block transition-all duration-700 ${
                      isActive ? 'translate-x-3 opacity-100' : 'opacity-35 hover:opacity-80'
                    }`}
                  >
                    <div className="flex items-start gap-6">
                      <span className="pt-2 font-mono text-[10px] tracking-[0.34em] text-[#888888]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <DualText
                          en={film.title.en}
                          zh={film.title.zh}
                          enClassName="text-[32px] font-black uppercase tracking-[0.12em] md:text-[58px]"
                          zhClassName="text-[14px] tracking-[0.24em] md:text-[16px]"
                        />
                        <div
                          className={`mt-7 flex flex-wrap gap-x-7 gap-y-3 font-mono text-[10px] uppercase tracking-[0.32em] text-black/45 transition-opacity duration-500 ${
                            isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          {film.keywords.map((keyword) => (
                            <span key={keyword}>{keyword}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="relative aspect-[4/5] overflow-hidden bg-black/[0.03]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeFilm.id}
                src={activeFilm.image}
                alt={`${activeFilm.title.en} archive preview`}
                className="cinematic-image absolute inset-0 h-full w-full object-cover"
                initial={{opacity: 0, scale: 1.03, x: 16}}
                animate={{opacity: 0.82, scale: 1.09, x: 0}}
                exit={{opacity: 0, scale: 1.02, x: -16}}
                transition={{duration: 0.9, ease: [0.16, 1, 0.3, 1]}}
              />
            </AnimatePresence>
            <div className="absolute inset-0 grain-overlay" />
            <div className="absolute bottom-8 left-8 font-mono text-[10px] uppercase tracking-[0.32em] text-white/70 mix-blend-difference">
              {activeFilm.year} / {activeFilm.metadata[0]}
            </div>
          </Reveal>
        </div>
      </section>

      <StructureLab />
      <ProjectStatement />
    </PageFade>
  );
}

function StructureLab() {
  return (
    <section className="relative min-h-screen px-6 py-36 md:px-20 lg:px-32">
      <Reveal>
        <DualText
          en="02 / STRUCTURE LAB"
          zh="结构实验室"
          enClassName="font-mono text-[10px] uppercase tracking-[0.36em] text-[#888888]"
          zhClassName="text-[11px] tracking-[0.2em]"
        />
      </Reveal>

      <div className="mt-32 max-w-[760px] space-y-32 font-mono uppercase tracking-[0.28em]">
        <Reveal>
          <div className="border-t border-black/15 pt-10">
            <p className="mb-10 text-[12px] text-[#888888]">TENET</p>
            <p className="text-[22px] leading-[2] md:text-[34px]">→ → → → →</p>
            <p className="text-[22px] leading-[2] text-black/45 md:text-[34px]">← ← ← ← ←</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="border-t border-black/15 pt-10">
            <p className="mb-10 text-[12px] text-[#888888]">DUNKIRK</p>
            <div className="space-y-5 text-[18px] md:text-[26px]">
              <p>1 WEEK</p>
              <p className="text-black/55">1 DAY</p>
              <p className="text-black/25">1 HOUR</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="border-t border-black/15 pt-10">
            <p className="mb-10 text-[12px] text-[#888888]">INTERSTELLAR</p>
            <p className="text-[22px] leading-[1.7] md:text-[34px]">TIME = GRAVITY</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectStatement() {
  return (
    <section className="relative flex min-h-screen items-center px-6 py-36 md:px-20 lg:px-32">
      <Reveal className="max-w-[780px]">
        <DualText
          en="03 / PROJECT"
          zh="项目说明"
          enClassName="mb-24 font-mono text-[10px] uppercase tracking-[0.36em] text-[#888888]"
          zhClassName="hidden"
        />
        <div className="space-y-12">
          {[
            {
              en: 'This project explores how cinematic structure can become digital interaction.',
              zh: '电影结构在这里不再只是内容，而成为浏览方式本身。',
            },
            {en: 'Scroll becomes time.', zh: '滚动成为时间。'},
            {en: 'Layout becomes narrative.', zh: '版式成为叙事。'},
            {en: 'Interaction becomes perception.', zh: '交互成为感知。'},
          ].map((line) => (
            <DualText
              key={String(line.en)}
              en={line.en}
              zh={line.zh}
              enClassName="max-w-[720px] text-[28px] font-medium leading-[1.25] tracking-[0.04em] md:text-[48px]"
              zhClassName="max-w-[520px] text-[15px] leading-[1.9] tracking-[0.18em]"
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

const FilmPage = () => {
  const {title} = useParams<{title: string}>();
  const {pathname} = useLocation();
  const data = title ? filmMap[title] : null;

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'auto'});
  }, [pathname]);

  if (!data) {
    return (
      <PageFade className="flex min-h-screen items-center justify-center bg-white font-mono text-[10px] uppercase tracking-[0.36em] text-[#888888]">
        <Link to="/" className="border-b border-black/20 pb-2 transition-colors hover:text-black">
          ← RETURN TO ARCHIVE
        </Link>
      </PageFade>
    );
  }

  return (
    <PageFade className="relative min-h-screen overflow-hidden bg-white text-black selection:bg-black selection:text-white">
      <div className="fixed inset-0 pointer-events-none bg-grid opacity-70" />
      <div className="fixed inset-0 pointer-events-none grain-overlay" />
      <Link
        to="/"
        className="fixed left-6 top-6 z-50 font-mono text-[10px] uppercase tracking-[0.36em] text-black/55 transition-colors hover:text-black md:left-10 md:top-10"
      >
        ← BACK
      </Link>

      <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-20 pt-28 md:px-20 md:pb-28 lg:px-32">
        <motion.img
          src={data.image}
          alt={`${data.title.en} cinematic field`}
          className="cinematic-image absolute inset-y-0 right-[-10vw] h-full w-[72vw] object-cover opacity-[0.18]"
          initial={{scale: 1.02}}
          animate={{scale: 1.12}}
          transition={{duration: 22, repeat: Infinity, repeatType: 'mirror', ease: 'linear'}}
        />
        <div className="absolute inset-0 bg-white/45" />
        <Reveal className="relative z-10">
          <DualText
            en={data.title.en}
            zh={data.title.zh}
            enClassName="text-[58px] font-black uppercase leading-[0.9] tracking-[0.08em] md:text-[132px]"
            zhClassName="text-[22px] tracking-[0.24em] md:text-[36px]"
          />
          <div className="mt-14 font-mono text-[13px] uppercase tracking-[0.38em] text-black/55">
            {data.year}
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#888888]">
            {data.metadata.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="relative flex min-h-screen items-center px-6 py-36 md:px-20 lg:px-32">
        <Reveal>
          <DualText
            en={data.concept.en}
            zh={data.concept.zh}
            enClassName="font-mono text-[28px] uppercase leading-[1.8] tracking-[0.28em] md:text-[54px]"
            zhClassName="mt-8 max-w-[560px] text-[15px] leading-[2] tracking-[0.18em] md:text-[17px]"
          />
        </Reveal>
      </section>

      <section className="relative flex min-h-screen items-center px-6 py-36 md:px-20 lg:px-32">
        <Reveal>
          <div className="font-mono text-[34px] uppercase leading-[2.2] tracking-[0.28em] md:text-[68px]">
            {data.structure.map((line, index) => (
              <motion.div
                key={`${line}-${index}`}
                whileHover={{x: index % 2 === 0 ? 18 : -18}}
                transition={{duration: 0.7}}
                className={index % 2 === 0 ? 'text-black' : 'text-black/45'}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="relative flex min-h-screen items-center px-6 py-36 md:px-20 lg:px-32">
        <Reveal className="max-w-[760px]">
          <DualText
            en={data.statement.en}
            zh={data.statement.zh}
            enClassName="text-[34px] font-medium leading-[1.22] tracking-[0.04em] md:text-[64px]"
            zhClassName="mt-7 max-w-[540px] text-[16px] leading-[2] tracking-[0.18em] md:text-[18px]"
          />
        </Reveal>
      </section>

      <section className="relative flex min-h-screen items-center px-6 py-32 md:px-20 lg:px-32">
        <Reveal className="relative aspect-[16/10] w-full overflow-hidden bg-black/[0.03]">
          <motion.img
            src={data.image}
            alt={`${data.title.en} archive image`}
            className="cinematic-image h-full w-full object-cover"
            whileHover={{scale: 1.04, x: 10}}
            transition={{duration: 1.2, ease: [0.16, 1, 0.3, 1]}}
          />
          <div className="absolute inset-0 grain-overlay" />
        </Reveal>
      </section>

      <section className="relative flex min-h-screen items-center px-6 py-36 md:px-20 lg:px-32">
        <div className="max-w-[720px] space-y-24">
          {data.notes.map((note, index) => (
            <Reveal key={String(note.en)} delay={index * 0.12}>
              <DualText
                en={note.en}
                zh={note.zh}
                enClassName="text-[22px] font-medium leading-[1.5] tracking-[0.08em] md:text-[34px]"
                zhClassName="mt-4 max-w-[520px] text-[14px] leading-[2] tracking-[0.18em]"
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative min-h-[70vh] px-6 py-36 md:px-20 lg:px-32">
        <Reveal>
          <Link
            to="/"
            className="font-mono text-[10px] uppercase tracking-[0.36em] text-[#888888] transition-colors hover:text-black"
          >
            END OF RECORD / RETURN
          </Link>
        </Reveal>
      </section>
    </PageFade>
  );
};

export default function App() {
  return (
    <HashRouter>
      <AudioPlayer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:title" element={<FilmPage />} />
      </Routes>
    </HashRouter>
  );
}
