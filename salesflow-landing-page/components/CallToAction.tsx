import React from 'react';
import Button from './ui/Button';
import { Sun, ArrowUpRight, MoreHorizontal } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background Concentric Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1800px] h-[1200px] pointer-events-none select-none overflow-hidden flex items-center justify-center">
         <div className="absolute w-[400px] h-[400px] rounded-full border border-brand-100/60" />
         <div className="absolute w-[700px] h-[700px] rounded-full border border-brand-100/40" />
         <div className="absolute w-[1000px] h-[1000px] rounded-full border border-brand-50/40" />
         <div className="absolute w-[600px] h-[600px] bg-brand-50/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="max-w-4xl mx-auto relative min-h-[600px] flex flex-col items-center justify-center">
           
           {/* Connecting Lines (SVG) */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-200 hidden md:block" style={{strokeWidth: 1.5}}>
              {/* Center to Top Left */}
              <path d="M 450 250 L 450 200 L 250 200" fill="none" />
              {/* Center to Top Right */}
              <path d="M 450 250 L 450 200 L 700 200" fill="none" />
              {/* Center to Right */}
              <path d="M 450 300 L 800 300 L 800 380" fill="none" />
              {/* Center to Bottom Left */}
              <path d="M 400 300 L 150 300 L 150 450" fill="none" />
              {/* Center to Bottom Right */}
              <path d="M 500 300 L 700 300 L 700 500" fill="none" />
           </svg>

           {/* Central Content */}
           <div className="relative z-20 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-8 relative">
                 <Sun className="w-8 h-8 text-slate-900 fill-current" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Ready to Elevate Your Sales Strategy? <br />
                Get Started Today!
              </h2>
              
              <p className="text-slate-500 mb-8 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                Unlock the power of data-driven sales management with our cutting-edge solution. Join a community of successful businesses and experience the future of sales management.
              </p>
              
              <Button size="lg" className="px-8 py-3 bg-brand-500 text-slate-900 hover:bg-brand-400 font-bold shadow-brand-200 shadow-xl rounded-full">
                Get Started Now
              </Button>
           </div>

           {/* Floating Cards (Absolute Positioned) */}
           
           {/* Top Left: Today Sessions */}
           <div className="hidden md:block absolute top-20 left-0 bg-white p-4 rounded-2xl shadow-lg border border-slate-100 w-48 animate-in fade-in zoom-in duration-700 delay-100">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-[10px] text-slate-500 font-medium">Today sessions</span>
                 <ArrowUpRight className="w-3 h-3 text-slate-300" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">400</div>
              <div className="text-[10px] text-slate-400">Payout • $6.1K will available soon</div>
           </div>

           {/* Top Right: Conversion Rate */}
           <div className="hidden md:block absolute top-20 right-0 bg-white p-4 rounded-2xl shadow-lg border border-slate-100 w-64 animate-in fade-in zoom-in duration-700 delay-200">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-slate-900">Conversion Rate</span>
                  <span className="text-[10px] bg-brand-100 text-brand-700 px-1.5 py-0.5 rounded font-bold">+ 25%</span>
               </div>
               {/* Tiny Chart */}
               <div className="h-12 w-full flex items-end gap-1">
                  <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                     <path d="M0 30 Q 10 35, 20 20 T 40 25 T 60 10 T 80 15 T 100 0" fill="none" stroke="#22c55e" strokeWidth="2" />
                     <path d="M0 30 Q 10 35, 20 20 T 40 25 T 60 10 T 80 15 T 100 0 V 40 H 0 Z" fill="url(#gradientCTA)" opacity="0.1" />
                     <defs>
                        <linearGradient id="gradientCTA" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="0%" stopColor="#22c55e" />
                           <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                     </defs>
                  </svg>
               </div>
               <div className="flex justify-between mt-2 text-[8px] text-slate-300 font-medium">
                  <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
               </div>
           </div>

           {/* Middle Right: Today Revenue */}
           <div className="hidden md:block absolute top-1/2 right-[-40px] -translate-y-1/2 bg-white p-4 rounded-2xl shadow-lg border border-slate-100 w-48 animate-in fade-in zoom-in duration-700 delay-300">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-[10px] text-slate-500 font-medium">Today revenue</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">$6.4K</div>
              <div className="text-[10px] text-slate-400">Payout • $6.1K will available soon</div>
           </div>

           {/* Bottom Left: Sales Funnel */}
           <div className="hidden md:block absolute bottom-0 left-0 bg-white p-5 rounded-2xl shadow-lg border border-slate-100 w-72 animate-in fade-in zoom-in duration-700 delay-400">
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <div className="text-xs font-bold text-slate-900">Sales Funnel</div>
                    <div className="text-[9px] text-slate-400">Total view per month</div>
                 </div>
                 <div className="text-[9px] border border-slate-200 rounded px-1.5 py-0.5 text-slate-500">Monthly</div>
              </div>
              <div className="flex items-end gap-2 h-20">
                 <div className="w-1/6 h-[40%] bg-slate-100 rounded-t-md"></div>
                 <div className="w-1/6 h-[60%] bg-slate-100 rounded-t-md"></div>
                 <div className="w-1/6 h-[100%] bg-brand-500 rounded-t-md relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] px-1.5 py-0.5 rounded shadow-sm">243K</div>
                 </div>
                 <div className="w-1/6 h-[30%] bg-slate-100 rounded-t-md"></div>
                 <div className="w-1/6 h-[50%] bg-slate-100 rounded-t-md"></div>
                 <div className="w-1/6 h-[20%] bg-slate-100 rounded-t-md"></div>
              </div>
           </div>

           {/* Bottom Right: Orders */}
           <div className="hidden md:block absolute bottom-10 right-20 bg-white p-5 rounded-2xl shadow-lg border border-slate-100 w-64 animate-in fade-in zoom-in duration-700 delay-500">
              <div className="flex justify-between items-center mb-4">
                 <div>
                    <div className="text-xs font-bold text-slate-900">Orders</div>
                    <div className="text-[9px] text-slate-400">Based on social media</div>
                 </div>
                 <MoreHorizontal className="w-3 h-3 text-slate-400" />
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-2">
                    <span className="text-[9px] w-12 text-slate-500">Facebook</span>
                    <div className="flex-1 flex gap-1">
                       <div className="h-4 w-full bg-slate-100 rounded"></div>
                       <div className="h-4 w-full bg-slate-100 rounded"></div>
                       <div className="h-4 w-full bg-brand-300 rounded"></div>
                       <div className="h-4 w-full bg-slate-200 rounded"></div>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[9px] w-12 text-slate-500">Instagram</span>
                    <div className="flex-1 flex gap-1">
                       <div className="h-4 w-full bg-brand-400 rounded"></div>
                       <div className="h-4 w-full bg-brand-400 rounded"></div>
                       <div className="h-4 w-full bg-slate-400 rounded"></div>
                       <div className="h-4 w-full bg-slate-100 rounded"></div>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};

export default CallToAction;