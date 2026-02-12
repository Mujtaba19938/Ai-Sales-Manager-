import React from 'react';
import { Sun, Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-8">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20 border-b border-white/10 pb-16">
          {/* Logo Column */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 font-bold text-2xl tracking-tight mb-8">
              <Sun className="w-8 h-8 text-brand-500 fill-current" />
              <span>Salesflow</span>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-brand-500 font-bold mb-6 text-xs uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Career</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-brand-500 font-bold mb-6 text-xs uppercase tracking-wider">Product</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Sales Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Product Updates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-brand-500 font-bold mb-6 text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Customer Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Product Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
            </ul>
          </div>

           <div className="lg:col-span-2">
            <h4 className="text-brand-500 font-bold mb-6 text-xs uppercase tracking-wider">Discover</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">What is Salesforce</a></li>
              <li><a href="#" className="hover:text-white transition-colors">What is CRM?</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CRM Software Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Join our research panel</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Salesforce for Small Business</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Salesforce for Enterprise</a></li>
            </ul>
          </div>

          {/* Newsletter Column - Moved to right but stacked on small, using lg:col-span-3 to wrap or separate row if needed, but let's put it aside or below based on screenshot.
              Screenshot shows 4 columns of links + Newsletter on right.
              Let's adjust cols: 3 logo, 2, 2, 2, 2, 3 newsletter? That's 14. Grid 12 is tight.
              Let's do Logo (2), Links (2,2,2,2), Newsletter (4). Total 14.
              Let's try grid-cols-1 lg:grid-cols-5 for the main part and put newsletter separately or floating.
              
              Actually, the screenshot shows:
              Logo | Company | Product | Resources | Discover | Newsletter
              It's a wide layout. 
           */}
        </div>

        {/* Newsletter and Socials Row (Matching layout where newsletter is on the right) */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
            <div className="hidden lg:block lg:w-1/3">
                 {/* Empty spacer if we want to align with top grid, or just let the grid handle the top part */}
            </div>
            
            {/* Newsletter Section floating right or integrated */}
             <div className="w-full lg:w-auto lg:ml-auto">
                 <h4 className="text-white font-bold mb-4">Subscribe to our newsletter</h4>
                 <div className="relative max-w-md">
                   <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full bg-white rounded-full py-3 pl-6 pr-32 text-slate-900 outline-none focus:ring-2 focus:ring-brand-500 text-sm placeholder:text-slate-400" 
                   />
                   <button className="absolute right-1 top-1 bottom-1 bg-brand-500 text-slate-900 hover:bg-brand-400 font-bold rounded-full px-6 text-xs transition-colors">
                     Subscribe
                   </button>
                 </div>
                 <p className="text-[10px] text-gray-500 mt-4 leading-relaxed max-w-sm">
                   Informative insights and practical knowledge to align your sales team effectively. No jargon, no clutter. No corporate jumbles. Just a friendly newsletter delivered to monthly.
                 </p>
                 <div className="flex gap-4 mt-6">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={18} /></a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={18} /></a>
                    {/* X icon workaround */}
                    <a href="#" className="text-gray-400 hover:text-white transition-colors font-bold text-lg leading-none h-[18px] flex items-center">𝕏</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={18} /></a>
                 </div>
            </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500">
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
          <div>
            © 2025 Salesflow. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;