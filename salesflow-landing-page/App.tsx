import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoTicker from './components/LogoTicker';
import WhyUs from './components/WhyUs';
import FeatureSplit from './components/FeatureSplit';
import BentoGrid from './components/BentoGrid';
import FeatureList from './components/FeatureList';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-brand-300 selection:text-brand-950 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <WhyUs />
        <FeatureSplit 
          reversed={false}
          tag="BOOST EFFICIENCY"
          title="Boost your company's revenue potential by a remarkable 75%"
          description="Streamline your sales, marketing, and service operations within a unified platform, eliminating data leaks and ensuring consistent messaging."
          features={[
            "Achieve higher deal closure rates with simplified single-page contact management.",
            "Experience the convenience of one-click calling, automated call scripts, and voicemail management.",
            "Keep your sales process on target by tracking stages and milestones of your deals."
          ]}
          imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
          overlayCard={{ title: "Sales Funnel", value: "230K", label: "Sales" }}
        />
        <FeatureSplit 
          reversed={true}
          tag="IN-DEPTH DATA INSIGHTS"
          title="Effortlessly monitor comprehensive user analytics with ease"
          description="Our self-service data analytics software empowers you to craft captivating data visualizations and enlightening dashboards within mere minutes."
          subFeatures={[
            { title: "Dynamic Dashboard", desc: "Seamlessly merging numerous reports into one visually stunning interface.", icon: "layout" },
            { title: "Continuous Data Sync", desc: "Stay worry-free about data synchronization; our system ensures continual harmony.", icon: "refresh" }
          ]}
          imageSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
        />
        <BentoGrid />
        <FeatureList />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default App;