const LogoTicker = () => {
  const logos = [
    { name: 'Github', text: 'hub' },
    { name: 'LinkedIn', text: 'LinkedIn' },
    { name: 'Microsoft', text: 'Microsoft' },
    { name: 'Instacart', text: 'instacart' },
    { name: 'Oracle', text: 'ORACLE' },
    { name: 'Segment', text: 'segment' },
    { name: 'Slack', text: 'slack' },
  ];

  const tickerLogos = [...logos, ...logos];

  return (
    <section className="py-12 border-b border-slate-50 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <p className="text-center text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-8">
          Trusted by 10k+ Businesses
        </p>
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
          }}
        >
          <div className="flex w-max animate-scroll gap-16 md:gap-24 items-center">
            {tickerLogos.map((logo, index) => (
              <div key={`${logo.name}-${index}`} className="flex items-center gap-2 text-xl md:text-2xl font-bold text-slate-300 select-none whitespace-nowrap">
                <div className="w-6 h-6 bg-slate-200 rounded-sm"></div>
                <span>{logo.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoTicker;
