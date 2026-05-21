import { BellIcon, BooksIcon, CaretLeftIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
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
    <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground gap-2"
          >
            <CaretLeftIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Bookshelf</span>
          </Button>
          <div className="hidden items-center gap-2 md:flex">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <BooksIcon className="text-primary-foreground h-5 w-5" weight="fill" />
            </div>
            <span className="text-foreground text-lg font-semibold tracking-tight">Bookshelf</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <MagnifyingGlassIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search settings..."
              className="bg-secondary placeholder:text-muted-foreground focus-visible:ring-primary w-64 pl-9 text-sm"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground relative"
          >
            <BellIcon className="h-5 w-5" />
            <span className="bg-primary absolute top-1.5 right-1.5 h-2 w-2 rounded-full" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="border-border h-9 w-9 border">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              }
            />

            <DropdownMenuContent className="bg-popover w-56" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="text-popover-foreground font-medium">Jane Doe</p>
                  <p className="text-muted-foreground text-xs">jane@example.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-popover-foreground">My Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-popover-foreground">My Books</DropdownMenuItem>
              <DropdownMenuItem className="text-popover-foreground">Reading Lists</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
