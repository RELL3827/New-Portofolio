export const personalData = {
  name: "FAREL RIZKY PRATAMA",
  displayName: "Farel Rizky Pratama",
  greeting: "Hello, I'm",
  birthDate: "17 Mei 2006",
  roles: [
    "Junior Developer",
    "Tech Enthusiast",
    "Web Developer",
    "Problem Solver"
  ],
  bio: "Saya membangun website dan aplikasi modern dengan fokus pada pengalaman pengguna, clean code, dan teknologi yang terus berkembang.",
  about: [
    "Saya adalah seorang Junior Developer dan Tech Enthusiast yang menempuh pendidikan di Universitas Muhammadiyah Cilegon (Teknik Informatika). Saya memiliki ketertarikan mendalam terhadap web development, arsitektur software, otomasi, dan eksplorasi teknologi futuristik.",
    "Bagi saya, coding bukan sekadar menulis sintaks, melainkan seni menyelesaikan masalah dunia nyata dan menciptakan pengalaman digital yang intuitif, cepat, dan estetis. Selalu bersemangat mempelajari framework terkini dan best practice industri."
  ],
  institution: "Universitas Muhammadiyah Cilegon",
  major: "Teknik Informatika",
  location: "Cilegon, Banten, Indonesia",
  focus: "Full-Stack Web Development & Modern UI",
  experiencePeriod: "2+ Years Learning & Building",
  status: "Available for Projects & Collaboration",
  email: "contact@farelrizky.dev",
};

export const educationData = [
  {
    period: "2023 — Present",
    institution: "Universitas Muhammadiyah Cilegon",
    degree: "S1 Teknik Informatika (Informatics Engineering)",
    description: "Fokus mendalami software engineering, struktur data & algoritma, perancangan database relasional, pemrograman web modern, serta arsitektur sistem informasi terintegrasi.",
    badge: "Active Student",
    highlight: true
  },
  {
    period: "2020 — 2023",
    institution: "SMK Fatahillah 2 Cilegon",
    degree: "Teknik Komputer Dan Jaringan (TKJ)",
    description: "Mempelajari infrastruktur jaringan komputer, routing & switching, administrasi server Linux/Windows, keamanan jaringan, perakitan perangkat keras, dan dasar-dasar pemrograman web.",
    badge: "Graduated",
    highlight: false
  },
  {
    period: "2017 — 2020",
    institution: "SMP Negeri 2 Cilegon",
    degree: "Pendidikan Menengah Pertama",
    description: "Membangun fondasi logika berpikir analitis, literasi sains & matematika, eksplorasi komputer dasar, dan ketertarikan awal yang kuat terhadap dunia teknologi dan digital.",
    badge: "Alumni",
    highlight: false
  }
];

export const experienceData = [
  {
    position: "Freelance Junior Web Developer",
    company: "Independent / Client Projects",
    period: "2024 — Present",
    description: "Merancang dan membangun aplikasi web kustom untuk kebutuhan bisnis lokal, integrasi database, pembuatan dashboard manajemen, serta implementasi antarmuka responsif.",
    technologies: ["PHP", "Laravel", "Tailwind CSS", "MySQL", "JavaScript"],
    isCurrent: true
  },
  {
    position: "Academic Project Lead & Web Builder",
    company: "Universitas Muhammadiyah Cilegon Project Works",
    period: "2023 — Present",
    description: "Memimpin perancangan dan implementasi proyek praktikum rekayasa perangkat lunak, sistem Point of Sale (POS), sistem inventaris, dan platform e-learning.",
    technologies: ["Laravel", "MySQL", "Bootstrap", "Git", "REST API"],
    isCurrent: true
  },
  {
    position: "Self-Directed Tech Explorer & Contributor",
    company: "Open Source & Tech Community",
    period: "2023 — Present",
    description: "Secara konsisten bereksplorasi dengan framework modern React, Tailwind CSS, Framer Motion, serta mengadopsi clean code dan version control best practice.",
    technologies: ["React", "JavaScript ES6+", "Tailwind CSS", "Git / GitHub"],
    isCurrent: false
  }
];

export const statsData = [
  {
    value: 10,
    suffix: "+",
    label: "Projects Completed",
    description: "Web apps, dashboards & prototypes"
  },
  {
    value: 5,
    suffix: "+",
    label: "Core Technologies",
    description: "Modern frontend & backend stack"
  },
  {
    value: 2,
    suffix: "+",
    label: "Years Learning",
    description: "Hands-on coding & problem solving"
  },
  {
    value: 100,
    suffix: "%",
    label: "Curiosity & Passion",
    description: "Continuous daily evolution"
  }
];

export const projectsData = [
  {
    id: "Eltrack",
    title: "ElTrack",
    subtitle: "Personal Finance & Cashflow Management System",
    category: "Full-Stack Web App",
    description: "Sistem manajemen keuangan komprehensif yang membantu pengguna memantau arus kas, pemasukan, pengeluaran bulanan, analisis tabungan, serta visualisasi grafik interaktif secara realtime.",
    image: "/projects/fintrack.svg",
    technologies: ["Laravel 11", "Tailwind CSS", "MySQL", "Chart.js", "PHP"],
    githubUrl: "https://github.com/RELL3827/Manajemen-keuangan-App",
    liveUrl: "https://manajemen-keuangan-app-wheat.vercel.app",
    metrics: "Rp 24M+ Tracked • 99.8% Reliability",
    featured: true
  },
  {
    id: "kasirku",
    title: "KasirKu",
    subtitle: "Modern Point of Sale & Inventory Platform",
    category: "Business Application",
    description: "Aplikasi kasir digital dan manajemen inventaris berbasis web dengan fitur transaksi cepat, pencetakan struk digital, manajemen stok peringatan kritis, dan laporan rekonsiliasi harian.",
    image: "/projects/kasirku.svg",
    technologies: ["Laravel", "PHP", "MySQL", "Alpine.js", "Tailwind CSS"],
    githubUrl: "https://github.com/RELL3827/KasirKu-Manajemen",
    liveUrl: "-",
    metrics: "Instant Checkout • Barcode Scanner",
    featured: true
  },
  {
    id: "Skinsq",
    title: "skinsq",
    subtitle: "Comprehensive Beauty consultation",
    category: "Beauty consultation",
    description: "Platform konsultasi kulit wajah, Analisis kondisi kulit menggunakan AI dan dapatkan rekomendasi skincare yang dipersonalisasi untuk kebutuhan kulitmu..",
    image: "/projects/beauty.svg",
    technologies: ["PHP", "Bootstrap 5", "MySQL", "JavaScript", "AJAX"],
    githubUrl: "https://github.com/RELL3827/Website-Konsultasi-Kecantikan",
    liveUrl: "https://skinsq-kecantikan-rell3827s-projects.vercel.app/",
    metrics: "16+ Modules • Interactive Quizzes",
    featured: true
  }
];

export const techStackCategories = [
  {
    category: "Frontend Development",
    description: "Modern, responsive, performant user interfaces",
    skills: [
      { name: "React", level: "Advanced", icon: "Code", color: "#38bdf8", tag: "UI Library" },
      { name: "Tailwind CSS", level: "Advanced", icon: "Palette", color: "#38bdf8", tag: "Utility CSS" },
      { name: "JavaScript", level: "Proficient", icon: "Zap", color: "#facc15", tag: "ES6+ / Async" },
      { name: "HTML5 & CSS3", level: "Mastery", icon: "Layout", color: "#f97316", tag: "Semantic & Responsive" },
      { name: "Framer Motion", level: "Proficient", icon: "Sparkles", color: "#ec4899", tag: "Micro-interactions" }
    ]
  },
  {
    category: "Backend & Database",
    description: "Secure, reliable APIs and data architecture",
    skills: [
      { name: "PHP", level: "Proficient", icon: "Server", color: "#818cf8", tag: "Core OOP" },
      { name: "Laravel", level: "Proficient", icon: "Layers", color: "#ef4444", tag: "MVC Framework" },
      { name: "MySQL", level: "Proficient", icon: "Database", color: "#38bdf8", tag: "Relational DB" },
      { name: "RESTful API", level: "Proficient", icon: "ArrowLeftRight", color: "#10b981", tag: "Integration & Auth" }
    ]
  },
  {
    category: "Tools & Ecosystem",
    description: "Development workflows, version control & productivity",
    skills: [
      { name: "Git", level: "Proficient", icon: "GitBranch", color: "#f97316", tag: "Version Control" },
      { name: "GitHub", level: "Proficient", icon: "Github", color: "#ffffff", tag: "CI & Collaboration" },
      { name: "VS Code", level: "Mastery", icon: "Terminal", color: "#3b82f6", tag: "Primary Editor" },
      { name: "Figma", level: "Familiar", icon: "Figma", color: "#a855f7", tag: "UI/UX Prototyping" },
      { name: "Postman", level: "Proficient", icon: "Send", color: "#fb923c", tag: "API Testing" }
    ]
  }
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/RELL3827",
    icon: "Github",
    username: "@RELL3827",
    color: "#ffffff"
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/081818434093",
    icon: "WhatsApp",
    username: "081818434093",
    color: "#38f87bff"
  },
  {
    name: "Instagram",
    url: "https://instagram.com/rlrzprtm_",
    icon: "Instagram",
    username: "@rlrzprtm_",
    color: "#f43f5e"
  },
  {
    name: "Email",
    url: "mailto:farelrizky801@gmail.com",
    icon: "Mail",
    username: "@Farelrizky801",
    color: "#2c67ed"
  }
];
