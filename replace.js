const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add imports
content = content.replace(
  "import { Trophy, Swords, RefreshCcw, Shield, Zap, Medal, ChevronDown, Edit2, X, Home } from 'lucide-react';",
  "import { Trophy, Swords, RefreshCcw, Shield, Zap, Medal, ChevronDown, Edit2, X, Home, Palette, Heart, Ghost, Skull, Binary, MonitorPlay } from 'lucide-react';"
);

// 2. Add THEMES object before ALL_PLAYERS
const themesObj = `
type ThemeName = 'volleyball' | 'valentines' | 'halloween' | 'burton' | 'matrix';

const THEMES = {
  volleyball: {
    name: 'Quadra de Vôlei',
    icon: MonitorPlay,
    appBg: 'bg-orange-950',
    appText: 'text-orange-50',
    appTextMuted: 'text-orange-200/60',
    appTextMutedDark: 'text-orange-300/40',
    cardBg: 'bg-orange-900/80',
    cardBgSolid: 'bg-orange-900',
    cardBgLight: 'bg-orange-950/50',
    border: 'border-orange-800',
    borderHover: 'hover:border-orange-700',
    blobA: 'bg-blue-600/20',
    blobB: 'bg-yellow-600/20',
    accent: 'text-yellow-400',
    accentBg: 'bg-yellow-500',
    gradientText: 'from-blue-400 to-yellow-400',
    font: 'font-sans',
    teamA: {
      border: 'border-blue-500/30',
      bg: 'bg-blue-500/5',
      text: 'text-blue-400',
      glow: 'shadow-blue-500/20',
      winnerBorder: 'border-blue-500',
      winnerGlow: 'shadow-[0_0_50px_-12px_rgba(59,130,246,0.6)]',
      btnGradient: 'from-blue-600/20 to-cyan-600/20',
      badgeBg: 'bg-blue-500/10',
      badgeBorder: 'border-blue-500/20',
      barGradient: 'from-blue-500 to-cyan-300'
    },
    teamB: {
      border: 'border-yellow-500/30',
      bg: 'bg-yellow-500/5',
      text: 'text-yellow-400',
      glow: 'shadow-yellow-500/20',
      winnerBorder: 'border-yellow-500',
      winnerGlow: 'shadow-[0_0_50px_-12px_rgba(234,179,8,0.6)]',
      btnGradient: 'from-yellow-600/20 to-orange-600/20',
      badgeBg: 'bg-yellow-500/10',
      badgeBorder: 'border-yellow-500/20',
      barGradient: 'from-yellow-500 to-orange-300'
    }
  },
  valentines: {
    name: 'Valentine\\'s Day',
    icon: Heart,
    appBg: 'bg-rose-950',
    appText: 'text-rose-50',
    appTextMuted: 'text-rose-300/60',
    appTextMutedDark: 'text-rose-400/40',
    cardBg: 'bg-rose-900/80',
    cardBgSolid: 'bg-rose-900',
    cardBgLight: 'bg-rose-950/50',
    border: 'border-rose-800',
    borderHover: 'hover:border-rose-700',
    blobA: 'bg-pink-600/20',
    blobB: 'bg-red-600/20',
    accent: 'text-pink-400',
    accentBg: 'bg-pink-500',
    gradientText: 'from-pink-400 to-red-400',
    font: 'font-sans',
    teamA: {
      border: 'border-pink-500/30',
      bg: 'bg-pink-500/5',
      text: 'text-pink-400',
      glow: 'shadow-pink-500/20',
      winnerBorder: 'border-pink-500',
      winnerGlow: 'shadow-[0_0_50px_-12px_rgba(236,72,153,0.6)]',
      btnGradient: 'from-pink-600/20 to-rose-600/20',
      badgeBg: 'bg-pink-500/10',
      badgeBorder: 'border-pink-500/20',
      barGradient: 'from-pink-500 to-rose-300'
    },
    teamB: {
      border: 'border-red-500/30',
      bg: 'bg-red-500/5',
      text: 'text-red-400',
      glow: 'shadow-red-500/20',
      winnerBorder: 'border-red-500',
      winnerGlow: 'shadow-[0_0_50px_-12px_rgba(239,68,68,0.6)]',
      btnGradient: 'from-red-600/20 to-orange-600/20',
      badgeBg: 'bg-red-500/10',
      badgeBorder: 'border-red-500/20',
      barGradient: 'from-red-500 to-orange-300'
    }
  },
  halloween: {
    name: 'Halloween',
    icon: Ghost,
    appBg: 'bg-purple-950',
    appText: 'text-purple-50',
    appTextMuted: 'text-purple-300/60',
    appTextMutedDark: 'text-purple-400/40',
    cardBg: 'bg-purple-900/80',
    cardBgSolid: 'bg-purple-900',
    cardBgLight: 'bg-purple-950/50',
    border: 'border-purple-800',
    borderHover: 'hover:border-purple-700',
    blobA: 'bg-orange-600/20',
    blobB: 'bg-fuchsia-600/20',
    accent: 'text-orange-500',
    accentBg: 'bg-orange-500',
    gradientText: 'from-orange-400 to-fuchsia-400',
    font: 'font-sans',
    teamA: {
      border: 'border-orange-500/30',
      bg: 'bg-orange-500/5',
      text: 'text-orange-400',
      glow: 'shadow-orange-500/20',
      winnerBorder: 'border-orange-500',
      winnerGlow: 'shadow-[0_0_50px_-12px_rgba(249,115,22,0.6)]',
      btnGradient: 'from-orange-600/20 to-red-600/20',
      badgeBg: 'bg-orange-500/10',
      badgeBorder: 'border-orange-500/20',
      barGradient: 'from-orange-500 to-red-300'
    },
    teamB: {
      border: 'border-fuchsia-500/30',
      bg: 'bg-fuchsia-500/5',
      text: 'text-fuchsia-400',
      glow: 'shadow-fuchsia-500/20',
      winnerBorder: 'border-fuchsia-500',
      winnerGlow: 'shadow-[0_0_50px_-12px_rgba(217,70,239,0.6)]',
      btnGradient: 'from-fuchsia-600/20 to-purple-600/20',
      badgeBg: 'bg-fuchsia-500/10',
      badgeBorder: 'border-fuchsia-500/20',
      barGradient: 'from-fuchsia-500 to-purple-300'
    }
  },
  burton: {
    name: 'Tim Burton',
    icon: Skull,
    appBg: 'bg-zinc-950',
    appText: 'text-zinc-300',
    appTextMuted: 'text-zinc-500',
    appTextMutedDark: 'text-zinc-600',
    cardBg: 'bg-zinc-900/80',
    cardBgSolid: 'bg-zinc-900',
    cardBgLight: 'bg-zinc-950/50',
    border: 'border-zinc-800',
    borderHover: 'hover:border-zinc-700',
    blobA: 'bg-zinc-600/10',
    blobB: 'bg-slate-600/10',
    accent: 'text-zinc-100',
    accentBg: 'bg-zinc-200',
    gradientText: 'from-zinc-400 to-slate-400',
    font: 'font-serif tracking-widest',
    teamA: {
      border: 'border-zinc-500/30',
      bg: 'bg-zinc-500/5',
      text: 'text-zinc-400',
      glow: 'shadow-zinc-500/20',
      winnerBorder: 'border-zinc-500',
      winnerGlow: 'shadow-[0_0_50px_-12px_rgba(161,161,170,0.6)]',
      btnGradient: 'from-zinc-600/20 to-gray-600/20',
      badgeBg: 'bg-zinc-500/10',
      badgeBorder: 'border-zinc-500/20',
      barGradient: 'from-zinc-500 to-gray-300'
    },
    teamB: {
      border: 'border-slate-500/30',
      bg: 'bg-slate-500/5',
      text: 'text-slate-400',
      glow: 'shadow-slate-500/20',
      winnerBorder: 'border-slate-500',
      winnerGlow: 'shadow-[0_0_50px_-12px_rgba(148,163,184,0.6)]',
      btnGradient: 'from-slate-600/20 to-gray-600/20',
      badgeBg: 'bg-slate-500/10',
      badgeBorder: 'border-slate-500/20',
      barGradient: 'from-slate-500 to-gray-300'
    }
  },
  matrix: {
    name: 'Matrix',
    icon: Binary,
    appBg: 'bg-black',
    appText: 'text-green-500',
    appTextMuted: 'text-green-700',
    appTextMutedDark: 'text-green-800',
    cardBg: 'bg-black',
    cardBgSolid: 'bg-black',
    cardBgLight: 'bg-green-950/20',
    border: 'border-green-900',
    borderHover: 'hover:border-green-800',
    blobA: 'bg-green-600/10',
    blobB: 'bg-emerald-600/10',
    accent: 'text-green-400',
    accentBg: 'bg-green-500',
    gradientText: 'from-green-400 to-emerald-400',
    font: 'font-mono',
    teamA: {
      border: 'border-green-500/30',
      bg: 'bg-green-500/5',
      text: 'text-green-500',
      glow: 'shadow-green-500/20',
      winnerBorder: 'border-green-500',
      winnerGlow: 'shadow-[0_0_50px_-12px_rgba(34,197,94,0.6)]',
      btnGradient: 'from-green-600/20 to-emerald-600/20',
      badgeBg: 'bg-green-500/10',
      badgeBorder: 'border-green-500/20',
      barGradient: 'from-green-500 to-emerald-300'
    },
    teamB: {
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/5',
      text: 'text-emerald-500',
      glow: 'shadow-emerald-500/20',
      winnerBorder: 'border-emerald-500',
      winnerGlow: 'shadow-[0_0_50px_-12px_rgba(16,185,129,0.6)]',
      btnGradient: 'from-emerald-600/20 to-green-600/20',
      badgeBg: 'bg-emerald-500/10',
      badgeBorder: 'border-emerald-500/20',
      barGradient: 'from-emerald-500 to-green-300'
    }
  }
};
`;
content = content.replace('const ALL_PLAYERS', themesObj + '\nconst ALL_PLAYERS');

// 3. Add state
content = content.replace(
  "const [homeTeam, setHomeTeam] = useState<'A' | 'B' | 'neutral'>('neutral');",
  `const [homeTeam, setHomeTeam] = useState<'A' | 'B' | 'neutral'>('neutral');
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('volleyball');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const t = THEMES[currentTheme];`
);

// 4. Replace classes in App component
content = content.replace(
  'className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 flex flex-col items-center py-12 px-4 sm:px-8 relative overflow-hidden"',
  'className={`min-h-screen ${t.appBg} ${t.appText} ${t.font} selection:bg-white/20 flex flex-col items-center py-12 px-4 sm:px-8 relative overflow-hidden transition-colors duration-500`}'
);

content = content.replace(
  '{/* Background Effects */}',
  `{/* Theme Selector */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={() => setShowThemeMenu(!showThemeMenu)}
          className={\`p-3 rounded-full \${t.cardBgSolid} border \${t.border} \${t.borderHover} \${t.appText} shadow-lg transition-all hover:scale-105\`}
        >
          <Palette className="w-5 h-5" />
        </button>
        
        <AnimatePresence>
          {showThemeMenu && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className={\`absolute right-0 mt-2 w-48 \${t.cardBgSolid} border \${t.border} rounded-2xl shadow-2xl overflow-hidden\`}
            >
              {(Object.entries(THEMES) as [ThemeName, typeof THEMES[ThemeName]][]).map(([key, theme]) => {
                const Icon = theme.icon;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setCurrentTheme(key as ThemeName);
                      setShowThemeMenu(false);
                    }}
                    className={\`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors \${currentTheme === key ? \`\${t.cardBgLight} \${t.accent}\` : \`\${t.appTextMuted} hover:\${t.cardBgLight} hover:\${t.appText}\`}\`}
                  >
                    <Icon className="w-4 h-4" />
                    {theme.name}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background Effects */}`
);

content = content.replace(
  '<div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />',
  '<div className={`absolute top-0 left-1/4 w-96 h-96 ${t.blobA} rounded-full blur-[120px] pointer-events-none transition-colors duration-1000`} />'
);
content = content.replace(
  '<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none" />',
  '<div className={`absolute bottom-0 right-1/4 w-96 h-96 ${t.blobB} rounded-full blur-[120px] pointer-events-none transition-colors duration-1000`} />'
);
content = content.replace(
  '<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-900/50 rounded-full blur-[100px] pointer-events-none -z-10" />',
  '<div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] ${t.cardBgLight} rounded-full blur-[100px] pointer-events-none -z-10 transition-colors duration-1000`} />'
);

content = content.replace(
  'className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4"',
  'className={`text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${t.gradientText} mb-4 transition-all duration-500`}'
);
content = content.replace(
  'className="text-slate-400 max-w-xl mx-auto text-lg"',
  'className={`${t.appTextMuted} max-w-xl mx-auto text-lg transition-colors duration-500`}'
);

content = content.replace(
  'className="text-2xl font-semibold text-slate-500 flex items-center gap-3"',
  'className={`text-2xl font-semibold ${t.appTextMutedDark} flex items-center gap-3 transition-colors duration-500`}'
);
content = content.replace(
  'className="text-3xl font-bold text-amber-400 flex items-center gap-3"',
  'className={`text-3xl font-bold ${t.accent} flex items-center gap-3 transition-colors duration-500`}'
);
content = content.replace(
  '<span className="text-slate-300">Empate Técnico!</span>',
  '<span className={t.appText}>Empate Técnico!</span>'
);
content = content.replace(
  '<Trophy className="w-10 h-10 text-amber-400" />',
  '<Trophy className={`w-10 h-10 ${t.accent}`} />'
);
content = content.replace(
  '<span className={winner === \'A\' ? \'text-blue-400\' : \'text-emerald-400\'}>',
  '<span className={winner === \'A\' ? t.teamA.text : t.teamB.text}>'
);

// TeamCards
content = content.replace(
  /theme="blue"/g,
  'theme={t.teamA}'
);
content = content.replace(
  /theme="emerald"/g,
  'theme={t.teamB}'
);

content = content.replace(
  'className="w-16 h-16 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center shadow-2xl shadow-black/50"',
  'className={`w-16 h-16 rounded-full ${t.cardBgSolid} border-4 ${t.border} flex items-center justify-center shadow-2xl shadow-black/50 transition-colors duration-500`}'
);
content = content.replace(
  'className="text-xl font-black text-slate-500 italic"',
  'className={`text-xl font-black ${t.appTextMutedDark} italic transition-colors duration-500`}'
);

content = content.replace(
  'className="group relative px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 overflow-hidden"',
  'className={`group relative px-8 py-4 ${t.cardBgSolid} ${t.borderHover} border ${t.border} text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 overflow-hidden`}'
);
content = content.replace(
  'className="group relative px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 overflow-hidden"',
  'className={`group relative px-8 py-4 ${t.cardBgSolid} ${t.borderHover} border ${t.border} text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 overflow-hidden`}'
);

content = content.replace(
  '<div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />',
  '<div className={`absolute inset-0 bg-gradient-to-r ${t.teamA.btnGradient} opacity-0 group-hover:opacity-100 transition-opacity`} />'
);
content = content.replace(
  '<div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />',
  '<div className={`absolute inset-0 bg-gradient-to-r ${t.teamB.btnGradient} opacity-0 group-hover:opacity-100 transition-opacity`} />'
);

content = content.replace(
  /className=\{\`group relative px-8 py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-3 overflow-hidden \$\{\n            status === 'drawn' \n              \? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500\/20 hover:shadow-orange-500\/40 hover:-translate-y-1 cursor-pointer' \n              : 'bg-slate-800\/50 text-slate-500 cursor-not-allowed'\n          \}\`\}/g,
  'className={`group relative px-8 py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-3 overflow-hidden ${status === \'drawn\' ? `bg-gradient-to-r ${t.teamA.btnGradient} text-white shadow-lg hover:-translate-y-1 cursor-pointer border ${t.border}` : `${t.cardBgLight} ${t.appTextMutedDark} cursor-not-allowed border ${t.border}`}`}'
);

content = content.replace(
  'className="group flex items-center gap-3 mb-8 justify-center hover:bg-slate-800/50 px-6 py-3 rounded-2xl transition-colors cursor-pointer"',
  'className={`group flex items-center gap-3 mb-8 justify-center hover:${t.cardBgLight} px-6 py-3 rounded-2xl transition-colors cursor-pointer`}'
);
content = content.replace(
  '<Medal className="w-8 h-8 text-amber-400" />',
  '<Medal className={`w-8 h-8 ${t.accent}`} />'
);
content = content.replace(
  'className="text-2xl sm:text-3xl font-black text-slate-200 uppercase tracking-wider group-hover:text-amber-400 transition-colors"',
  'className={`text-2xl sm:text-3xl font-black ${t.appText} uppercase tracking-wider group-hover:${t.accent} transition-colors`}'
);
content = content.replace(
  /className=\{\`w-6 h-6 text-slate-500 transition-transform duration-300 \$\{(.*?)\}\`\}/g,
  'className={`w-6 h-6 ${t.appTextMutedDark} transition-transform duration-300 $1`}'
);

content = content.replace(
  'className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl"',
  'className={`${t.cardBg} backdrop-blur-sm border ${t.border} rounded-3xl p-6 sm:p-8 shadow-2xl transition-colors duration-500`}'
);
content = content.replace(
  'className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-slate-700 transition-colors group"',
  'className={`flex items-center justify-between p-4 rounded-xl ${t.cardBgLight} border ${t.border} ${t.borderHover} transition-colors group`}'
);
content = content.replace(
  'className="w-8 text-center font-black text-slate-600 group-hover:text-slate-400 transition-colors"',
  'className={`w-8 text-center font-black ${t.appTextMutedDark} group-hover:${t.appTextMuted} transition-colors`}'
);
content = content.replace(
  'className="font-medium text-slate-200 truncate"',
  'className={`font-medium ${t.appText} truncate`}'
);
content = content.replace(
  'className="text-xs text-slate-500 truncate"',
  'className={`text-xs ${t.appTextMutedDark} truncate`}'
);
content = content.replace(
  'className="hidden sm:block w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden"',
  'className={`hidden sm:block w-24 h-1.5 ${t.border} rounded-full overflow-hidden`}'
);
content = content.replace(
  'className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full"',
  'className={`h-full bg-gradient-to-r ${t.teamA.barGradient} rounded-full`}'
);
content = content.replace(
  'className="flex items-baseline gap-1 bg-slate-900/80 px-3 py-1.5 rounded-md border border-slate-800 shadow-inner"',
  'className={`flex items-baseline gap-1 ${t.cardBgSolid} px-3 py-1.5 rounded-md border ${t.border} shadow-inner`}'
);
content = content.replace(
  'className="text-[10px] text-slate-500 font-mono"',
  'className={`text-[10px] ${t.appTextMutedDark} font-mono`}'
);
content = content.replace(
  'className="text-lg font-bold text-amber-400 font-mono"',
  'className={`text-lg font-bold ${t.accent} font-mono`}'
);

// Modal
content = content.replace(
  'className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden"',
  'className={`relative w-full max-w-md ${t.cardBgSolid} border ${t.border} rounded-3xl shadow-2xl overflow-hidden`}'
);
content = content.replace(
  'className="flex items-center justify-between p-6 border-b border-slate-800"',
  'className={`flex items-center justify-between p-6 border-b ${t.border}`}'
);
content = content.replace(
  'className="text-xl font-bold text-slate-200 flex items-center gap-2"',
  'className={`text-xl font-bold ${t.appText} flex items-center gap-2`}'
);
content = content.replace(
  'className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-full transition-colors cursor-pointer"',
  'className={`p-2 ${t.appTextMuted} hover:${t.appText} hover:${t.cardBgLight} rounded-full transition-colors cursor-pointer`}'
);
content = content.replace(
  /className="text-sm font-medium text-slate-400"/g,
  'className={`text-sm font-medium ${t.appTextMuted}`}'
);
content = content.replace(
  /className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer"/g,
  'className={`w-full ${t.cardBgLight} border ${t.border} rounded-xl px-4 py-3 ${t.appText} focus:outline-none focus:${t.borderHover} transition-all cursor-pointer`}'
);
content = content.replace(
  'className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700"',
  'className={`w-10 h-10 rounded-full ${t.cardBgSolid} flex items-center justify-center border ${t.border}`}'
);
content = content.replace(
  'className="text-xs font-black text-slate-500 italic"',
  'className={`text-xs font-black ${t.appTextMutedDark} italic`}'
);

content = content.replace(
  /className=\{\`flex-1 py-2 px-3 rounded-xl border text-sm font-bold transition-all \$\{(.*?)\}\`\}/g,
  (match, p1) => {
    if (p1.includes("editHomeTeam === 'A'")) {
      return 'className={`flex-1 py-2 px-3 rounded-xl border text-sm font-bold transition-all ${editHomeTeam === \\\'A\\\' ? `${t.teamA.bg} ${t.teamA.border} ${t.teamA.text}` : `${t.cardBgLight} ${t.border} ${t.appTextMutedDark} ${t.borderHover}`}`}'
    }
    if (p1.includes("editHomeTeam === 'neutral'")) {
      return 'className={`flex-1 py-2 px-3 rounded-xl border text-sm font-bold transition-all ${editHomeTeam === \\\'neutral\\\' ? `${t.cardBgSolid} ${t.border} ${t.appText}` : `${t.cardBgLight} ${t.border} ${t.appTextMutedDark} ${t.borderHover}`}`}'
    }
    if (p1.includes("editHomeTeam === 'B'")) {
      return 'className={`flex-1 py-2 px-3 rounded-xl border text-sm font-bold transition-all ${editHomeTeam === \\\'B\\\' ? `${t.teamB.bg} ${t.teamB.border} ${t.teamB.text}` : `${t.cardBgLight} ${t.border} ${t.appTextMutedDark} ${t.borderHover}`}`}'
    }
    return match;
  }
);

content = content.replace(
  'className="p-6 border-t border-slate-800 bg-slate-900/50 flex gap-3"',
  'className={`p-6 border-t ${t.border} ${t.cardBgLight} flex gap-3`}'
);
content = content.replace(
  'className="flex-1 px-4 py-3 rounded-xl font-medium text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"',
  'className={`flex-1 px-4 py-3 rounded-xl font-medium ${t.appTextMuted} hover:${t.cardBgSolid} transition-colors cursor-pointer`}'
);
content = content.replace(
  'className="flex-1 px-4 py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"',
  'className={`flex-1 px-4 py-3 rounded-xl font-bold ${t.accentBg} text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}'
);

// TeamCard component
content = content.replace(
  "theme: 'blue' | 'emerald',",
  "theme: any,"
);
content = content.replace(
  "theme: 'blue' | 'emerald',",
  "theme: any,"
);

content = content.replace(
  "const themeColors = {\\n    blue: {\\n      border: 'border-blue-500/30',\\n      bg: 'bg-blue-500/5',\\n      text: 'text-blue-400',\\n      glow: 'shadow-blue-500/20',\\n      winnerBorder: 'border-blue-500',\\n      winnerGlow: 'shadow-[0_0_50px_-12px_rgba(59,130,246,0.6)]'\\n    },\\n    emerald: {\\n      border: 'border-emerald-500/30',\\n      bg: 'bg-emerald-500/5',\\n      text: 'text-emerald-400',\\n      glow: 'shadow-emerald-500/20',\\n      winnerBorder: 'border-emerald-500',\\n      winnerGlow: 'shadow-[0_0_50px_-12px_rgba(16,185,129,0.6)]'\\n    }\\n  };\\n\\n  const colors = themeColors[theme];",
  "const colors = theme;"
);

content = content.replace(
  /className=\{\`h-full rounded-3xl backdrop-blur-sm p-6 sm:p-8 transition-all duration-500\n          \$\{\!team \? 'border-2 border-slate-800 border-dashed bg-slate-900\/80' : ''\}\n          \$\{team && \!isWinner && \!isLoser \? \`border-2 \$\{colors\.border\} \$\{colors\.bg\} bg-slate-900\/80\` : ''\}\n          \$\{isWinner \? \`border-4 \$\{colors\.winnerBorder\} \$\{colors\.bg\} bg-slate-900\/95 \$\{colors\.winnerGlow\} scale-\[1\.04\]\` : ''\}\n          \$\{isLoser \? \`border-2 border-slate-800\/50 bg-slate-950\/80 opacity-40 scale-\[0\.95\] grayscale-\[0\.8\]\` : ''\}\n        \`\}/g,
  'className={`h-full rounded-3xl backdrop-blur-sm p-6 sm:p-8 transition-all duration-500 ${!team ? `border-2 border-dashed opacity-50` : \\\'\\\'} ${team && !isWinner && !isLoser ? `border-2 ${colors.border} ${colors.bg}` : \\\'\\\'} ${isWinner ? `border-4 ${colors.winnerBorder} ${colors.bg} ${colors.winnerGlow} scale-[1.04]` : \\\'\\\'} ${isLoser ? `border-2 opacity-40 scale-[0.95] grayscale-[0.8]` : \\\'\\\'}`}'
);

content = content.replace(
  'className="text-center text-sm font-bold tracking-widest text-slate-500 uppercase mb-2 flex items-center justify-center gap-2"',
  'className={`text-center text-sm font-bold tracking-widest uppercase mb-2 flex items-center justify-center gap-2 opacity-60`}'
);
content = content.replace(
  'className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-[10px] flex items-center gap-1"',
  'className={`bg-white/10 px-2 py-0.5 rounded text-[10px] flex items-center gap-1`}'
);
content = content.replace(
  'className="text-slate-700 text-2xl font-bold"',
  'className={`opacity-30 text-2xl font-bold`}'
);
content = content.replace(
  'className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-slate-700 transition-colors"',
  'className={`flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors`}'
);
content = content.replace(
  'className="font-medium text-slate-200 truncate"',
  'className={`font-medium truncate`}'
);
content = content.replace(
  'className="hidden sm:block w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden"',
  'className={`hidden sm:block w-16 h-1.5 bg-black/40 rounded-full overflow-hidden`}'
);
content = content.replace(
  'className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full"',
  'className={`h-full bg-gradient-to-r ${colors.barGradient} rounded-full`}'
);
content = content.replace(
  'className="flex items-baseline gap-1 bg-slate-900/80 px-2 py-1 rounded-md border border-slate-800 shadow-inner"',
  'className={`flex items-baseline gap-1 bg-black/40 px-2 py-1 rounded-md border border-white/5 shadow-inner`}'
);
content = content.replace(
  'className="text-[10px] text-slate-500 font-mono"',
  'className={`text-[10px] opacity-50 font-mono`}'
);
content = content.replace(
  'className="font-bold text-amber-400 font-mono"',
  'className={`font-bold font-mono`}'
);
content = content.replace(
  'className="h-full flex items-center justify-center text-slate-700 italic"',
  'className={`h-full flex items-center justify-center opacity-40 italic`}'
);
content = content.replace(
  'className="mt-8 pt-6 border-t border-slate-800/50"',
  'className={`mt-8 pt-6 border-t border-white/10`}'
);
content = content.replace(
  'className="text-slate-400 font-semibold uppercase tracking-wider text-sm"',
  'className={`opacity-60 font-semibold uppercase tracking-wider text-sm`}'
);
content = content.replace(
  'className="text-slate-700"',
  'className={`opacity-30`}'
);

fs.writeFileSync('src/App.tsx', content);
