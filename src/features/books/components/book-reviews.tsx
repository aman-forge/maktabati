// ;

// import { Badge } from "@components/ui/badge";
// import { Button } from "@components/ui/button";
// import { Separator } from "@components/ui/separator";
// import type { Review } from "@features/books/types";
// import {
//   CaretDownIcon,
//   ChatCircleIcon,
//   StarIcon,
//   ThumbsUpIcon,
// } from "@phosphor-icons/react";
// // import { useState } from "react";

// const SORT_OPTIONS = [
//   "الأكثر إعجابًا",
//   "الأحدث",
//   "الأعلى تقييمًا",
//   "النقدية",
// ] as const;

// interface BookReviewsProps {
//   reviews?: Review[];
// }

// export function BookReviews({ reviews = [] }: BookReviewsProps) {
//   const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());
//   const [sort, setSort] = useState<string>(SORT_OPTIONS[0]);
//   const [showAll, setShowAll] = useState(false);

//   const toggleLike = (id: string) => {
//     setLikedReviews((prev) => {
//       const next = new Set(prev);
//       next.has(id) ? next.delete(id) : next.add(id);
//       return next;
//     });
//   };

//   if (reviews.length === 0) return null;

//   const displayed = showAll ? reviews : reviews.slice(0, 3);

//   return (
//     <section dir="rtl" className="flex flex-col gap-6">
//       {/* Header */}
//       <div className="flex items-center justify-between gap-4 flex-wrap">
//         <h2
//           className="text-xl font-bold text-foreground"
//           style={{ fontFamily: "var(--font-display)" }}
//         >
//           مراجعات المجتمع
//         </h2>
//         {/* Sort pills */}
//         <div className="flex items-center gap-1.5 flex-wrap">
//           {SORT_OPTIONS.map((opt) => (
//             <Button
//               key={opt}
//               onClick={() => setSort(opt)}
//               variant={sort === opt ? "default" : "outline"}
//             >
//               {opt}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Reviews list */}
//       <div className="flex flex-col gap-0">
//         {displayed.map((review, i) => {
//           const isLiked = likedReviews.has(review.id);
//           return (
//             <div key={review.id}>
//               <article className="flex flex-col gap-4 py-6">
//                 {/* Reviewer header */}
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="flex items-center gap-3">
//                     <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
//                       <Image
//                         src={review.avatar}
//                         alt={review.name}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                     <div className="flex flex-col gap-0.5">
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm font-semibold text-foreground">
//                           {review.name}
//                         </span>
//                         {review.verified && (
//                           <Badge
//                             variant="secondary"
//                             className="text-[10px] px-1.5 py-0 font-medium"
//                           >
//                             موثّق
//                           </Badge>
//                         )}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="flex items-center gap-0.5">
//                           {[1, 2, 3, 4, 5].map((star) => {
//                             const filled = star - 1 < review.rating;
//                             return (
//                               <StarIcon
//                                 key={star}
//                                 weight={filled ? "fill" : "regular"}
//                                 className="w-3 h-3"
//                                 style={{
//                                   color: filled
//                                     ? "hsl(var(--primary))"
//                                     : "hsl(var(--border))",
//                                 }}
//                               />
//                             );
//                           })}
//                         </div>
//                         <span className="text-xs text-muted-foreground">
//                           {review.date}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <Badge
//                     variant="outline"
//                     className="text-[11px] px-2.5 py-0.5 rounded-full shrink-0 border-border text-muted-foreground"
//                   >
//                     {review.shelf}
//                   </Badge>
//                 </div>

//                 {/* Body */}
//                 <div className="flex flex-col gap-2 pe-13">
//                   <h3 className="text-sm font-semibold text-foreground">
//                     {review.title}
//                   </h3>
//                   <p className="text-sm leading-relaxed text-muted-foreground">
//                     {review.body}
//                   </p>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center gap-4 pe-13">
//                   <Button
//                     onClick={() => toggleLike(review.id)}
//                     variant={isLiked ? "default" : "ghost"}
//                     aria-label={`إعجاب بمراجعة ${review.name}`}
//                     aria-pressed={isLiked}
//                   >
//                     <ThumbsUpIcon
//                       weight={isLiked ? "fill" : "regular"}
//                       className="w-3.5 h-3.5"
//                     />
//                     {review.likes + (isLiked ? 1 : 0)} مفيدة
//                   </Button>
//                   <button
//                     type="button"
//                     className="flex items-center gap-1.5 text-xs text-muted-foreground transition-opacity hover:opacity-70"
//                   >
//                     <ChatCircleIcon weight="regular" className="w-3.5 h-3.5" />
//                     ردّ
//                   </button>
//                 </div>
//               </article>
//               {i < displayed.length - 1 && <Separator className="bg-border" />}
//             </div>
//           );
//         })}
//       </div>

//       {!showAll && reviews.length > 3 && (
//         <Button
//           variant="outline"
//           className="self-start gap-2 rounded-xl"
//           onClick={() => setShowAll(true)}
//         >
//           <CaretDownIcon weight="bold" className="w-4 h-4" />
//           عرض جميع المراجعات ({reviews.length - 3})
//         </Button>
//       )}
//     </section>
//   );
// }
