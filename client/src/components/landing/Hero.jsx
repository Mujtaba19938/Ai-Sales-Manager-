import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Bell, Filter, Calendar, Home, LayoutGrid, User, Folder, Shield, Clock, Sun } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[1000px] bg-gradient-to-b from-brand-50 via-brand-50/50 to-white rounded-[100%] -z-10 blur-3xl opacity-80" />

      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-5xl mx-auto leading-[1.1]">
          Experience the Future of <br className="hidden md:block" /> Sales Management
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Embark on a journey where innovation meets insight, and experience the future of sales management like never before.
        </p>

        <div className="max-w-lg mx-auto bg-white p-2 rounded-full shadow-lg border border-slate-100 flex items-center mb-4 relative z-10">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
          />
          <button
            onClick={() => navigate('/login')}
            className="bg-brand-500 hover:bg-brand-400 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors whitespace-nowrap shadow-md cursor-pointer"
          >
            Try for Free
          </button>
        </div>
        <p className="text-xs text-slate-400 mb-16 font-medium">
          Powerful, yet simple. Tools for everyone. <span className="text-brand-600">100% free.</span>
        </p>

        {/* Dashboard Mockup */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative bg-slate-900 rounded-[2.5rem] p-3 md:p-4 shadow-2xl shadow-slate-200 ring-1 ring-slate-900/5">
            <div className="absolute top-6 left-6 flex gap-2 z-20">
              <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
            </div>

            <div className="bg-slate-50 rounded-[2rem] overflow-hidden min-h-[400px] md:min-h-[700px] flex flex-col md:flex-row relative">
              {/* Sidebar */}
              <div className="hidden md:flex w-20 bg-white border-r border-slate-100 flex-col items-center py-8 gap-6 z-10">
                <div className="mb-2">
                  <Sun className="w-8 h-8 text-slate-900 fill-current" />
                </div>
                <div className="flex flex-col gap-5 w-full px-4 items-center">
                  <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors"><Home className="w-5 h-5" /></button>
                  <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-black text-white shadow-lg"><LayoutGrid className="w-5 h-5" /></button>
                  <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors"><Bell className="w-5 h-5" /></button>
                  <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors"><User className="w-5 h-5" /></button>
                  <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors"><Folder className="w-5 h-5" /></button>
                  <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors"><Shield className="w-5 h-5" /></button>
                  <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors"><Clock className="w-5 h-5" /></button>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 md:p-10 overflow-hidden flex flex-col">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Search your today analysis" className="w-full pl-10 pr-4 py-3 bg-white rounded-full text-sm shadow-sm border border-slate-100 placeholder:text-slate-400 outline-none focus:ring-1 focus:ring-slate-200" />
                  </div>
                  <div className="flex items-center gap-4 self-end md:self-auto">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                      <Bell className="w-4 h-4 text-slate-500" />
                      <span className="text-xs font-medium text-slate-500">Notifications</span>
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[10px] flex items-center justify-center font-bold">4</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-yellow-200 overflow-hidden border-2 border-white shadow-sm cursor-pointer">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Your Sales Analysis</h2>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <button className="bg-white px-4 py-2.5 rounded-full shadow-sm border border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                      <Calendar className="w-4 h-4" /><span>28 Jan - 29 Jan 2023</span>
                    </button>
                    <button className="bg-white px-4 py-2.5 rounded-full shadow-sm border border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                      <Filter className="w-4 h-4" /><span>Funnel</span>
                    </button>
                    <button className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                      Export as CVS <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-black text-white p-7 rounded-[2rem] relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center justify-between mb-10">
                      <span className="text-sm font-medium text-slate-300">Available to payout</span>
                      <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 -rotate-45" strokeWidth={3} />
                      </div>
                    </div>
                    <div className="text-5xl font-bold mb-3 tracking-tight">$16.4K</div>
                    <div className="text-xs text-slate-400 font-medium">Payout &bull; $6.1K will available soon</div>
                  </div>
                  <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-100 hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center justify-between mb-10">
                      <span className="text-sm font-medium text-slate-500">Today revenue</span>
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center"><ArrowRight className="w-3 h-3 -rotate-45" strokeWidth={3} /></div>
                    </div>
                    <div className="text-5xl font-bold mb-3 text-slate-900 tracking-tight">$6.4K</div>
                    <div className="text-xs text-slate-400 font-medium">Payout &bull; $6.1K will available soon</div>
                  </div>
                  <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-100 hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center justify-between mb-10">
                      <span className="text-sm font-medium text-slate-500">Today sessions</span>
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center"><ArrowRight className="w-3 h-3 -rotate-45" strokeWidth={3} /></div>
                    </div>
                    <div className="text-5xl font-bold mb-3 text-slate-900 tracking-tight">400</div>
                    <div className="text-xs text-slate-400 font-medium">Payout &bull; $6.1K will available soon</div>
                  </div>
                </div>

                {/* Bottom Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 min-h-[240px] flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-6">
                      <div><h3 className="text-lg font-bold text-slate-900">Sales Funnel</h3><p className="text-xs text-slate-400 mt-1">Total view per month</p></div>
                      <button className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-bold text-slate-500 hover:bg-slate-100 transition-colors uppercase tracking-wide">Monthly</button>
                    </div>
                    <div className="flex items-end gap-4 h-32 px-2">
                      <div className="flex-1 h-[40%] bg-slate-100 rounded-t-xl hover:bg-slate-200 transition-colors" />
                      <div className="flex-1 h-[60%] bg-slate-100 rounded-t-xl hover:bg-slate-200 transition-colors" />
                      <div className="flex-1 h-[100%] bg-brand-500 rounded-t-xl relative group shadow-lg shadow-brand-200">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1.5 px-3 rounded-lg opacity-100 font-bold shadow-xl">243K</div>
                      </div>
                      <div className="flex-1 h-[30%] bg-slate-100 rounded-t-xl hover:bg-slate-200 transition-colors" />
                      <div className="flex-1 h-[50%] bg-slate-100 rounded-t-xl hover:bg-slate-200 transition-colors" />
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 min-h-[240px] flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-6">
                      <div><h3 className="text-lg font-bold text-slate-900">Orders</h3><p className="text-xs text-slate-400 mt-1">Based on social media</p></div>
                      <div className="flex items-center gap-3">
                        <button className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-bold text-slate-500 hover:bg-slate-100 transition-colors uppercase tracking-wide">Monthly</button>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-100"><Filter className="w-3 h-3" /></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-6"><span className="text-xs font-bold text-slate-400 w-16">Facebook</span><div className="flex-1 grid grid-cols-4 gap-2"><div className="h-8 rounded-xl bg-slate-100"></div><div className="h-8 rounded-xl bg-slate-100"></div><div className="h-8 rounded-xl bg-brand-400"></div><div className="h-8 rounded-xl bg-slate-100"></div></div></div>
                      <div className="flex items-center gap-6"><span className="text-xs font-bold text-slate-400 w-16">Instagram</span><div className="flex-1 grid grid-cols-4 gap-2"><div className="h-8 rounded-xl bg-slate-100"></div><div className="h-8 rounded-xl bg-brand-400"></div><div className="h-8 rounded-xl bg-black"></div><div className="h-8 rounded-xl bg-black"></div></div></div>
                      <div className="flex items-center gap-6"><span className="text-xs font-bold text-slate-400 w-16">Tiktok</span><div className="flex-1 grid grid-cols-4 gap-2"><div className="h-8 rounded-xl bg-brand-400"></div><div className="h-8 rounded-xl bg-brand-400"></div><div className="h-8 rounded-xl bg-slate-100"></div><div className="h-8 rounded-xl bg-slate-100"></div></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
