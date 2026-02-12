import Button from './ui/Button';

const Testimonials = () => {
  const testimonials = [
    { quote: "I've been using the product for over a year now, and it has completely transformed the way I manage my sales. The analytics and insights are top-notch, and the support team is incredibly responsive.", name: "Jane Smith", role: "Sales Manager at Run Corp", image: "https://i.pravatar.cc/150?u=20", className: "md:col-span-1" },
    { quote: "Our revenue saw a significant boost after implementing this solution. It's intuitive, user-friendly, and the customizable reports have made a world of difference in our decision-making process.", name: "John Doe", role: "CEO of BCX Enterprises", image: "https://i.pravatar.cc/150?u=32", className: "md:col-span-1" },
    { quote: "When I first considered investing in a sales management tool, I had my reservations. As a small business owner, every decision counts, and resources need to be wisely allocated. However, after implementing this solution from Salesforce, I can confidently say it's been a game-changer for us. The way it's helped us streamline our sales processes is truly remarkable. What impressed me the most was the flexibility it offers. We could tailor it to our unique needs, thanks to the custom activity types. It was as if the tool adapted to us rather than the other way around.", name: "Michael Brown", role: "Owner at PQR Solutions", image: "https://i.pravatar.cc/150?u=44", className: "md:col-span-1 md:row-span-2" },
    { quote: "I've used many sales management tools in the past, but this one is a game changer. The unified dashboard simplifies everything, and the one-click calling feature has saved us so much time. Highly recommended!", name: "Sarah Johnson", role: "Marketing Director at LMN Inc", image: "https://i.pravatar.cc/150?u=51", className: "md:col-span-2" },
    { quote: "I'm impressed by the continuous updates and improvements. It's clear that the team behind this product is committed to staying at the cutting edge of technology. It's been a pleasure using it.", name: "David White", role: "Tech Enthusiast and Consultant", image: "https://i.pravatar.cc/150?u=60", className: "md:col-span-1" },
    { quote: "The detailed breakdown of report data in a table format is a dream come true for someone like me. It has made my job so much easier, and I can easily export the data for in-depth analysis.", name: "Emily Green", role: "Data Analyst at Tech Solutions Inc", image: "https://i.pravatar.cc/150?u=72", className: "md:col-span-2" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-brand-100 text-brand-900 text-xs font-bold uppercase tracking-wider rounded-full mb-6">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">What Our Clients Say</h2>
        </div>
        <div className="bg-brand-50 p-8 md:p-12 rounded-[2.5rem]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow duration-300 ${t.className}`}>
                <p className="text-slate-600 leading-relaxed mb-8 text-sm md:text-base">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button variant="outline" className="bg-white hover:bg-slate-50 rounded-full px-8 py-3 border-slate-200 text-sm font-semibold shadow-sm">View all client testimonials</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
