import { Rocket, Shield, Handshake } from 'lucide-react';

const WhyUs = () => {
  const cards = [
    { icon: <Rocket className="w-8 h-8" />, title: "Unmatched Innovation and Versatility", description: "Salesflow is a dynamic platform that constantly evolves to meet your unique needs. From real-time analytics to workflow automation, it adapts and innovates.", variant: 'green' },
    { icon: <Shield className="w-8 h-8" />, title: "Trust and Reliability", description: "With a rock-solid infrastructure and top-tier security, Salesflow safeguards your data. Its longstanding reputation for reliability means you can trust your critical business info.", variant: 'light' },
    { icon: <Handshake className="w-8 h-8" />, title: "A Global Community of Success", description: "Salesflow isn't just software; it's a global community of professionals committed to success. Access resources, experts, and a vast knowledge base.", variant: 'light' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 mb-16">
          <div className="flex-1">
            <span className="inline-block px-4 py-1.5 bg-brand-100 text-brand-900 text-xs font-bold uppercase tracking-wider rounded-full mb-4">Why Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Why Salesflow is <br /> Your Ideal Partner</h2>
          </div>
          <div className="flex-1 flex items-end">
            <p className="text-slate-500 text-lg leading-relaxed">When it comes to sales management, there are plenty of options out there. Here are three compelling reasons why our Sales Management Dashboard stands out from the rest.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className={`p-8 rounded-[2rem] flex flex-col gap-6 transition-transform hover:-translate-y-2 duration-300 ${card.variant === 'green' ? 'bg-brand-400 text-brand-950 shadow-xl shadow-brand-200' : 'bg-brand-50 text-slate-900 hover:bg-brand-100'}`}>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${card.variant === 'green' ? 'border-brand-950 text-brand-950' : 'border-slate-900 text-slate-900'}`}>{card.icon}</div>
              <div>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className={`leading-relaxed ${card.variant === 'green' ? 'text-brand-900' : 'text-slate-500'}`}>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
