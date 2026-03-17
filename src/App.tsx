import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Swords, RefreshCcw, Shield, Zap, Medal, ChevronDown, Edit2, X, Home, Palette, Heart, Ghost, Moon, Binary, History } from 'lucide-react';

type Player = {
  n: string;
  lv: number;
  p: string;
};

type Team = {
  name: string;
  players: Player[];
  reserves: Player[];
};

type MatchResult = {
  id: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  setScores: { a: number; b: number }[];
  winner: 'A' | 'B';
  date: Date;
};

const TEAMS: Team[] = [
  {
    name: "Gerdau Minas",
    players: [
      {n: "Jenna Gray", lv: 88, p: "LEV"}, {n: "Kisy", lv: 90, p: "OPO"},
      {n: "Pri Daroit", lv: 85, p: "PON"}, {n: "Yonaira Peña", lv: 84, p: "PON"},
      {n: "Thaisa Daher", lv: 96, p: "CEN"}, {n: "Julia Kudiess", lv: 95, p: "CEN"}
    ],
    reserves: [
        {n: "Fran Tomazoni", lv: 78, p: "LEV"}, {n: "Celeste Plak", lv: 84, p: "PON"},
        {n: "Glayce Kelly", lv: 76, p: "PON"}, {n: "Rebeca", lv: 74, p: "CEN"},
        {n: "Larissa", lv: 72, p: "CEN"}, {n: "Kika", lv: 80, p: "LIB"}
    ]
  },
  {
    name: "Dentil Praia Clube",
    players: [
      {n: "Macris", lv: 89, p: "LEV"}, {n: "Nia Reed", lv: 87, p: "OPO"},
      {n: "S. Kuznetsova", lv: 92, p: "PON"}, {n: "Caffrey", lv: 83, p: "PON"},
      {n: "Ana Carolina", lv: 94, p: "CEN"}, {n: "Milka", lv: 82, p: "CEN"}
    ],
    reserves: [
        {n: "Milla", lv: 75, p: "LEV"}, {n: "Pri Souza", lv: 78, p: "PON"},
        {n: "Dobriana Rabadzhieva", lv: 82, p: "PON"}, {n: "Gabi Martins", lv: 79, p: "CEN"},
        {n: "Daniela Seibt", lv: 74, p: "CEN"}, {n: "Natinha", lv: 85, p: "LIB"}
    ]
  },
  {
    name: "Osasco São Cristóvão",
    players: [
      {n: "Giovana", lv: 82, p: "LEV"}, {n: "Tifanny", lv: 88, p: "OPO"},
      {n: "Natália Zilio", lv: 86, p: "PON"}, {n: "Maira", lv: 81, p: "PON"},
      {n: "Valquiria", lv: 83, p: "CEN"}, {n: "C. Schwarzenbach", lv: 82, p: "CEN"}
    ],
    reserves: [
        {n: "Kenya", lv: 76, p: "LEV"}, {n: "Mayara", lv: 77, p: "PON"},
        {n: "Amanda", lv: 75, p: "PON"}, {n: "Larissa Besen", lv: 77, p: "CEN"},
        {n: "Geovana", lv: 73, p: "OPO"}, {n: "Camila Brait", lv: 94, p: "LIB"}
    ]
  },
  {
    name: "Sesc RJ Flamengo",
    players: [
      {n: "Brie King", lv: 90, p: "LEV"}, {n: "Edinara", lv: 85, p: "OPO"},
      {n: "Michelle Pavão", lv: 80, p: "PON"}, {n: "Helena", lv: 79, p: "PON"},
      {n: "Juju Perdigão", lv: 81, p: "CEN"}, {n: "Lorena", lv: 83, p: "CEN"}
    ],
    reserves: [
        {n: "Rose", lv: 75, p: "LEV"}, {n: "Karina", lv: 78, p: "PON"},
        {n: "Gabiru", lv: 76, p: "PON"}, {n: "Adria", lv: 72, p: "CEN"},
        {n: "Kimberlly", lv: 77, p: "OPO"}, {n: "Laís", lv: 82, p: "LIB"}
    ]
  },
  {
    name: "Sesi Vôlei Bauru",
    players: [
      {n: "Dani Lins", lv: 84, p: "LEV"}, {n: "Bruna Moraes", lv: 82, p: "OPO"},
      {n: "Thaisinha", lv: 80, p: "PON"}, {n: "Kasiely", lv: 79, p: "PON"},
      {n: "Mayany", lv: 81, p: "CEN"}, {n: "Mayhara", lv: 80, p: "CEN"}
    ],
    reserves: [
        {n: "Isis", lv: 72, p: "LEV"}, {n: "Ellen", lv: 75, p: "PON"},
        {n: "Milena", lv: 74, p: "PON"}, {n: "Katrina", lv: 73, p: "CEN"},
        {n: "Pamela", lv: 76, p: "OPO"}, {n: "Léia", lv: 84, p: "LIB"}
    ]
  },
  {
    name: "Fluminense",
    players: [
      {n: "Pri Heldes", lv: 80, p: "LEV"}, {n: "Ariane", lv: 81, p: "OPO"},
      {n: "Amanda Campos", lv: 79, p: "PON"}, {n: "Pietra", lv: 78, p: "PON"},
      {n: "Lara Nobre", lv: 80, p: "CEN"}, {n: "Camila Paracatu", lv: 77, p: "CEN"}
    ],
    reserves: [
        {n: "Carol Tormena", lv: 72, p: "PON"}, {n: "Paula", lv: 74, p: "OPO"},
        {n: "Vanessa", lv: 71, p: "LEV"}, {n: "Dani Seibt", lv: 73, p: "CEN"},
        {n: "Stephany", lv: 70, p: "PON"}, {n: "Lelê", lv: 79, p: "LIB"}
    ]
  },
  {
    name: "Barueri",
    players: [
      {n: "Lyara", lv: 76, p: "LEV"}, {n: "Jheovana", lv: 80, p: "OPO"},
      {n: "Ana Rudiger", lv: 75, p: "PON"}, {n: "Vitoria Parise", lv: 74, p: "PON"},
      {n: "Luzia", lv: 82, p: "CEN"}, {n: "Livia", lv: 75, p: "CEN"}
    ],
    reserves: [
        {n: "Maria", lv: 70, p: "LEV"}, {n: "Gabi", lv: 72, p: "PON"},
        {n: "Talita", lv: 71, p: "PON"}, {n: "Livia", lv: 73, p: "CEN"},
        {n: "Larissa", lv: 70, p: "OPO"}, {n: "Paulina", lv: 74, p: "LIB"}
    ]
  },
  {
    name: "Pinheiros",
    players: [
      {n: "Seleane", lv: 74, p: "LEV"}, {n: "Fran Richter", lv: 78, p: "OPO"},
      {n: "Karen", lv: 73, p: "PON"}, {n: "Nelmaira", lv: 72, p: "PON"},
      {n: "Lays", lv: 76, p: "CEN"}, {n: "Mara", lv: 79, p: "CEN"}
    ],
    reserves: [
        {n: "Jaqueline", lv: 71, p: "LEV"}, {n: "Brandi", lv: 73, p: "PON"},
        {n: "Duda", lv: 70, p: "PON"}, {n: "Gabi", lv: 72, p: "CEN"},
        {n: "Carol", lv: 70, p: "OPO"}, {n: "Érica", lv: 75, p: "LIB"}
    ]
  },
  {
    name: "Mackenzie",
    players: [
      {n: "Fabíola", lv: 83, p: "LEV"}, {n: "Gabiru", lv: 75, p: "OPO"},
      {n: "Carla", lv: 74, p: "PON"}, {n: "Lana", lv: 74, p: "PON"},
      {n: "Saraelen", lv: 78, p: "CEN"}, {n: "Giulia", lv: 73, p: "CEN"}
    ],
    reserves: [
        {n: "Bruninha", lv: 75, p: "LEV"}, {n: "Duda", lv: 72, p: "PON"},
        {n: "Suellyn", lv: 71, p: "PON"}, {n: "Aline", lv: 73, p: "CEN"},
        {n: "Viviane", lv: 74, p: "OPO"}, {n: "Gabi", lv: 76, p: "LIB"}
    ]
  },
  {
    name: "Unilife Maringá",
    players: [
      {n: "Vivian", lv: 73, p: "LEV"}, {n: "Jaqueline", lv: 75, p: "OPO"},
      {n: "Karol Tormena", lv: 72, p: "PON"}, {n: "Natália", lv: 71, p: "PON"},
      {n: "Fran Jacintho", lv: 75, p: "CEN"}, {n: "Jussara", lv: 72, p: "CEN"}
    ],
    reserves: [
        {n: "Laiza", lv: 70, p: "LEV"}, {n: "Bia", lv: 71, p: "PON"},
        {n: "Anny", lv: 69, p: "PON"}, {n: "Debora", lv: 72, p: "CEN"},
        {n: "Jessica", lv: 71, p: "OPO"}, {n: "Ania", lv: 73, p: "LIB"}
    ]
  },
  {
    name: "Brasília Vôlei",
    players: [
      {n: "Marina", lv: 72, p: "LEV"}, {n: "Laiza", lv: 74, p: "OPO"},
      {n: "Ana Medina", lv: 71, p: "PON"}, {n: "Nayara", lv: 70, p: "PON"},
      {n: "Kelly", lv: 73, p: "CEN"}, {n: "Milena", lv: 72, p: "CEN"}
    ],
    reserves: [
        {n: "Nicole", lv: 69, p: "LEV"}, {n: "Victoria", lv: 71, p: "PON"},
        {n: "Lana", lv: 70, p: "PON"}, {n: "Natiele", lv: 72, p: "CEN"},
        {n: "Sabrina", lv: 71, p: "OPO"}, {n: "Vitoria", lv: 72, p: "LIB"}
    ]
  },
  {
    name: "Bluvôlei",
    players: [
      {n: "Aury", lv: 70, p: "LEV"}, {n: "Ivna", lv: 76, p: "OPO"},
      {n: "Mari Cassemiro", lv: 72, p: "PON"}, {n: "Vitoria", lv: 69, p: "PON"},
      {n: "Andressa", lv: 74, p: "CEN"}, {n: "Natasha", lv: 73, p: "CEN"}
    ],
    reserves: [
        {n: "Ana", lv: 68, p: "LEV"}, {n: "Duda", lv: 70, p: "PON"},
        {n: "Kenia", lv: 69, p: "PON"}, {n: "Geovanna", lv: 71, p: "CEN"},
        {n: "Sara", lv: 70, p: "OPO"}, {n: "Tais", lv: 71, p: "LIB"}
    ]
  }
];

const ALL_PLAYERS = TEAMS.flatMap(team => 
  [...team.players, ...team.reserves].map(p => ({ ...p, teamName: team.name }))
).sort((a, b) => b.lv - a.lv);

export type AppTheme = 'default' | 'valentines' | 'halloween' | 'tim-burton' | 'matrix';

export const THEME_STYLES = {
  default: {
    bg: 'bg-[#111111]',
    text: 'text-[#F5F5F5]',
    accent1: 'bg-[#0056A3]/20',
    accent2: 'bg-[#FF8C00]/20',
    cardBg: 'bg-[#111111]/80',
    cardBorder: 'border-[#FFFFFF]/20',
    buttonBg: 'bg-[#0056A3]/50',
    buttonHover: 'hover:bg-[#0056A3]/80',
    titleGradient: 'from-[#0056A3] via-[#FF8C00] to-[#FFD700]',
    vsBadge: 'bg-[#111111] border-[#FFD700] text-[#FFD700]',
    font: 'font-sans',
    lvlBar: 'from-[#0056A3] to-[#FF8C00]',
    lvlText: 'text-[#FFD700]',
    modalBg: 'bg-[#111111]',
    inputBg: 'bg-[#111111]',
    primaryBtn: 'bg-[#FF8C00] hover:bg-[#FF8C00]/80',
  },
  valentines: {
    bg: 'bg-[#1a050a]',
    text: 'text-rose-100',
    accent1: 'bg-rose-600/20',
    accent2: 'bg-pink-600/20',
    cardBg: 'bg-[#2d0a14]/80',
    cardBorder: 'border-rose-500/30',
    buttonBg: 'bg-rose-900/50',
    buttonHover: 'hover:bg-rose-800/80',
    titleGradient: 'from-rose-400 via-pink-500 to-red-400',
    vsBadge: 'bg-[#1a050a] border-rose-500 text-rose-400',
    font: 'font-sans',
    lvlBar: 'from-rose-500 to-pink-400',
    lvlText: 'text-rose-300',
    modalBg: 'bg-[#1a050a]',
    inputBg: 'bg-[#2d0a14]',
    primaryBtn: 'bg-rose-600 hover:bg-rose-500',
  },
  halloween: {
    bg: 'bg-[#0f0500]',
    text: 'text-orange-100',
    accent1: 'bg-orange-600/20',
    accent2: 'bg-purple-600/20',
    cardBg: 'bg-[#1a0a00]/80',
    cardBorder: 'border-orange-500/30',
    buttonBg: 'bg-orange-900/50',
    buttonHover: 'hover:bg-orange-800/80',
    titleGradient: 'from-orange-500 via-purple-500 to-orange-400',
    vsBadge: 'bg-[#0f0500] border-orange-500 text-orange-500',
    font: 'font-sans',
    lvlBar: 'from-orange-600 to-purple-500',
    lvlText: 'text-orange-400',
    modalBg: 'bg-[#0f0500]',
    inputBg: 'bg-[#1a0a00]',
    primaryBtn: 'bg-orange-600 hover:bg-orange-500',
  },
  'tim-burton': {
    bg: 'bg-[#0a0a0c]',
    text: 'text-zinc-300',
    accent1: 'bg-zinc-600/20',
    accent2: 'bg-slate-600/20',
    cardBg: 'bg-[#121215]/80',
    cardBorder: 'border-zinc-600/30',
    buttonBg: 'bg-zinc-800/50',
    buttonHover: 'hover:bg-zinc-700/80',
    titleGradient: 'from-zinc-400 via-slate-300 to-zinc-500',
    vsBadge: 'bg-[#0a0a0c] border-zinc-500 text-zinc-400',
    font: 'font-serif',
    lvlBar: 'from-zinc-600 to-slate-400',
    lvlText: 'text-zinc-300',
    modalBg: 'bg-[#0a0a0c]',
    inputBg: 'bg-[#121215]',
    primaryBtn: 'bg-zinc-700 hover:bg-zinc-600',
  },
  matrix: {
    bg: 'bg-[#000500]',
    text: 'text-green-500',
    accent1: 'bg-green-600/10',
    accent2: 'bg-emerald-600/10',
    cardBg: 'bg-[#001100]/80',
    cardBorder: 'border-green-500/30',
    buttonBg: 'bg-green-900/30',
    buttonHover: 'hover:bg-green-800/50',
    titleGradient: 'from-green-400 via-emerald-500 to-green-300',
    vsBadge: 'bg-[#000500] border-green-500 text-green-500',
    font: 'font-mono',
    lvlBar: 'from-green-600 to-emerald-400',
    lvlText: 'text-green-400',
    modalBg: 'bg-[#000500]',
    inputBg: 'bg-[#001100]',
    primaryBtn: 'bg-green-700 hover:bg-green-600',
  }
};

export default function App() {
  const [teamA, setTeamA] = useState<Team | null>(null);
  const [teamB, setTeamB] = useState<Team | null>(null);
  const [status, setStatus] = useState<'idle' | 'drawn' | 'resolved'>('idle');
  const [winner, setWinner] = useState<'A' | 'B' | null>(null);
  const [score, setScore] = useState<[number, number] | null>(null);
  const [setScores, setSetScores] = useState<{ a: number; b: number }[]>([]);
  const [showRanking, setShowRanking] = useState(false);
  const [rankingFilter, setRankingFilter] = useState<string>('ALL');
  const [history, setHistory] = useState<MatchResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [homeTeam, setHomeTeam] = useState<'A' | 'B' | 'neutral'>('neutral');
  const [matchPowerA, setMatchPowerA] = useState<number | null>(null);
  const [matchPowerB, setMatchPowerB] = useState<number | null>(null);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTeamA, setEditTeamA] = useState<string>(TEAMS[0].name);
  const [editTeamB, setEditTeamB] = useState<string>(TEAMS[1].name);
  const [editHomeTeam, setEditHomeTeam] = useState<'A' | 'B' | 'neutral'>('neutral');
  const [appTheme, setAppTheme] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('appTheme');
    return (saved as AppTheme) || 'default';
  });
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('appTheme', appTheme);
  }, [appTheme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const HOME_ADVANTAGE = 15;

  const drawTeams = () => {
    let idxA = Math.floor(Math.random() * TEAMS.length);
    let idxB = Math.floor(Math.random() * TEAMS.length);
    
    while (idxA === idxB) {
      idxB = Math.floor(Math.random() * TEAMS.length);
    }

    const possibleHomeTeams: ('A' | 'B' | 'neutral')[] = ['A', 'B', 'neutral'];
    const randomHome = possibleHomeTeams[Math.floor(Math.random() * possibleHomeTeams.length)];

    setTeamA(TEAMS[idxA]);
    setTeamB(TEAMS[idxB]);
    setStatus('drawn');
    setWinner(null);
    setScore(null);
    setSetScores([]);
    setHomeTeam(randomHome);
    setMatchPowerA(null);
    setMatchPowerB(null);
  };

  const resolveDuel = () => {
    if (!teamA || !teamB) return;

    const calcularPerformanceEquipe = (equipe: Team, ehMandante: boolean) => {
      let poderTotal = 0;

      equipe.players.forEach(titular => {
        // Performance oscila entre 80% e 110% do nível base
        const oscilacao = Math.random() * (1.1 - 0.8) + 0.8;
        let rendimentoAtual = titular.lv * oscilacao;

        // Lógica de Substituição
        // Se o titular estiver rendendo menos de 85% do seu potencial
        if (rendimentoAtual < titular.lv * 0.85) {
          const reservaPosicao = equipe.reserves.find(r => r.p === titular.p);

          if (reservaPosicao) {
            // Reserva entra com 95% de rendimento fixo (fôlego novo)
            const rendimentoReserva = reservaPosicao.lv * 0.95;

            // Se a reserva for melhor que o titular naquele momento, ela entra
            if (rendimentoReserva > rendimentoAtual) {
              rendimentoAtual = rendimentoReserva;
            }
          }
        }
        poderTotal += rendimentoAtual;
      });

      // Aplica bônus de mandante se necessário
      return ehMandante ? poderTotal + HOME_ADVANTAGE : poderTotal;
    };

    const pA = calcularPerformanceEquipe(teamA, homeTeam === 'A');
    const pB = calcularPerformanceEquipe(teamB, homeTeam === 'B');

    setMatchPowerA(Math.round(pA));
    setMatchPowerB(Math.round(pB));

    const gerarPlacar = (p1: number, p2: number): [number, number] => {
      const diff = p1 - p2;
      if (diff > 40) return [3, 0];
      if (diff > 20) return [3, 1];
      if (diff > 0)  return [3, 2];
      if (diff < -40) return [0, 3];
      if (diff < -20) return [1, 3];
      return [2, 3];
    };

    const [targetSetsA, targetSetsB] = gerarPlacar(pA, pB);

    let currentSetsA = 0;
    let currentSetsB = 0;
    const generatedSetScores = [];
    let setIndex = 0;

    while (currentSetsA < targetSetsA || currentSetsB < targetSetsB) {
      let setWinner: 'A' | 'B';
      
      if (currentSetsA === targetSetsA) {
        setWinner = 'B';
      } else if (currentSetsB === targetSetsB) {
        setWinner = 'A';
      } else {
        const probA = (targetSetsA - currentSetsA) / ((targetSetsA - currentSetsA) + (targetSetsB - currentSetsB));
        setWinner = Math.random() < probA ? 'A' : 'B';
      }
      
      if (setWinner === 'A') currentSetsA++;
      else currentSetsB++;

      const isTieBreak = setIndex === 4;
      const winScore = isTieBreak ? 15 : 25;
      const isDeuce = Math.random() > 0.8;
      let finalWinScore = winScore;
      let finalLoseScore = 0;

      if (isDeuce) {
        finalWinScore = winScore + Math.floor(Math.random() * 4) + 1;
        finalLoseScore = finalWinScore - 2;
      } else {
        finalLoseScore = winScore - Math.floor(Math.random() * 8) - 2;
      }

      generatedSetScores.push({
        a: setWinner === 'A' ? finalWinScore : finalLoseScore,
        b: setWinner === 'B' ? finalWinScore : finalLoseScore
      });
      setIndex++;
    }

    const matchWinner = targetSetsA > targetSetsB ? 'A' : 'B';
    
    setScore([targetSetsA, targetSetsB]);
    setSetScores(generatedSetScores);
    setWinner(matchWinner);
    setStatus('resolved');

    const newMatch: MatchResult = {
      id: Math.random().toString(36).substr(2, 9),
      teamA: teamA.name,
      teamB: teamB.name,
      scoreA: targetSetsA,
      scoreB: targetSetsB,
      setScores: generatedSetScores,
      winner: matchWinner,
      date: new Date()
    };
    setHistory(prev => [newMatch, ...prev]);
  };

  const getPower = (team: Team | null) => {
    if (!team) return 0;
    return team.players.reduce((acc, p) => acc + p.lv, 0);
  };

  const handleSaveEdit = () => {
    const tA = TEAMS.find(t => t.name === editTeamA);
    const tB = TEAMS.find(t => t.name === editTeamB);
    if (tA && tB && tA.name !== tB.name) {
      setTeamA(tA);
      setTeamB(tB);
      setHomeTeam(editHomeTeam);
      setStatus('drawn');
      setWinner(null);
      setScore(null);
      setSetScores([]);
      setMatchPowerA(null);
      setMatchPowerB(null);
      setShowEditModal(false);
    }
  };

  const powerA = getPower(teamA) + (homeTeam === 'A' ? HOME_ADVANTAGE : 0);
  const powerB = getPower(teamB) + (homeTeam === 'B' ? HOME_ADVANTAGE : 0);

  const currentStyle = THEME_STYLES[appTheme];

  return (
    <div className={`min-h-screen ${currentStyle.bg} ${currentStyle.text} ${currentStyle.font} selection:bg-blue-500/30 flex flex-col items-center py-12 px-4 sm:px-8 relative overflow-hidden transition-colors duration-500`}>
      
      {/* Theme Selector */}
      <div className="absolute top-4 right-4 z-50" ref={themeMenuRef}>
        <div className="relative">
          <button 
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            className={`p-3 rounded-full ${currentStyle.buttonBg} ${currentStyle.buttonHover} transition-all duration-300 flex items-center justify-center shadow-lg border ${currentStyle.cardBorder} hover:scale-105`}
          >
            <Palette className="w-5 h-5" />
          </button>
          <AnimatePresence>
            {isThemeMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`absolute right-0 mt-2 w-56 py-2 ${currentStyle.cardBg} backdrop-blur-xl rounded-2xl shadow-2xl border ${currentStyle.cardBorder} flex flex-col origin-top-right`}
              >
                <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider opacity-50 mb-1">Temas</div>
                <button onClick={() => { setAppTheme('default'); setIsThemeMenuOpen(false); }} className={`px-4 py-2.5 text-left hover:bg-white/10 flex items-center gap-3 transition-colors ${appTheme === 'default' ? 'bg-white/5 font-bold' : ''}`}>
                  <Palette className="w-4 h-4 text-[#FF8C00]" />
                  <span>Quadra (Padrão)</span>
                </button>
                <button onClick={() => { setAppTheme('valentines'); setIsThemeMenuOpen(false); }} className={`px-4 py-2.5 text-left hover:bg-white/10 flex items-center gap-3 transition-colors text-pink-400 ${appTheme === 'valentines' ? 'bg-white/5 font-bold' : ''}`}>
                  <Heart className="w-4 h-4" />
                  <span>Valentine's Day</span>
                </button>
                <button onClick={() => { setAppTheme('halloween'); setIsThemeMenuOpen(false); }} className={`px-4 py-2.5 text-left hover:bg-white/10 flex items-center gap-3 transition-colors text-orange-400 ${appTheme === 'halloween' ? 'bg-white/5 font-bold' : ''}`}>
                  <Ghost className="w-4 h-4" />
                  <span>Halloween</span>
                </button>
                <button onClick={() => { setAppTheme('tim-burton'); setIsThemeMenuOpen(false); }} className={`px-4 py-2.5 text-left hover:bg-white/10 flex items-center gap-3 transition-colors text-zinc-300 ${appTheme === 'tim-burton' ? 'bg-white/5 font-bold' : ''}`}>
                  <Moon className="w-4 h-4" />
                  <span>Tim Burton</span>
                </button>
                <button onClick={() => { setAppTheme('matrix'); setIsThemeMenuOpen(false); }} className={`px-4 py-2.5 text-left hover:bg-white/10 flex items-center gap-3 transition-colors text-green-400 ${appTheme === 'matrix' ? 'bg-white/5 font-bold' : ''}`}>
                  <Binary className="w-4 h-4" />
                  <span>Matrix</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Background Effects */}
      <div className={`absolute top-0 left-1/4 w-96 h-96 ${currentStyle.accent1} rounded-full blur-[120px] pointer-events-none transition-colors duration-500`} />
      <div className={`absolute bottom-0 right-1/4 w-96 h-96 ${currentStyle.accent2} rounded-full blur-[120px] pointer-events-none transition-colors duration-500`} />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] ${currentStyle.cardBg} rounded-full blur-[100px] pointer-events-none -z-10 transition-colors duration-500`} />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${currentStyle.titleGradient} mb-4 transition-colors duration-500`}>
          Simulador da Super Liga de Vôlei Feminina by Renato
        </h1>
        <p className="opacity-70 max-w-xl mx-auto text-lg">
          Sorteie os clubes da Superliga Feminina e descubra quem vence no confronto direto baseado na força das jogadoras.
        </p>
      </motion.div>

      {/* Scoreboard / Status */}
      <div className="h-24 flex items-center justify-center mb-8 w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-2xl font-semibold text-slate-500 flex items-center gap-3"
            >
              <Shield className="w-8 h-8" />
              Aguardando Sorteio
            </motion.div>
          )}
          {status === 'drawn' && (
            <motion.div
              key="drawn"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-3xl font-bold text-amber-400 flex items-center gap-3"
            >
              <Swords className="w-8 h-8" />
              Confronto Definido!
            </motion.div>
          )}
          {status === 'resolved' && (
            <motion.div
              key="resolved"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-4 text-5xl font-black font-mono tracking-wider">
                  <span className={winner === 'A' ? 'text-blue-400' : 'text-slate-500'}>{score?.[0]}</span>
                  <span className="text-slate-600 text-3xl">-</span>
                  <span className={winner === 'B' ? 'text-emerald-400' : 'text-slate-500'}>{score?.[1]}</span>
                </div>
                <div className="flex gap-2 text-sm font-mono opacity-70 mt-1">
                  {setScores.map((s, i) => (
                    <span key={i} className="bg-black/20 px-2 py-1 rounded">
                      {s.a}-{s.b}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xl font-bold uppercase tracking-widest mt-2">
                  <Trophy className="w-6 h-6 text-amber-400" />
                  <span className={winner === 'A' ? 'text-blue-400' : 'text-emerald-400'}>
                    Vitória: {winner === 'A' ? teamA?.name : teamB?.name}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Arena */}
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl relative z-10">
        
        {/* Team A */}
        <TeamCard 
          team={teamA} 
          title="Time A" 
          theme="blue" 
          power={status === 'resolved' && matchPowerA !== null ? matchPowerA : powerA} 
          showPower={status === 'resolved'} 
          isWinner={winner === 'A'}
          isLoser={winner === 'B'}
          isHome={homeTeam === 'A'}
          appTheme={appTheme}
        />

        {/* VS Badge */}
        <div className="hidden lg:flex items-center justify-center -mx-4 z-20">
          <div className={`w-16 h-16 rounded-full ${currentStyle.vsBadge} border-4 flex items-center justify-center shadow-2xl shadow-black/50 transition-colors duration-500`}>
            <span className="text-xl font-black italic">VS</span>
          </div>
        </div>

        {/* Team B */}
        <TeamCard 
          team={teamB} 
          title="Time B" 
          theme="emerald" 
          power={status === 'resolved' && matchPowerB !== null ? matchPowerB : powerB} 
          showPower={status === 'resolved'} 
          isWinner={winner === 'B'}
          isLoser={winner === 'A'}
          isHome={homeTeam === 'B'}
          appTheme={appTheme}
        />

      </div>

      {/* Controls */}
      <div className="mt-16 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
        <button
          onClick={drawTeams}
          className={`group relative px-8 py-4 ${currentStyle.buttonBg} ${currentStyle.buttonHover} font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 overflow-hidden`}
        >
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          <span>1. Sortear Confronto</span>
        </button>

        <button
          onClick={() => {
            setEditTeamA(teamA ? teamA.name : TEAMS[0].name);
            setEditTeamB(teamB ? teamB.name : TEAMS[1].name);
            setEditHomeTeam(homeTeam);
            setShowEditModal(true);
          }}
          className={`group relative px-8 py-4 ${currentStyle.buttonBg} ${currentStyle.buttonHover} font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 overflow-hidden`}
        >
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Edit2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span>2. Editar Duelo</span>
        </button>

        <button
          onClick={resolveDuel}
          disabled={status !== 'drawn'}
          className={`group relative px-8 py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-3 overflow-hidden ${
            status === 'drawn' 
              ? `bg-gradient-to-r ${currentStyle.titleGradient} text-white shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 cursor-pointer` 
              : `${currentStyle.buttonBg} opacity-50 cursor-not-allowed`
          }`}
        >
          <Zap className={`w-5 h-5 ${status === 'drawn' ? 'animate-pulse' : ''}`} />
          <span>3. Resultado do Jogo</span>
        </button>
      </div>

      {/* Ranking Section */}
      <div className="mt-24 w-full max-w-4xl relative z-10 mb-12 flex flex-col items-center">
        <button 
          onClick={() => setShowRanking(!showRanking)}
          className="group flex items-center gap-3 mb-8 justify-center hover:bg-slate-800/50 active:scale-95 px-6 py-3 rounded-2xl transition-all cursor-pointer"
        >
          <Medal className="w-8 h-8 text-amber-400" />
          <h2 className="text-2xl sm:text-3xl font-black text-slate-200 uppercase tracking-wider group-hover:text-amber-400 transition-colors">
            Ranking Geral
          </h2>
          <ChevronDown className={`w-6 h-6 text-slate-500 transition-transform duration-300 ${showRanking ? 'rotate-180' : ''}`} />
        </button>
        
        <AnimatePresence>
          {showRanking && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full overflow-hidden"
            >
              <div className={`${currentStyle.cardBg} backdrop-blur-sm border ${currentStyle.cardBorder} rounded-3xl p-6 sm:p-8 shadow-2xl transition-colors duration-500`}>
                
                {/* Position Filter */}
                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                  {['ALL', 'LEV', 'OPO', 'PON', 'CEN', 'LIB'].map(pos => (
                    <button
                      key={pos}
                      onClick={() => setRankingFilter(pos)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        rankingFilter === pos 
                          ? `bg-amber-500 text-black shadow-lg scale-105` 
                          : `bg-black/20 border ${currentStyle.cardBorder} hover:bg-white/10 opacity-70 hover:opacity-100`
                      }`}
                    >
                      {pos === 'ALL' ? 'TODOS' : pos}
                    </button>
                  ))}
                </div>

                <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
            {ALL_PLAYERS.filter(p => rankingFilter === 'ALL' || p.p === rankingFilter).map((player, idx) => (
              <div 
                key={`${player.n}-${idx}`}
                className={`flex items-center justify-between p-4 rounded-xl bg-black/20 border ${currentStyle.cardBorder} hover:border-white/20 transition-colors group`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-8 text-center font-black opacity-40 group-hover:opacity-70 transition-opacity">
                    #{idx + 1}
                  </div>
                  <span className={`w-12 text-xs font-bold py-1 rounded border text-center ${
                    player.p === 'LEV' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    player.p === 'OPO' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                    player.p === 'PON' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    player.p === 'CEN' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                    'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {player.p}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-medium truncate opacity-90">{player.n}</span>
                    <span className="text-xs truncate opacity-50">{player.teamName}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="hidden sm:block w-24 h-1.5 bg-black/40 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${currentStyle.lvlBar} rounded-full`}
                      style={{ width: `${player.lv}%` }}
                    />
                  </div>
                  <div className="flex items-baseline gap-1 bg-black/40 px-3 py-1.5 rounded-md border border-white/5 shadow-inner">
                    <span className="text-[10px] opacity-50 font-mono">LVL</span>
                    <span className={`text-lg font-bold ${currentStyle.lvlText} font-mono`}>{player.lv}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

      {/* History Section */}
      <div className="w-full max-w-4xl relative z-10 mb-24 flex flex-col items-center">
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="group flex items-center gap-3 mb-8 justify-center hover:bg-slate-800/50 active:scale-95 px-6 py-3 rounded-2xl transition-all cursor-pointer"
        >
          <History className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl sm:text-3xl font-black text-slate-200 uppercase tracking-wider group-hover:text-blue-400 transition-colors">
            Histórico de Partidas
          </h2>
          <ChevronDown className={`w-6 h-6 text-slate-500 transition-transform duration-300 ${showHistory ? 'rotate-180' : ''}`} />
        </button>
        
        <AnimatePresence>
          {showHistory && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full overflow-hidden"
            >
              <div className={`${currentStyle.cardBg} backdrop-blur-sm border ${currentStyle.cardBorder} rounded-3xl p-6 sm:p-8 shadow-2xl transition-colors duration-500`}>
                {history.length === 0 ? (
                  <div className="text-center opacity-50 italic py-8">Nenhuma partida registrada ainda.</div>
                ) : (
                  <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
                    {history.map((match) => (
                      <div 
                        key={match.id}
                        className={`flex items-center justify-between p-4 rounded-xl bg-black/20 border ${currentStyle.cardBorder} hover:border-white/20 transition-colors`}
                      >
                        <div className={`flex-1 text-right font-bold ${match.winner === 'A' ? 'text-blue-400' : 'opacity-70'}`}>
                          {match.teamA}
                        </div>
                        <div className="px-6 flex flex-col items-center gap-1">
                          <div className="flex items-center gap-3 font-mono text-xl font-black">
                            <span className={match.winner === 'A' ? 'text-blue-400' : 'opacity-70'}>{match.scoreA}</span>
                            <span className="opacity-30">-</span>
                            <span className={match.winner === 'B' ? 'text-emerald-400' : 'opacity-70'}>{match.scoreB}</span>
                          </div>
                          <div className="flex gap-1.5 text-xs font-mono opacity-60">
                            {match.setScores.map((s, i) => (
                              <span key={i} className="bg-black/30 px-1.5 py-0.5 rounded">
                                {s.a}-{s.b}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className={`flex-1 text-left font-bold ${match.winner === 'B' ? 'text-emerald-400' : 'opacity-70'}`}>
                          {match.teamB}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Edit Duel Modal */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-md ${currentStyle.modalBg} border ${currentStyle.cardBorder} rounded-3xl shadow-2xl overflow-hidden transition-colors duration-500`}
            >
              <div className={`flex items-center justify-between p-6 border-b ${currentStyle.cardBorder}`}>
                <h3 className={`text-xl font-bold ${currentStyle.text} flex items-center gap-2`}>
                  <Edit2 className="w-5 h-5 text-emerald-400" />
                  Editar Duelo
                </h3>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="p-2 opacity-60 hover:opacity-100 hover:bg-white/10 rounded-full transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium opacity-70">Time A</label>
                  <select 
                    value={editTeamA}
                    onChange={(e) => setEditTeamA(e.target.value)}
                    className={`w-full ${currentStyle.inputBg} border ${currentStyle.cardBorder} rounded-xl px-4 py-3 ${currentStyle.text} focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all cursor-pointer`}
                  >
                    {TEAMS.map(t => (
                      <option key={`A-${t.name}`} value={t.name} disabled={t.name === editTeamB}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-center">
                  <div className={`w-10 h-10 rounded-full ${currentStyle.buttonBg} flex items-center justify-center border ${currentStyle.cardBorder}`}>
                    <span className="text-xs font-black opacity-50 italic">VS</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium opacity-70">Time B</label>
                  <select 
                    value={editTeamB}
                    onChange={(e) => setEditTeamB(e.target.value)}
                    className={`w-full ${currentStyle.inputBg} border ${currentStyle.cardBorder} rounded-xl px-4 py-3 ${currentStyle.text} focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all cursor-pointer`}
                  >
                    {TEAMS.map(t => (
                      <option key={`B-${t.name}`} value={t.name} disabled={t.name === editTeamA}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-sm font-medium opacity-70">Mando de Quadra (Fator Casa +{HOME_ADVANTAGE})</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditHomeTeam('A')}
                      className={`flex-1 py-2 px-3 rounded-xl border text-sm font-bold transition-all ${editHomeTeam === 'A' ? 'bg-blue-600/20 border-blue-500 text-blue-400' : `${currentStyle.inputBg} ${currentStyle.cardBorder} opacity-50 hover:opacity-80`}`}
                    >
                      Time A
                    </button>
                    <button
                      onClick={() => setEditHomeTeam('neutral')}
                      className={`flex-1 py-2 px-3 rounded-xl border text-sm font-bold transition-all ${editHomeTeam === 'neutral' ? `${currentStyle.buttonBg} border-white/20 ${currentStyle.text}` : `${currentStyle.inputBg} ${currentStyle.cardBorder} opacity-50 hover:opacity-80`}`}
                    >
                      Neutro
                    </button>
                    <button
                      onClick={() => setEditHomeTeam('B')}
                      className={`flex-1 py-2 px-3 rounded-xl border text-sm font-bold transition-all ${editHomeTeam === 'B' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400' : `${currentStyle.inputBg} ${currentStyle.cardBorder} opacity-50 hover:opacity-80`}`}
                    >
                      Time B
                    </button>
                  </div>
                </div>
              </div>
              
              <div className={`p-6 border-t ${currentStyle.cardBorder} bg-black/20 flex gap-3`}>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium opacity-80 hover:${currentStyle.buttonBg} active:scale-95 transition-all cursor-pointer`}
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSaveEdit}
                  disabled={editTeamA === editTeamB}
                  className={`flex-1 px-4 py-3 rounded-xl font-bold ${currentStyle.primaryBtn} text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer disabled:active:scale-100`}
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// --- Subcomponents ---

function TeamCard({ 
  team, 
  title, 
  theme, 
  power, 
  showPower,
  isWinner,
  isLoser,
  isHome,
  appTheme
}: { 
  team: Team | null, 
  title: string, 
  theme: 'blue' | 'emerald', 
  power: number, 
  showPower: boolean,
  isWinner: boolean,
  isLoser: boolean,
  isHome?: boolean,
  appTheme: AppTheme
}) {
  
  const THEME_COLORS = {
    default: {
      blue: {
        border: 'border-[#0056A3]/50',
        bg: 'bg-[#0056A3]/10',
        text: 'text-[#F5F5F5]',
        glow: 'shadow-[#0056A3]/30',
        winnerBorder: 'border-[#FFD700]',
        winnerGlow: 'shadow-[0_0_40px_-10px_#FFD700]'
      },
      emerald: {
        border: 'border-[#FF8C00]/50',
        bg: 'bg-[#FF8C00]/10',
        text: 'text-[#F5F5F5]',
        glow: 'shadow-[#FF8C00]/30',
        winnerBorder: 'border-[#FFD700]',
        winnerGlow: 'shadow-[0_0_40px_-10px_#FFD700]'
      }
    },
    valentines: {
      blue: {
        border: 'border-rose-500/30',
        bg: 'bg-rose-500/10',
        text: 'text-rose-300',
        glow: 'shadow-rose-500/20',
        winnerBorder: 'border-rose-400',
        winnerGlow: 'shadow-[0_0_40px_-10px_rgba(244,63,94,0.6)]'
      },
      emerald: {
        border: 'border-pink-500/30',
        bg: 'bg-pink-500/10',
        text: 'text-pink-300',
        glow: 'shadow-pink-500/20',
        winnerBorder: 'border-pink-400',
        winnerGlow: 'shadow-[0_0_40px_-10px_rgba(236,72,153,0.6)]'
      }
    },
    halloween: {
      blue: {
        border: 'border-orange-500/30',
        bg: 'bg-orange-500/10',
        text: 'text-orange-300',
        glow: 'shadow-orange-500/20',
        winnerBorder: 'border-orange-400',
        winnerGlow: 'shadow-[0_0_40px_-10px_rgba(249,115,22,0.6)]'
      },
      emerald: {
        border: 'border-purple-500/30',
        bg: 'bg-purple-500/10',
        text: 'text-purple-300',
        glow: 'shadow-purple-500/20',
        winnerBorder: 'border-purple-400',
        winnerGlow: 'shadow-[0_0_40px_-10px_rgba(168,85,247,0.6)]'
      }
    },
    'tim-burton': {
      blue: {
        border: 'border-zinc-400/30',
        bg: 'bg-zinc-400/10',
        text: 'text-zinc-300',
        glow: 'shadow-zinc-400/20',
        winnerBorder: 'border-zinc-300',
        winnerGlow: 'shadow-[0_0_40px_-10px_rgba(212,212,216,0.5)]'
      },
      emerald: {
        border: 'border-slate-400/30',
        bg: 'bg-slate-400/10',
        text: 'text-slate-300',
        glow: 'shadow-slate-400/20',
        winnerBorder: 'border-slate-300',
        winnerGlow: 'shadow-[0_0_40px_-10px_rgba(203,213,225,0.5)]'
      }
    },
    matrix: {
      blue: {
        border: 'border-green-500/30',
        bg: 'bg-green-500/10',
        text: 'text-green-400',
        glow: 'shadow-green-500/20',
        winnerBorder: 'border-green-400',
        winnerGlow: 'shadow-[0_0_40px_-10px_rgba(34,197,94,0.6)]'
      },
      emerald: {
        border: 'border-emerald-500/30',
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        glow: 'shadow-emerald-500/20',
        winnerBorder: 'border-emerald-400',
        winnerGlow: 'shadow-[0_0_40px_-10px_rgba(16,185,129,0.6)]'
      }
    }
  };

  const colors = THEME_COLORS[appTheme][theme];
  const currentStyle = THEME_STYLES[appTheme];

  return (
    <div className={`flex-1 relative group ${isWinner ? 'z-10' : 'z-0'}`}>
      <motion.div 
        layout
        className={`h-full rounded-3xl backdrop-blur-sm p-6 sm:p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl
          ${!team ? `border-2 ${currentStyle.cardBorder} border-dashed ${currentStyle.cardBg}` : ''}
          ${team && !isWinner && !isLoser ? `border-2 ${colors.border} ${colors.bg} ${currentStyle.cardBg}` : ''}
          ${isWinner ? `border-4 ${colors.winnerBorder} ${colors.bg} ${currentStyle.cardBg} ${colors.winnerGlow} scale-[1.04] hover:scale-[1.06]` : ''}
          ${isLoser ? `border-2 ${currentStyle.cardBorder} ${currentStyle.cardBg} bg-black/40 opacity-40 scale-[0.95] grayscale-[0.8] hover:scale-[0.97]` : ''}
        `}
      >
        <h2 className="text-center text-sm font-bold tracking-widest opacity-60 uppercase mb-2 flex items-center justify-center gap-2">
          {title}
          {isHome && (
            <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
              <Home className="w-3 h-3" /> MANDANTE
            </span>
          )}
        </h2>
        
        <div className="min-h-[60px] flex items-center justify-center mb-8">
          {team ? (
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-2xl sm:text-3xl font-black text-center ${colors.text}`}
            >
              {team.name}
            </motion.h3>
          ) : (
            <span className="text-slate-700 text-2xl font-bold">---</span>
          )}
        </div>

        <div className="space-y-3 min-h-[350px]">
          <AnimatePresence mode="popLayout">
            {team?.players.map((player, idx) => (
              <motion.div
                key={player.n}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center justify-between p-4 rounded-xl bg-black/20 border ${currentStyle.cardBorder} hover:border-white/20 transition-colors`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className={`w-12 text-xs font-bold py-1 rounded border text-center ${
                    player.p === 'LEV' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    player.p === 'OPO' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                    player.p === 'PON' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    player.p === 'CEN' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                    'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {player.p}
                  </span>
                  <span className="font-medium truncate opacity-90">{player.n}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:block w-16 h-1.5 bg-black/40 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${currentStyle.lvlBar} rounded-full`}
                      style={{ width: `${player.lv}%` }}
                    />
                  </div>
                  <div className="flex items-baseline gap-1 bg-black/40 px-2 py-1 rounded-md border border-white/5 shadow-inner">
                    <span className="text-[10px] opacity-50 font-mono">LVL</span>
                    <span className={`font-bold ${currentStyle.lvlText} font-mono`}>{player.lv}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {!team && (
            <div className="h-full flex items-center justify-center opacity-50 italic">
              Aguardando sorteio...
            </div>
          )}
        </div>

        {/* Power Total */}
        <div className={`mt-8 pt-6 border-t ${currentStyle.cardBorder}`}>
          <div className="flex justify-between items-center">
            <span className="opacity-60 font-semibold uppercase tracking-wider text-sm">Força Total</span>
            <div className="text-3xl font-black font-mono">
              {showPower ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={isWinner ? colors.text : 'opacity-80'}
                >
                  {power}
                </motion.span>
              ) : (
                <span className="opacity-50">---</span>
              )}
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
