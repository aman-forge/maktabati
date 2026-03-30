import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import {
	Books,
	DownloadSimple,
	Headphones,
	ShoppingCart,
} from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "@/ui/lib/utils";

interface Edition {
	id: string;
	type: string;
	publisher: string;
	price: string;
	badge?: string;
	icon: React.ElementType;
	details: string;
}

const EDITIONS: Edition[] = [
	{
		id: "ember-hardcover",
		type: "غلاف صلب — الطبعة الأولى",
		publisher: "إمبر برس",
		price: "$28.99",
		badge: "الأصلي",
		icon: ShoppingCart,
		details: "598 صفحة · طبعة أولى · نسخ موقّعة متاحة",
	},
	{
		id: "tor-hardcover",
		type: "غلاف صلب — الطبعة الأمريكية",
		publisher: "Tor Books",
		price: "$26.99",
		icon: ShoppingCart,
		details: "598 صفحة · توزيع أمريكي واسع",
	},
	{
		id: "orbit-paperback",
		type: "غلاف ورقي",
		publisher: "Orbit Books",
		price: "$16.99",
		icon: Books,
		details: "598 صفحة · طبعة سوق شعبية",
	},
	{
		id: "kindle-ebook",
		type: "كتاب إلكتروني",
		publisher: "Kindle Direct",
		price: "$9.99",
		icon: DownloadSimple,
		details: "تنزيل فوري · خالٍ من DRM · EPUB & PDF",
	},
	{
		id: "audible-audio",
		type: "كتاب صوتي",
		publisher: "Audible Studios",
		price: "$19.99",
		badge: "جديد",
		icon: Headphones,
		details: "22 ساعة 40 دقيقة · تأليف صوتي بقلم إيلا كروفورد",
	},
] as const;

export function BookEditions() {
	const [selected, setSelected] = useState("ember-hardcover");

	return (
		<section dir="rtl" className="flex flex-col gap-4">
			<h2
				className="text-xl font-bold text-foreground"
				style={{ fontFamily: "var(--font-display)" }}
			>
				الطبعات والإصدارات
			</h2>

			<div className="flex flex-col gap-2.5">
				{EDITIONS.map(
					({ id, type, publisher, price, badge, icon: Icon, details }) => {
						const isSelected = selected === id;
						return (
							<button
								key={id}
								type="button"
								onClick={() => setSelected(id)}
								className={cn(
									"group flex items-center gap-4 rounded-xl px-4 py-3.5 text-right transition-all border",
									isSelected
										? "border-primary bg-primary/8 shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]"
										: "border-border bg-card hover:border-border/70",
								)}
								aria-pressed={isSelected}
							>
								{/* Icon bubble */}
								<div
									className={cn(
										"w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
										isSelected
											? "bg-primary text-primary-foreground"
											: "bg-secondary text-muted-foreground",
									)}
								>
									<Icon weight="bold" className="w-5 h-5" />
								</div>

								{/* Text */}
								<div className="flex flex-col gap-0.5 flex-1 min-w-0 text-right">
									<div className="flex items-center gap-2">
										<span className="text-sm font-semibold text-foreground">
											{type}
										</span>
										{badge && (
											<Badge className="text-[10px] px-2 py-0 font-medium bg-primary text-primary-foreground border-0">
												{badge}
											</Badge>
										)}
									</div>
									<p className="text-xs text-muted-foreground/80 font-medium">
										{publisher}
									</p>
									<p className="text-xs text-muted-foreground truncate">
										{details}
									</p>
								</div>

								{/* Price */}
								<span
									className={cn(
										"text-base font-bold shrink-0 tabular-nums",
										isSelected ? "text-primary" : "text-foreground",
									)}
								>
									{price}
								</span>
							</button>
						);
					},
				)}
			</div>

			<Button className="w-full gap-2 rounded-xl font-semibold mt-1 bg-primary text-primary-foreground hover:bg-primary/90">
				<ShoppingCart weight="bold" className="w-4 h-4" />
				أضف إلى السلة
			</Button>
		</section>
	);
}
