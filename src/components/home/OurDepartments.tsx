"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ArrowRight,
  ShieldCheck,
  Cpu,
  FileCheck2,
  Boxes,
} from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import Link from "next/link";

interface SectionData {
  title: string;
  subtitle: string;
  videoUrl: string;
  buttonText: string;
  buttonLink: string;
}

interface OurDepartmentsProps {
  departments?: any[];
  sectionData?: SectionData | null;
}

const facilityPillars = [
  {
    icon: Cpu,
    tag: "01 · AUTOMATION",
    title: "High-Speed Blister Lines",
    description:
      "Automated thermoforming and cold-form blister packaging lines minimizing particulate exposure and human touch.",
  },
  {
    icon: ShieldCheck,
    tag: "02 · STERILITY",
    title: "Class C/D Cleanrooms",
    description:
      "Certified HVAC terminal HEPA air filtration with continuous differential pressure and environmental monitoring.",
  },
  {
    icon: FileCheck2,
    tag: "03 · COMPLIANCE",
    title: "WHO-GMP Audited",
    description:
      "Formulation and packaging under active DGDA licenses 418 & 287 in full adherence to international cGMP standards.",
  },
  {
    icon: Boxes,
    tag: "04 · TRACEABILITY",
    title: "Serialized Batch Tracking",
    description:
      "2D matrix barcoding and batch retention systems ensuring end-to-end chain of custody from factory to pharmacy.",
  },
];

function formatTime(seconds: number) {
  if (isNaN(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function OurDepartments({
  sectionData,
}: OurDepartmentsProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const bannerTitle = sectionData?.title || "Excellence in Care";
  const bannerSubtitle =
    sectionData?.subtitle || "Advancing Healthcare Through Innovation";
  const videoUrl = sectionData?.videoUrl || "/lading-page-video.mp4";
  const buttonText =
    sectionData?.buttonText && sectionData.buttonText !== "Explore Departments"
      ? sectionData.buttonText
      : "Explore Product Portfolio";
  const buttonLink =
    sectionData?.buttonLink && sectionData.buttonLink !== "#"
      ? sectionData.buttonLink
      : "/products";

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Fullscreen error:", err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error("Exit fullscreen error:", err);
      }
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    setCurrentTime(current);
    if (total > 0) {
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const targetTime = pos * (videoRef.current.duration || 0);
    videoRef.current.currentTime = targetTime;
    setProgress(pos * 100);
  };

  return (
    <section id="facility-spotlight" className="bg-white py-16 lg:py-24 border-t border-slate-200/80">
      <div className="container-x">
        <SectionHeader
          align="center"
          eyebrow="Facility &amp; Operational Spotlight"
          title="World-Class Pharmaceutical Manufacturing"
          description="Amulet Pharmaceuticals Ltd.'s WHO-GMP facility in Gazipur operates certified cleanroom suites and high-speed packaging lines ensuring total batch integrity."
        />

        {/* ================= Cinematic Video Showcase ================= */}
        <div
          ref={containerRef}
          onMouseEnter={() => setShowControls(true)}
          className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-navy-950 shadow-2xl shadow-navy-950/10"
        >
          {/* Main Video Stream Container */}
          <div className="relative h-[380px] sm:h-[460px] lg:h-[540px] w-full overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              poster="/hero1.jpeg"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
              className="h-full w-full object-cover cursor-pointer"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>

            {/* Cinematic Multilayer Scrim */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/35 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-950/60 to-transparent" />

            {/* Central Floating Play Icon (shown when paused) */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play video"
                className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-navy-950/70 text-white shadow-2xl backdrop-blur-md transition-transform duration-300 hover:scale-110 active:scale-95"
              >
                <Play className="h-8 w-8 translate-x-0.5 fill-white" />
              </button>
            )}

            {/* Top Bar Badges */}
            <div className="absolute left-5 top-5 sm:left-8 sm:top-8 z-20 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-teal-400/40 bg-navy-950/75 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-teal-300 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-brand-teal-400 animate-pulse" />
                Live Cleanroom Facility
              </span>
              <span className="hidden sm:inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                Amulet Pharmaceuticals Ltd. · Gazipur
              </span>
            </div>

            {/* Bottom Content & Headline Overlay */}
            <div className="absolute inset-x-0 bottom-11 sm:bottom-14 z-20 p-5 sm:p-8 lg:p-12">
              <div className="max-w-2xl">
                <h3 className="font-display text-xl font-extrabold text-white sm:text-3xl lg:text-4xl leading-tight">
                  {bannerTitle}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-200 sm:text-sm sm:mt-2.5 lg:text-base line-clamp-2 sm:line-clamp-none">
                  {bannerSubtitle}
                </p>

                <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href={buttonLink}
                    className="inline-flex h-10 sm:h-11 items-center gap-2 rounded-lg bg-brand-teal-400 px-5 sm:px-6 text-xs sm:text-sm font-bold text-navy-950 shadow-md shadow-brand-teal-500/20 transition-all hover:bg-brand-teal-300 hover:shadow-lg"
                  >
                    <span>{buttonText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/contact"
                    className="hidden sm:inline-flex h-11 items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20"
                  >
                    <span>Tour &amp; Supply Inquiries</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Interactive Video Controls Dock */}
            <div
              className={`absolute inset-x-0 bottom-0 z-30 bg-navy-950/90 backdrop-blur-md px-4 py-2 sm:px-6 transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {/* Scrub Track */}
              <div
                onClick={handleSeek}
                className="group/track relative h-2 w-full cursor-pointer py-1"
                aria-label="Seek video"
              >
                <div className="h-1 w-full rounded-full bg-white/20 transition-all group-hover/track:h-1.5">
                  <div
                    className="relative h-full rounded-full bg-brand-teal-400"
                    style={{ width: `${progress}%` }}
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow opacity-0 group-hover/track:opacity-100" />
                  </div>
                </div>
              </div>

              {/* Controls Bar */}
              <div className="flex items-center justify-between text-white text-xs pt-1">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className="flex h-7 w-7 items-center justify-center rounded text-white/80 transition-colors hover:text-white"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="flex h-7 w-7 items-center justify-center rounded text-white/80 transition-colors hover:text-white"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>

                  <span className="font-mono text-[11px] tabular-nums text-slate-300">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    className="flex h-7 w-7 items-center justify-center rounded text-white/80 transition-colors hover:text-white"
                  >
                    {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 4 Capability Assurance Pillars (2-col on mobile, 4-col on lg) ================= */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {facilityPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group flex flex-col justify-between rounded-xl border border-slate-200/90 bg-slate-50/60 p-3 sm:p-5 lg:p-6 transition-all duration-300 hover:border-navy-200 hover:bg-white hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2.5 sm:mb-4">
                  <span className="flex h-7 w-7 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-md sm:rounded-lg bg-navy-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <pillar.icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" strokeWidth={1.8} />
                  </span>
                  <span className="text-[8px] sm:text-[10px] font-bold tracking-tight sm:tracking-[0.14em] text-brand-teal-600 uppercase">
                    {pillar.tag}
                  </span>
                </div>

                <h4 className="font-display text-xs sm:text-sm lg:text-base font-bold text-navy-900 group-hover:text-primary transition-colors leading-snug line-clamp-2 min-h-[32px] sm:min-h-0 flex items-start">
                  {pillar.title}
                </h4>

                <p className="mt-1 sm:mt-2 text-[11px] sm:text-xs leading-relaxed text-muted-foreground line-clamp-3 sm:line-clamp-none">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-3 sm:mt-5 h-[2px] w-6 sm:w-8 rounded-full bg-slate-200 transition-all duration-300 group-hover:w-10 sm:group-hover:w-12 group-hover:bg-brand-teal-400" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
