// Static Asset Imports
import profileImg from '../assets/profile_avatar.png';
import shadowScannerImg from '../assets/shadow_scanner.png';
import homeChefImg from '../assets/home_chef.png';
import cyberQuizImg from '../assets/cyber_quiz.png';
import limitlessSocImg from '../assets/limitless_soc.png';

// Navigation links
export const navLinks = [
  { href: '#home', id: 'home', label: 'Home' },
  { href: '#about', id: 'about', label: 'About' },
  { href: '#skills', id: 'skills', label: 'Skills' },
  { href: '#projects', id: 'projects', label: 'Projects' },
  { href: '#experience', id: 'experience', label: 'Experience' },
  { href: '#contact', id: 'contact', label: 'Contact' }
];

// Profile Image Export
export { profileImg };

// Project Details Data
export const projectsData = [
  {
    title: 'Limitless SOC 2.0',
    description: 'A full-stack Security Operations Center dashboard offering real-time endpoint telemetry, interactive threat mapping, automated report generation, and integrated Red/Blue team utility consoles.',
    image: limitlessSocImg,
    badge: 'Security Operations',
    deviceType: 'laptop',
    tech: ['React', 'Node.js', 'Express', 'Socket.io', 'Docker'],
    liveLink: 'https://github.com/tamilselvan',
    codeLink: 'https://github.com/tamilselvan'
  },
  {
    title: 'ShadowScanner',
    description: 'A network scanning suite enabling target Sweeping, DNS resolution audits, subdomain parsing, and open port checks with interactive visualization dashboards.',
    image: shadowScannerImg,
    badge: 'Cyber Reconnaissance',
    deviceType: 'tablet',
    tech: ['Flask', 'React', 'Python', 'TailwindCSS'],
    liveLink: 'https://github.com/tamilselvan',
    codeLink: 'https://github.com/tamilselvan'
  },
  {
    title: 'CyberQuiz Arena',
    description: 'An interactive security learning game designed to test and build penetration testing knowledge through real-time challenge scenarios and secure coding quizzes.',
    image: cyberQuizImg,
    badge: 'Interactive Training',
    deviceType: 'phone',
    tech: ['React', 'FastAPI', 'SQLite', 'Three.js'],
    liveLink: 'https://github.com/tamilselvan',
    codeLink: 'https://github.com/tamilselvan'
  },
  {
    title: 'SecureChef Audit',
    description: 'A security assessment and source code audit of a client-to-chef marketplace, identifying authentication bypasses, sanitizing SQL injections, and setting up secure rate-limiting proxies.',
    image: homeChefImg,
    badge: 'Security Auditing',
    deviceType: 'laptop',
    tech: ['Penetration Testing', 'JWT Auth', 'SQL Injection Mitigation', 'FastAPI'],
    liveLink: 'https://github.com/tamilselvan',
    codeLink: 'https://github.com/tamilselvan'
  }
];

// Technical Journey Timeline Data
export const timelineData = [
  {
    date: '2025 - Present',
    role: 'Lead Security Analyst & Architect',
    company: 'Limitless SOC Ecosystem',
    desc: 'Built secure backend pipelines, integrated real-time IDS telemetry sockets, and automated sandbox environments for active malware analysis.',
    iconType: 'Shield'
  },
  {
    date: '2024 - 2025',
    role: 'Penetration Tester & Developer',
    company: 'Cybershield Recon Tools',
    desc: 'Conducted vulnerability scanning, authored multi-threaded network scanner scripts, and built telemetry tracking consoles.',
    iconType: 'Cpu'
  },
  {
    date: '2023 - 2024',
    role: 'Independent Security Researcher',
    company: 'Bug Bounty & Freelance',
    desc: 'Discovered high/medium security vulnerabilities (OWASP Top 10) in open-source systems, built secure REST APIs, and authored custom automated auditing tools.',
    iconType: 'Code'
  }
];
