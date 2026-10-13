import type { FAQItem } from "@/lib/seo/jsonld/faq";
import { cn } from "@/lib/utils";

interface FaqSectionProps {
  items: FAQItem[];
  className?: string;
}

/**
 * Visible FAQ list. Render it from the same array passed to getFAQSchema so the
 * FAQPage structured data always matches what users see on the page.
 */
export function FaqSection({ items, className }: FaqSectionProps) {
  return (
    <section id="faqs" className={cn("mt-12", className)}>
      <h2 className="text-2xl font-semibold tracking-tight mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {items.map((faq) => (
          <div key={faq.question} className="rounded-lg border p-5">
            <h3 className="text-base font-semibold mb-2">{faq.question}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
