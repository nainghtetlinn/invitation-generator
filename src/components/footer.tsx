import { Github, Mail, Send } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto container max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-6 text-sm text-base-content/60">
        <p>&copy; {new Date().getFullYear()} Naing Htet Linn</p>

        <nav className="flex items-center gap-4">
          <a
            href="https://github.com/nainghtetlinn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-base-content transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://t.me/naing_hl"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-base-content transition-colors"
            aria-label="Telegram"
          >
            <Send size={18} />
          </a>
          <a
            href="mailto:naing.work.it@gmail.com"
            className="hover:text-base-content transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </nav>
      </div>
    </footer>
  );
};

