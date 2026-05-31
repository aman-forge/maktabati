import type { AuthorType } from "@features/author/server/get-author";
import { MedalIcon, TrophyIcon } from "@phosphor-icons/react";

export function AuthorSidebar({ author: _author }: { author: AuthorType }) {
  return (
    <div className="flex flex-col gap-4" dir="rtl">
      <SidebarCard title="الجوائز">
        <div className="flex items-start gap-3">
          <TrophyIcon weight="duotone" className="text-muted-foreground mt-0.5 size-4 shrink-0" />
          <p className="text-muted-foreground text-xs leading-relaxed">
            الجوائز ستظهر هنا عندما تكون محفوظة في نموذج بيانات المؤلف.
          </p>
        </div>
      </SidebarCard>

      <SidebarCard title="أصدقاء يقرؤون له">
        <div className="flex items-start gap-3">
          <MedalIcon weight="duotone" className="text-muted-foreground mt-0.5 size-4 shrink-0" />
          <p className="text-muted-foreground text-xs leading-relaxed">
            لن نعرض أصدقاء أو قراءات اجتماعية قبل وجود بيانات متابعة حقيقية.
          </p>
        </div>
      </SidebarCard>

      <SidebarCard title="الأكثر قراءة في">
        <div className="flex items-start gap-3">
          <MedalIcon weight="duotone" className="text-muted-foreground mt-0.5 size-4 shrink-0" />
          <p className="text-muted-foreground text-xs leading-relaxed">
            الترتيب يحتاج إلى تجميعات قراءة حقيقية قبل عرضه.
          </p>
        </div>
      </SidebarCard>
    </div>
  );
}

function SidebarCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-border bg-card rounded-xl border p-4">
      <p className="text-muted-foreground mb-3 text-[11px] font-medium tracking-wide uppercase">
        {title}
      </p>
      {children}
    </div>
  );
}
