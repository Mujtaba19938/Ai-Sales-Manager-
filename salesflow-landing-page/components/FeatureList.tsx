import React from 'react';
import { Clock, Share2, MousePointer, BarChart2, Settings, RefreshCw } from 'lucide-react';
import Button from './ui/Button';

const FeatureList: React.FC = () => {
  const features = [
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: "Real-Time Data Insights",
      desc: "Gain a competitive edge with up-to-the-minute insights into your sales performance."
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-white" />,
      title: "Intuitive Sales Funnel Visualization",
      desc: "Visualize your sales pipeline effortlessly. Identify bottlenecks and optimize workflows."
    },
    {
      icon: <Share2 className="w-6 h-6 text-white" />,
      title: "Seamless Social Media Integration",
      desc: "Leverage the power of social media for sales. Track orders generated through social channels."
    },
    {
      icon: <Settings className="w-6 h-6 text-white" />,
      title: "Customizable Reports and Dashboards",
      desc: "Tailor your dashboard to your unique business needs. Create custom reports easily."
    },
    {
      icon: <MousePointer className="w-6 h-6 text-white" />,
      title: "User-Friendly Interface",
      desc: "Our intuitive interface means there's no steep learning curve. Get started quickly."
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-white" />,
      title: "Continuous Updates and Improvements",
      desc: "We're committed to your success. Expect regular updates to keep you at the forefront."
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Sticky Content */}
          <div className="lg:w-1/3">
             <div className="sticky top-32">
               <span className="inline-block px-4 py-1.5 bg-brand-100 text-brand-900 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                 Features
               </span>
               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                 Empowering Your Sales Journey
               </h2>
               <p className="text-slate-500 mb-10 leading-relaxed">
                 Salesflow is packed with an array of features designed to streamline your sales processes, empower your team, and drive revenue growth.
               </p>
               <Button variant="outline">Learn more about all features</Button>
             </div>
          </div>

          {/* Right Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col gap-4 group">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center shadow-lg group-hover:bg-brand-500 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureList;