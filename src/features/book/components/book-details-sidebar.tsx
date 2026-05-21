import { Separator } from "@components/ui/separator";
import { ArrowSquareOutIcon, BookOpenIcon } from "@phosphor-icons/react/dist/ssr";

// ── Reusable card shell ──────────────────────────────────────────────────────
function SidebarCard({
  icon: Icon,
  title,
  children,
}: {
  icon?: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-card border-border overflow-hidden rounded-2xl border">
      <div className="border-border bg-secondary flex items-center gap-2 border-b px-5 py-3.5">
        {Icon && <Icon className="text-muted-foreground h-3.5 w-3.5" />}
        <h2 className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

interface MetaField {
  label: string;
  value: string;
}

interface Edition {
  format: string;
  detail: string;
  publisher: string;
}

interface BookDetailsSidebarProps {
  details?: MetaField[];
  otherEditions?: Edition[];
}

export function BookDetailsSidebar({ details = [], otherEditions = [] }: BookDetailsSidebarProps) {
  return (
    <aside dir="rtl" className="flex flex-col gap-7">
      {/* Book Details */}
      {details.length > 0 && (
        <SidebarCard title="تفاصيل الكتاب">
          <div className="flex flex-col gap-0 px-5 py-4">
            {details.map(({ label, value }, i) => (
              <div key={label}>
                <div className="flex items-start justify-between gap-4 py-2.5">
                  <span className="text-muted-foreground flex-1 shrink-0 text-xs">{label}</span>
                  <span className="text-foreground flex-1 text-start text-xs font-medium">
                    {value}
                  </span>
                </div>
                {i < details.length - 1 && <Separator className="bg-border opacity-50" />}
              </div>
            ))}
          </div>
        </SidebarCard>
      )}

      {/* Other Editions */}
      {otherEditions.length > 0 && (
        <SidebarCard icon={BookOpenIcon} title="طبعات أخرى">
          <div className="flex flex-col gap-0 px-5 py-4">
            {otherEditions.map(({ format, detail, publisher }, i) => (
              <div key={format}>
                <div className="group flex cursor-pointer items-center justify-between gap-4 py-2.5">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-foreground text-xs font-semibold">{format}</p>
                    <p className="text-muted-foreground text-xs">{detail}</p>
                    <p className="text-muted-foreground/60 text-[11px]">{publisher}</p>
                  </div>
                  <ArrowSquareOutIcon className="text-primary h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-70" />
                </div>
                {i < otherEditions.length - 1 && <Separator className="bg-border opacity-50" />}
              </div>
            ))}
          </div>
        </SidebarCard>
      )}
    </aside>
  );
}
