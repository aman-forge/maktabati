"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";

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
    <section
      className="rounded-2xl p-6"
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      <h2
        className="text-lg font-bold mb-5"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--foreground)",
        }}
      >
        اكتب مراجعة
      </h2>

      {/* Star picker */}
      <div className="flex flex-col gap-2 mb-5">
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          تقييمك
        </p>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              aria-label={`تقييم ${star} نجوم`}
              className="transition-transform hover:scale-110"
            >
              <Star
                className="w-7 h-7 transition-colors"
                style={{
                  fill:
                    star <= (hoverRating || rating)
                      ? "var(--primary)"
                      : "transparent",
                  color:
                    star <= (hoverRating || rating)
                      ? "var(--primary)"
                      : "var(--border)",
                }}
              />
            </button>
          ))}
          {(hoverRating || rating) > 0 && (
            <span
              className="text-sm ml-2 transition-all"
              style={{ color: "var(--muted-foreground)" }}
            >
              {LABELS[hoverRating || rating]}
            </span>
          )}
        </div>
      </div>

      {/* Text input */}
      <div className="flex flex-col gap-3">
        <Textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="ما رأيك؟ شارك أفكارك مع المجتمع..."
          rows={4}
          className="resize-none rounded-xl text-sm"
          style={{
            backgroundColor: "var(--secondary)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
        />
        <div className="flex items-center justify-between">
          <span
            className="text-xs"
            style={{
              color:
                review.length > 500
                  ? "var(--destructive)"
                  : "var(--muted-foreground)",
            }}
          >
            {review.length} / 2000
          </span>
          <Button
            size="sm"
            className="rounded-xl px-5"
            disabled={!rating || review.trim().length < 10}
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-foreground)",
              opacity: !rating || review.trim().length < 10 ? 0.5 : 1,
            }}
          >
            نشر المراجعة
          </Button>
        </div>
      </div>
    </section>
  );
}
