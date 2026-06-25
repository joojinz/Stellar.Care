import { Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 sm:py-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shadow-sm bg-white/10">
                <img src="https://raw.githubusercontent.com/joojinz/Stellar.Care/main/public/favicon.svg" alt="StellarCare Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Stellar<span className="font-light">Care</span></span>
            </a>
            <p className="text-sm sm:text-base leading-relaxed max-w-sm text-slate-400">
              A revolução offline-first na gestão de saúde. Projetado para salvar o tempo dos profissionais e focar no que mais importa: a vida.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-sm sm:text-base">Navegação</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Funcionalidades</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Tecnologia</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Roadmap</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Acessar Sistema</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-sm sm:text-base">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Política de Cookies</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Licença Aberta</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} StellarCare. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1.5 font-medium">
            Desenvolvido com foco no <Activity className="w-4 h-4 text-teal-400" /> paciente
          </p>
        </div>
      </div>
    </footer>
  );
}
