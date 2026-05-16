import type { ReactNode } from "react";
import { cn } from "@/ui/lib/utils";

interface SectionWrapperProps {
	title: string;
	description?: string;
	children: ReactNode;
	className?: string;
}

export function SectionWrapper({
	title,
	description,
	children,
	className,
}: SectionWrapperProps) {
	return (
		<div className={cn("space-y-5", className)}>
			<div className="mb-6">
				<h2 className="text-xl font-bold tracking-tight text-foreground">
					{title}
				</h2>
				{description && (
					<p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
						{description}
					</p>
				)}
			</div>
			{children}
		</div>
	);
}

interface SettingCardProps {
	title: string;
	description?: string;
	children: ReactNode;
	className?: string;
	action?: ReactNode;
	icon?: ReactNode;
}

export function SettingCard({
	title,
	description,
	children,
	className,
	action,
	icon,
}: SettingCardProps) {
	return (
		<div
			className={cn(
				"group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-200 hover:border-border hover:shadow-md",
				className,
			)}
		>
			<div className="flex items-start justify-between gap-4 border-b border-border/50 bg-muted/20 px-5 py-4">
				<div className="flex items-center gap-3">
					{icon && (
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
							{icon}
						</div>
					)}
					<div>
						<h3 className="text-sm font-semibold text-foreground">{title}</h3>
						{description && (
							<p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
								{description}
							</p>
						)}
					</div>
				</div>
				{action && <div className="shrink-0">{action}</div>}
			</div>
			<div className="px-5 py-5">{children}</div>
		</div>
	);
}

interface SettingRowProps {
	label: string;
	description?: string;
	children: ReactNode;
	className?: string;
}

export function SettingRow({
	label,
	description,
	children,
	className,
}: SettingRowProps) {
	return (
		<div
			className={cn(
				"flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between",
				className,
			)}
		>
			<div className="space-y-0.5">
				<p className="text-sm font-medium text-foreground">{label}</p>
				{description && (
					<p className="text-xs leading-relaxed text-muted-foreground">
						{description}
					</p>
				)}
			</div>
			<div className="shrink-0">{children}</div>
		</div>
	);
}
