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
    <section className="rounded-2xl overflow-hidden bg-card border border-border">
      <div className="px-5 py-3.5 border-b border-border bg-secondary flex items-center gap-2">
        {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground" />}
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
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
          <div className="px-5 py-4 flex flex-col gap-0">
            {details.map(({ label, value }, i) => (
              <div key={label}>
                <div className="flex items-start justify-between gap-4 py-2.5">
                  <span className="text-xs text-muted-foreground shrink-0 flex-1">{label}</span>
                  <span className="text-xs font-medium text-foreground text-start flex-1">
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
          <div className="px-5 py-4 flex flex-col gap-0">
            {otherEditions.map(({ format, detail, publisher }, i) => (
              <div key={format}>
                <div className="flex items-center justify-between gap-4 py-2.5 group cursor-pointer">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-semibold text-foreground">{format}</p>
                    <p className="text-xs text-muted-foreground">{detail}</p>
                    <p className="text-[11px] text-muted-foreground/60">{publisher}</p>
                  </div>
                  <ArrowSquareOutIcon className="w-3.5 h-3.5 shrink-0 text-primary opacity-0 group-hover:opacity-70 transition-opacity" />
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
