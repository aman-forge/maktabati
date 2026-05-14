import { createFileRoute } from "@tanstack/react-router";

import {
	ArrowClockwiseIcon,
	CheckCircleIcon,
	ClockIcon,
	DownloadSimpleIcon,
	FileTextIcon,
	FileZipIcon,
	TrashIcon,
	WarningIcon,
} from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@shadcn/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@shadcn/select";
import { Switch } from "@shadcn/switch";
import { useState } from "react";
import {
	SectionWrapper,
	SettingCard,
	SettingRow,
} from "@/features/settings/components/section-wrapper";

export const Route = createFileRoute("/_app/settings/import-export")({
	component: DataSection,
});

function DataSection() {
	const [exportFormat, setExportFormat] = useState("json");

	const dataStats = {
		books: 347,
		reviews: 89,
		lists: 12,
		notes: 234,
		totalSize: "24.5 MB",
	};

	return (
		<SectionWrapper
			title="Data & Export"
			description="Manage your data, export, and account deletion."
		>
			<SettingCard
				title="Your Data Overview"
				description="Summary of all your Bookshelf data."
			>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
					<div className="rounded-lg border border-border bg-secondary/50 p-4 text-center">
						<p className="text-2xl font-bold text-foreground">
							{dataStats.books}
						</p>
						<p className="text-xs text-muted-foreground">Books</p>
					</div>
					<div className="rounded-lg border border-border bg-secondary/50 p-4 text-center">
						<p className="text-2xl font-bold text-foreground">
							{dataStats.reviews}
						</p>
						<p className="text-xs text-muted-foreground">Reviews</p>
					</div>
					<div className="rounded-lg border border-border bg-secondary/50 p-4 text-center">
						<p className="text-2xl font-bold text-foreground">
							{dataStats.lists}
						</p>
						<p className="text-xs text-muted-foreground">Lists</p>
					</div>
					<div className="rounded-lg border border-border bg-secondary/50 p-4 text-center">
						<p className="text-2xl font-bold text-foreground">
							{dataStats.notes}
						</p>
						<p className="text-xs text-muted-foreground">Notes</p>
					</div>
				</div>
				<div className="mt-4 flex items-center justify-between rounded-lg bg-secondary p-4">
					<div>
						<p className="text-sm font-medium text-foreground">
							Total Data Size
						</p>
						<p className="text-xs text-muted-foreground">
							All your books, reviews, and activity
						</p>
					</div>
					<Badge variant="outline" className="border-border text-foreground">
						{dataStats.totalSize}
					</Badge>
				</div>
			</SettingCard>

			<SettingCard
				title="Export Data"
				description="Download a copy of all your data."
			>
				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<div className="flex-1">
							<label
								htmlFor="export-format"
								className="text-sm font-medium text-foreground"
							>
								Export Format
							</label>
							<Select
								value={exportFormat}
								onValueChange={(val) => setExportFormat(val as string)}
							>
								<SelectTrigger
									id="export-format"
									className="mt-2 bg-secondary text-foreground"
								>
									<SelectValue />
								</SelectTrigger>
								<SelectContent className="bg-popover">
									<SelectItem value="json">
										<div className="flex items-center gap-2">
											<FileTextIcon className="h-4 w-4 text-popover-foreground" />
											<span className="text-popover-foreground">
												JSON (Recommended)
											</span>
										</div>
									</SelectItem>
									<SelectItem value="csv">
										<div className="flex items-center gap-2">
											<FileTextIcon className="h-4 w-4 text-popover-foreground" />
											<span className="text-popover-foreground">CSV</span>
										</div>
									</SelectItem>
									<SelectItem value="zip">
										<div className="flex items-center gap-2">
											<FileZipIcon className="h-4 w-4 text-popover-foreground" />
											<span className="text-popover-foreground">
												ZIP Archive
											</span>
										</div>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="space-y-2">
						<p className="text-sm font-medium text-foreground">
							Include in Export:
						</p>
						<div className="space-y-2">
							<SettingRow
								label="Reading History"
								description="All books you've read"
							>
								<Switch defaultChecked />
							</SettingRow>
							<SettingRow
								label="Reviews & Ratings"
								description="Your book reviews"
							>
								<Switch defaultChecked />
							</SettingRow>
							<SettingRow
								label="Reading Lists"
								description="Custom lists you've created"
							>
								<Switch defaultChecked />
							</SettingRow>
							<SettingRow
								label="Notes & Highlights"
								description="Book annotations"
							>
								<Switch defaultChecked />
							</SettingRow>
							<SettingRow
								label="Social Connections"
								description="Followers and following"
							>
								<Switch />
							</SettingRow>
						</div>
					</div>

					<Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
						<DownloadSimpleIcon className="h-5 w-5" />
						Export My Data
					</Button>
				</div>
			</SettingCard>

			<SettingCard
				title="Previous Exports"
				description="Download your past data exports."
			>
				<div className="space-y-3">
					<div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
								<FileZipIcon className="h-5 w-5 text-primary" />
							</div>
							<div>
								<p className="text-sm font-medium text-foreground">
									bookshelf_export_dec_2024.zip
								</p>
								<p className="text-xs text-muted-foreground">
									<ClockIcon className="mr-1 inline h-3 w-3" />
									Created Dec 1, 2024 • 18.2 MB
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Badge className="gap-1 bg-primary/20 text-primary">
								<CheckCircleIcon className="h-3 w-3" weight="fill" />
								Ready
							</Badge>
							<Button variant="ghost" size="sm" className="text-primary">
								<DownloadSimpleIcon className="h-4 w-4" />
							</Button>
						</div>
					</div>
					<div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
								<FileZipIcon className="h-5 w-5 text-muted-foreground" />
							</div>
							<div>
								<p className="text-sm font-medium text-foreground">
									bookshelf_export_nov_2024.zip
								</p>
								<p className="text-xs text-muted-foreground">
									<ClockIcon className="mr-1 inline h-3 w-3" />
									Created Nov 15, 2024 • 16.8 MB
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Badge
								variant="outline"
								className="border-border text-muted-foreground"
							>
								Expired
							</Badge>
							<Button
								variant="ghost"
								size="sm"
								disabled
								className="text-muted-foreground"
							>
								<DownloadSimpleIcon className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
				<p className="mt-3 text-xs text-muted-foreground">
					Export files are available for 30 days after creation.
				</p>
			</SettingCard>

			<SettingCard
				title="Import Data"
				description="Import data from other platforms."
			>
				<div className="space-y-4">
					<div className="rounded-lg border-2 border-dashed border-border bg-secondary/30 p-8 text-center">
						<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
							<ArrowClockwiseIcon className="h-6 w-6 text-muted-foreground" />
						</div>
						<p className="text-sm font-medium text-foreground">
							Drop your export file here
						</p>
						<p className="mt-1 text-xs text-muted-foreground">
							Supports JSON, CSV from Goodreads, LibraryThing, and more
						</p>
						<Button variant="secondary" size="sm" className="mt-4">
							Choose File
						</Button>
					</div>
				</div>
			</SettingCard>

			<SettingCard
				title="Clear Data"
				description="Remove specific types of data from your account."
				className="border-destructive/30"
			>
				<div className="space-y-3">
					<div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
						<div>
							<p className="text-sm font-medium text-foreground">
								Clear Reading History
							</p>
							<p className="text-xs text-muted-foreground">
								Remove all books marked as read
							</p>
						</div>
						<Dialog>
							<DialogTrigger
								render={
									<Button
										variant="ghost"
										size="sm"
										className="text-destructive hover:text-destructive"
									>
										Clear
									</Button>
								}
							/>

							<DialogContent className="bg-card">
								<DialogHeader>
									<DialogTitle className="text-card-foreground">
										Clear Reading History?
									</DialogTitle>
									<DialogDescription>
										This will remove all books from your reading history. Your
										reviews and ratings will be preserved.
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<Button variant="ghost" className="text-muted-foreground">
										Cancel
									</Button>
									<Button variant="destructive">Clear History</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
					<div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
						<div>
							<p className="text-sm font-medium text-foreground">
								Clear All Reviews
							</p>
							<p className="text-xs text-muted-foreground">
								Delete all your reviews and ratings
							</p>
						</div>
						<Button
							variant="ghost"
							size="sm"
							className="text-destructive hover:text-destructive"
						>
							Clear
						</Button>
					</div>
					<div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
						<div>
							<p className="text-sm font-medium text-foreground">
								Clear Notes & Highlights
							</p>
							<p className="text-xs text-muted-foreground">
								Remove all your book annotations
							</p>
						</div>
						<Button
							variant="ghost"
							size="sm"
							className="text-destructive hover:text-destructive"
						>
							Clear
						</Button>
					</div>
				</div>
			</SettingCard>

			<SettingCard
				title="Delete Everything"
				description="Permanently delete your entire account."
				className="border-destructive/30"
			>
				<div className="flex items-center gap-4 rounded-lg bg-destructive/10 p-4">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20">
						<WarningIcon className="h-6 w-6 text-destructive" weight="fill" />
					</div>
					<div className="flex-1">
						<p className="text-sm font-medium text-foreground">
							This action is irreversible
						</p>
						<p className="text-xs text-muted-foreground">
							All your data, reviews, reading lists, and social connections will
							be permanently deleted.
						</p>
					</div>
					<Dialog>
						<DialogTrigger
							render={
								<Button variant="destructive" size="sm">
									<TrashIcon className="mr-2 h-4 w-4" />
									Delete Account
								</Button>
							}
						/>
						<DialogContent className="bg-card">
							<DialogHeader>
								<DialogTitle className="text-card-foreground">
									Delete Your Account?
								</DialogTitle>
								<DialogDescription>
									This will permanently delete your account and all associated
									data. This action cannot be undone.
								</DialogDescription>
							</DialogHeader>
							<div className="my-4 space-y-2">
								<p className="text-sm text-muted-foreground">
									Type{" "}
									<strong className="text-foreground">delete my account</strong>{" "}
									to confirm:
								</p>
								<input
									type="text"
									placeholder="delete my account"
									className="w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
								/>
							</div>
							<DialogFooter>
								<Button variant="ghost" className="text-muted-foreground">
									Cancel
								</Button>
								<Button variant="destructive">Permanently Delete</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</SettingCard>
		</SectionWrapper>
	);
}
