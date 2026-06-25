import { motion, useScroll, useTransform } from 'motion/react';
import { Activity, HeartPulse, ShieldAlert, Database, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax depth layers - Multiple speeds for a NASA-style cinematic feel
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const yWidgetMain = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yFloat1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const yFloat2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yFloat3 = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <section ref={ref} className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40 overflow-hidden min-h-[110svh] flex flex-col items-center justify-center bg-slate-50">
      {/* Deep Background - Cinematic Video Layer */}
      <motion.div 
        style={{ y: yBg }} 
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden bg-white"
      >
        <motion.video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{ scale: 1.15, y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
          className="absolute min-w-full min-h-full object-cover opacity-100"
        >
           <source src="/Cinematic_slow_motion_tracki.mp4" type="video/mp4" />
        </motion.video>

        <div className="absolute inset-0 bg-white/40" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#0ca593]/20 rounded-full blur-[150px] mix-blend-multiply" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-teal-500/20 rounded-full blur-[150px] mix-blend-multiply" />
        
        {/* Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_30%,transparent_100%)]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full relative z-10 flex flex-col items-center">
        
        {/* Cinematic Text Center */}
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-start w-full max-w-4xl mx-auto mb-10 sm:mb-16 md:mb-24 mt-4 sm:mt-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full mb-6 sm:mb-8 shadow-sm"
          >
             <HeartPulse className="w-4 h-4 text-[#0ca593]" />
             <span className="text-[10px] sm:text-xs font-semibold text-slate-700 uppercase tracking-widest">Sistema Core v2.4</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.1] sm:leading-[1.05] text-slate-900 mb-6 sm:mb-8 tracking-tight text-left drop-shadow-[0_0_20px_rgba(255,255,255,1)]"
          >
            O futuro da <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ca593] via-teal-500 to-emerald-400">
              prática clínica.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-base sm:text-xl md:text-2xl text-slate-800 leading-relaxed max-w-2xl font-medium mb-8 sm:mb-10 text-left drop-shadow-[0_0_15px_rgba(255,255,255,1)]"
          >
            A excelência da medicina aliada à tecnologia offline-first. Interfaces ultra-responsivas projetadas para poupar o tempo do profissional de saúde — porque cada segundo economizado pode significar uma vida salva.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 sm:px-8 sm:py-4 bg-[#0ca593] hover:bg-teal-400 text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(12,165,147,0.3)] sm:shadow-[0_0_40px_rgba(12,165,147,0.4)] hover:shadow-[0_0_60px_rgba(12,165,147,0.6)] group text-sm sm:text-base"
            >
              Acessar Sistema
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>

        {/* Parallax Floating Dashboard Elements (Mobile First: Centered widget, side chips hidden on small) */}
        <div className="relative w-full max-w-5xl mx-auto h-[320px] sm:h-[450px] mt-2 sm:mt-10 pointer-events-none">
          
          {/* Main Central Widget - Always Visible */}
          <motion.div 
            style={{ y: yWidgetMain }}
            initial={{ opacity: 0, y: 150, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.6, type: "spring", bounce: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[95%] sm:w-full max-w-lg bg-white/90 rounded-2xl sm:rounded-3xl shadow-[0_30px_100px_rgba(12,165,147,0.1)] border border-slate-200 overflow-hidden backdrop-blur-2xl z-20 pointer-events-auto"
          >
            <div className="bg-slate-50 px-5 py-4 flex items-center justify-between border-b border-slate-100">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0ca593] animate-pulse"></span>
                stellar_telemetry
              </span>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50 shadow-sm">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-950 rounded-xl flex items-center justify-center text-[#0ca593] border border-teal-900/50">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-200">Frequência Cardíaca</p>
                    <p className="text-[10px] sm:text-[11px] text-slate-500">Sincronização em tempo real</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-white block">72</span>
                  <span className="text-[10px] font-bold text-[#0ca593] uppercase">BPM</span>
                </div>
              </div>
              
              <div className="h-32 sm:h-40 bg-slate-950/50 rounded-2xl border border-slate-800/50 flex items-end gap-1.5 p-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none z-10" />
                {[40, 30, 70, 50, 95, 60, 45, 80, 55, 30, 40, 60, 75, 45].map((h, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1.5, delay: 0.8 + (i * 0.05), type: "spring" }}
                    className={`flex-1 rounded-t-sm ${h > 80 ? 'bg-[#0ca593] shadow-[0_0_15px_rgba(12,165,147,0.6)]' : 'bg-slate-700'}`}
                    style={{ opacity: 0.6 + (h / 100) * 0.4 }}
                  ></motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating Chip 1 - Left (Hidden on Mobile) */}
          <motion.div
            style={{ y: yFloat1 }}
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 1, type: "spring" }}
            className="absolute left-0 top-[20%] lg:left-10 w-64 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl p-4 shadow-xl shadow-slate-200/50 z-30 hidden md:flex items-center gap-4 pointer-events-auto"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Status Clínico</p>
              <p className="text-[10px] text-emerald-600 font-mono mt-0.5">ESTÁVEL • O2 98%</p>
            </div>
          </motion.div>

          {/* Floating Chip 2 - Right (Hidden on Mobile) */}
          <motion.div
            style={{ y: yFloat2 }}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 1.1, type: "spring" }}
            className="absolute right-0 top-[40%] lg:right-10 w-56 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl p-4 shadow-xl shadow-slate-200/50 z-10 hidden md:flex items-center gap-4 pointer-events-auto"
          >
            <div className="w-10 h-10 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Sync Offline</p>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">12 registros na fila</p>
            </div>
          </motion.div>

          {/* Floating Chip 3 - Bottom Left (Hidden on Mobile) */}
          <motion.div
            style={{ y: yFloat3 }}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2, type: "spring" }}
            className="absolute left-[10%] bottom-[10%] w-48 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl p-4 shadow-xl shadow-slate-200/50 z-30 hidden lg:flex items-center gap-4 pointer-events-auto"
          >
            <div className="w-2 h-2 rounded-full bg-[#0ca593] animate-ping"></div>
            <p className="text-xs font-bold text-slate-900 font-mono">IA Analisando...</p>
          </motion.div>

        </div>
      </div>
      
      {/* Fade out bottom to blend seamlessly with the next section */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-slate-50 to-transparent z-20 pointer-events-none" />
    </section>
  );
}
