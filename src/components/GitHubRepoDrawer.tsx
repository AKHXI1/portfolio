import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Star,
  GitFork,
  ExternalLink,
  Code2,
  BookOpen,
  X,
  Copy,
  Check,
  RefreshCw,
  FolderGit2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { playSound } from '../utils/sound';
import { GithubIcon } from './Icons';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  topics?: string[];
  updated_at: string;
  default_branch: string;
}

const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: 'spotify-lyrics-translater',
    full_name: 'AKHXI1/spotify-lyrics-translater',
    html_url: 'https://github.com/AKHXI1/spotify-lyrics-translater',
    homepage: null,
    description: 'Real-time Spotify lyrics translator and Romanized phonetic explainer.',
    language: 'JavaScript',
    stargazers_count: 1,
    forks_count: 0,
    fork: false,
    topics: ['spotify', 'lyrics', 'javascript'],
    updated_at: '2026-03-01T00:00:00Z',
    default_branch: 'main'
  },
  {
    id: 2,
    name: 'call-tracker-for-Buisness-development-associates',
    full_name: 'AKHXI1/call-tracker-for-Buisness-development-associates',
    html_url: 'https://github.com/AKHXI1/call-tracker-for-Buisness-development-associates',
    homepage: null,
    description: 'Call tracking web tool for Business Development Associates.',
    language: 'HTML',
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    topics: ['html', 'crm'],
    updated_at: '2025-10-15T00:00:00Z',
    default_branch: 'main'
  },
  {
    id: 3,
    name: 'wedding-invitation-',
    full_name: 'AKHXI1/wedding-invitation-',
    html_url: 'https://github.com/AKHXI1/wedding-invitation-',
    homepage: null,
    description: 'Digital wedding invitation experience built with custom CSS.',
    language: 'CSS',
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    topics: ['css', 'design'],
    updated_at: '2025-09-01T00:00:00Z',
    default_branch: 'main'
  }
];

const LANGUAGE_COLORS: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Dart: '#00B4AB',
  Java: '#b07219',
  'C#': '#178600',
};

const CACHE_KEY = 'akhxi1_github_repos_v1';

export const GitHubRepoDrawer: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState('All');
  const [includeForks, setIncludeForks] = useState(false);

  const [activeRepo, setActiveRepo] = useState<GitHubRepo | null>(null);
  const [readmeContent, setReadmeContent] = useState('');
  const [loadingReadme, setLoadingReadme] = useState(false);
  const [copiedClone, setCopiedClone] = useState(false);

  const fetchRepos = async (forceRefresh = false) => {
    setLoadingRepos(true);
    if (!forceRefresh) {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as { timestamp: number; data: GitHubRepo[] };
          if (Date.now() - parsed.timestamp < 10 * 60 * 1000 && Array.isArray(parsed.data)) {
            setRepos(parsed.data);
            setLoadingRepos(false);
            return;
          }
        }
      } catch {
        // Ignore storage error
      }
    }

    try {
      const res = await fetch('https://api.github.com/users/AKHXI1/repos?sort=updated&per_page=100', {
        headers: { Accept: 'application/vnd.github+json' }
      });
      if (!res.ok) throw new Error('GitHub API error');
      const data = (await res.json()) as GitHubRepo[];
      if (Array.isArray(data) && data.length > 0) {
        setRepos(data);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
        } catch {
          // Ignore quota error
        }
      } else {
        setRepos(FALLBACK_REPOS);
      }
    } catch {
      setRepos(FALLBACK_REPOS);
    } finally {
      setLoadingRepos(false);
    }
  };

  useEffect(() => {
    if (expanded && repos.length === 0) {
      fetchRepos(false);
    }
  }, [expanded]);

  const openRepoPreview = async (repo: GitHubRepo) => {
    playSound('modal');
    setActiveRepo(repo);
    setLoadingReadme(true);
    setReadmeContent('');
    setCopiedClone(false);

    try {
      const res = await fetch(`https://api.github.com/repos/${repo.full_name}/readme`, {
        headers: { Accept: 'application/vnd.github.raw+json' }
      });
      if (res.ok) {
        setReadmeContent((await res.text()) || 'Empty README.');
      } else {
        setReadmeContent(`# ${repo.name}\n\n${repo.description || 'No README.md found in this repository.'}`);
      }
    } catch {
      setReadmeContent(`# ${repo.name}\n\n${repo.description || 'Unable to load README preview.'}`);
    } finally {
      setLoadingReadme(false);
    }
  };

  useEffect(() => {
    if (!activeRepo) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveRepo(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [activeRepo]);

  const forkCount = useMemo(() => repos.filter((r) => r.fork).length, [repos]);
  const originalCount = useMemo(() => repos.filter((r) => !r.fork).length, [repos]);

  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    repos
      .filter((r) => includeForks || !r.fork)
      .forEach((r) => {
        if (r.language) counts.set(r.language, (counts.get(r.language) || 0) + 1);
      });
    return ['All', ...Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([l]) => l)];
  }, [repos, includeForks]);

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      if (!includeForks && repo.fork) return false;
      if (selectedLang !== 'All' && repo.language !== selectedLang) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          repo.name.toLowerCase().includes(q) ||
          (repo.description || '').toLowerCase().includes(q) ||
          (repo.language || '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [repos, includeForks, selectedLang, searchQuery]);

  return (
    <div className="mt-10">
      {/* Toggle Trigger */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            playSound('click');
            setExpanded((prev) => !prev);
          }}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white/[0.04] hover:bg-cyan-500/15 border border-cyan-500/25 hover:border-cyan-400/60 text-xs font-mono font-semibold text-cyan-300 transition-all"
        >
          <FolderGit2 className="w-4 h-4" />
          <span>{expanded ? 'Hide All GitHub Repositories' : 'View All GitHub Repositories (@AKHXI1)'}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable Live GitHub Repos Panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="spotlight-card p-5 sm:p-7 rounded-3xl space-y-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-200">
                    {originalCount || 'All'} Original Repos
                  </span>
                  {forkCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setIncludeForks((p) => !p)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-mono ${
                        includeForks
                          ? 'bg-emerald-500/15 border-emerald-400/50 text-emerald-300'
                          : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {includeForks ? `✓ Including Forks (${forkCount})` : `+ Include Forks (${forkCount})`}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => fetchRepos(true)}
                    className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 hover:text-cyan-300"
                    title="Refresh GitHub Repositories"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingRepos ? 'animate-spin text-cyan-400' : ''}`} />
                  </button>
                </div>

                <div className="relative w-full lg:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter repositories..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#050811] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLang(lang)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono border ${
                      selectedLang === lang
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {loadingRepos ? (
                <div className="py-10 text-center font-mono text-xs text-cyan-300 animate-pulse">
                  Loading repositories from github.com/AKHXI1...
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[520px] overflow-y-auto pr-1">
                  {filteredRepos.map((repo) => (
                    <div
                      key={repo.id}
                      onClick={() => openRepoPreview(repo)}
                      className="p-4 rounded-2xl bg-[#050811] border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer flex flex-col justify-between gap-3 group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Code2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="font-mono font-bold text-xs text-white group-hover:text-cyan-300 truncate">
                            {repo.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2">
                          {repo.description || 'Click to inspect README & details.'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-2.5">
                          {repo.language && (
                            <span className="flex items-center gap-1">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#38bdf8' }}
                              />
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 text-amber-400" />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <GitFork className="w-3 h-3" />
                            {repo.forks_count}
                          </span>
                        </div>
                        <span className="text-cyan-400">README →</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* README Inspector Modal */}
      {activeRepo && (
        <div
          onClick={() => setActiveRepo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[88vh] flex flex-col bg-[#080e1c] border border-cyan-500/25 rounded-3xl shadow-2xl overflow-hidden text-slate-100"
          >
            <div className="flex items-center justify-between px-6 py-4 bg-[#0d1528] border-b border-white/10">
              <div className="flex items-center gap-2.5 min-w-0">
                <BookOpen className="w-5 h-5 text-cyan-400 shrink-0" />
                <h3 className="font-mono font-bold text-sm sm:text-base text-white truncate">
                  {activeRepo.full_name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveRepo(null)}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-2.5 bg-[#091122] border-b border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">{activeRepo.language || 'Repository'}</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`git clone ${activeRepo.html_url}.git`);
                  setCopiedClone(true);
                  setTimeout(() => setCopiedClone(false), 2000);
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-cyan-300"
              >
                {copiedClone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedClone ? 'Copied!' : `git clone ${activeRepo.name}.git`}</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {loadingReadme ? (
                <div className="py-10 text-center font-mono text-xs text-cyan-300 animate-pulse">
                  Loading README.md...
                </div>
              ) : (
                <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {readmeContent}
                </pre>
              )}
            </div>

            <div className="px-6 py-4 bg-[#0d1528] border-t border-white/10 flex items-center justify-between">
              <a
                href={activeRepo.html_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Open on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setActiveRepo(null)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
