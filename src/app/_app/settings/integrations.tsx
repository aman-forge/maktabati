import { createFileRoute } from "@tanstack/react-router";

import {
	ArrowRightIcon,
	CheckCircleIcon,
	CloudArrowUpIcon,
	DeviceMobileIcon,
	PlugsIcon,
	XCircleIcon,
} from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Switch } from "@shadcn/switch";
import { useState } from "react";
import {
	SectionWrapper,
	SettingCard,
	SettingRow,
} from "@/features/settings/components/section-wrapper";

export const Route = createFileRoute("/_app/settings/integrations")({
	component: IntegrationsSection,
});
function IntegrationsSection() {
	const integrations = [
		{
			name: "Kindle",
			description: "Sync your Kindle library and reading progress",
			icon: "📱",
			connected: true,
			lastSync: "2 hours ago",
		},
		{
			name: "Audible",
			description: "Import audiobook library and listening history",
			icon: "🎧",
			connected: true,
			lastSync: "1 day ago",
		},
		{
			name: "Goodreads",
			description: "Import your Goodreads library and reviews",
			icon: "📚",
			connected: false,
			lastSync: null,
		},
		{
			name: "Libby",
			description: "Sync library loans and reading lists",
			icon: "📖",
			connected: false,
			lastSync: null,
		},
		{
			name: "Kobo",
			description: "Connect your Kobo e-reader library",
			icon: "📕",
			connected: false,
			lastSync: null,
		},
		{
			name: "Apple Books",
			description: "Import books from your Apple library",
			icon: "🍎",
			connected: false,
			lastSync: null,
		},
	];

	const [autoSync, setAutoSync] = useState(true);

	return (
		<SectionWrapper
			title="Integrations"
			description="Connect external services and sync your reading data."
		>
			<SettingCard
				title="Connected Services"
				description="Manage your connected reading platforms."
				action={
					<Badge
						variant="outline"
						className="gap-1 border-primary/30 text-primary"
					>
						<PlugsIcon className="h-3 w-3" weight="fill" />2 Connected
					</Badge>
				}
			>
				<div className="space-y-3">
					{integrations.map((integration) => (
						<div
							key={integration.name}
							className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${
								integration.connected
									? "border-primary/30 bg-primary/5"
									: "border-border bg-secondary/50"
							}`}
						>
							<div className="flex items-center gap-4">
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-card text-2xl">
									{integration.icon}
								</div>
								<div>
									<div className="flex items-center gap-2">
										<p className="text-sm font-medium text-foreground">
											{integration.name}
										</p>
										{integration.connected ? (
											<CheckCircleIcon
												className="h-4 w-4 text-primary"
												weight="fill"
											/>
										) : (
											<XCircleIcon
												className="h-4 w-4 text-muted-foreground"
												weight="fill"
											/>
										)}
									</div>
									<p className="text-xs text-muted-foreground">
										{integration.description}
									</p>
									{integration.connected && integration.lastSync && (
										<p className="mt-1 text-xs text-primary">
											Last synced: {integration.lastSync}
										</p>
									)}
								</div>
							</div>
							{integration.connected ? (
								<div className="flex items-center gap-2">
									<Button
										variant="ghost"
										size="sm"
										className="text-muted-foreground"
									>
										Sync Now
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="text-destructive hover:text-destructive"
									>
										Disconnect
									</Button>
								</div>
							) : (
								<Button variant="secondary" size="sm" className="gap-1">
									Connect
									<ArrowRightIcon className="h-4 w-4" />
								</Button>
							)}
						</div>
					))}
				</div>
			</SettingCard>

			<SettingCard
				title="Sync Settings"
				description="Configure how your data syncs."
			>
				<div className="divide-y divide-border">
					<SettingRow
						label="Automatic Sync"
						description="Automatically sync connected services daily"
					>
						<div className="flex items-center gap-3">
							<CloudArrowUpIcon className="h-5 w-5 text-muted-foreground" />
							<Switch checked={autoSync} onCheckedChange={setAutoSync} />
						</div>
					</SettingRow>
					<SettingRow
						label="Sync Reading Progress"
						description="Keep page numbers and progress in sync"
					>
						<Switch defaultChecked />
					</SettingRow>
					<SettingRow
						label="Import Reviews"
						description="Bring in reviews from connected platforms"
					>
						<Switch defaultChecked />
					</SettingRow>
					<SettingRow
						label="Two-way Sync"
						description="Push changes back to connected services"
					>
						<Switch />
					</SettingRow>
				</div>
			</SettingCard>

			<SettingCard
				title="Mobile Apps"
				description="Download our apps for the best reading experience."
			>
				<div className="grid gap-3 sm:grid-cols-2">
					<div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-4">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card">
							<DeviceMobileIcon
								className="h-5 w-5 text-foreground"
								weight="fill"
							/>
						</div>
						<div className="flex-1">
							<p className="text-sm font-medium text-foreground">iOS App</p>
							<p className="text-xs text-muted-foreground">iPhone & iPad</p>
						</div>
						<Button variant="secondary" size="sm">
							Download
						</Button>
					</div>
					<div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-4">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card">
							<DeviceMobileIcon
								className="h-5 w-5 text-foreground"
								weight="fill"
							/>
						</div>
						<div className="flex-1">
							<p className="text-sm font-medium text-foreground">Android App</p>
							<p className="text-xs text-muted-foreground">Phone & Tablet</p>
						</div>
						<Button variant="secondary" size="sm">
							Download
						</Button>
					</div>
				</div>
			</SettingCard>

			<SettingCard
				title="API Access"
				description="For developers and power users."
			>
				<div className="space-y-4">
					<div className="flex items-center gap-4 rounded-lg bg-secondary p-4">
						<div className="flex-1">
							<p className="text-sm font-medium text-foreground">API Key</p>
							<p className="font-mono text-xs text-muted-foreground">
								bks_••••••••••••••••
							</p>
						</div>
						<Button variant="secondary" size="sm">
							Reveal
						</Button>
						<Button variant="ghost" size="sm" className="text-muted-foreground">
							Regenerate
						</Button>
					</div>
					<p className="text-xs text-muted-foreground">
						Use your API key to integrate Bookshelf with other applications.{" "}
						<a href="#" className="text-primary hover:underline">
							View Documentation
						</a>
					</p>
				</div>
			</SettingCard>
		</SectionWrapper>
	);
}
