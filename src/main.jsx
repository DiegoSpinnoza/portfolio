import React from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion, domAnimation, useReducedMotion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import {
  ArrowDownToLine,
  ArrowUpRight,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  X,
  Star,
  GitFork,
} from "lucide-react";
import "./styles.css";

const GITHUB_USER = "diegospinnoza";
const CV_URL = "/curriculum-diego-espinoza.pdf";
const pageLoadStartedAt = typeof performance !== "undefined" ? performance.now() : Date.now();

const backgroundProjectsImages = {
  florida: "/images/florida.png",
  carta: "/images/carta.png",
};

const projectCardBackgrounds = {
  florida: "/images/florida-background.jpg",
  carta: "/images/carta-background.jpg",
};


const fallbackProjects = [
  {
    id: "01",
    name: "Ovomenú",
    description: "Menú QR como plataforma SaaS para digitalizar la gestión de restaurantes.",
    cardSummary: "Menú QR, gestión de restaurantes, plataforma SaaS.",
    tags: ["Producto digital", "SaaS", "UX/UI"],
    year: "2024",
    visual: "ovomenu",
    link_url: "https://ovomenucard.dpdns.org/",
    link_label: "Abrir Ovomenú",
    site_url: "https://ovomenucard.dpdns.org/",
    html_url: null,
    language: null,
    stargazers_count: 0,
    forks_count: 0,
  },
  {
    id: "02",
    name: "Bar Cívico",
    githubRepoName: "carta",
    description: "Digitalización de una carta física, adaptada a una experiencia web clara y accesible.",
    cardSummary: "Carta digital, menú online, gestión de contenidos.",
    tags: ["Diseño web", "Frontend", "Responsive"],
    year: "2023",
    visual: "bar",
    site_url: "https://civico.cl/",
    html_url: null,
    language: null,
    stargazers_count: 0,
    forks_count: 0,
  },
  {
    id: "03",
    name: "Gestión deportiva",
    githubRepoName: "florida",
    description: "Aplicación web para el control, la gestión y la información de un club deportivo.",
    cardSummary: "Gestión de club deportivo, resultados, partidos, arriendos.",
    tags: ["Dashboard", "Producto", "Datos"],
    year: "2024",
    visual: "sports",
    site_url: "https://florida-psi.vercel.app/",
    html_url: null,
    language: null,
    stargazers_count: 0,
    forks_count: 0,
  },
  {
    id: "04",
    name: "BDAT",
    githubRepoName: "BDAT",
    description: "Sistema de análisis óseo mediante ondas de ultrasonido para apoyar el diagnóstico clínico.",
    cardSummary: "Ultrasonido óseo, análisis de ondas, visualización científica.",
    tags: ["Healthtech", "Investigación", "Interfaz"],
    year: "2023",
    visual: "bdat",
    html_url: "https://github.com/DiegoSpinnoza/BDAT",
    language: "Jupyter Notebook",
    stargazers_count: 0,
    forks_count: 0,
  },
];

const repoDescriptionFallbacks = {
  bdat: "Aplicación para simular y visualizar la propagación de ondas guiadas en hueso cortical, con análisis científico y gráficos interactivos.",
  carta: "Sistema de carta digital para restaurantes con menú público para clientes y panel de administración, conectado a una API y Supabase.",
  florida: "Plataforma web para un club deportivo que reúne resultados, partidos, tabla, plantel, convocatorias y gestión de arriendos.",
};

const skills = [
  {
    name: "Lenguajes",
    type: "JavaScript, TypeScript, Python, Java, C++",
    icons: [
      ["JavaScript", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"],
      ["TypeScript", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"],
      ["Python", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"],
      ["Java", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"],
      ["C++", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"],
    ],
  },
  {
    name: "Frontend",
    type: "React, Next.js, Tailwind CSS",
    icons: [
      ["React", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"],
      ["Next.js", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"],
      ["Tailwind CSS", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"],
    ],
  },
  {
    name: "Backend",
    type: "Node.js, Express.js, GraphQL",
    icons: [
      ["Node.js", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"],
      ["Express.js", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"],
      ["GraphQL", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg"],
    ],
  },
  {
    name: "Bases de datos",
    type: "PostgreSQL, MySQL, MongoDB, Redis, Supabase, Firebase",
    icons: [
      ["PostgreSQL", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"],
      ["MySQL", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"],
      ["MongoDB", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"],
      ["Redis", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg"],
      ["Supabase", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg"],
      ["Firebase", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"],
    ],
  },
  {
    name: "Infraestructura y versiones",
    type: "Docker, Vercel, Git, GitHub",
    icons: [
      ["Docker", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"],
      ["Vercel", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg"],
      ["Git", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"],
      ["GitHub", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"],
    ],
  },
];

const langColors = {
  JavaScript: "bg-[#f7df1e]",
  TypeScript: "bg-[#3178c6]",
  Python: "bg-[#3776ab]",
  Java: "bg-[#ed8b00]",
  "C++": "bg-[#f34b7d]",
  "C#": "bg-[#239120]",
  Go: "bg-[#00add8]",
  Rust: "bg-[#dea584]",
  PHP: "bg-[#777bb4]",
  Ruby: "bg-[#cc342d]",
  Vue: "bg-[#42b883]",
  "Jupyter Notebook": "bg-[#f37626]",
};

function useGithubProjects() {
  const [projects, setProjects] = React.useState(fallbackProjects);
  const [status, setStatus] = React.useState("loading");

  React.useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 4500);

    async function loadProjects() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100&type=public`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error("GitHub API error");

        const repos = await response.json();
        const publicRepos = repos.filter((repo) => !repo.fork && repo.name.toLowerCase() !== "diegospinnoza");
        const repoByName = new Map(publicRepos.map((repo) => [repo.name.toLowerCase(), repo]));
        const featuredNames = new Set(fallbackProjects
          .slice(0, 4)
          .map((project) => (project.githubRepoName || project.name).toLowerCase()));
        const featured = fallbackProjects.slice(0, 4).map((project) => {
          const repo = repoByName.get((project.githubRepoName || project.name).toLowerCase());
          const githubDescription = repo?.description?.trim();
          return {
            ...project,
            description: githubDescription || repoDescriptionFallbacks[repo?.name?.toLowerCase()] || project.description,
            github_description: githubDescription || null,
            html_url: repo?.html_url || project.html_url,
            language: repo?.language || project.language,
            stargazers_count: repo?.stargazers_count ?? project.stargazers_count,
            forks_count: repo?.forks_count ?? project.forks_count,
          };
        });
        const otherRepos = publicRepos
          .filter((repo) => !repo.fork)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.updated_at) - new Date(a.updated_at)
          )
          .filter((repo) => !featuredNames.has(repo.name.toLowerCase()))
          .slice(0, 8);

        if (active) {
          if (publicRepos.length > 0) {
            setProjects([...featured, ...otherRepos]);
            setStatus("loaded");
          } else {
            setStatus("fallback");
          }
        }
      } catch {
        if (active) setStatus("fallback");
      }
    }

    loadProjects();
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return { projects, status };
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
    if (image.complete) resolve();
  });
}

function useCriticalAssets() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    const fontReady = document.fonts?.ready || Promise.resolve();
    const fontTimeout = new Promise((resolve) => window.setTimeout(resolve, 3500));

    Promise.all([
      preloadImage("/images/hero-vintage.png"),
      preloadImage("/images/diego-profile.jpg"),
      Promise.race([fontReady, fontTimeout]),
    ]).then(() => {
      if (active) setReady(true);
    });

    return () => { active = false; };
  }, []);

  return ready;
}

function usePreloadedPdf() {
  const [pdf, setPdf] = React.useState({ src: CV_URL, ready: false });

  React.useEffect(() => {
    let active = true;
    let objectUrl = null;
    const controller = new AbortController();

    fetch(CV_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("No se pudo cargar el currículum");
        return response.blob();
      })
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        if (active) setPdf({ src: objectUrl, ready: true });
      })
      .catch(() => {
        if (active) setPdf({ src: CV_URL, ready: true });
      });

    return () => {
      active = false;
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  return pdf;
}

function Nav() {
  return (
    null
  );
}

function Hero({ onOpenCv, activeSection, isShrinking }) {
  return (
    <section id="top" className={`editorial-hero reference-hero${isShrinking ? " is-shrinking" : ""}`}>
      <div className="editorial-top" data-reveal>
        <a className="editorial-name" href="#top">Diego<br />Espinoza</a>
      </div>
      <img className="hero-portrait" data-reveal src="/images/hero-vintage.png" alt="Retrato artístico de Diego Espinoza" />
      <div className="editorial-headline" data-reveal>
        <div className="editorial-title">
          <span className="headline-one">DESARROLLADOR</span>
          <span className="headline-two">FULL STACK</span>
        </div>
        <p className="hero-greeting">Diego Espinoza, ingeniero informático de Valparaíso, Chile. Diseño y desarrollo experiencias digitales.</p>
      </div>
      <div className="fixed bottom-5 left-0 right-0 z-[60] flex w-full items-center justify-center px-[14px] text-[#dededb]/60 pointer-events-none max-[700px]:bottom-3 max-[700px]:px-2">
        <nav id="main-dock" className="pointer-events-auto mx-auto flex w-max max-w-full items-center justify-center gap-[clamp(8px,2.5vw,34px)] border border-[#dededb]/10 bg-[#090807] px-[18px] py-[14px] uppercase shadow-[0_10px_32px_rgba(0,0,0,.48),inset_0_1px_rgba(222,222,219,.025)] transition-none max-[700px]:max-w-[calc(100vw-16px)] max-[700px]:gap-[5px] max-[700px]:px-2 max-[700px]:py-[10px]" aria-label="Navegación principal">
          <a className={`inline-flex items-center gap-2 rounded-[4px] px-[4px] py-1 pr-[9px] text-[12px] text-[#dededb]/75 no-underline transition-colors hover:text-[#f0f0ed] max-[700px]:gap-[5px] max-[700px]:pr-[6px] max-[700px]:text-[9px] max-[700px]:px-[5px]${activeSection === "top" ? " !bg-[#d0c5ab] !text-[#11100d]" : ""}`} aria-current={activeSection === "top" ? "location" : undefined} href="#top">
            <img className="h-7 w-7 rounded-[4px] border border-[#dededb]/40 object-cover max-[700px]:h-6 max-[700px]:w-6" src="/images/diego-profile.jpg" alt="Diego Espinoza" />
            <span>Yo!</span>
          </a>
          {[["projects", "Proyectos"], ["skills", "Stack"], ["contact", "Contacto"]].map(([id, label]) => (
            <a key={id} className={`rounded-sm border-0 bg-transparent px-[9px] py-[7px] text-[12px] text-[#dededb]/75 no-underline transition-colors hover:text-[#f0f0ed] max-[700px]:px-[5px] max-[700px]:py-[6px] max-[700px]:text-[9px]${activeSection === id ? " !bg-[#d0c5ab] !text-[#11100d]" : ""}`} aria-current={activeSection === id ? "location" : undefined} href={`#${id}`}>{label}</a>
          ))}
        </nav>
      </div>
    </section>
  );
}

function ScrollReveal({ as = "div", children, className = "", style, preserveColors = false, ...props }) {
  const ref = React.useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const MotionElement = m[as];
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const exitProgress = useTransform(scrollYProgress, (progress) => {
    const targetHeight = Math.max(ref.current?.offsetHeight || 1, 1);
    const viewportHeight = window.innerHeight || 1;
    const targetTop = viewportHeight - progress * (viewportHeight + targetHeight);
    const targetBottom = targetTop + targetHeight;
    const visibleHeight = Math.max(0, Math.min(targetBottom, viewportHeight) - Math.max(targetTop, 0));
    const visibleLimit = Math.min(targetHeight, viewportHeight);
    return Math.max(0, Math.min(1, 1 - visibleHeight / visibleLimit));
  });
  const scale = useTransform(exitProgress, [0, 1], [1, preserveColors ? 0.94 : 0.84]);
  const opacity = useTransform(exitProgress, [0, 1], [1, 0]);

  return (
    <MotionElement
      ref={ref}
      className={`scroll-motion ${className}`.trim()}
      style={{ ...style, scale: shouldReduceMotion ? 1 : scale, opacity: shouldReduceMotion || preserveColors ? 1 : opacity }}
      {...props}
    >
      {children}
    </MotionElement>
  );
}

function SectionHeader({ title, count }) {
  return (
    <ScrollReveal className="mb-10 flex items-baseline justify-between pb-5">
      <h2 className="section-display-title">{title}</h2>
      {count ? (
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/40">{count}</span>
      ) : null}
    </ScrollReveal>
  );
}

function ProjectCard({ project, onSelect }) {
  const publicUrl = project.site_url || project.link_url;
  const tags = Array.isArray(project.tags)
    ? project.tags.filter(Boolean)
    : [project.language].filter(Boolean);

  return (
    <ScrollReveal as="article" className="project-card group" preserveColors>
      <button className="project-card-hit" aria-label={`Ver proyecto ${project.name}`} type="button" onClick={() => onSelect(project)}>
        <ProjectVisual project={project} />
        <span className="project-content">
          <span className="project-heading">
            <span className="project-description">{project.cardSummary || project.description}</span>
          </span>
          <span className="project-footer">
            <span className="tag-list">{tags.length ? tags.join(", ") : "Proyecto de software"}</span>
          </span>
        </span>
      </button>
      {publicUrl ? (
        <a className="project-link" href={publicUrl} target="_blank" rel="noreferrer">
          <span>Ver proyecto</span>
          <ExternalLink size={14} />
        </a>
      ) : null}
    </ScrollReveal>
  );
}

function ProjectVisual({ project }) {
  if (project.visual === "ovomenu") {
    return (
      <span className="visual visual-ovo" aria-hidden="true">
        <span className="ovo-orbit orbit-one" />
        <span className="ovo-orbit orbit-two" />
        <span className="phone">
          <span className="phone-top"><span>OVO</span><i /></span>
          <span className="phone-hero"><span>MENÚ DIGITAL</span><span>Todo lo que te gusta,<br />en un solo lugar.</span></span>
          <span className="food-row"><i /><i /><i /></span>
          <span className="food-card"><i /><span><b>Especial de la casa</b><small>Ingredientes frescos</small></span><strong>•••</strong></span>
        </span>
        <span className="visual-word">OVOMENÚ</span>
      </span>
    );
  }

  if (project.visual === "sports") {
    return (
      <span className="visual visual-sports" aria-hidden="true">
        <span className="visual-backdrop">
          <img src="/images/florida-background.jpg" alt="" />
        </span>
        <span className="visual-screen sport-window">
          <img src="/images/florida.png" alt="Captura de la aplicación Florida" loading="lazy" />
        </span>
      </span>
    );
  }

  if (project.visual === "bdat") {
    return (
      <span className="visual visual-bdat" aria-hidden="true">
        <span className="scan-interface">
          <span className="scan-top"><span>BDAT / ANÁLISIS ÓSEO</span><i>ULTRASONIDO</i></span>
          <span className="bone-scan"><span className="scan-grid" />
            <svg viewBox="0 0 480 220">
              <path d="M40 141c34-4 50-49 84-45 39 4 52 75 92 70 41-5 57-102 99-102 44 0 60 78 125 61" />
              <path d="M40 159c38-2 52-39 85-35 38 5 49 66 89 61 41-4 60-89 101-89 43 0 63 63 125 52" />
            </svg>
            <span className="scan-marker"><i /><span>SEÑAL</span></span>
          </span>
          <span className="scan-stats"><span><small>LECTURA</small>Ultrasonido</span><span><small>ANÁLISIS</small>Estructura ósea</span></span>
        </span>
      </span>
    );
  }

  return (
    <span className="visual visual-bar" aria-hidden="true">
      <span className="visual-backdrop">
        <img src={projectCardBackgrounds.carta} alt="" />
      </span>
      <span className="visual-screen bar-window">
        <img src={backgroundProjectsImages.carta} alt="" loading="lazy" />
      </span>
    </span>
  );
}

function Projects({ onSelectProject, projects = fallbackProjects }) {
  return (
    <section id="projects" className="section-wrap portfolio-projects">
      <div className="projects-intro">
        <ScrollReveal as="h2" className="section-display-title page-title">Proyectos.</ScrollReveal>
      </div>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id || project.html_url} project={project} onSelect={onSelectProject} />
        ))}
      </div>
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  const [isClosing, setIsClosing] = React.useState(false);
  const closeTimer = React.useRef(null);
  const isOpen = Boolean(project);

  React.useEffect(() => {
    setIsClosing(false);
    return () => window.clearTimeout(closeTimer.current);
  }, [project]);

  const handleClose = React.useCallback(() => {
    if (!isOpen || isClosing) return;
    setIsClosing(true);
    closeTimer.current = window.setTimeout(onClose, 240);
  }, [isOpen, isClosing, onClose]);

  React.useEffect(() => {
    if (!project) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") handleClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, handleClose]);

  if (!project) return null;

  const language = project.language || "-";
  const dotClass = langColors[project.language] || "bg-[#5de8c8]";
  const projectLink = project.link_url || project.html_url;

  return (
    <div className={`modal-shell${isClosing ? " is-closing" : ""}`} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <button className="modal-backdrop" type="button" aria-label="Cerrar modal" onClick={handleClose} />
      <div className="modal-panel">
        <div className="flex w-full justify-center px-6 pt-4">
          <button className="grid h-8 w-8 place-items-center border-0 bg-transparent p-0 text-[#dededb]" type="button" aria-label="Cerrar modal" onClick={handleClose}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <div className="border-b border-line px-6 pb-6 pt-3">
          <div>
            <p className="modal-eyebrow font-mono text-[11px] uppercase tracking-[0.16em]">Proyecto</p>
            <h3 id="project-modal-title" className="mt-2 text-3xl font-bold leading-tight text-ink">
              {project.name.replace(/-/g, " ")}
            </h3>
          </div>
        </div>
        <div className="space-y-6 p-6">
          <p className="text-base leading-8 text-ink/60">
            {project.description || "Este repositorio no tiene descripcion publica en GitHub, pero forma parte de mi trabajo y exploracion tecnica."}
          </p>
          {projectLink ? (
            <div className="grid gap-px border border-line bg-line sm:grid-cols-3">
              <div className="bg-mist p-4">
                <p className="modal-kicker">Lenguaje</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-ink">
                  <span className={`h-2 w-2 rounded-full ${dotClass}`} />
                  {language}
                </p>
              </div>
              <div className="bg-mist p-4">
                <p className="modal-kicker">Stars</p>
                <p className="mt-2 text-sm font-semibold text-ink">{project.stargazers_count}</p>
              </div>
              <div className="bg-mist p-4">
                <p className="modal-kicker">Forks</p>
                <p className="mt-2 text-sm font-semibold text-ink">{project.forks_count}</p>
              </div>
            </div>
          ) : null}
          <div className="flex flex-wrap gap-3">
            {projectLink ? (
              <a className="btn-primary" href={projectLink} target="_blank" rel="noreferrer">
                {project.link_url ? <ExternalLink size={16} /> : <Github size={16} />}
                {project.link_label || "Ver en GitHub"}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function PageLoader({ ready, complete, onComplete }) {
  const [leaving, setLeaving] = React.useState(false);
  const [destination, setDestination] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!ready) return undefined;

    const minimumLoadingTime = 1500;
    const waitForMinimum = Math.max(0, minimumLoadingTime - (performance.now() - pageLoadStartedAt));
    const minimumTimer = window.setTimeout(() => {
      setDestination({ x: 0, y: -window.innerHeight / 2 + 40 });
      window.requestAnimationFrame(() => setLeaving(true));
    }, waitForMinimum);
    const finishTimer = window.setTimeout(onComplete, waitForMinimum + 760);
    return () => {
      window.clearTimeout(minimumTimer);
      window.clearTimeout(finishTimer);
    };
  }, [ready, onComplete]);

  if (complete) return <span className="page-loader-docked-oval" aria-hidden="true" />;

  return (
    <div
      className={`page-loader${leaving ? " is-leaving" : ""}${complete ? " is-complete" : ""}`}
      style={{
        "--loader-dx": `${destination.x}px`,
        "--loader-dy": `${destination.y}px`,
      }}
      role="status"
      aria-label={complete ? "Portfolio listo" : "Cargando portfolio"}
      aria-live={complete ? "off" : "polite"}
    >
      <span className="page-loader-oval" aria-hidden="true" />
      <span className="sr-only">{leaving ? "Listo" : "Cargando contenido"}</span>
    </div>
  );
}

function CvModal({ open, onClose, pdfSrc }) {
  const [isClosing, setIsClosing] = React.useState(false);
  const closeTimer = React.useRef(null);

  React.useEffect(() => {
    setIsClosing(false);
    return () => window.clearTimeout(closeTimer.current);
  }, [open]);

  const handleClose = React.useCallback(() => {
    if (!open || isClosing) return;
    setIsClosing(true);
    closeTimer.current = window.setTimeout(onClose, 240);
  }, [open, isClosing, onClose]);

  React.useEffect(() => {
    if (!open) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") handleClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div className={`modal-shell${isClosing ? " is-closing" : ""}`} role="dialog" aria-modal="true" aria-labelledby="cv-modal-title">
      <button className="modal-backdrop" type="button" aria-label="Cerrar modal" onClick={handleClose} />
      <div className="modal-panel max-w-4xl">
        <div className="flex w-full justify-center px-6 pt-4">
          <button className="grid h-8 w-8 place-items-center border-0 bg-transparent p-0 text-[#dededb]" type="button" aria-label="Cerrar modal" onClick={handleClose}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <div className="border-b border-line px-6 pb-6 pt-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cobalt">Curriculum</p>
            <h3 id="cv-modal-title" className="mt-2 text-3xl font-bold leading-tight text-ink">
              Diego Espinoza
            </h3>
          </div>
        </div>
        <div className="p-6">
          <iframe className="h-[58vh] w-full border border-line bg-white" src={pdfSrc} title="Curriculum Diego Espinoza" />
          <p className="mt-3 text-sm leading-6 text-ink/50">
            Si el PDF no se visualiza, usa Abrir o Descargar. El archivo debe estar en la carpeta public del proyecto.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a className="btn-primary" href={pdfSrc} target="_blank" rel="noreferrer">
              <ExternalLink size={16} />
              Abrir
            </a>
            <a className="btn-secondary" href={pdfSrc} download="curriculum-diego-espinoza.pdf">
              <ArrowDownToLine size={16} />
              Descargar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-wrap">
      <SectionHeader title="Stack técnico." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map(({ name, type, icons }) => (
          <ScrollReveal key={name} as="div" className="skill-card bg-mist p-6">
            <div className="mb-5 flex min-h-12 flex-wrap items-center gap-2">
              {icons.map(([label, src]) => (
                <img
                  key={label}
                  className="h-8 w-8 object-contain"
                  src={src}
                  alt={label}
                  title={label}
                  loading="lazy"
                />
              ))}
            </div>
            <h3 className="skill-card-title text-lg font-bold">{name}</h3>
            <p className="skill-card-type mt-2 text-sm leading-6">{type}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function Contact({ onOpenCv }) {
  const items = [
    {
      label: "GitHub",
      value: "Ver perfil",
      href: `https://github.com/${GITHUB_USER}`,
      icon: Github,
    },
    {
      label: "Email",
      value: "Enviar correo",
      href: "mailto:diegoandreslam@gmail.com",
      icon: Mail,
    },
    {
      label: "LinkedIn",
      value: "Ver perfil profesional",
      href: "https://www.linkedin.com/in/diego-espinoza-3a1202184/",
      icon: Linkedin,
    },
    {
      label: "CV / Curriculum",
      value: "Ver currículum",
      onClick: onOpenCv,
      icon: FileText,
    },
  ];

  return (
    <section id="contact" className="section-wrap">
      <SectionHeader title="Contacto." />
      <div className="contact-grid grid gap-4 md:grid-cols-2">
        {items.map(({ label, value, href, onClick, icon: Icon }) => {
          const Card = onClick ? "button" : "a";
          const cardProps = onClick
            ? { type: "button", onClick }
            : { href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer" };

          return (
          <ScrollReveal key={label} as={Card} className="contact-card group flex items-center gap-5 bg-mist p-7 transition" {...cardProps}>
            <Icon className="contact-card-icon shrink-0 transition" size={24} />
            <div className="min-w-0">
              <p className="contact-card-label font-mono text-[10px] uppercase tracking-[0.14em]">{label}</p>
              <p className="contact-card-value mt-1 truncate text-base font-semibold">{value}</p>
            </div>
          </ScrollReveal>
        );})}
      </div>
    </section>
  );
}

function App() {
  const { projects, status: projectsStatus } = useGithubProjects();
  const criticalAssetsReady = useCriticalAssets();
  const { src: pdfSrc, ready: pdfReady } = usePreloadedPdf();
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [cvOpen, setCvOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("top");
  const [heroShrinking, setHeroShrinking] = React.useState(false);
  const [loaderComplete, setLoaderComplete] = React.useState(false);
  const handleLoaderComplete = React.useCallback(() => setLoaderComplete(true), []);
  const pageReady = criticalAssetsReady && pdfReady && projectsStatus !== "loading";

  React.useEffect(() => {
    let frame = 0;
    const updateHeroScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setHeroShrinking(window.scrollY > 28);
        frame = 0;
      });
    };
    window.addEventListener("scroll", updateHeroScroll, { passive: true });
    updateHeroScroll();
    return () => {
      window.removeEventListener("scroll", updateHeroScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  React.useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const sections = ["projects", "skills", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const active = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
      if (active) setActiveSection(active.target.id);
    }, { rootMargin: "-18% 0px -68% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActiveSection("top");
    }, { threshold: 0.08 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const hero = document.querySelectorAll("#top [data-reveal]");
    if (!hero.length) return undefined;
    if (!("IntersectionObserver" in window)) {
      hero.forEach((target) => target.classList.add("is-visible"));
      return undefined;
    }

    let previousScrollY = window.scrollY;
    const observer = new IntersectionObserver((entries) => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY >= previousScrollY ? 1 : -1;
      previousScrollY = currentScrollY;
      entries.forEach((entry) => {
        const target = entry.target;
        target.style.setProperty("--reveal-offset", entry.isIntersecting
          ? `${scrollDirection * 42}px`
          : `${scrollDirection * -42}px`);
        target.classList.toggle("is-visible", entry.isIntersecting);
      });
    }, { threshold: 0.08 });
    hero.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero onOpenCv={() => setCvOpen(true)} activeSection={activeSection} isShrinking={heroShrinking} />
        <Projects projects={projects} onSelectProject={setSelectedProject} />
        <Skills />
        <Contact onOpenCv={() => setCvOpen(true)} />
      </main>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} pdfSrc={pdfSrc} />
      <PageLoader ready={pageReady} complete={loaderComplete} onComplete={handleLoaderComplete} />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <LazyMotion features={domAnimation}>
    <App />
  </LazyMotion>
);
