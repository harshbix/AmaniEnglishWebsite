import { Link } from "react-router-dom";
import { Container } from "@/components/Container";
import { SCHOOL_INFO, QUICK_LINKS, SOCIAL_LINKS } from "@/utils/constants";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* School Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">{SCHOOL_INFO.name}</h3>
            <p className="text-gray-300 text-sm mb-4">{SCHOOL_INFO.location}</p>
            <p className="text-gray-300 text-sm mb-2">
              <a href={`tel:${SCHOOL_INFO.phone}`} className="hover:text-brand-green transition-colors">
                {SCHOOL_INFO.phone}
              </a>
            </p>
            <p className="text-gray-300 text-sm">
              <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-brand-green transition-colors">
                {SCHOOL_INFO.email}
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-brand-green transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-brand-green transition-colors text-sm"
                >
                  Student Portal
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-brand-green transition-colors text-sm"
                >
                  Parent Resources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-brand-green transition-colors text-sm"
                >
                  Library
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-brand-green transition-colors text-sm"
                >
                  Staff Directory
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.facebook}
                aria-label="Facebook"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-brand-green transition-colors"
              >
                f
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                aria-label="Twitter"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-brand-green transition-colors"
              >
                𝕏
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                aria-label="Instagram"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-brand-green transition-colors"
              >
                ∘
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                aria-label="LinkedIn"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-brand-green transition-colors"
              >
                in
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Amani English Medium Pre and Primary School. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-brand-green transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-brand-green transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
