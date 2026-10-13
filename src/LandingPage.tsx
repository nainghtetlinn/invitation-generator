import { Link } from "react-router-dom";
import {
  FileText,
  ClipboardList,
  FileDown,
  Users,
  Settings,
  Printer,
  ArrowRight,
} from "lucide-react";

// ─── Animated arrow connector ────────────────────────────────────────────────
const AnimatedArrow = () => (
  <div className="hidden md:flex items-center justify-center flex-shrink-0 w-24 lg:w-32">
    <svg
      viewBox="0 0 120 24"
      className="w-full h-6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* track */}
      <line
        x1="0"
        y1="12"
        x2="108"
        y2="12"
        stroke="oklch(0.62 0.265 303.9 / 0.3)"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      {/* arrowhead */}
      <polygon
        points="108,4 120,12 108,20"
        fill="oklch(0.62 0.265 303.9 / 0.3)"
      />
      {/* animated dot traveling along the line */}
      <circle r="4" fill="oklch(0.62 0.265 303.9)" className="animate-pulse">
        <animateMotion dur="2s" repeatCount="indefinite">
          <mpath xlinkHref="#arrowPath" />
        </animateMotion>
      </circle>
      <path id="arrowPath" d="M0,12 L120,12" fill="none" />
    </svg>
  </div>
);

// ─── Small mobile arrow (vertical) ──────────────────────────────────────────
const MobileArrow = () => (
  <div className="flex md:hidden items-center justify-center py-2">
    <svg
      viewBox="0 0 24 60"
      className="w-6 h-10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="12"
        y1="0"
        x2="12"
        y2="48"
        stroke="oklch(0.62 0.265 303.9 / 0.3)"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <polygon
        points="4,48 12,60 20,48"
        fill="oklch(0.62 0.265 303.9 / 0.3)"
      />
      <circle r="3" fill="oklch(0.62 0.265 303.9)" className="animate-pulse">
        <animateMotion dur="2s" repeatCount="indefinite">
          <mpath xlinkHref="#mobileArrowPath" />
        </animateMotion>
      </circle>
      <path id="mobileArrowPath" d="M12,0 L12,60" fill="none" />
    </svg>
  </div>
);

// ─── Hero visual card ────────────────────────────────────────────────────────
interface HeroCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent?: boolean;
}

const HeroCard = ({ icon, title, description, accent }: HeroCardProps) => (
  <div
    className={`card bg-base-100 shadow-lg border-2 w-full max-w-56 ${accent ? "border-primary" : "border-base-300"} transition-transform hover:scale-105`}
  >
    <div className="card-body items-center text-center p-5 gap-3">
      <div
        className={`rounded-full p-3 ${accent ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"}`}
      >
        {icon}
      </div>
      <h3 className="card-title text-base">{title}</h3>
      <p className="text-sm text-base-content/70">{description}</p>
    </div>
  </div>
);

// ─── Step card for "How It Works" ────────────────────────────────────────────
interface StepCardProps {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StepCard = ({ step, icon, title, description }: StepCardProps) => (
  <div className="card bg-base-100 shadow-md border border-base-300 hover:border-primary/50 transition-colors">
    <div className="card-body gap-3">
      <div className="flex items-center gap-3">
        <div className="badge badge-primary badge-lg font-bold">{step}</div>
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="card-title text-lg">{title}</h3>
      <p className="text-base-content/70">{description}</p>
    </div>
  </div>
);

// ─── Landing page ────────────────────────────────────────────────────────────
export const LandingPage = () => {
  return (
    <main className="flex-1">
      {/* ── Hero section ──────────────────────────────────────────────────── */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-base-100 to-base-200">
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Invitation{" "}
            <span className="text-primary">Generator</span>
          </h1>
          <p className="text-lg text-base-content/70">
            Turn your invitation data into print‑ready Word documents in
            seconds.
          </p>
        </div>

        {/* Three‑column process illustration */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 w-full max-w-4xl">
          {/* 1 — Data Input */}
          <HeroCard
            icon={<ClipboardList size={32} />}
            title="Invitation Details"
            description="Provide seminar information, groups and members"
          />

          <AnimatedArrow />
          <MobileArrow />

          {/* 2 — Tool */}
          <HeroCard
            icon={<Settings size={32} />}
            title="Automated Processing"
            description="The system formats and generates invitation documents"
            accent
          />

          <AnimatedArrow />
          <MobileArrow />

          {/* 3 — Output */}
          <HeroCard
            icon={<Printer size={32} />}
            title="Print‑Ready Document"
            description="Receive a professionally formatted .docx file"
          />
        </div>

        <Link
          to="/generate"
          className="btn btn-primary btn-lg mt-12 gap-2"
        >
          Get Started <ArrowRight size={20} />
        </Link>
      </section>

      {/* ── How It Works section ──────────────────────────────────────────── */}
      <section className="px-4 py-20 bg-base-200">
        <div className="mx-auto container max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StepCard
              step={1}
              icon={<FileText size={24} />}
              title="Fill In Details"
              description="Select your department, year, academic year, seminar type, date, time and place."
            />
            <StepCard
              step={2}
              icon={<Users size={24} />}
              title="Add Groups & Members"
              description="Create thesis groups, add members with their names and roll numbers."
            />
            <StepCard
              step={3}
              icon={<Settings size={24} />}
              title="Generate"
              description="Click Generate and our tool automatically fills the invitation template for you."
            />
            <StepCard
              step={4}
              icon={<FileDown size={24} />}
              title="Download & Print"
              description="Download the ready-made .docx file, open it in Word and print — it's that simple."
            />
          </div>
        </div>
      </section>
    </main>
  );
};

