import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Textarea } from "@components/ui/textarea";
import { StarIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "@/ui/lib/utils";

export function WriteReview() {
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const LABELS = [
    "",
    "لم يعجبني",
    "كان عاديًا",
    "أعجبني",
    "أعجبني كثيرًا",
    "كان مذهلاً",
  ];

  return (
    <section dir="rtl" id="write-review">
      <Card className="rounded-2xl border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg" style={{ fontFamily: "var(--font-display)" }}>
            اكتب مراجعة
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">تقييمك</p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = star <= (hoverRating || rating);
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    aria-label={`تقييم ${star} نجوم`}
                    className="transition-transform hover:scale-110"
                  >
                    <StarIcon
                      weight={active ? "fill" : "regular"}
                      className={cn("w-7 h-7 transition-colors", active ? "text-primary" : "text-border")}
                    />
                  </button>
                );
              })}
              {(hoverRating || rating) > 0 && (
                <span className="text-sm mr-2 text-muted-foreground">
                  {LABELS[hoverRating || rating]}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="ما رأيك؟ شارك أفكارك مع المجتمع..."
              rows={4}
              className="resize-none rounded-xl text-sm bg-secondary"
            />
            <div className="flex items-center justify-between">
              <span className={cn("text-xs", review.length > 500 ? "text-destructive" : "text-muted-foreground")}>
                {review.length} / 2000
              </span>
              <Button size="sm" className="rounded-xl px-5" disabled={!rating || review.trim().length < 10}>
                نشر المراجعة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
