import { ArrowRightIcon, HouseIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Grid />
      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.4em]">
          الحالة · 404
        </div>

        <BigNumerals />

        <h1 className="mt-10 max-w-md font-heading text-2xl leading-tight md:text-3xl">
          لم يتم العثور على الصفحة!
        </h1>
        <p className="mt-2 max-w-sm text-balance text-muted-foreground text-sm">
          عذرًا، الصفحة التي تحاول الوصول إليها غير متوفرة أو ربما تم نقلها. يمكنك العودة إلى الصفحة
        </p>

        <div className="mt-8 flex items-center gap-2">
          <Button variant="outline" size="default">
            <ArrowRightIcon />
            العودة
          </Button>
          <Button size="default" render={<Link to="/dashboard" />}>
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
    <div className="relative font-heading font-bold text-[clamp(8rem,22vw,16rem)] leading-none tracking-tighter">
      <span className="bg-linear-to-b from-foreground to-foreground/30 bg-clip-text text-transparent">
        404
      </span>
      <div
        aria-hidden
        className="-bottom-2 pointer-events-none absolute inset-x-0 h-1/2"
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
