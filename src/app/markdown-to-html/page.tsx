import { getPageMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/jsonld/breadcrumb";
import { getFAQSchema, type FAQItem } from "@/lib/seo/jsonld/faq";
import { FaqSection } from "@/components/seo/FaqSection";
import { MarkdownToHtmlClient } from "./client";

export const metadata = getPageMetadata({
  title: "Markdown to HTML Converter - Free Online Tool",
  description:
    "Convert markdown to clean, sanitized HTML instantly. Live preview, GFM support, and one-click download. Free, no signup required.",
  path: "/markdown-to-html",
  keywords:
    "markdown to html, convert markdown to html, markdown html converter, md to html, markdown to html online",
});

const FAQS: FAQItem[] = [
  {
    question: "How do I convert markdown to HTML?",
    answer:
      "Paste or type your markdown in the input panel and the equivalent HTML is generated instantly. You can copy the HTML output to your clipboard or download it as an .html file.",
  },
  {
    question: "What is HTML sanitization and why does it matter?",
    answer:
      "Sanitization removes potentially dangerous HTML tags and attributes like script tags and event handlers. This prevents cross-site scripting (XSS) attacks when you embed the generated HTML in a website or application.",
  },
  {
    question: "What is GFM mode in the converter?",
    answer:
      "GFM mode enables GitHub Flavored Markdown extensions including tables, task lists, strikethrough, and fenced code blocks. Toggle it on to parse markdown the same way GitHub does.",
  },
  {
    question: "Can I download the converted HTML output?",
    answer:
      "Yes. After converting your markdown, you can download the generated HTML as a standalone file. You can also copy the raw HTML directly to your clipboard for use in web projects or email templates.",
  },
];

export default function MarkdownToHtmlPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Markdown Tools", url: "/markdown-tools" },
    { name: "Markdown to HTML", url: "/markdown-to-html" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Markdown to HTML Converter",
    url: "https://kolavistudio.com/markdown-to-html",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Convert markdown to clean, sanitized HTML with live preview and GitHub Flavored Markdown support.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(appSchema),
        }}
      />
      <MarkdownToHtmlClient />
      <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <FaqSection items={FAQS} />
      </div>
    </>
  );
}
