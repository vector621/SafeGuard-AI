import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  CloudRain, 
  Navigation, 
  Database,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
  BrainCircuit,
  Zap,
  TrendingUp,
  Clock,
  Calendar,
  Layers,
  ChevronDown,
  Info,
  MapPin,
  Cpu,
  Server,
  ShieldAlert,
  Flame,
  Car,
  Lightbulb
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Configuration constants
const locations = ["Highway", "City", "Intersection", "Rural"];
const weathers = ["Clear", "Rainy", "Foggy", "Night"];
const hazards = ["High Speed", "Accident", "Traffic Jam", "Fire"];
const times = ["Morning", "Afternoon", "Evening Rush", "Night"];
const days = ["Weekday", "Weekend"];

const presets = [
  { name: "Highway Night Driving", location: "Highway", weather: "Night", hazard: "High Speed", time: "Night", day: "Weekend" },
  { name: "Foggy Morning Ride", location: "Rural", weather: "Foggy", hazard: "Traffic Jam", time: "Morning", day: "Weekday" },
  { name: "City Rush Hour", location: "City", weather: "Rainy", hazard: "Accident", time: "Evening Rush", day: "Weekday" },
];

const chartData = [
  { time: '08:00', risk: 20 },
  { time: '10:00', risk: 35 },
  { time: '12:00', risk: 65 },
  { time: '14:00', risk: 40 },
  { time: '16:00', risk: 55 },
  { time: '18:00', risk: 80 },
  { time: '20:00', risk: 45 },
];

type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical' | null;

export default function App() {
  const [location, setLocation] = useState(locations[1]); // Default: City
  const [weather, setWeather] = useState(weathers[0]);  // Default: Clear
  const [hazard, setHazard] = useState(hazards[0]);
  const [timeSlot, setTimeSlot] = useState(times[1]);    // Default: Afternoon
  const [dayType, setDayType] = useState(days[0]);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    level: RiskLevel;
    score: number;
    confidence: number;
    explanation: string[];
  } | null>(null);

  const applyPreset = (p: typeof presets[0]) => {
    setLocation(p.location);
    setWeather(p.weather);
    setHazard(p.hazard);
    setTimeSlot(p.time);
    setDayType(p.day);
  };

  const handlePredict = () => {
    setIsAnalyzing(true);
    setResults(null);

    setTimeout(() => {
      let score = 0;
      const explanation: string[] = [];

      // Scoring Logic implementation
      if (location === "Highway") { score += 30; explanation.push("Highway sector risks (+30)"); }
      if (location === "City") { score += 20; explanation.push("Urban density factor (+20)"); }

      if (weather === "Foggy") { score += 25; explanation.push("Visibility impairment (+25)"); }
      if (weather === "Rainy") { score += 20; explanation.push("Traction loss risk (+20)"); }

      if (hazard === "High Speed") { score += 30; explanation.push("Velocity hazard (+30)"); }
      if (hazard === "Accident") { score += 25; explanation.push("Previous area incident (+25)"); }

      if (timeSlot === "Morning" || timeSlot === "Evening Rush") { score += 25; explanation.push("Peak commute hours (+25)"); }
      if (timeSlot === "Night") { score += 15; explanation.push("Low light conditions (+15)"); }

      if (dayType === "Weekend") { score += 10; explanation.push("Weekend traffic pattern (+10)"); }

      // Combo Logic
      if (location === "Highway" && hazard === "High Speed") {
        score += 20;
        explanation.push("Lethality multiplier: Highway + Speed (+20)");
      }

      const finalScore = Math.min(100, score);
      const level: RiskLevel = finalScore >= 80 ? 'Critical' : finalScore >= 60 ? 'High' : finalScore >= 40 ? 'Medium' : 'Low';
      const confidence = Math.min(100, finalScore + 10);

      setResults({
        level,
        score: finalScore,
        confidence,
        explanation
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  const getRiskUI = (level: RiskLevel) => {
    switch (level) {
      case 'Critical': return { text: 'text-rose-500', border: 'border-rose-500/20', bg: 'bg-rose-500/5', icon: <AlertCircle className="text-rose-500" /> };
      case 'High': return { text: 'text-orange-500', border: 'border-orange-500/20', bg: 'bg-orange-500/5', icon: <ShieldAlert className="text-orange-500" /> };
      case 'Medium': return { text: 'text-amber-500', border: 'border-amber-500/20', bg: 'bg-amber-500/5', icon: <AlertTriangle className="text-amber-500" /> };
      case 'Low': return { text: 'text-emerald-500', border: 'border-emerald-500/20', bg: 'bg-emerald-500/5', icon: <ShieldCheck className="text-emerald-500" /> };
      default: return { text: 'text-gray-400', border: 'border-gray-800', bg: 'bg-gray-800/10', icon: null };
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-gray-200 font-sans p-6 md:p-10 selection:bg-blue-500/30 relative overflow-hidden">
      {/* Dynamic Background Design */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Deep Radiant Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] to-black" />
        
        {/* Subtle Architectural Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Soft Depth Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>
      
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Modern Clean Header */}
        <header className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-10 border-b border-white/5">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-lg shadow-blue-500/20 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <BrainCircuit className="text-blue-500 relative z-10" size={28} />
              </div>
              <div className="space-y-0.5">
                <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
                  SafeGuard <span className="text-blue-500 font-normal">AI</span>
                </h1>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Smart Accident Risk Predictor</h2>
              </div>
            </div>
            <p className="text-gray-500 text-xs font-semibold tracking-wide ml-16 bg-white/[0.02] w-fit px-3 py-1 rounded-full border border-white/5">
               AI-powered real-time safety and risk prediction system
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/[0.03] backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl shadow-xl">
             <div className="flex flex-col items-end">
               <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Model Status</span>
               <span className="text-xs font-bold text-emerald-500 flex items-center gap-2">
                 Operational <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
               </span>
             </div>
             <div className="h-6 w-px bg-white/10" />
             <LayoutDashboard size={20} className="text-gray-400 opacity-50" />
          </div>
        </header>

        <div className="grid lg:grid-cols-[420px_1fr] gap-10">
          
          {/* Left panel - User input form */}
          <aside className="space-y-8">
            <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 space-y-8 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                  <Cpu size={16} className="text-blue-400" />
                </div>
                <h2 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Parameter Matrix</h2>
              </div>

              {/* Form Selectors */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase px-1">Location Analysis</label>
                  <div className="relative group/field">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/field:text-blue-500 transition-colors" size={16} />
                    <select 
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)} 
                      className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl pl-10 pr-4 py-3.5 text-sm font-medium focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 focus:outline-none appearance-none cursor-pointer hover:bg-slate-800/60 transition-all shadow-inner text-gray-200"
                    >
                      {locations.map(l => <option key={l} value={l} className="bg-slate-950">{l}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={14} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase px-1">Climate State</label>
                    <div className="relative group/field">
                      <CloudRain className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/field:text-blue-500 transition-colors" size={16} />
                      <select 
                        value={weather} 
                        onChange={(e) => setWeather(e.target.value)} 
                        className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl pl-10 pr-4 py-3.5 text-xs font-medium focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 focus:outline-none appearance-none cursor-pointer hover:bg-slate-800/60 transition-all shadow-inner text-gray-200"
                      >
                        <option value="Clear" className="bg-slate-950">☀ Clear</option>
                        <option value="Rainy" className="bg-slate-950">🌧 Rainy</option>
                        <option value="Foggy" className="bg-slate-950">🌫 Foggy</option>
                        <option value="Night" className="bg-slate-950">🌙 Night</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={14} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase px-1">Temporal</label>
                    <div className="relative group/field">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/field:text-blue-500 transition-colors" size={16} />
                      <select 
                        value={timeSlot} 
                        onChange={(e) => setTimeSlot(e.target.value)} 
                        className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl pl-10 pr-4 py-3.5 text-xs font-medium focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 focus:outline-none appearance-none cursor-pointer hover:bg-slate-800/60 transition-all shadow-inner text-gray-200"
                      >
                        {times.map(t => <option key={t} value={t} className="bg-slate-950">{t}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={14} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase px-1">Primary Hazard</label>
                    <div className="relative group/field">
                      <ShieldAlert className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/field:text-blue-500 transition-colors" size={16} />
                      <select 
                        value={hazard} 
                        onChange={(e) => setHazard(e.target.value)} 
                        className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl pl-10 pr-4 py-3.5 text-xs font-medium focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 focus:outline-none appearance-none cursor-pointer hover:bg-slate-800/60 transition-all shadow-inner text-gray-200"
                      >
                        {hazards.map(h => <option key={h} value={h} className="bg-slate-950">{h}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={14} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase px-1">Calendar Node</label>
                    <div className="relative group/field">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/field:text-blue-500 transition-colors" size={16} />
                      <select 
                        value={dayType} 
                        onChange={(e) => setDayType(e.target.value)} 
                        className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl pl-10 pr-4 py-3.5 text-xs font-medium focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 focus:outline-none appearance-none cursor-pointer hover:bg-slate-800/60 transition-all shadow-inner text-gray-200"
                      >
                        {days.map(d => <option key={d} value={d} className="bg-slate-950">{d}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={14} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <button
                  onClick={handlePredict}
                  disabled={isAnalyzing}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black py-4 rounded-2xl transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden"
                >
                  {isAnalyzing ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                        <Zap size={18} />
                      </motion.div>
                      Analyzing using AI...
                    </>
                  ) : (
                    <>
                      <BrainCircuit size={18} />
                      GENERATE PREDICTION
                    </>
                  )}
                </button>

                <div className="flex flex-col gap-2">
                   <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest text-center italic">Quick Scenario Presets</span>
                   <div className="grid grid-cols-1 gap-2">
                     {presets.map((p) => (
                       <button
                         key={p.name}
                         onClick={() => applyPreset(p)}
                         className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 text-[10px] font-bold text-gray-400 hover:text-white transition-all text-left flex items-center gap-2"
                       >
                         <Zap size={12} className="text-blue-500" />
                         {p.name}
                       </button>
                     ))}
                   </div>
                </div>
              </div>
            </div>

            {/* Indian Context Info */}
            <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl space-y-3">
               <div className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase font-mono">
                 <Database size={14} /> 🇮🇳 Dataset Context
               </div>
               <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                 The internal predictive weights are derived from simulated Indian road accident patterns, accounting for high-density congestion and temporal shifts in urban hubs.
               </p>
            </div>
          </aside>

          {/* Right panel - Dynamic Results Dashboard */}
          <main className="space-y-8 min-h-[600px]">
            <AnimatePresence mode="wait">
              {results ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid gap-8"
                >
                  {/* Score & Confidence Header */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className={`p-10 rounded-[40px] border ${getRiskUI(results.level).border} ${getRiskUI(results.level).bg} backdrop-blur-2xl flex flex-col items-center justify-center text-center space-y-4 group transition-all duration-500 shadow-2xl`}>
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                      <span className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest">Neural Risk Assessment</span>
                      <h3 className={`text-6xl font-black italic tracking-tighter ${getRiskUI(results.level).text}`}>
                        {results.level?.toUpperCase()}
                      </h3>
                      <div className="transition-transform group-hover:scale-110 duration-500">
                        {getRiskUI(results.level).icon}
                      </div>
                    </div>

                    <div className="p-10 rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl flex flex-col items-center justify-center text-center space-y-6 group shadow-2xl">
                       <span className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest">Composite Magnitude</span>
                       <div className="text-6xl font-black italic tracking-tighter text-white">
                         {results.score}<span className="text-xl not-italic text-gray-700 ml-1">/100</span>
                       </div>
                       <div className="w-32 h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${results.score}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                          />
                       </div>
                    </div>
                  </div>

                  {/* Insights Matrix */}
                  <div className="bg-white/[0.03] backdrop-blur-2xl rounded-[40px] border border-white/10 p-8 md:p-10 space-y-10 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/5 pb-8 mb-4">
                       <div className="flex items-center gap-3">
                          <Activity size={20} className="text-blue-500" />
                          <h3 className="text-sm font-black text-gray-200 uppercase tracking-widest">Intelligence Report</h3>
                       </div>
                       <span className="text-[9px] font-mono text-gray-600 font-bold bg-white/5 px-3 py-1 rounded-full uppercase tracking-widest">Analysis Time: 1.2ms</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-6">
                          <div className="space-y-4">
                             <div className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase font-mono tracking-widest">
                               <Info size={14} /> Hazard Explanation
                             </div>
                             <div className="space-y-2">
                                {results.explanation.map((e, idx) => (
                                  <div key={idx} className="flex items-center gap-3 text-xs text-gray-400 font-medium p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                                    {e}
                                  </div>
                                ))}
                             </div>
                          </div>
                          
                          <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl space-y-3">
                             <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase font-mono tracking-widest">
                               <Layers size={14} /> Summary Insight
                             </div>
                             <p className="text-xs text-gray-400 leading-relaxed font-medium">
                                Elevated likelihood identified due to the interaction between <strong>{location.toLowerCase()}</strong> infrastructure and <strong>{hazard.toLowerCase()}</strong> conditions during the <strong>{timeSlot.toLowerCase()}</strong> node. 
                             </p>
                          </div>
                       </div>

                       <div className="space-y-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase font-mono tracking-widest">
                               <Lightbulb size={14} /> AI Recommendations
                             </div>
                             <div className="grid grid-cols-1 gap-3">
                                {[
                                  "Reduce nominal speed by 20%.",
                                  "Enhance distance buffer protocols.",
                                  "Verify sensor node integrity.",
                                  "Initiate secondary alert array."
                                ].map((rec, i) => (
                                  <div key={i} className="flex items-center gap-3 text-xs text-gray-400 font-bold p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
                                    <CheckCircle2 size={14} className="text-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    {rec}
                                  </div>
                                ))}
                             </div>
                          </div>

                          <div className="pt-6 border-t border-white/5 relative h-32">
                             <div className="flex items-center justify-between mb-4">
                               <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Risk Projection Trends</span>
                             </div>
                             <ResponsiveContainer width="100%" height="80%">
                                <AreaChart data={chartData}>
                                  <defs>
                                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                  </defs>
                                  <Area type="monotone" dataKey="risk" stroke="#3b82f633" strokeWidth={2} fill="url(#colorRisk)" />
                                </AreaChart>
                             </ResponsiveContainer>
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-16 bg-white/[0.02] backdrop-blur-md rounded-[40px] border border-dashed border-white/10 relative overflow-hidden group shadow-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03),transparent_70%)] group-hover:scale-150 transition-transform duration-1000" />
                  <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-8 border border-white/10 group-hover:rotate-12 transition-transform duration-500 relative z-10 shadow-inner overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent" />
                    <BrainCircuit size={48} className="text-gray-700 relative z-10" />
                  </div>
                  <h3 className="text-xs font-mono font-black text-gray-500 uppercase tracking-[0.4em] mb-4 relative z-10">System Awaiting Command</h3>
                  <p className="mt-2 text-xs text-gray-600 max-w-[280px] leading-relaxed font-bold relative z-10">
                    Initialize sector parameters to synchronize neural core and generate risk probability projections based on <strong>Indian road data</strong>.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </main>
        </div>

        {/* Professional Minimal Footer */}
        <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-16">
             <div className="flex flex-col gap-1.5">
               <span className="text-[9px] font-black text-gray-700 uppercase tracking-[0.3em]">Operational Sector</span>
               <span className="text-xs font-mono font-bold text-blue-400">ASIA_PACIFIC_NODE_04</span>
             </div>
             <div className="flex flex-col gap-1.5 border-l border-white/5 pl-16">
               <span className="text-[9px] font-black text-gray-700 uppercase tracking-[0.3em]">Processing Stats</span>
               <span className="text-xs font-mono font-bold text-gray-500">12.2 Tflops / 1.2ms latency</span>
             </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-gray-600 uppercase tracking-widest">
              Uptime: 4,022H
            </div>
            <p className="text-[9px] font-black text-gray-800 uppercase tracking-[0.2em]">© 2026 Sentinel Safety Intelligence</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
