import { ArrowRightIcon, HouseIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";

import { Button } from "./ui/button";

export default function NotFound() {
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.assign("/");
  };

  return (
    <div className="bg-background relative min-h-screen overflow-hidden">
      <Grid />
      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <div className="text-muted-foreground mb-6 font-mono text-[10px] tracking-[0.4em] uppercase">
          الحالة · 404
        </div>

        <BigNumerals />

        <h1 className="font-heading mt-10 max-w-md text-2xl leading-tight md:text-3xl">
          لم يتم العثور على الصفحة!
        </h1>
        <p className="text-muted-foreground mt-2 max-w-sm text-sm text-balance">
          عذرًا، الصفحة التي تحاول الوصول إليها غير متوفرة أو ربما تم نقلها. يمكنك العودة إلى الصفحة
        </p>

        <div className="mt-8 flex items-center gap-2">
          <Button variant="outline" size="default" onClick={goBack}>
            <ArrowRightIcon />
            العودة
          </Button>
          <Button size="default" nativeButton={false} render={<Link to="/dashboard" />}>
            <HouseIcon />
            الصفحة الرئيسية
          </Button>
        </div>
      </div>
    </div>
  );
}

function BigNumerals() {
  return (
    <div className="font-heading relative text-[clamp(8rem,22vw,16rem)] leading-none font-bold tracking-tighter">
      <span className="from-foreground to-foreground/30 bg-linear-to-b bg-clip-text text-transparent">
        404
      </span>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-2 h-1/2"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, color-mix(in srgb, var(--background) 80%, transparent) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}

function Grid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage:
          "linear-gradient(to right, color-mix(in srgb, var(--foreground) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 8%, transparent) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse at center, black 35%, transparent 75%)",
      }}
    />
  );
}
