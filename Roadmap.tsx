import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Wifi, Activity, Stethoscope, ShieldAlert } from 'lucide-react';

const features = [
  {
    icon: <Wifi className="w-6 h-6" />,
    title: 'Offline-First',
    description: 'Trabalhe e registre dados sem conexão. Sincronização cirúrgica automática assim que a rede for restabelecida.'
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: 'Sinais Vitais',
    description: 'Monitoramento contínuo com registro rápido e interface projetada para a precisão do ambiente hospitalar.'
  },
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: 'Evolução Clínica',
    description: 'Documentação padronizada da evolução do paciente. Clareza e segurança para as tomadas de decisão.'
  },
  {
    icon: <ShieldAlert className="w-6 h-6" />,
    title: 'IA Integrada',
    description: 'Apoio na análise de riscos e sugestões de conduta, atuando como um assistente de alta performance.'
  }
];

export default function Features() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], [-100, 200]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [200, -100]);

  return (
    <section ref={containerRef} className="py-20 sm:py-32 bg-slate-50 text-slate-900 relative overflow-hidden border-t-0 sm:border-t-0">
      <motion.div 
        style={{ y: bgY1 }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0ca593]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"
      />
      <motion.div 
        style={{ y: bgY2 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="mb-16 md:mb-24 max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Precisão em cada <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ca593] to-teal-500">procedimento.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-slate-600 text-lg md:text-xl font-light leading-relaxed"
          >
            Uma arquitetura robusta que garante que seus registros estejam sempre disponíveis e seguros, exatamente quando você mais precisa.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {features.map((feature, index) => {
            const yOffset = useTransform(scrollYProgress, [0, 1], [40 * (index % 2 === 0 ? 1 : -1), -40 * (index % 2 === 0 ? 1 : -1)]);
            
            return (
              <motion.div
                key={index}
                style={{ y: yOffset }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0ca593]/10 flex items-center justify-center text-[#0ca593] mb-8 border border-[#0ca593]/20 group-hover:scale-110 group-hover:bg-[#0ca593]/20 transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-base">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
