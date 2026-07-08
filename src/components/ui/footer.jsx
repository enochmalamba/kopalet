// components/layout/footer.jsx
import Link from "next/link";
import { H3, P } from "@/components/ui/typography";
import { Heart } from "lucide-react";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.kopalet.com";

const footerLinks = {
  "Job Seekers": [
    { label: "Browse vacancies", href: "/vacancies" },
    { label: "Browse scholarships", href: "/scholarships" },
    { label: "Create an account", href: `${APP_URL}/register` },
    { label: "How it works", href: "/how-it-works" },
  ],
  Employers: [
    { label: "Post a vacancy", href: `${APP_URL}/register?type=employer` },
    { label: "Pricing", href: "/pricing" },
    { label: "Why Kopalet", href: "/for-employers" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers at Kopalet", href: "/careers" },
  ],
  Legal: [
    { label: "Terms of service", href: "/terms" },
    { label: "Privacy policy", href: "/privacy" },
  ],
};

const socials = [
  { icon: Heart, href: "https://facebook.com/kopalet", label: "Facebook" },
  {
    icon: Heart,
    href: "https://instagram.com/kopalet",
    label: "Instagram",
  },
  { icon: Heart, href: "https://twitter.com/kopalet", label: "Twitter" },
  {
    icon: Heart,
    href: "https://linkedin.com/company/kopalet",
    label: "LinkedIn",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full mt-20 border-t border-black/10">
      {/* Flag accent strip */}
      <div className="w-full h-[3px] flex">
        <div className="flex-1 bg-neutral-900" />
        <div className="flex-1 bg-red-800" />
        <div className="flex-1 bg-green-800" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-2 mb-8 md:mb-0">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Kopalet
            </Link>
            <P className="text-sm text-neutral-600 mt-3 max-w-60">
              Jobs, talent, and opportunity — all in one place, built for
              Malawi.
            </P>
            <div className="flex gap-3 mt-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => {
                  const isExternal = href.startsWith("http");
                  return (
                    <li key={label}>
                      {isExternal ? (
                        <a
                          href={href}
                          className="text-sm text-neutral-600 hover:text-neutral-900"
                        >
                          {label}
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className="text-sm text-neutral-600 hover:text-neutral-900"
                        >
                          {label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-16 pt-8 border-t border-black/10">
          <P className="text-xs text-neutral-500">
            © {year} Kopalet. All rights reserved.
          </P>
          <P className="text-xs text-neutral-500">Made in Lilongwe, Malawi.</P>
        </div>
      </div>
    </footer>
  );
}
