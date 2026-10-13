import { getPageMetadata } from "@/lib/seo/metadata";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata = getPageMetadata({
  title: "Privacy Policy",
  description: "Learn how Kolavi Studio collects, uses, and protects your personal information when you use our website, free tools, partner program, and services.",
  path: "/privacy",
  keywords: "privacy policy, data protection, personal information, Kolavi Studio",
});

const LAST_UPDATED = "October 13, 2026";
const CONTACT_EMAIL = "kolavistudio@gmail.com";
const LINK_CLASS = "text-orange-600 underline hover:text-orange-700 dark:text-orange-400";

export default function PrivacyPolicyPage() {
  return (
    <main>
      <LegalPageLayout title="Privacy Policy" lastUpdated={LAST_UPDATED}>
        <h2>1. Introduction</h2>
        <p>
          Kolavi Studio (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy. This privacy policy explains what information we collect, how we use and share it, and the choices you have when you visit kolavistudio.com, use our free online tools, join our partner program, or contact us about our services.
        </p>

        <h2>2. Information We Collect</h2>

        <h3>Information you give us</h3>
        <ul>
          <li><strong>Contact and inquiry forms:</strong> When you use the form on our <a href="/contact" className={LINK_CLASS}>contact page</a>, you provide details such as your name, email address, and message. That form is provided by Tally (tally.so), which collects the submission on our behalf.</li>
          <li><strong>Free SEO &amp; Speed Audit:</strong> Your name, email address, business name, phone number (optional), and the website URL you want audited.</li>
          <li><strong>Partner program:</strong> When you apply, your name, email address, phone number (optional), audience, promotion method, and any message you include. If you are approved, we keep a partner profile (name, email, phone, referral code, status, commission rates, and records of referred leads and payouts), and your login account is managed by Supabase Auth (email address and password).</li>
          <li><strong>Correspondence:</strong> Emails and messages you send us directly.</li>
        </ul>

        <h3>Information you enter into our free tools</h3>
        <ul>
          <li><strong>AI Bio Generator:</strong> Name, role, industry, skills, achievements, personality notes, and your choices of platforms, tone, and audience.</li>
          <li><strong>AI Email Generator:</strong> Your name and role, the recipient&apos;s name and role, what the email is about, key points, the action you want the recipient to take, and your choices of email type, tone, and length.</li>
          <li><strong>Slogan, Tagline, Motto, and Catchphrase Generators:</strong> Brand or personal name, description, industry, audience, and style, tone, and length choices.</li>
          <li><strong>XML Sitemap Generator:</strong> The website URL you want crawled and your crawl settings.</li>
          <li><strong>Markdown, YAML, and JSON tools:</strong> These run in your browser. The content you type is not sent to our servers (see Section 3).</li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li><strong>IP address for rate limiting:</strong> Our forms and free tools limit how often they can be used from one IP address. We do not store your IP address for this; we store a one-way hash (SHA-256) of it together with a request count and a reset time.</li>
          <li><strong>Analytics:</strong> When Google Analytics 4 is enabled on the site, it collects information such as pages visited (including the full page address), referring site, approximate location, and device and browser details, and we may record events such as tool and form submissions.</li>
          <li><strong>Server logs:</strong> Our hosting provider, Vercel, processes standard request information (such as IP address, browser user agent, and the requested URL) to deliver the site and keep it secure.</li>
          <li><strong>Partner referrals:</strong> If you arrive through a partner link (a URL containing <code>?ref=CODE</code>), we store the partner&apos;s referral code in a cookie so that an inquiry you later submit can be credited to that partner.</li>
        </ul>

        <h2>3. How Our Free Tools Process Your Input</h2>
        <ul>
          <li><strong>AI generators (bio, email, slogan, tagline, motto, catchphrase):</strong> The information you enter is sent to Anthropic&apos;s Claude API to generate your results, which are returned to your browser. We do not save the generated text. We do record a short usage entry in our leads database: for the Bio Generator, the name and role you entered plus your chosen platforms and tone; for the Email Generator, your name plus the email type, tone, and length; for the slogan-style generators, the brand or personal name plus the tool mode, industry, and tone. Other details you enter (such as descriptions, achievements, recipient details, or email context) are sent to Anthropic to generate results but are not stored in our database.</li>
          <li><strong>Free SEO &amp; Speed Audit:</strong> The URL you submit is sent to the Google PageSpeed Insights API, and our server also fetches that page to check basic SEO tags. Your name, email address, business name, phone number, the URL, and the resulting scores are stored as a lead in our database so we can follow up with you about your audit.</li>
          <li><strong>XML Sitemap Generator:</strong> Our server crawls the website you enter (identifying itself as KolaviSitemapBot) and returns the sitemap to you. We record the site&apos;s domain name, the number of URLs found, and your crawl settings in our leads database.</li>
          <li><strong>Markdown, YAML, and JSON tools:</strong> Processing happens in your browser. Some editors automatically save your work to your browser&apos;s local storage so it is still there when you return; it stays on your device until you clear it. If you create a share link, your content is encoded directly in the link (the <code>?c=</code> parameter). Anyone who has the link can read that content, and, like any web address, the link may appear in our hosting logs and in analytics page-view data when it is opened.</li>
        </ul>
        <p>
          Please do not enter sensitive personal information, or personal information about other people that you are not entitled to share, into our tools.
        </p>

        <h2>4. How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Respond to your inquiries and provide the services and tool results you request</li>
          <li>Follow up on audit requests and inquiries you submit</li>
          <li>Send marketing communications (with your consent) about our services, blog updates, and industry insights</li>
          <li>Operate the partner program, including partner accounts, referral attribution, commissions, and payouts</li>
          <li>Prevent abuse of our forms and free tools (for example, through rate limiting)</li>
          <li>Understand how the site and tools are used so we can improve them</li>
          <li>Comply with legal obligations and protect our rights</li>
        </ul>

        <h2>5. Cookies and Browser Storage</h2>
        <p>
          We use a small number of cookies and browser storage items: a partner referral cookie, login cookies for partners and site administrators, Google Analytics cookies when analytics is enabled, your light/dark theme preference, and autosaved drafts in our editor tools. For the full list, see our <a href="/cookies" className={LINK_CLASS}>Cookie Policy</a>.
        </p>

        <h2>6. Service Providers and Data Sharing</h2>
        <p>
          We do not sell your personal information. We share information only as described below:
        </p>
        <ul>
          <li><strong>Vercel:</strong> Hosts and serves the website and our server-side code.</li>
          <li><strong>Supabase and our PostgreSQL database provider:</strong> Store leads, partner applications and profiles, and rate-limit records, and provide partner login accounts (including account invitation and password reset emails).</li>
          <li><strong>Anthropic:</strong> Processes the inputs to our AI generators to produce results.</li>
          <li><strong>Google:</strong> Google PageSpeed Insights processes URLs submitted to the Speed Audit, and Google Analytics processes site usage data when analytics is enabled.</li>
          <li><strong>Tally:</strong> Provides the embedded form on our contact page.</li>
          <li><strong>WordPress (cms.kolavistudio.com):</strong> Our blog content and images are managed in a WordPress installation; your browser may load blog images from it.</li>
          <li><strong>Referring partners:</strong> If you contacted us after following a partner&apos;s link, that partner can see your name and the status of your inquiry in their partner dashboard so that commissions can be tracked. Partners do not see your email address, phone number, or message.</li>
          <li><strong>Legal authorities:</strong> When required by law or to protect our rights.</li>
        </ul>
        <p>
          Each provider processes data under its own terms and privacy policy. Some of these providers may process data in the United States or other countries outside your own.
        </p>

        <h2>7. Data Retention</h2>
        <ul>
          <li><strong>Leads, inquiries, and partner records:</strong> Kept for as long as needed for the purposes described in this policy (for example, responding to you, running the partner program, and keeping business records), unless a longer period is required by law. You can ask us to delete them at any time (see Section 8).</li>
          <li><strong>Rate-limit records:</strong> Contain only a hashed IP address, a request count, and a reset time. The count resets when the limit window ends, which ranges from one minute to 24 hours depending on the form or tool.</li>
          <li><strong>Browser storage:</strong> Editor drafts, your theme preference, and the partner referral information stay in your browser until they expire or you clear them. The partner referral cookie expires after 30 days.</li>
          <li><strong>Third-party providers:</strong> Data processed by the providers listed above is retained according to their own policies and settings.</li>
        </ul>

        <h2>8. Your Rights</h2>
        <p>
          Depending on your location, you may have the right to access, correct, delete, or restrict the processing of your personal data, or to object to certain uses of it. You may also withdraw consent for marketing communications at any time, and partners may ask us to close their account. To exercise these rights, email us at <a href={`mailto:${CONTACT_EMAIL}`} className={LINK_CLASS}>{CONTACT_EMAIL}</a>. You can clear data stored in your own browser at any time through your browser settings.
        </p>

        <h2>9. Security</h2>
        <p>
          We take reasonable steps to protect your personal data, including serving the site over HTTPS, storing only hashed IP addresses for rate limiting, and using HTTP-only cookies for login sessions. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.
        </p>

        <h2>10. Links to Other Sites</h2>
        <p>
          Our website may contain links to third-party sites, including the share buttons on blog posts. We are not responsible for the privacy practices of those sites. We encourage you to read their privacy policies.
        </p>

        <h2>11. Children</h2>
        <p>
          Our services are not directed to individuals under 18. We do not knowingly collect personal information from children.
        </p>

        <h2>12. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. The &quot;Last updated&quot; date at the top indicates when changes were last made. Continued use of our site after changes constitutes acceptance of the revised policy.
        </p>

        <h2>13. Contact Us</h2>
        <p>
          For questions about this privacy policy or your personal data, email us at <a href={`mailto:${CONTACT_EMAIL}`} className={LINK_CLASS}>{CONTACT_EMAIL}</a> or reach us via our <a href="/contact" className={LINK_CLASS}>contact page</a>.
        </p>
      </LegalPageLayout>
    </main>
  );
}
