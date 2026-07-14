"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  featuredProjects,
  focusAreas,
  socialLinks,
  stack,
} from "@/lib/site-data";

const phrases = [
  "shipping agent-ready infrastructure",
  "building wallet-aware product flows",
  "designing reusable game systems",
  "turning experiments into working tools",
];

const chainNames = {
  "0x1": "Ethereum",
  "0x2105": "Base",
  "0xaa36a7": "Sepolia",
  "0x14a34": "Base Sepolia",
};

function shortAddress(address) {
  return address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "";
}

function formatNumber(value) {
  if (typeof value !== "number") return "—";
  return new Intl.NumberFormat("en", { notation: "compact" }).format(value);
}

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (name === "arrow") {
    return (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    );
  }

  if (name === "external") {
    return (
      <svg {...common}>
        <path d="M14 5h5v5" />
        <path d="M10 14 19 5" />
        <path d="M19 13v6H5V5h6" />
      </svg>
    );
  }

  if (name === "copy") {
    return (
      <svg {...common}>
        <rect x="8" y="8" width="11" height="11" rx="2" />
        <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  }

  if (name === "wallet") {
    return (
      <svg {...common}>
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H19v16H6.5A2.5 2.5 0 0 1 4 17.5z" />
        <path d="M4 7h15" />
        <path d="M15 12h4" />
      </svg>
    );
  }

  if (name === "sun") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    );
  }

  if (name === "moon") {
    return (
      <svg {...common}>
        <path d="M20 15.2A8 8 0 1 1 8.8 4 6.4 6.4 0 0 0 20 15.2Z" />
      </svg>
    );
  }

  if (name === "system") {
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    );
  }

  if (name === "star") {
    return (
      <svg {...common}>
        <path d="m12 3 2.75 5.57 6.15.9-4.45 4.33 1.05 6.12L12 17.03l-5.5 2.89 1.05-6.12L3.1 9.47l6.15-.9z" />
      </svg>
    );
  }

  if (name === "fork") {
    return (
      <svg {...common}>
        <circle cx="7" cy="5" r="2" />
        <circle cx="17" cy="5" r="2" />
        <circle cx="12" cy="19" r="2" />
        <path d="M7 7v3c0 2 1.5 3 3 3h2M17 7v3c0 2-1.5 3-3 3h-2v4" />
      </svg>
    );
  }

  if (name === "github") {
    return (
      <svg {...common}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7.3A5.7 5.7 0 0 0 19.3 3 5.3 5.3 0 0 0 19.1 0S17.9-.4 15 1.6a13.4 13.4 0 0 0-7 0C5.1-.4 3.9 0 3.9 0a5.3 5.3 0 0 0-.2 3A5.7 5.7 0 0 0 2.2 7.2c0 5.7 3.5 6.9 6.8 7.3A4.8 4.8 0 0 0 8 18v4" />
        <path d="M8 19c-3 .9-3-1.5-4-2" />
      </svg>
    );
  }

  if (name === "x") {
    return (
      <svg {...common}>
        <path d="M4 4l16 16M20 4 4 20" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg {...common}>
        <rect x="4" y="9" width="4" height="11" />
        <path d="M6 4v.01" />
        <path d="M12 20V9h4v2c1-2 5-2 5 2v7h-4v-6c0-2-2-2-2 0v6z" />
      </svg>
    );
  }

  if (name === "farcaster") {
    return (
      <svg {...common}>
        <path d="M5 5h14l-1 14M6 19 5 5M8 9h8M9 19l1-10M15 19l-1-10" />
      </svg>
    );
  }

  return null;
}

function ThemeToggle({ mode, onCycle }) {
  const labels = {
    system: { label: "System", icon: "system" },
    light: { label: "Light", icon: "sun" },
    dark: { label: "Dark", icon: "moon" },
  };
  const current = labels[mode] || labels.system;

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onCycle}
      aria-label={`Theme: ${current.label}. Click to change.`}
      title={`Theme: ${current.label}`}
    >
      <Icon name={current.icon} size={16} />
      <span>{current.label}</span>
    </button>
  );
}

function CopyButton({ value, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button className="copy-button" type="button" onClick={copy}>
      <Icon name={copied ? "check" : "copy"} size={15} />
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}

function ProjectCard({ project, stats }) {
  return (
    <a
      className="project-card"
      href={project.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.name} on GitHub`}
    >
      <div className="project-card-topline">
        <span className="project-category">{project.category}</span>
        <span className="external-icon">
          <Icon name="external" size={17} />
        </span>
      </div>
      <div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
      <div className="project-footer">
        <div className="stack-list" aria-label="Technology stack">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="repo-stats" aria-label="Live GitHub repository stats">
          <span>
            <Icon name="star" size={14} />
            {formatNumber(stats?.stars)}
          </span>
          <span>
            <Icon name="fork" size={14} />
            {formatNumber(stats?.forks)}
          </span>
        </div>
      </div>
    </a>
  );
}

export default function SiteShell() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [themeMode, setThemeMode] = useState("system");
  const [typed, setTyped] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [github, setGithub] = useState(null);
  const [wallet, setWallet] = useState({
    status: "idle",
    address: "",
    chainId: "",
  });

  const applyTheme = useCallback((mode) => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const resolved = mode === "system" ? (media.matches ? "dark" : "light") : mode;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themeMode = mode;
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("0xheycat-theme") || "system";
    setThemeMode(stored);
    applyTheme(stored);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if ((localStorage.getItem("0xheycat-theme") || "system") === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [applyTheme]);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    let delay = deleting ? 28 : 58;

    if (!deleting && typed === phrase) {
      delay = 1450;
    }

    if (deleting && typed === "") {
      delay = 260;
    }

    const timer = window.setTimeout(() => {
      if (!deleting && typed === phrase) {
        setDeleting(true);
        return;
      }

      if (deleting && typed === "") {
        setDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
        return;
      }

      setTyped(
        deleting
          ? phrase.slice(0, Math.max(0, typed.length - 1))
          : phrase.slice(0, typed.length + 1),
      );
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, phraseIndex, typed]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/github", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub stats unavailable");
        return response.json();
      })
      .then(setGithub)
      .catch(() => {});

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!window.ethereum) return undefined;

    const setAccounts = (accounts) => {
      setWallet((current) => ({
        ...current,
        status: accounts?.[0] ? "connected" : "idle",
        address: accounts?.[0] || "",
      }));
    };

    const setChain = (chainId) => {
      setWallet((current) => ({ ...current, chainId }));
    };

    window.ethereum.request({ method: "eth_accounts" }).then(setAccounts).catch(() => {});
    window.ethereum.request({ method: "eth_chainId" }).then(setChain).catch(() => {});
    window.ethereum.on?.("accountsChanged", setAccounts);
    window.ethereum.on?.("chainChanged", setChain);

    return () => {
      window.ethereum.removeListener?.("accountsChanged", setAccounts);
      window.ethereum.removeListener?.("chainChanged", setChain);
    };
  }, []);

  const cycleTheme = () => {
    const order = ["system", "light", "dark"];
    const next = order[(order.indexOf(themeMode) + 1) % order.length];
    localStorage.setItem("0xheycat-theme", next);
    setThemeMode(next);
    applyTheme(next);
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setWallet((current) => ({ ...current, status: "unavailable" }));
      return;
    }

    setWallet((current) => ({ ...current, status: "connecting" }));

    try {
      const [accounts, chainId] = await Promise.all([
        window.ethereum.request({ method: "eth_requestAccounts" }),
        window.ethereum.request({ method: "eth_chainId" }),
      ]);

      setWallet({
        status: accounts?.[0] ? "connected" : "idle",
        address: accounts?.[0] || "",
        chainId,
      });
    } catch {
      setWallet((current) => ({ ...current, status: "idle" }));
    }
  };

  const totalStars = useMemo(() => {
    if (!github?.repos) return null;
    return Object.values(github.repos).reduce(
      (total, repo) => total + (repo.stars || 0),
      0,
    );
  }, [github]);

  const walletLabel =
    wallet.status === "connected"
      ? shortAddress(wallet.address)
      : wallet.status === "connecting"
        ? "Connecting…"
        : "Connect wallet";

  return (
    <div className="site-root">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="0xheycat home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span>0xheycat</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#systems">Systems</a>
          <a href="#connect">Connect</a>
        </nav>

        <div className="header-actions">
          <ThemeToggle mode={themeMode} onCycle={cycleTheme} />
          <button className="wallet-button compact" type="button" onClick={connectWallet}>
            <Icon name="wallet" size={16} />
            <span>{walletLabel}</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot" />
              Independent builder · Indonesia
            </div>
            <h1>
              I build working systems for
              <span> AI, Web3, and games.</span>
            </h1>
            <p className="hero-description">
              0xheycat is where I ship wallet-aware products, agent workflows,
              developer infrastructure, and interactive game systems. Built to
              be used, tested, and improved in public.
            </p>

            <div className="type-line" aria-live="polite">
              <span className="prompt">~/now</span>
              <span>{typed}</span>
              <span className="cursor" aria-hidden="true" />
            </div>

            <div className="hero-actions">
              <a className="primary-button" href="#work">
                View selected work
                <Icon name="arrow" size={17} />
              </a>
              <button className="secondary-button" type="button" onClick={connectWallet}>
                <Icon name="wallet" size={17} />
                {walletLabel}
              </button>
            </div>
          </div>

          <div className="hero-visual" aria-label="0xheycat system status">
            <div className="signal-core">
              <div className="signal-ring ring-one" />
              <div className="signal-ring ring-two" />
              <div className="signal-ring ring-three" />
              <div className="core-mark">
                <span>0x</span>
                <strong>HC</strong>
              </div>
              <div className="orbit orbit-one">
                <span>AI</span>
              </div>
              <div className="orbit orbit-two">
                <span>ONCHAIN</span>
              </div>
              <div className="orbit orbit-three">
                <span>GAMES</span>
              </div>
            </div>

            <div className="status-panel">
              <div>
                <span>Build mode</span>
                <strong>Active</strong>
              </div>
              <div>
                <span>Wallet session</span>
                <strong className={wallet.status === "connected" ? "status-good" : ""}>
                  {wallet.status === "connected" ? shortAddress(wallet.address) : "Read-only"}
                </strong>
              </div>
              <div>
                <span>Network</span>
                <strong>{chainNames[wallet.chainId] || (wallet.chainId ? wallet.chainId : "Not connected")}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="metrics section-shell" aria-label="Live GitHub metrics">
          <div className="metric">
            <span>GitHub followers</span>
            <strong>{formatNumber(github?.profile?.followers)}</strong>
          </div>
          <div className="metric">
            <span>Public repositories</span>
            <strong>{formatNumber(github?.profile?.publicRepos)}</strong>
          </div>
          <div className="metric">
            <span>Selected project stars</span>
            <strong>{formatNumber(totalStars)}</strong>
          </div>
          <div className="metric metric-live">
            <span className="live-dot" />
            <span>{github ? "GitHub data live" : "Loading live data"}</span>
          </div>
        </section>

        <section className="work-section section-shell" id="work">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Selected work</span>
              <h2>Products and infrastructure with a real surface area.</h2>
            </div>
            <p>
              A focused set of public projects across agent infrastructure,
              onchain product design, and game development. Metrics are pulled
              live from GitHub.
            </p>
          </div>

          <div className="project-grid">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.repo}
                project={project}
                stats={github?.repos?.[project.repo]}
              />
            ))}
          </div>
        </section>

        <section className="systems-section section-shell" id="systems">
          <div className="section-heading compact-heading">
            <div>
              <span className="section-kicker">How I build</span>
              <h2>Useful interfaces on top of serious systems.</h2>
            </div>
          </div>

          <div className="focus-grid">
            {focusAreas.map((area) => (
              <div className="focus-card" key={area.index}>
                <span className="focus-index">{area.index}</span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </div>
            ))}
          </div>

          <div className="stack-panel">
            <div>
              <span className="section-kicker">Working stack</span>
              <p>
                Tools change. The standard does not: clear product direction,
                real integrations, controlled execution, and evidence that the
                system works.
              </p>
            </div>
            <div className="stack-cloud">
              {stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="connect-section section-shell" id="connect">
          <div className="connect-card">
            <div className="connect-copy">
              <span className="section-kicker">Connect</span>
              <h2>Follow the work where it ships.</h2>
              <p>
                GitHub for the systems, X for build updates, and Farcaster for
                onchain experiments and product notes.
              </p>
              <div className="handle-row">
                <code>@0xheycat</code>
                <CopyButton value="@0xheycat" label="Copy handle" />
              </div>
            </div>

            <div className="social-grid">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                >
                  <span className="social-icon">
                    <Icon name={social.icon} size={18} />
                  </span>
                  <span>
                    <strong>{social.label}</strong>
                    <small>{social.handle}</small>
                  </span>
                  <Icon name="external" size={16} />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <span>© {new Date().getFullYear()} 0xheycat</span>
        <span>Built for the open web.</span>
      </footer>

      {wallet.status === "unavailable" ? (
        <div className="toast" role="status">
          No injected wallet detected. The site remains fully available in read-only mode.
        </div>
      ) : null}
    </div>
  );
}
