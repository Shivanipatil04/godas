import React from 'react';
import { companyInfo } from '../data/companyInfo';

export function FacebookIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

export function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export function YoutubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export function WhatsappIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.099 4.019 4.142-1.086z"/>
    </svg>
  );
}

export function SocialLinks({ variant = "default", className = "" }) {
  const links = [
    {
      name: "Facebook",
      url: companyInfo.socialLinks.facebook,
      icon: FacebookIcon,
      color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
      badgeBg: "bg-[#1877F2]"
    },
    {
      name: "Instagram",
      url: companyInfo.socialLinks.instagram,
      icon: InstagramIcon,
      color: "hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white hover:border-transparent",
      badgeBg: "bg-rose-600"
    },
    {
      name: "YouTube",
      url: companyInfo.socialLinks.youtube,
      icon: YoutubeIcon,
      color: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]",
      badgeBg: "bg-[#FF0000]"
    },
    {
      name: "LinkedIn",
      url: companyInfo.socialLinks.linkedin,
      icon: LinkedinIcon,
      color: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
      badgeBg: "bg-[#0A66C2]"
    },
    {
      name: "WhatsApp",
      url: companyInfo.socialLinks.whatsapp,
      icon: WhatsappIcon,
      color: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
      badgeBg: "bg-[#25D366]"
    }
  ];

  if (variant === "compact") {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Connect with Godas Business Corp on ${item.name}`}
              className={`w-7 h-7 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/70 flex items-center justify-center transition-all duration-300 ${item.color}`}
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-5 gap-3 ${className}`}>
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center group hover:-translate-y-1 duration-300"
            >
              <div className={`w-10 h-10 rounded-full ${item.badgeBg} text-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#0D2F45] group-hover:text-[#1E7A5A] transition-colors">
                {item.name}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">@godasbusinesscorp</span>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {links.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Godas Business Corp on ${item.name}`}
            aria-label={`Connect with Godas Business Corp on ${item.name}`}
            className={`w-9 h-9 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center shadow-sm transition-all duration-300 ${item.color}`}
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
}
