import {
	BellIcon,
	BooksIcon,
	CaretLeftIcon,
	MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "@shadcn/avatar";
import { Button } from "@shadcn/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@shadcn/dropdown-menu";
import { Input } from "@shadcn/input";

export function SettingsHeader() {
	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="flex h-16 items-center justify-between px-4 lg:px-8">
				<div className="flex items-center gap-4">
					<Button
						variant="ghost"
						size="sm"
						className="gap-2 text-muted-foreground hover:text-foreground"
					>
						<CaretLeftIcon className="h-4 w-4" />
						<span className="hidden sm:inline">Back to Bookshelf</span>
					</Button>
					<div className="hidden items-center gap-2 md:flex">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
							<BooksIcon
								className="h-5 w-5 text-primary-foreground"
								weight="fill"
							/>
						</div>
						<span className="text-lg font-semibold tracking-tight text-foreground">
							Bookshelf
						</span>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<div className="relative hidden md:block">
						<MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="Search settings..."
							className="w-64 bg-secondary pl-9 text-sm placeholder:text-muted-foreground focus-visible:ring-primary"
						/>
					</div>

					<Button
						variant="ghost"
						size="icon"
						className="relative text-muted-foreground hover:text-foreground"
					>
						<BellIcon className="h-5 w-5" />
						<span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger
							render={
								<Button
									variant="ghost"
									className="relative h-9 w-9 rounded-full"
								>
									<Avatar className="h-9 w-9 border border-border">
										<AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
										<AvatarFallback className="bg-secondary text-secondary-foreground">
											JD
										</AvatarFallback>
									</Avatar>
								</Button>
							}
						/>

						<DropdownMenuContent className="w-56 bg-popover" align="end">
							<div className="flex items-center justify-start gap-2 p-2">
								<div className="flex flex-col space-y-1 leading-none">
									<p className="font-medium text-popover-foreground">
										Jane Doe
									</p>
									<p className="text-xs text-muted-foreground">
										jane@example.com
									</p>
								</div>
							</div>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-popover-foreground">
								My Profile
							</DropdownMenuItem>
							<DropdownMenuItem className="text-popover-foreground">
								My Books
							</DropdownMenuItem>
							<DropdownMenuItem className="text-popover-foreground">
								Reading Lists
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-destructive">
								Sign out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
