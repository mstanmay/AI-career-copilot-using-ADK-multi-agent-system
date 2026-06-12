"use client";

import { ParticleField } from "@/components/effects/ParticleField";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import { ProfileCreationFlow } from "@/components/auth/ProfileCreationFlow";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
      <GridBackground variant="dots" />
      <ParticleField particleCount={30} />
      <GlowOrb color="blue" size={400} x="20%" y="30%" />
      <GlowOrb color="purple" size={350} x="80%" y="70%" delay={3} />

      <div className="relative z-10 w-full">
        <ProfileCreationFlow />
      </div>
    </div>
  );
}
