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
		<div className={cn("space-y-6", className)}>
			<div className="border-b border-border pb-4">
				<h2 className="text-2xl font-semibold tracking-tight text-foreground">
					{title}
				</h2>
				{description && (
					<p className="mt-1 text-sm text-muted-foreground">{description}</p>
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
}

export function SettingCard({
	title,
	description,
	children,
	className,
	action,
}: SettingCardProps) {
	return (
		<div
			className={cn(
				"rounded-xl border border-border bg-card p-5 transition-colors",
				className,
			)}
		>
			<div className="flex items-start justify-between gap-4">
				<div className="space-y-1">
					<h3 className="text-sm font-medium text-card-foreground">{title}</h3>
					{description && (
						<p className="text-sm text-muted-foreground">{description}</p>
					)}
				</div>
				{action}
			</div>
			<div className="mt-4">{children}</div>
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
				"flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between",
				className,
			)}
		>
			<div className="space-y-0.5">
				<p className="text-sm font-medium text-foreground">{label}</p>
				{description && (
					<p className="text-sm text-muted-foreground">{description}</p>
				)}
			</div>
			<div className="shrink-0">{children}</div>
		</div>
	);
}
