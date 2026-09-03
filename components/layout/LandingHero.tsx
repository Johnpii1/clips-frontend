"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Loader2, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  LANDING_HERO_AVATAR_SEEDS,
  landingHeroAvatarSrc,
} from "@/app/lib/resourceHints";

interface LandingHeroProps {
  badgeText?: string;
  heading?: React.ReactNode;
  description?: string;
  showUrlForm?: boolean;
  showSocialProof?: boolean;
  className?: string;
}

export default function LandingHero({
  badgeText = "AI VIDEO CLIPPING IS LIVE",
  heading,
  description = "Turn long-form videos into engaging short clips with AI. Review the best moments, choose what to publish, and grow your audience across TikTok, Reels, Shorts, and more.",
  showUrlForm = true,
  showSocialProof = true,
  className = "",
}: LandingHeroProps) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [urlAnalyzing, setUrlAnalyzing] = useState(false);

  const defaultHeading = (
    <>
      Turn long videos into<br />
      <span className="text-brand">short-form content</span>
      <br />
      that gets noticed.
    </>
  );

  const handleURLSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setUrlAnalyzing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setUrlAnalyzing(false);
    const emailInput = document.getElementById("auth-email") as HTMLInputElement;
    if (emailInput) {
      emailInput.focus();
    } else {
      router.push("/signup");
    }
  };

  return (
    <div className={`space-y-8 max-w-[620px] ${className}`}>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/[0.12] border border-brand/20 text-brand text-[11px] font-bold tracking-[0.1em] uppercase">
        <span className="w-2 h-2 rounded-full bg-brand" style={{ boxShadow: "0 0 10px var(--color-brand)" }} />
        {badgeText}
      </div>

      <h1 className="text-[64px] font-extrabold leading-[1.05] tracking-tight">
        {heading ?? defaultHeading}
      </h1>

      <p className="text-muted text-lg max-w-[520px] leading-[1.6]">
        {description}
      </p>

      {showUrlForm && (
        <form onSubmit={handleURLSubmit} className="flex gap-4 w-full">
          <div className="relative flex-1 max-w-[360px] group">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-brand transition-colors" />
            <input
              type="url"
              placeholder="Paste YouTube or Vimeo URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-input/60 border border-subtle rounded-[14px] py-3.5 pl-12 pr-4 text-white placeholder-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus:border-brand/50 focus:bg-input transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={urlAnalyzing}
            className="bg-brand hover:bg-brand-hover text-black px-8 py-3.5 rounded-[14px] font-bold text-sm tracking-wide transition-all disabled:opacity-70 flex items-center justify-center gap-2 min-w-[130px] shadow-[0_0_15px_rgba(0,229,143,0.2)]"
          >
            {urlAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Analyzing
              </>
            ) : (
              "Clip Now"
            )}
          </button>
        </form>
      )}

      {showSocialProof && (
        <div className="flex items-center gap-4 text-sm text-muted pt-2">
          <div className="flex -space-x-2.5">
            {LANDING_HERO_AVATAR_SEEDS.map((seed, index) => (
              <div
                key={seed}
                className={`w-9 h-9 rounded-full border-2 border-[#080C0B] flex items-center justify-center text-[10px] overflow-hidden ${
                  index === 0 ? "bg-zinc-800" : index === 1 ? "bg-zinc-700" : "bg-zinc-600"
                }`}
              >
                <Image
                  src={landingHeroAvatarSrc(seed)}
                  alt={`Creator avatar ${seed}`}
                  width={36}
                  height={36}
                  priority={index === 0}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          Built for creators who want to publish more, faster.
        </div>
      )}
    </div>
  );
}
