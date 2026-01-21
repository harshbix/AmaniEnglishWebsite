import { useState, useEffect, type FC } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/Container";
import { QUICK_LINKS } from "@/utils/constants";

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-brand-dark hover:text-brand-green transition-colors"
          >
            <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="hidden sm:inline">Amani School</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-brand-dark hover:text-brand-green transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            to="/admissions"
            className="hidden md:inline-block px-6 py-2.5 bg-brand-green text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            Admissions
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-3 py-4">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-4 py-2 text-brand-dark hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/admissions"
                className="mx-4 px-4 py-2.5 bg-brand-green text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Admissions
              </Link>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
};
