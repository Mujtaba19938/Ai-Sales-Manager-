import { Slack, Mail, Trello, MessageCircle, Phone } from 'lucide-react';

const BentoGrid = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Large Card - Integration */}
          <div className="md:col-span-2 bg-brand-50 rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
            <div className="flex-1 z-10">
              <span className="inline-block px-4 py-1.5 bg-white text-slate-900 text-xs font-bold uppercase tracking-wider rounded-full mb-6 shadow-sm">Integration</span>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Connect with the tools you&apos;re already familiar with.</h3>
              <p className="text-slate-600 mb-8 max-w-md">Salesforce seamlessly integrates with the outstanding tools within your existing platform, ensuring a harmonious and productive experience.</p>
              <button className="text-brand-700 font-bold hover:gap-2 transition-all flex items-center gap-1 cursor-pointer">View all integrations <span>&rarr;</span></button>
            </div>
            <div className="flex-1 flex justify-center items-center relative w-full min-h-[300px]">
              <div className="w-24 h-24 bg-brand-400 rounded-3xl flex items-center justify-center shadow-xl shadow-brand-200 z-10 relative">
                <div className="w-12 h-12 text-slate-900">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M12 2L12 6M12 18L12 22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12L6 12M18 12L22 12M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </div>
              </div>
              <div className="absolute inset-0" style={{ animation: 'spin 60s linear infinite' }}>
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 bg-white p-4 rounded-2xl shadow-md"><Slack className="w-8 h-8 text-purple-500" /></div>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white p-4 rounded-2xl shadow-md"><Trello className="w-8 h-8 text-blue-500" /></div>
                <div className="absolute bottom-10 right-1/4 bg-white p-4 rounded-2xl shadow-md"><Mail className="w-8 h-8 text-red-500" /></div>
              </div>
            </div>
          </div>

          {/* Bottom Left - Analytics */}
          <div className="bg-brand-50 rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-white text-slate-900 text-[10px] font-bold uppercase tracking-wider rounded-full mb-4 shadow-sm">Sales Analytics</span>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Insight-Driven Decision-Making</h3>
              <p className="text-slate-600 text-sm mb-8">Effortlessly track every facet of your sales cycle, gaining a deeper understanding.</p>
            </div>
            <div className="h-40 relative">
              <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                <path d="M0 80 C 50 80, 50 40, 100 40 C 150 40, 150 70, 200 60 C 250 50, 250 20, 300 10 C 350 0, 350 40, 400 50" fill="none" stroke="#22c55e" strokeWidth="3" />
                <path d="M0 80 C 50 80, 50 40, 100 40 C 150 40, 150 70, 200 60 C 250 50, 250 20, 300 10 C 350 0, 350 40, 400 50 L 400 100 L 0 100 Z" fill="url(#gradient)" opacity="0.2" />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle cx="300" cy="10" r="6" fill="#14532d" stroke="white" strokeWidth="2" />
                <rect x="270" y="-30" width="60" height="24" rx="12" fill="#14532d" />
                <text x="300" y="-14" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">21%</text>
              </svg>
            </div>
          </div>

          {/* Bottom Right - Team */}
          <div className="bg-brand-50 rounded-[2.5rem] p-10 flex flex-col relative overflow-hidden">
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-white text-slate-900 text-[10px] font-bold uppercase tracking-wider rounded-full mb-4 shadow-sm">Team Management</span>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Seamless Team Communication</h3>
              <p className="text-slate-600 text-sm mb-8">Our latest feature provides convenient methods to connect with your team swiftly.</p>
            </div>
            <div className="flex justify-center gap-4 mt-auto">
              {[
                { name: 'John Smith', role: 'Project Manager', bg: 'bg-green-500/30' },
                { name: 'Daniel Brown', role: 'Sales Developer', bg: 'bg-green-300/30' },
                { name: 'Jennifer Lee', role: 'Marketing Manager', bg: 'bg-green-200/30' },
              ].map((person, i) => (
                <div key={i} className={`p-4 rounded-2xl w-32 flex flex-col items-center gap-2 shadow-sm ${person.bg} backdrop-blur-sm`}>
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden"><img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt={person.name} /></div>
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-slate-900">{person.name}</div>
                    <div className="text-[8px] text-slate-600">{person.role}</div>
                  </div>
                  <div className="flex gap-1 mt-1">
                    <div className="p-1 bg-white rounded-full"><MessageCircle size={8} /></div>
                    <div className="p-1 bg-white rounded-full"><Phone size={8} /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
