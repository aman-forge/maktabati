import { Separator } from "@shadcn/separator";
import { createFileRoute } from "@tanstack/react-router";
import { BookDescription } from "@/features/book/components/book-description";
import { BookReviews } from "@/features/book/components/book-reviews";
import { AuthorCard } from "@/features/books/components/author-card";
import { BookHero } from "@/features/books/components/book-hero";
//import { TrackBookModal } from "@/features/books/components/track-book-modal";
import { WriteReview } from "@/features/books/components/write-review";
import { getBookById } from "@/features/books/server/get-books";
import { BookCarousel } from "@/features/marketing/components/book-carousel";
// import { BookEditions } from "@/features/books/components/book-editions";

export const Route = createFileRoute("/_main/book/$id")({
  component: RouteComponent,
  loader: ({ params }) => getBookById({ data: params.id }),
});

function RouteComponent() {
  const book = Route.useLoaderData();

  return (
    <main className="min-h-screen font-sans" style={{ backgroundColor: "var(--background)" }}>
      {/*TODO: REMOVE - FOR TESTING ONLY!*/}
      {book.title}

      {/* Hero: cover, title, rating, meta */}
      <BookHero />

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="grid lg:grid-cols-[1fr_340px] gap-14">
          {/* Left column: description, reviews, write-review */}
          <div className="flex flex-col gap-12 min-w-0">
            <BookDescription
              paragraphs={`على مدار ألف سنة، تساقط الرماد ولم تتفتح أي زهور. استعبدت طائفة (السكا) فذاقت البؤس وعاشت في خوف على مدار ألف سنة، فرض اللورد الحاكم (عين الخلود حكمه بقوة ورعب مطلقين بحيث بات من المستحيل قهره. بعد ذلك. عندما ضاع الأمل لأزمان طويلة حتى فجي تمامًا من الذاكرة، اكتشف كيلسير، نصف السكا) المنكوب محطم القلب، في نفسه قوى وليدي الضباب خلال حبسه في غياهب سجن اللورد الحاكم الجحيمي.

              لقد كان كيلسير لها عبقريا وزعيمًا بالفطرة؛ لذا عمل على تجنيد نخبة عالم الإجرام. أذكى الألومانسيين وأكثرهم جدارة بالثقة، ممن يشترك كل واحد منهم معه في إحدى قواه العديدة ويستمتعون بخوض التحديات شديدة الخطورة، عندها فقط يكشف كيلسير عن حلمه الأكبر ليست فقط أكبر عملية سرقة في التاريخ، ولكن سقوط الطاغية الإلهي.

              ولكن حتى مع حشد أفضل عصابة إجرامية على الإطلاق، ما تزال خطة كيلسير تبدو خلقا بعيد المنال، حتى يُوقعه الحظ في فتاة مستضعفة تدعى فين. إنها مثله. يتيمة ونصف (سكا)، لكنها عاشت حياة أقسى بكثير. لقد تعلمت فين أن تتوقع الخيانة من كل شخص تصادفه. سيتعين عليها أن تتعلم الثقة إذا أرادت أن يساعدها كيلسير على إتقان استخدام قواها التي لم تحلم بها قط.

              يجرؤ براندون ساندرسون، أحد أعظم كتاب روايات الفانتازيا في العالم، على قلب هذه النوعية الأدبية رأسا على عقب عبر طرح سؤال بسيط: ماذا لو فشل بطل النبوءة المنتظر في هزيمة سيد الظلام؟ ستجد الإجابة في ثلاثية (وليدو الضباب). وهي ملحمة مليئة بالمفاجآت تبدأ بالكتاب الذي بين يديك. حيث لن تعود الفانتازيا كما كانت من قبل.
`}
              tags={["رواية", "تشويق"]}
            />
            <Separator style={{ backgroundColor: "var(--border)" }} />
            <WriteReview />
            <Separator style={{ backgroundColor: "var(--border)" }} />
            <BookReviews />
          </div>

          {/* Right sidebar: editions, author, activity */}
          <aside className="flex flex-col gap-10">
            {/* <BookEditions /> */}
            <AuthorCard />
            {/*<TrackBookModal />*/}
          </aside>
        </div>
      </div>
      {/* You might also like */}
      <div className="py-14 border-t" style={{ borderColor: "var(--border)" }}>
        <BookCarousel
          title="Readers Also Enjoyed"
          subtitle="Books loved by fans of The Ember Court"
          books={[]}
          accentColor="var(--badge-amber)"
          viewAllHref="#"
        />
      </div>
    </main>
  );
}
