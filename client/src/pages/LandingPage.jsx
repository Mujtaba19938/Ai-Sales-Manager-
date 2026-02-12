import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import LogoTicker from '../components/landing/LogoTicker';
import WhyUs from '../components/landing/WhyUs';
import FeatureSplit from '../components/landing/FeatureSplit';
import BentoGrid from '../components/landing/BentoGrid';
import FeatureList from '../components/landing/FeatureList';
import Testimonials from '../components/landing/Testimonials';
import CallToAction from '../components/landing/CallToAction';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
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
}
