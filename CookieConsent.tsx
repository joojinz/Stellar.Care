import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Como funciona a arquitetura offline-first?",
    answer: "O StellarCare utiliza um banco de dados local no seu próprio dispositivo. Isso significa que você pode continuar atendendo pacientes e registrando prontuários normalmente, mesmo sem internet. Assim que a conexão for restabelecida, os dados são sincronizados em segundo plano e de forma segura com o servidor."
  },
  {
    question: "O sistema está em conformidade com a LGPD e padrões de saúde?",
    answer: "Absolutamente. A segurança e a privacidade dos dados dos pacientes são a nossa base. Todos os dados de saúde são criptografados tanto em repouso quanto em trânsito, atendendo às exigências da LGPD e inspirado em padrões internacionais como HIPAA."
  },
  {
    question: "Por ser Open Source, eu tenho algum custo para usar?",
    answer: "A versão core do StellarCare (licença MIT) é totalmente gratuita e de código aberto. Você pode hospedá-la em sua própria infraestrutura sem nenhum custo de licenciamento de software."
  },
  {
    question: "É possível integrar o StellarCare com outros sistemas do meu hospital?",
    answer: "Sim. Desenvolvemos o StellarCare com uma arquitetura moderna e baseada em APIs. Isso facilita a integração com sistemas legados, laboratórios (LIS), sistemas de faturamento e outras ferramentas essenciais do ecossistema hospitalar."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="mb-12 md:mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-slate-900"
          >
            Perguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ca593] to-teal-500">Frequentes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-slate-600 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
          >
            Tire suas dúvidas sobre a implementação, segurança e recursos do sistema.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`border ${isOpen ? 'border-[#0ca593]/30 bg-teal-50/30' : 'border-slate-200 bg-white'} rounded-2xl overflow-hidden transition-colors`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-semibold text-base sm:text-lg pr-4 ${isOpen ? 'text-[#0ca593]' : 'text-slate-900'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isOpen ? 'bg-[#0ca593]/10 text-[#0ca593]' : 'bg-slate-100 text-slate-500'}`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-slate-600 leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
