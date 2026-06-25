import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { CheckCircle2, CircleDashed, Milestone, Rocket, Server, BrainCircuit } from 'lucide-react';

const phases = [
  {
    icon: <Server className="w-5 h-5" />,
    title: "Fase 1: Fundação & Core Offline",
    status: "Concluído",
    date: "Q3 2024",
    items: [
      "Arquitetura Offline-First robusta",
      "Registro de sinais vitais otimizado",
      "Sincronização em segundo plano",
      "Interface de alta performance (Mobile/Tablet)"
    ],
    done: true
  },
  {
    icon: <BrainCircuit className="w-5 h-5" />,
    title: "Fase 2: Inteligência Clínica",
    status: "Em Andamento",
    date: "Q4 2024",
    items: [
      "Integração com LLMs",
      "Sugestões de conduta baseadas em evidências",
      "Alertas preditivos de deterioração clínica",
      "Resumo automatizado de prontuários"
    ],
    done: false
  },
  {
    icon: <Milestone className="w-5 h-5" />,
    title: "Fase 3: Interoperabilidade",
    status: "Planejado",
    date: "Q1 2025",
    items: [
      "Integração HL7/FHIR com sistemas hospitalares",
      "Conexão com wearables e monitores de beira-leito",
      "Painéis de gestão de leitos em tempo real",
      "Exportação de dados auditáveis"
    ],
    done: false
  }
];

export default function Roadmap() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineScale = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="py-20 sm:py-32 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="mb-16 md:mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6"
          >
            Visão e <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ca593] to-teal-500">Roadmap</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-slate-600 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
          >
            Nossa jornada para transformar o cuidado hospitalar através de tecnologia open-source de ponta.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />
          
          <motion.div 
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0ca593] to-teal-400 -translate-x-1/2" 
          />

          <div className="space-y-12 sm:space-y-24">
            {phases.map((phase, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col sm:grid sm:grid-cols-2 items-start w-full">
                  
                  {/* Node */}
                  <div className="absolute left-6 sm:left-1/2 top-6 sm:top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-slate-50 z-10 shadow-sm ${phase.done ? 'bg-[#0ca593] text-white' : 'bg-white text-slate-400 border-slate-200 shadow-none'}`}
                    >
                      {phase.icon}
                    </motion.div>
                  </div>

                  {/* Left Column / Mobile Card for Even */}
                  {isEven ? (
                    <div className="w-full pl-16 sm:pl-0 sm:pr-8 lg:pr-12 text-left">
                      <motion.div
                        initial={{ opacity: 0, x: -30, y: 20 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                        className={`bg-white border ${phase.done ? 'border-[#0ca593]/50 shadow-[0_0_20px_rgba(12,165,147,0.1)]' : 'border-slate-200 shadow-sm'} rounded-3xl p-6 sm:p-8 hover:bg-slate-50 transition-colors relative group`}
                      >
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 sm:mb-5 ${phase.done ? 'bg-[#0ca593]/10 text-[#0ca593]' : 'bg-slate-100 text-slate-500'}`}>
                          {phase.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <CircleDashed className="w-3.5 h-3.5" />}
                          {phase.status} • {phase.date}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">{phase.title}</h3>
                        <ul className="space-y-3">
                          {phase.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-600">
                              <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${phase.done ? 'bg-[#0ca593]' : 'bg-slate-300'}`} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="hidden sm:block" />
                  )}

                  {/* Right Column / Mobile Card for Odd */}
                  {!isEven ? (
                    <div className="w-full pl-16 sm:pl-0 sm:pl-8 lg:pl-12 text-left">
                      <motion.div
                        initial={{ opacity: 0, x: 30, y: 20 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                        className={`bg-white border ${phase.done ? 'border-[#0ca593]/50 shadow-[0_0_20px_rgba(12,165,147,0.1)]' : 'border-slate-200 shadow-sm'} rounded-3xl p-6 sm:p-8 hover:bg-slate-50 transition-colors relative group`}
                      >
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 sm:mb-5 ${phase.done ? 'bg-[#0ca593]/10 text-[#0ca593]' : 'bg-slate-100 text-slate-500'}`}>
                          {phase.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <CircleDashed className="w-3.5 h-3.5" />}
                          {phase.status} • {phase.date}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">{phase.title}</h3>
                        <ul className="space-y-3">
                          {phase.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-600">
                              <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${phase.done ? 'bg-[#0ca593]' : 'bg-slate-300'}`} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  ) : null}

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
