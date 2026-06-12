"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/stores/authStore";
import { Logo } from "@/components/shared/Logo";
import {
  User,
  Briefcase,
  Zap,
  Code,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

const ROLES = [
  "Data Scientist",
  "Software Engineer",
  "ML Engineer",
  "Product Manager",
  "DevOps Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "Cloud Architect",
];

const SKILLS = [
  "Python", "JavaScript", "TypeScript", "React", "Node.js",
  "SQL", "AWS", "Docker", "Kubernetes", "TensorFlow",
  "PyTorch", "Java", "Go", "Rust", "C++",
  "GraphQL", "REST APIs", "Git", "CI/CD", "Linux",
];

const EXPERIENCE_LEVELS = [
  { id: "junior", label: "Junior", desc: "0-2 years", icon: "🌱" },
  { id: "mid", label: "Mid-Level", desc: "2-5 years", icon: "🌿" },
  { id: "senior", label: "Senior", desc: "5-10 years", icon: "🌳" },
  { id: "lead", label: "Lead / Staff", desc: "10+ years", icon: "🏔️" },
];

const steps = [
  { id: "name", title: "What's your name?", icon: User },
  { id: "role", title: "Your target role", icon: Briefcase },
  { id: "experience", title: "Experience level", icon: Zap },
  { id: "skills", title: "Your skills", icon: Code },
];

export function ProfileCreationFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { updateProfile, completeOnboarding, user } = useAuthStore();
  const router = useRouter();

  const canProceed = () => {
    switch (currentStep) {
      case 0: return name.trim().length >= 2;
      case 1: return targetRole !== "";
      case 2: return experience !== "";
      case 3: return selectedSkills.length >= 1;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      updateProfile({
        targetRole,
        experienceLevel: experience as "junior" | "mid" | "senior" | "lead",
        skills: selectedSkills,
        completedOnboarding: true,
      });
      completeOnboarding();
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto px-6">
      <div className="glass-card p-8 md:p-10 flex flex-col">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <Logo size="default" />
          <h2 className="text-xl font-semibold mt-4 text-white">
            Complete Your Profile
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {user?.email ? `Signed in as ${user.email}` : "Let's personalize your experience"}
          </p>
        </div>

      {/* Progress bar */}
      <div className="flex gap-2 mb-8">
        {steps.map((_, i) => (
          <motion.div
            key={i}
            className="h-1 flex-1 rounded-full overflow-hidden"
            style={{ background: "var(--bg-surface)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, var(--accent-blue), var(--accent-purple))",
              }}
              initial={{ width: "0%" }}
              animate={{ width: i <= currentStep ? "100%" : "0%" }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="min-h-[300px]"
        >
          {/* Step header */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {(() => {
              const Icon = steps[currentStep].icon;
              return <Icon size={24} className="text-[var(--accent-blue)]" />;
            })()}
            <h3 className="text-xl font-medium text-white">
              {steps[currentStep].title}
            </h3>
          </div>

          {/* Step 0: Name */}
          {currentStep === 0 && (
            <div className="flex justify-center">
              <input
                id="profile-name-input"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-dark text-lg py-4 px-6 text-center max-w-md w-full"
                autoFocus
              />
            </div>
          )}

          {/* Step 1: Target Role */}
          {currentStep === 1 && (
            <div className="grid grid-cols-2 gap-3">
              {ROLES.map((role) => (
                <motion.button
                  key={role}
                  id={`role-${role.replace(/\s+/g, "-").toLowerCase()}`}
                  className={`p-4 rounded-xl text-sm text-center transition-all ${
                    targetRole === role
                      ? "bg-[var(--accent-blue-muted)] border border-[var(--accent-blue)] text-white"
                      : "glass-card text-[var(--text-secondary)] hover:text-white"
                  }`}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setTargetRole(role)}
                >
                  {role}
                </motion.button>
              ))}
            </div>
          )}

          {/* Step 2: Experience */}
          {currentStep === 2 && (
            <div className="space-y-3 max-w-md mx-auto">
              {EXPERIENCE_LEVELS.map((level) => (
                <motion.button
                  key={level.id}
                  id={`exp-${level.id}`}
                  className={`w-full p-4 rounded-xl flex items-center justify-between transition-all ${
                    experience === level.id
                      ? "bg-[var(--accent-blue-muted)] border border-[var(--accent-blue)]"
                      : "glass-card hover:border-[var(--border-hover)]"
                  }`}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setExperience(level.id)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{level.icon}</span>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white">{level.label}</p>
                      <p className="text-xs text-[var(--text-muted)]">{level.desc}</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center">
                    {experience === level.id && (
                      <Check size={18} className="text-[var(--accent-blue)]" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Step 3: Skills */}
          {currentStep === 3 && (
            <div className="flex flex-col items-center">
              <div className="flex flex-wrap justify-center gap-2 max-w-md">
                {SKILLS.map((skill) => (
                  <motion.button
                    key={skill}
                    id={`skill-${skill.toLowerCase()}`}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      selectedSkills.includes(skill)
                        ? "bg-[var(--accent-blue)] text-white shadow-[0_0_15px_rgba(79,140,255,0.4)]"
                        : "glass-card text-[var(--text-secondary)] hover:text-white"
                    }`}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleSkill(skill)}
                  >
                    {selectedSkills.includes(skill) && (
                      <Check size={14} className="inline mr-1.5" />
                    )}
                    {skill}
                  </motion.button>
                ))}
              </div>
              <p className="text-sm text-[var(--text-muted)] mt-6 text-center">
                Selected: {selectedSkills.length} skill{selectedSkills.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          className="btn-ghost text-sm"
          onClick={handleBack}
          disabled={currentStep === 0}
          style={{ opacity: currentStep === 0 ? 0 : 1 }}
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <motion.button
          id="profile-next-btn"
          className="btn-primary text-sm"
          onClick={handleNext}
          disabled={!canProceed()}
          whileHover={canProceed() ? { scale: 1.02 } : undefined}
          whileTap={canProceed() ? { scale: 0.98 } : undefined}
          style={{ opacity: canProceed() ? 1 : 0.4 }}
        >
          {currentStep === steps.length - 1 ? (
            <>
              <Sparkles size={16} />
              Launch Copilot
            </>
          ) : (
            <>
              Next
              <ChevronRight size={16} />
            </>
          )}
        </motion.button>
      </div>
      </div>
    </div>
  );
}
