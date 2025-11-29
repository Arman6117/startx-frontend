import React from "react";
import { Link } from "react-router-dom";
import { FloatingDock } from "./ui/floating-dock";
import {
  Search,
  FileText, 
  Home, 
  Newspaper, 
  PlusCircle,
  Mail,
  Linkedin,
  Twitter,
  Github
} from "lucide-react";

const Footer = () => {
  const links = [
    {
      title: "Home",
      icon: <Home className="h-full w-full text-white" />,
      href: "/",
    },
    {
      title: "Find Jobs",
      icon: <Search className="h-full w-full text-white" />,
      href: "/search",
    },
    {
      title: "Post A Job",
      icon: <PlusCircle className="h-full w-full text-white" />,
      href: "/post-job",
    },
    {
      title: "News",
      icon: <Newspaper className="h-full w-full text-white" />,
      href: "/news",
    },
    {
      title: "ResumeAI",
      icon: <FileText className="h-full w-full text-white" />,
      href: "/resume",
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="relative bg-transparent mt-20">
      {/* Gradient Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      <div className="container px-6 py-16 mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link
              to="/"
              className="group flex items-center gap-3 mb-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black text-2xl px-4 py-2 rounded-lg">
                  STARTX
                </div>
              </div>
            </Link>

            <p className="text-slate-400 text-base leading-relaxed mb-6 max-w-sm">
              Empowering your career journey with AI-powered tools. Connect, grow, and succeed in your professional life.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="group relative w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-1 flex flex-col items-center">
            <h3 className="text-white font-bold text-lg mb-6">Quick Access</h3>
            <FloatingDock items={links} />
          </div>

          {/* Resources Section */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-end text-center lg:text-right">
            <h3 className="text-white font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-slate-400 text-sm mb-4 max-w-xs">
              Get the latest job opportunities and career insights delivered to your inbox.
            </p>
            
            {/* Newsletter Input */}
           
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} <span className="text-slate-400 font-semibold">STARTX</span>. All Rights Reserved.
            </p>
            
            {/* Legal Links */}
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-slate-500 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-slate-500 hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-slate-500 hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </footer>
  );
};

export default Footer;
