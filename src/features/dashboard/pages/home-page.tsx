import {
  BookIcon,
  BookOpenIcon,
  CalendarIcon,
  CaretRightIcon,
  PenIcon,
  TargetIcon,
} from "@phosphor-icons/react";
import { Button } from "@shadcn/button";
import { Skeleton } from "@shadcn/skeleton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useMemo, type ReactNode } from "react";

import { useUser } from "@/features/auth/use-user";
import { useBookTracking } from "@/features/books/context/book-tracking-context";
import { getUserBooks } from "@/features/books/server/library";
import type { BookCardType } from "@/features/books/types";
import { ReadingProgress } from "@/ui/components/book/book-card-parts";

const LIBRARY_BOOKS_STALE_TIME = 60_000;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardHome() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl p-4">
      {/* Mobile */}
      <div className="space-y-6 lg:hidden">
        <CurrentlyReadingPanel />

        <ReadingSummaryPanel />

        <UnavailablePanel
          title="الأهداف"
          subtitle="تقدم القراءة السنوي"
          message="سيظهر تقدم أهداف القراءة هنا بعد ربط نموذج الأهداف ببيانات الحساب."
        />

        <UnavailablePanel
          title="النشاط"
          subtitle="الموجز الاجتماعي"
          message="لا نعرض نشاطاً اجتماعياً تجريبياً. سيظهر هذا القسم عند توفر بيانات متابعة ونشاط حقيقية."
        />
      </div>

      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-[1.7fr_1fr] lg:gap-6">
        {/* First column */}
        <div className="space-y-6">
          <CurrentlyReadingPanel />

          <UnavailablePanel
            title="النشاط"
            subtitle="الموجز الاجتماعي"
            message="لا نعرض نشاطاً اجتماعياً تجريبياً. سيظهر هذا القسم عند توفر بيانات متابعة ونشاط حقيقية."
          />
        </div>

        {/* Second column */}
        <div className="space-y-6">
          <ReadingSummaryPanel />

          <UnavailablePanel
            title="سلسلة القراءة"
            subtitle="جلسات القراءة"
            message="سلاسل القراءة تحتاج إلى جلسات قراءة محفوظة قبل عرض أي أرقام أو أيام متتالية."
          />

          <UnavailablePanel
            title="الأهداف"
            subtitle="تقدم القراءة السنوي"
            message="سيظهر تقدم أهداف القراءة هنا بعد ربط نموذج الأهداف ببيانات الحساب."
          />
        </div>
      </div>
    </main>
  );
}

// ─── Panel wrapper ────────────────────────────────────────────────────────────

function PanelCard({
  title,
  subtitle,
  actionLabel,
  actionHref,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={["rounded-2xl border bg-card p-5 shadow-sm", className ?? ""].join(" ")}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="text-muted-foreground mt-0.5 text-sm">{subtitle}</p>}
        </div>
        {actionLabel && actionHref && (
          <Link
            to={actionHref}
            className="text-muted-foreground hover:text-foreground inline-flex shrink-0 items-center gap-1 text-xs transition-colors"
          >
            {actionLabel}
            <CaretRightIcon weight="bold" className="h-3 w-3 rotate-180" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

// ─── Currently reading ────────────────────────────────────────────────────────

function CurrentlyReadingPanel() {
  const { user, isLoading: isUserLoading } = useUser();
  const libraryBooksQuery = useQuery({
    queryKey: ["library-books", user?.id],
    queryFn: () => getUserBooks(),
    enabled: !!user?.id,
    placeholderData: keepPreviousData,
    staleTime: LIBRARY_BOOKS_STALE_TIME,
  });
  const libraryBooks = libraryBooksQuery.data;

  const currentlyReading = useMemo(
    () => (libraryBooks ?? []).filter((book) => book.status === "currently_reading").slice(0, 4),
    [libraryBooks],
  );
  const isResolving = isUserLoading || (!!user?.id && libraryBooksQuery.isPending && !libraryBooks);
  const subtitle = isResolving
    ? "نرتب كتبك الحالية"
    : currentlyReading.length > 0
      ? `${currentlyReading.length} كتب تقرأها الآن`
      : "لا توجد كتب قيد القراءة";

  return (
    <PanelCard title="قيد القراءة" subtitle={subtitle} actionLabel="مكتبتي" actionHref="/library">
      {isResolving ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <ReadingCardSkeleton key={i.toString()} />
          ))}
        </div>
      ) : currentlyReading.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {currentlyReading.map((book) => (
            <ReadingCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <CurrentlyReadingEmpty />
      )}
    </PanelCard>
  );
}

function ReadingCard({ book }: { book: BookCardType }) {
  const { openTrackModal } = useBookTracking();
  const startedAt = formatStartedAt(book.startedAt);

  return (
    <article className="group bg-background hover:border-border/80 relative overflow-hidden rounded-xl border p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex gap-3">
        <Link to="/book/$id" params={{ id: book.id }} className="shrink-0">
          <img
            src={book.coverImageUrl ?? "/books/book.jpg"}
            alt={`غلاف ${book.title}`}
            loading="lazy"
            decoding="async"
            className="bg-muted aspect-2/3 h-auto w-16 rounded-lg object-cover shadow-sm"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <Link to="/book/$id" params={{ id: book.id }}>
              <h3 className="truncate text-sm leading-snug font-semibold transition-colors hover:underline">
                {book.title}
              </h3>
            </Link>
            {book.primaryAuthor ? (
              <Link to="/author/$id" params={{ id: book.primaryAuthor.id }}>
                <p className="text-muted-foreground hover:text-foreground mt-0.5 truncate text-xs transition-colors hover:underline">
                  {book.primaryAuthor.name}
                </p>
              </Link>
            ) : (
              <p className="text-muted-foreground hover:text-foreground mt-0.5 text-xs transition-colors hover:underline">
                مجهول
              </p>
            )}
          </div>
          {/* Reading progress */}
          {book.status === "currently_reading" &&
            (book.pageCount ? (
              <ReadingProgress
                className="mt-auto"
                progress={((book.pageProgress ?? 0) / book.pageCount) * 100}
                showLabel={false}
              />
            ) : (
              <ReadingProgress className="mt-auto" unknown progress={100} showLabel={false} />
            ))}

          <div className="mt-2 flex w-full items-end gap-2">
            <div className="min-w-0 flex-1 space-y-1">
              <div className="relative top-1 flex flex-wrap items-center gap-1.5">
                {book.pageCount && (
                  <span className="bg-muted/50 text-muted-foreground flex items-center gap-1 rounded-md px-2 py-1 text-[11px]">
                    <BookIcon />
                    {book.pageCount}
                  </span>
                )}
                {book.publicationYear && (
                  <span className="bg-muted/50 text-muted-foreground flex items-center gap-1 rounded-md px-2 py-1 text-[11px] tabular-nums">
                    <CalendarIcon />
                    {book.publicationYear}
                  </span>
                )}
              </div>
              {startedAt && (
                <p className="text-muted-foreground bg-accent/50 absolute top-2 left-2 truncate rounded-full px-1.5 py-0.5 text-[11px]">
                  بدأت القراءة {startedAt}
                </p>
              )}
            </div>

            <div className="mt-1 flex justify-end">
              <Button
                type="button"
                variant="secondary"
                size="xs"
                className="gap-1 px-2 text-xs"
                onClick={() => openTrackModal(book)}
              >
                <PenIcon weight="regular" className="h-3 w-3 rotate-0" />
                تحديث
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ReadingCardSkeleton() {
  return (
    <div className="bg-background flex gap-3 rounded-xl border p-3">
      <Skeleton className="aspect-2/3 w-16 shrink-0 rounded-lg" />
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-4/5 rounded-md" />
          <Skeleton className="h-3 w-2/5 rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-32 rounded-md" />
          <Skeleton className="h-3 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function CurrentlyReadingEmpty() {
  return (
    <div className="bg-background flex flex-col items-center rounded-xl border border-dashed px-4 py-8 text-center">
      <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
        <BookOpenIcon weight="duotone" className="size-5" />
      </div>
      <p className="text-sm font-medium">لا يوجد كتاب قيد القراءة الآن</p>
      <p className="text-muted-foreground mt-1 max-w-xs text-xs leading-relaxed">
        اختر حالة «قيد القراءة» من بطاقة أي كتاب ليظهر هنا في لوحة التحكم.
      </p>
      <Button variant="outline" size="sm" className="mt-4" render={<Link to="/discover/books" />}>
        استكشف الكتب
      </Button>
    </div>
  );
}

function formatStartedAt(value?: string | null) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("ar", {
    month: "long",
    day: "numeric",
  }).format(date);
}

// ─── Real library summary ─────────────────────────────────────────────────────

function ReadingSummaryPanel() {
  const { user, isLoading: isUserLoading } = useUser();
  const libraryBooksQuery = useQuery({
    queryKey: ["library-books", user?.id],
    queryFn: () => getUserBooks(),
    enabled: !!user?.id,
    placeholderData: keepPreviousData,
    staleTime: LIBRARY_BOOKS_STALE_TIME,
  });
  const books = libraryBooksQuery.data;
  const isResolving = isUserLoading || (!!user?.id && libraryBooksQuery.isPending && !books);

  const summary = useMemo(() => {
    const tracked = books ?? [];

    return {
      total: tracked.length,
      reading: tracked.filter((book) => book.status === "currently_reading").length,
      completed: tracked.filter((book) => book.status === "completed").length,
      wantToRead: tracked.filter((book) => book.status === "want_to_read").length,
    };
  }, [books]);

  return (
    <PanelCard title="ملخص مكتبتي" subtitle="أرقام من بيانات كتبك المحفوظة">
      {isResolving ? (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i.toString()} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : summary.total > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          <SummaryTile label="كل الكتب" value={summary.total} />
          <SummaryTile label="قيد القراءة" value={summary.reading} />
          <SummaryTile label="مكتملة" value={summary.completed} />
          <SummaryTile label="أريد قراءتها" value={summary.wantToRead} />
        </div>
      ) : (
        <DashboardEmptyState
          message="ابدأ بتتبع كتاب واحد على الأقل لتظهر إحصاءات مكتبتك هنا."
          actionLabel="استكشف الكتب"
          actionHref="/discover/books"
        />
      )}
    </PanelCard>
  );
}

function SummaryTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-background rounded-xl border p-3">
      <p className="text-2xl font-semibold tracking-tight tabular-nums">
        {value.toLocaleString("ar")}
      </p>
      <p className="text-muted-foreground mt-1 text-xs">{label}</p>
    </div>
  );
}

function UnavailablePanel({
  title,
  subtitle,
  message,
}: {
  title: string;
  subtitle: string;
  message: string;
}) {
  return (
    <PanelCard title={title} subtitle={subtitle}>
      <DashboardEmptyState message={message} />
    </PanelCard>
  );
}

function DashboardEmptyState({
  message,
  actionLabel,
  actionHref,
}: {
  message: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="bg-background flex flex-col items-center rounded-xl border border-dashed px-4 py-8 text-center">
      <div className="bg-primary/10 text-primary mb-3 flex size-10 items-center justify-center rounded-xl">
        <TargetIcon weight="duotone" className="size-5" />
      </div>
      <p className="text-muted-foreground max-w-sm text-xs leading-relaxed">{message}</p>
      {actionLabel && actionHref && (
        <Button variant="outline" size="sm" className="mt-4" render={<Link to={actionHref} />}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
