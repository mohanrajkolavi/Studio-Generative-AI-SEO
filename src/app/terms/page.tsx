import { getPageMetadata } from "@/lib/seo/metadata";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata = getPageMetadata({
  title: "Terms of Service",
  description: "Read the terms and conditions governing your use of Kolavi Studio's website, free tools, and digital marketing services.",
  path: "/terms",
  keywords: "terms of service, terms and conditions, Kolavi Studio",
});

const LAST_UPDATED = "October 13, 2026";
const CONTACT_EMAIL = "kolavistudio@gmail.com";

export default function TermsOfServicePage() {
  return (
    <main>
      <LegalPageLayout title="Terms of Service" lastUpdated={LAST_UPDATED}>
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using the Kolavi Studio website and services (&quot;Services&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use our Services.
        </p>

        <h2>2. Description of Services</h2>
        <p>
          Kolavi Studio provides digital marketing services, including but not limited to web design and development, SEO, content marketing, and lead generation. We also offer free online tools, including AI writing generators (bio, email, slogan, tagline, motto, and catchphrase), an SEO and speed audit, an XML sitemap generator, and Markdown, YAML, and JSON tools.
        </p>

        <h2>3. Use of the Website</h2>
        <p>
          You agree to use our website and Services only for lawful purposes. You must not:
        </p>
        <ul>
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe on the intellectual property or privacy rights of others</li>
          <li>Transmit malicious code, spam, or harmful content</li>
          <li>Attempt to gain unauthorized access to our systems or any third-party systems</li>
          <li>Use our Services in any way that could damage, disable, or impair our website</li>
          <li>Use our free tools to create phishing, impersonation, spam, or other deceptive or unlawful content</li>
          <li>Circumvent usage limits on our free tools, or access them through automated means or at a volume that burdens our systems</li>
          <li>Submit to our sitemap generator or speed audit a website you are not authorized to have crawled or tested</li>
        </ul>

        <h2>4. Client Services</h2>
        <p>
          When you engage us for marketing services, a separate agreement or statement of work will define the scope, deliverables, pricing, and payment terms. Those terms supplement these Terms of Service and govern the specific engagement. Participation in our partner program is also governed by the <a href="/partner/terms" className="text-orange-600 underline hover:text-orange-700 dark:text-orange-400">Partner Program Terms</a>.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, logos, and design, is owned by Kolavi Studio or our licensors. You may not copy, reproduce, or distribute our content without written permission. For client projects, intellectual property rights are governed by the applicable service agreement.
        </p>

        <h2>6. User Content</h2>
        <p>
          When you submit content to us (e.g., via contact forms, project briefs, or inputs to our free tools), you grant us a license to use that content to provide our Services, including sending tool inputs to the service providers that generate your results, as described in our <a href="/privacy" className="text-orange-600 underline hover:text-orange-700 dark:text-orange-400">Privacy Policy</a>. You represent that you have the right to share such content and that it does not violate any third-party rights.
        </p>

        <h2>7. Free Tools</h2>
        <p>
          Our free tools are provided at no charge, without any service commitment. We may change, limit, or discontinue any tool at any time. Tools are subject to usage limits (for example, a daily number of generations), and we may block use that appears abusive. Audit scores and similar results are informational snapshots based on third-party data, such as Google PageSpeed Insights, and may differ from other measurements.
        </p>

        <h2>8. AI-Generated Content</h2>
        <p>
          Some tools use artificial intelligence to generate text, such as bios, emails, slogans, taglines, mottos, and catchphrases. You understand and agree that:
        </p>
        <ul>
          <li>Generated content may be inaccurate, incomplete, inappropriate, or similar to content generated for others or already in use elsewhere</li>
          <li>You are responsible for reviewing, editing, and fact-checking generated content before you use, send, or publish it, and for how you use it</li>
          <li>We do not guarantee that generated content is original or unique, or that any slogan, tagline, motto, catchphrase, or name is available for use or registration as a trademark or does not infringe the rights of others. Conduct your own trademark and legal checks before adopting it, especially for commercial use</li>
          <li>Generated content is not professional advice (legal, financial, career, or otherwise)</li>
        </ul>

        <h2>9. Disclaimer of Warranties</h2>
        <p>
          Our website and Services are provided &quot;as is&quot; and &quot;as available.&quot; We do not guarantee specific business results (e.g., traffic, leads, or revenue). Marketing outcomes depend on many factors beyond our control. Please see our <a href="/disclaimer" className="text-orange-600 underline hover:text-orange-700 dark:text-orange-400">Disclaimer</a> for more information.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Kolavi Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Services. Our total liability for any claim shall not exceed the amount paid by you for the specific services giving rise to the claim.
        </p>

        <h2>11. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Kolavi Studio, its officers, and affiliates from any claims, damages, or expenses arising from your use of our Services or violation of these Terms.
        </p>

        <h2>12. Termination</h2>
        <p>
          We may suspend or terminate your access to our website or Services at any time, with or without cause. Provisions that by their nature should survive termination (e.g., intellectual property, limitation of liability) will remain in effect.
        </p>

        <h2>13. Modifications</h2>
        <p>
          We may update these Terms of Service at any time. Continued use of our Services after changes constitutes acceptance of the revised Terms. The &quot;Last updated&quot; date reflects the most recent changes.
        </p>

        <h2>14. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the United States. Any disputes shall be resolved in the courts of competent jurisdiction.
        </p>

        <h2>15. Contact</h2>
        <p>
          For questions about these Terms of Service, email us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-600 underline hover:text-orange-700 dark:text-orange-400">{CONTACT_EMAIL}</a> or reach us via our <a href="/contact" className="text-orange-600 underline hover:text-orange-700 dark:text-orange-400">contact page</a>.
        </p>
      </LegalPageLayout>
    </main>
  );
}
