/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import TechStack from './components/TechStack';
import Security from './components/Security';
import Testimonials from './components/Testimonials';
import Roadmap from './components/Roadmap';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#0ca593]/30 selection:text-[#0ca593] flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 flex flex-col">
        <Hero />
        <Features />
        <Security />
        <TechStack />
        <Testimonials />
        <Roadmap />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
