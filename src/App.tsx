/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useEffect, useMemo, useState} from 'react';
import {HashRouter, Link, Route, Routes, useLocation, useNavigate, useParams} from 'react-router-dom';

type DualCopy = {
  en: string;
  zh: string;
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
    structure: ['LEFT TO RIGHT', 'RIGHT TO LEFT', 'BLACK AND WHITE', 'COLOR'],
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
    structure: ['LEVEL 01', 'LEVEL 02', 'LEVEL 03', 'LIMBO'],
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
    structure: ['FORWARD EVENT', 'INVERTED EVENT', 'SATOR SQUARE', 'TEMPORAL PINCER'],
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

const categories = Array.from(new Set(films.flatMap((film) => film.metadata)));

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (sectionId: string) => {
    const scroll = () => document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth', block: 'start'});

    if (location.pathname === '/') {
      scroll();
      return;
    }

    navigate('/');
    window.setTimeout(scroll, 0);
  };

  return (
    <header className="site-header" id="top">
      <Link to="/" className="brand-link" aria-label="Christopher Nolan Archive home">
        C.N
      </Link>
      <nav className="main-nav" aria-label="Primary navigation">
        <button type="button" onClick={() => goToSection('works')}>
          Works
        </button>
        <button type="button" onClick={() => goToSection('preview')}>
          Preview
        </button>
        <button type="button" onClick={() => goToSection('information')}>
          Information
        </button>
        <button type="button" onClick={() => goToSection('contact')}>
          Contact
        </button>
      </nav>
    </header>
  );
}

function DualLine({en, zh, className = ''}: DualCopy & {className?: string}) {
  return (
    <div className={`dual-line ${className}`}>
      <p>{en}</p>
      <p>{zh}</p>
    </div>
  );
}

function Home() {
  const [activeId, setActiveId] = useState(films[1].id);
  const activeFilm = useMemo(() => filmMap[activeId] ?? films[0], [activeId]);

  return (
    <main>
      <Nav />

      <section className="home-cover" aria-labelledby="site-title">
        <div className="cover-mark">C.N</div>
        <div className="cover-copy">
          <h1 id="site-title">Christopher Nolan Archive</h1>
          <p>
            A typographic research index for cinematic structures, nonlinear time, memory systems, and the
            physical behavior of narrative.
          </p>
        </div>
      </section>

      <section className="works-section" id="works" aria-labelledby="works-title">
        <div className="section-kicker">
          <h2 id="works-title">Works</h2>
          <span>Selected Film Structures</span>
        </div>

        <div className="work-list">
          {films.map((film) => (
            <article
              className="work-row"
              key={film.id}
              onMouseEnter={() => setActiveId(film.id)}
              onFocus={() => setActiveId(film.id)}
            >
              <Link to={`/film/${film.id}`} className="work-title">
                <span>{film.title.en}</span>
                <span>{film.title.zh}</span>
              </Link>
              <p className="work-description">{film.statement.en}</p>
              <div className="work-meta">
                <span>{film.year}</span>
                <span>{film.metadata.join(' / ')}</span>
              </div>
              <Link to={`/film/${film.id}`} className="text-link">
                See More
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="preview-section" id="preview" aria-labelledby="preview-title">
        <div className="section-kicker">
          <h2 id="preview-title">Preview</h2>
          <span>{activeFilm.title.en}</span>
        </div>
        <div className="preview-grid">
          <figure className="preview-image">
            <img src={activeFilm.image} alt={`${activeFilm.title.en} preview`} />
          </figure>
          <div className="preview-copy">
            <DualLine en={activeFilm.concept.en} zh={activeFilm.concept.zh} />
            <ul>
              {activeFilm.keywords.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="info-section" id="information" aria-labelledby="information-title">
        <div className="section-kicker">
          <h2 id="information-title">Information</h2>
          <span>Design Method</span>
        </div>
        <div className="info-copy">
          <p>
            This archive treats filmography as a graphic design system. Titles, dates, categories, and short
            analytical fragments are arranged as documents rather than posters, allowing the structure of each film
            to become the interface.
          </p>
          <p>
            The redesign references research-office portfolios: plain navigation, typographic hierarchy, long-form
            project indexing, visible metadata, and restrained black-and-white material.
          </p>
        </div>
        <div className="category-grid" aria-label="Archive categories">
          {categories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="section-kicker">
          <h2 id="contact-title">Contact</h2>
          <span>Archive Note</span>
        </div>
        <p>
          C.N Archive. A study page for nonlinear cinema, typographic records, and structural reading.
        </p>
        <button
          type="button"
          className="text-link inline-action"
          onClick={() => document.getElementById('top')?.scrollIntoView({behavior: 'smooth', block: 'start'})}
        >
          Back To Top
        </button>
      </section>
    </main>
  );
}

function FilmPage() {
  const {title} = useParams<{title: string}>();
  const {pathname} = useLocation();
  const data = title ? filmMap[title] : null;

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'auto'});
  }, [pathname]);

  if (!data) {
    return (
      <main>
        <Nav />
        <section className="not-found">
          <p>Record not found.</p>
          <Link to="/" className="text-link">
            Return To Archive
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <Nav />
      <article className="project-page">
        <header className="project-hero">
          <div>
            <p className="project-index">{data.year}</p>
            <h1>{data.title.en}</h1>
            <p className="project-zh">{data.title.zh}</p>
          </div>
          <Link to="/" className="text-link">
            Back
          </Link>
        </header>

        <figure className="project-image">
          <img src={data.image} alt={`${data.title.en} archive material`} />
        </figure>

        <section className="project-section">
          <h2>Concept</h2>
          <DualLine en={data.concept.en} zh={data.concept.zh} />
        </section>

        <section className="project-section">
          <h2>Structure</h2>
          <ol className="structure-list">
            {data.structure.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>

        <section className="project-section">
          <h2>Statement</h2>
          <DualLine en={data.statement.en} zh={data.statement.zh} />
        </section>

        <section className="project-section">
          <h2>Notes</h2>
          <div className="note-list">
            {data.notes.map((note) => (
              <DualLine key={note.en} en={note.en} zh={note.zh} />
            ))}
          </div>
        </section>

        <footer className="project-footer">
          <span>{data.metadata.join(' / ')}</span>
          <Link to="/" className="text-link">
            End Of Record / Return
          </Link>
        </footer>
      </article>
    </main>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:title" element={<FilmPage />} />
      </Routes>
    </HashRouter>
  );
}
