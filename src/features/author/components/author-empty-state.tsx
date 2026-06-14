import type { ComponentType } from "react";

type EmptyStateIcon = ComponentType<{
  className?: string;
  weight?: "regular" | "duotone" | "fill";
}>;

export function AuthorEmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: EmptyStateIcon;
  title: string;
  description: string;
}) {
  return (
    <div
      className="bg-card flex flex-col items-center rounded-xl border border-dashed px-5 py-10 text-center"
      dir="rtl"
    >
      <div className="bg-primary/10 text-primary mb-3 flex size-11 items-center justify-center rounded-xl">
        <Icon weight="duotone" className="size-5" />
      </div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-muted-foreground mt-1 max-w-sm text-xs leading-relaxed">{description}</p>
    </div>
  );
}
