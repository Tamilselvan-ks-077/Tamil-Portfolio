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
    title: 'HomeChef Platform',
    description: 'Client-to-chef marketplace dashboard allowing users to book gourmet specialists, manage reservation tables, and view menu details.',
    image: homeChefImg,
    badge: 'Booking Marketplace',
    deviceType: 'laptop',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'SQLAlchemy'],
    liveLink: 'https://github.com/tamilselvan',
    codeLink: 'https://github.com/tamilselvan'
  }
];

// Technical Journey Timeline Data
export const timelineData = [
  {
    date: '2025 - Present',
    role: 'Senior Project Architect',
    company: 'Limitless SOC Ecosystem',
    desc: 'Designed modular backend communication pipelines, implemented full-stack real-time diagnostic sockets, and set up Docker environment nodes for security metrics tracking.',
    iconType: 'Shield'
  },
  {
    date: '2024 - 2025',
    role: 'Security Software Developer',
    company: 'Cybershield Dashboard & Recon tools',
    desc: 'Authored multi-threaded scanning engines, integrated automated DNS security lookups, and built glassmorphic React panels for logs telemetry.',
    iconType: 'Cpu'
  },
  {
    date: '2023 - 2024',
    role: 'Full-Stack Developer',
    company: 'Freelance & Open Source Projects',
    desc: 'Built API routing logic in Python (Flask/FastAPI), mapped robust PostgreSQL relational tables, and created sleek landing pages with Framer-style physics.',
    iconType: 'Code'
  }
];
