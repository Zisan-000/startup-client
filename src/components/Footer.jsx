import React from "react";
import Link from "next/link";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiGlobe,
  FiArrowUpRight,
} from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Venture Ecosystem", href: "/allstartups" },
    { label: "Explore Opportunities", href: "/allopportunities" },
    { label: "Platform Governance", href: "/dashboard" },
  ];

  const socialLinks = [
    {
      icon: <FiGithub size={18} />,
      href: "https://github.com",
      label: "Github",
    },
    {
      icon: <FiTwitter size={18} />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <FiLinkedin size={18} />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="w-full bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 space-y-12">
        {/* Top Segment: Grid Layout Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Column 1: Branding and Corporate Pitch Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-zinc-950 dark:bg-zinc-50 flex items-center justify-center text-white dark:text-zinc-950 font-black tracking-tighter text-lg">
                S
              </div>
              <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                Startup Forge
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-sm">
              An advanced workspace platform designed to streamline corporate
              matching pipelines, venture telemetry, and team deployment
              frameworks.
            </p>
          </div>

          {/* Column 2: Central Navigation Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors group"
                  >
                    {link.label}
                    <FiArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Communication Channels */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Contact Information
            </h4>
            <ul className="space-y-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2.5">
                <FiMail size={16} className="text-zinc-400 shrink-0" />
                <a
                  href="mailto:support@startupforge.com"
                  className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                >
                  support@startupforge.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone size={16} className="text-zinc-400 shrink-0" />
                <a
                  href="tel:+880123456789"
                  className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                >
                  +880 1234-567890
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <FiMapPin size={16} className="text-zinc-400 shrink-0 mt-0.5" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Segment: Copyright & Social Matrix Integration */}
        <div className="pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Legal Copyright Line */}
          <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 order-2 sm:order-1">
            © {currentYear} Startupforge. All operational nodes reserved
            natively.
          </p>

          {/* Active Social Channels Anchor Grid */}
          <div className="flex items-center gap-2 order-1 sm:order-2">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/50 text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
