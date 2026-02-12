import { Check, Layout, RefreshCw } from 'lucide-react';

const FeatureSplit = ({ reversed, tag, title, description, features, subFeatures, imageSrc, overlayCard }) => {
  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 md:gap-24`}>
          <div className="flex-1 space-y-8">
            <span className="inline-block px-4 py-1.5 bg-brand-100 text-brand-900 text-xs font-bold uppercase tracking-wider rounded-full">{tag}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">{title}</h2>
            <p className="text-lg text-slate-500 leading-relaxed">{description}</p>

            {features && (
              <ul className="space-y-4">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {subFeatures && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {subFeatures.map((sf, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                      {sf.icon === 'layout' ? <Layout className="w-5 h-5" /> : <RefreshCw className="w-5 h-5" />}
                    </div>
                    <h4 className="font-bold text-slate-900">{sf.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{sf.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 relative">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img src={imageSrc} alt={title} className="w-full h-auto object-cover" />
              {overlayCard && (
                <div className="absolute bottom-8 left-8 right-8 flex gap-4">
                  <div className="bg-white p-5 rounded-2xl shadow-xl flex-1 flex items-center gap-4">
                    <div className="relative w-16 h-16">
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <path className="text-slate-100" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="4" stroke="currentColor" />
                        <path className="text-brand-500" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="4" stroke="currentColor" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center font-bold text-xs">75%</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-slate-900">{overlayCard.value}</div>
                      <div className="text-xs text-slate-500">{overlayCard.label}</div>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-xl flex-1 hidden md:block">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-900">{overlayCard.title}</span>
                      <span className="text-[10px] bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full">243K</span>
                    </div>
                    <div className="flex items-end gap-1 h-12">
                      {[40, 60, 30, 80, 50, 70].map((h, i) => (
                        <div key={i} className={`flex-1 rounded-t-sm ${i === 3 ? 'bg-brand-500' : 'bg-slate-200'}`} style={{ height: `${h}%` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {subFeatures && (
                <div className="absolute bottom-8 left-8 flex flex-col gap-4 w-64">
                  <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 overflow-hidden"><img src="https://i.pravatar.cc/150?u=1" alt="User" /></div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-slate-900">William Turner</div>
                      <div className="text-[10px] text-slate-500">Financial Analyst</div>
                    </div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg flex items-center gap-3 ml-8">
                    <div className="w-10 h-10 rounded-full bg-pink-100 overflow-hidden"><img src="https://i.pravatar.cc/150?u=5" alt="User" /></div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-slate-900">Emily Davis</div>
                      <div className="text-[10px] text-slate-500">Marketing Lead</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSplit;
