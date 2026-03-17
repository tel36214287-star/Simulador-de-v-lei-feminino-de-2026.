const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Update THEME_STYLES
const newThemeStyles = `export const THEME_STYLES = {
  default: {
    bg: 'bg-slate-950',
    text: 'text-slate-200',
    accent1: 'bg-blue-600/20',
    accent2: 'bg-emerald-600/20',
    cardBg: 'bg-slate-900/80',
    cardBorder: 'border-slate-800',
    buttonBg: 'bg-slate-800',
    buttonHover: 'hover:bg-slate-700',
    titleGradient: 'from-blue-400 to-emerald-400',
    vsBadge: 'bg-slate-900 border-slate-800 text-slate-500',
    font: 'font-sans',
    lvlBar: 'from-amber-500 to-yellow-300',
    lvlText: 'text-amber-400',
    modalBg: 'bg-slate-900',
    inputBg: 'bg-slate-950',
    primaryBtn: 'bg-emerald-600 hover:bg-emerald-500',
  },
  valentines: {
    bg: 'bg-rose-950',
    text: 'text-rose-100',
    accent1: 'bg-pink-600/20',
    accent2: 'bg-rose-600/20',
    cardBg: 'bg-rose-900/80',
    cardBorder: 'border-rose-800',
    buttonBg: 'bg-rose-900',
    buttonHover: 'hover:bg-rose-800',
    titleGradient: 'from-pink-400 to-rose-400',
    vsBadge: 'bg-rose-950 border-rose-800 text-rose-300',
    font: 'font-sans',
    lvlBar: 'from-pink-500 to-rose-300',
    lvlText: 'text-pink-400',
    modalBg: 'bg-rose-950',
    inputBg: 'bg-rose-900',
    primaryBtn: 'bg-pink-600 hover:bg-pink-500',
  },
  halloween: {
    bg: 'bg-orange-950',
    text: 'text-orange-100',
    accent1: 'bg-purple-600/20',
    accent2: 'bg-orange-600/20',
    cardBg: 'bg-black/80',
    cardBorder: 'border-orange-900',
    buttonBg: 'bg-orange-900/50',
    buttonHover: 'hover:bg-orange-800/50',
    titleGradient: 'from-purple-400 to-orange-400',
    vsBadge: 'bg-black border-orange-900 text-orange-500',
    font: 'font-sans',
    lvlBar: 'from-orange-500 to-purple-400',
    lvlText: 'text-orange-400',
    modalBg: 'bg-black',
    inputBg: 'bg-orange-950',
    primaryBtn: 'bg-orange-600 hover:bg-orange-500',
  },
  'tim-burton': {
    bg: 'bg-zinc-950',
    text: 'text-zinc-300',
    accent1: 'bg-zinc-600/20',
    accent2: 'bg-zinc-800/20',
    cardBg: 'bg-zinc-900/90',
    cardBorder: 'border-zinc-700',
    buttonBg: 'bg-zinc-900',
    buttonHover: 'hover:bg-zinc-800',
    titleGradient: 'from-zinc-300 to-zinc-500',
    vsBadge: 'bg-zinc-950 border-zinc-700 text-zinc-400',
    font: 'font-serif',
    lvlBar: 'from-zinc-500 to-zinc-300',
    lvlText: 'text-zinc-300',
    modalBg: 'bg-zinc-900',
    inputBg: 'bg-zinc-950',
    primaryBtn: 'bg-zinc-700 hover:bg-zinc-600',
  },
  matrix: {
    bg: 'bg-black',
    text: 'text-green-500',
    accent1: 'bg-green-900/20',
    accent2: 'bg-green-800/20',
    cardBg: 'bg-black/90',
    cardBorder: 'border-green-900',
    buttonBg: 'bg-green-950/30',
    buttonHover: 'hover:bg-green-900/50',
    titleGradient: 'from-green-400 to-green-600',
    vsBadge: 'bg-black border-green-900 text-green-600',
    font: 'font-mono',
    lvlBar: 'from-green-600 to-green-400',
    lvlText: 'text-green-400',
    modalBg: 'bg-black',
    inputBg: 'bg-green-950/30',
    primaryBtn: 'bg-green-700 hover:bg-green-600',
  }
};`;

content = content.replace(/export const THEME_STYLES = \{[\s\S]*?^\};/m, newThemeStyles);

// 2. Replace hardcoded classes in Ranking
content = content.replace(
  'className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl"',
  'className={`${currentStyle.cardBg} backdrop-blur-sm border ${currentStyle.cardBorder} rounded-3xl p-6 sm:p-8 shadow-2xl transition-colors duration-500`}'
);

content = content.replace(
  /className="flex items-center justify-between p-4 rounded-xl bg-slate-950\/50 border border-slate-800\/50 hover:border-slate-700 transition-colors group"/g,
  'className={`flex items-center justify-between p-4 rounded-xl bg-black/20 border ${currentStyle.cardBorder} hover:border-white/20 transition-colors group`}'
);

content = content.replace(
  /className="w-8 text-center font-black text-slate-600 group-hover:text-slate-400 transition-colors"/g,
  'className="w-8 text-center font-black opacity-40 group-hover:opacity-70 transition-opacity"'
);

content = content.replace(
  /className="font-medium text-slate-200 truncate"/g,
  'className="font-medium truncate opacity-90"'
);

content = content.replace(
  /className="text-xs text-slate-500 truncate"/g,
  'className="text-xs truncate opacity-50"'
);

content = content.replace(
  /className="hidden sm:block w-24 h-1\.5 bg-slate-800 rounded-full overflow-hidden"/g,
  'className="hidden sm:block w-24 h-1.5 bg-black/40 rounded-full overflow-hidden"'
);

content = content.replace(
  /className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full"/g,
  'className={`h-full bg-gradient-to-r ${currentStyle.lvlBar} rounded-full`}'
);

content = content.replace(
  /className="flex items-baseline gap-1 bg-slate-900\/80 px-3 py-1\.5 rounded-md border border-slate-800 shadow-inner"/g,
  'className="flex items-baseline gap-1 bg-black/40 px-3 py-1.5 rounded-md border border-white/5 shadow-inner"'
);

content = content.replace(
  /className="text-\[10px\] text-slate-500 font-mono"/g,
  'className="text-[10px] opacity-50 font-mono"'
);

content = content.replace(
  /className="text-lg font-bold text-amber-400 font-mono"/g,
  'className={`text-lg font-bold ${currentStyle.lvlText} font-mono`}'
);

// 3. Replace hardcoded classes in Edit Modal
content = content.replace(
  'className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden"',
  'className={`relative w-full max-w-md ${currentStyle.modalBg} border ${currentStyle.cardBorder} rounded-3xl shadow-2xl overflow-hidden transition-colors duration-500`}'
);

content = content.replace(
  'className="flex items-center justify-between p-6 border-b border-slate-800"',
  'className={`flex items-center justify-between p-6 border-b ${currentStyle.cardBorder}`}'
);

content = content.replace(
  'className="text-xl font-bold text-slate-200 flex items-center gap-2"',
  'className={`text-xl font-bold ${currentStyle.text} flex items-center gap-2`}'
);

content = content.replace(
  'className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-full transition-colors cursor-pointer"',
  'className="p-2 opacity-60 hover:opacity-100 hover:bg-white/10 rounded-full transition-all cursor-pointer"'
);

content = content.replace(
  /className="text-sm font-medium text-slate-400"/g,
  'className="text-sm font-medium opacity-70"'
);

content = content.replace(
  /className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer"/g,
  'className={`w-full ${currentStyle.inputBg} border ${currentStyle.cardBorder} rounded-xl px-4 py-3 ${currentStyle.text} focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all cursor-pointer`}'
);

content = content.replace(
  'className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700"',
  'className={`w-10 h-10 rounded-full ${currentStyle.buttonBg} flex items-center justify-center border ${currentStyle.cardBorder}`}'
);

content = content.replace(
  'className="text-xs font-black text-slate-500 italic"',
  'className="text-xs font-black opacity-50 italic"'
);

// Mando de Quadra buttons
content = content.replace(
  /className=\{\`flex-1 py-2 px-3 rounded-xl border text-sm font-bold transition-all \$\{editHomeTeam === 'A' \? 'bg-blue-600\/20 border-blue-500 text-blue-400' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'\}\`\}/g,
  'className={`flex-1 py-2 px-3 rounded-xl border text-sm font-bold transition-all ${editHomeTeam === \\\'A\\\' ? \\\'bg-blue-600/20 border-blue-500 text-blue-400\\\' : `${currentStyle.inputBg} ${currentStyle.cardBorder} opacity-50 hover:opacity-80`}`}'
);

content = content.replace(
  /className=\{\`flex-1 py-2 px-3 rounded-xl border text-sm font-bold transition-all \$\{editHomeTeam === 'neutral' \? 'bg-slate-800 border-slate-600 text-slate-200' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'\}\`\}/g,
  'className={`flex-1 py-2 px-3 rounded-xl border text-sm font-bold transition-all ${editHomeTeam === \\\'neutral\\\' ? `${currentStyle.buttonBg} border-white/20 ${currentStyle.text}` : `${currentStyle.inputBg} ${currentStyle.cardBorder} opacity-50 hover:opacity-80`}`}'
);

content = content.replace(
  /className=\{\`flex-1 py-2 px-3 rounded-xl border text-sm font-bold transition-all \$\{editHomeTeam === 'B' \? 'bg-emerald-600\/20 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'\}\`\}/g,
  'className={`flex-1 py-2 px-3 rounded-xl border text-sm font-bold transition-all ${editHomeTeam === \\\'B\\\' ? \\\'bg-emerald-600/20 border-emerald-500 text-emerald-400\\\' : `${currentStyle.inputBg} ${currentStyle.cardBorder} opacity-50 hover:opacity-80`}`}'
);

content = content.replace(
  'className="p-6 border-t border-slate-800 bg-slate-900/50 flex gap-3"',
  'className={`p-6 border-t ${currentStyle.cardBorder} bg-black/20 flex gap-3`}'
);

content = content.replace(
  'className="flex-1 px-4 py-3 rounded-xl font-medium text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"',
  'className={`flex-1 px-4 py-3 rounded-xl font-medium opacity-80 hover:${currentStyle.buttonBg} transition-colors cursor-pointer`}'
);

content = content.replace(
  'className="flex-1 px-4 py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"',
  'className={`flex-1 px-4 py-3 rounded-xl font-bold ${currentStyle.primaryBtn} text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}'
);

// 4. Replace hardcoded classes in TeamCard players list
content = content.replace(
  /className="flex items-center justify-between p-4 rounded-xl bg-slate-950\/50 border border-slate-800\/50 hover:border-slate-700 transition-colors"/g,
  'className={`flex items-center justify-between p-4 rounded-xl bg-black/20 border ${currentStyle.cardBorder} hover:border-white/20 transition-colors`}'
);

content = content.replace(
  /className="hidden sm:block w-16 h-1\.5 bg-slate-800 rounded-full overflow-hidden"/g,
  'className="hidden sm:block w-16 h-1.5 bg-black/40 rounded-full overflow-hidden"'
);

content = content.replace(
  /className="flex items-baseline gap-1 bg-slate-900\/80 px-2 py-1 rounded-md border border-slate-800 shadow-inner"/g,
  'className="flex items-baseline gap-1 bg-black/40 px-2 py-1 rounded-md border border-white/5 shadow-inner"'
);

content = content.replace(
  /className="font-bold text-amber-400 font-mono"/g,
  'className={`font-bold ${currentStyle.lvlText} font-mono`}'
);

fs.writeFileSync('src/App.tsx', content);
