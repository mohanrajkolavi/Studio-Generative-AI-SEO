import { getPageMetadata } from "@/lib/seo/metadata";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata = getPageMetadata({
  title: "Cookie Policy",
  description: "Learn which cookies and browser storage Kolavi Studio uses on our website and free tools, and how to manage them.",
  path: "/cookies",
  keywords: "cookie policy, cookies, local storage, website tracking, Kolavi Studio",
});

const LAST_UPDATED = "October 13, 2026";
const CONTACT_EMAIL = "kolavistudio@gmail.com";
const LINK_CLASS = "text-orange-600 underline hover:text-orange-700 dark:text-orange-400";

export default function CookiePolicyPage() {
  return (
    <main>
      <LegalPageLayout title="Cookie Policy" lastUpdated={LAST_UPDATED}>
        <h2>1. What Are Cookies and Browser Storage?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website. They help sites remember your preferences, keep you logged in, and analyze traffic. Websites can also use your browser&apos;s local storage and session storage, which keep information on your device and are not sent to the website with each request.
        </p>

        <h2>2. Cookies We Use</h2>
        <p>
          We use the following cookies on kolavistudio.com:
        </p>

        <h3>Essential Cookies</h3>
        <p>
          These cookies are needed for features you use. Blocking them may stop those features from working.
        </p>
        <ul>
          <li><strong><code>partner_ref</code></strong>: Set when you arrive through a partner link (a URL containing <code>?ref=CODE</code>). It stores only the partner&apos;s referral code so that an inquiry you submit can be credited to that partner. It is not replaced if you later follow a different partner link, and it expires after 30 days.</li>
          <li><strong>Supabase login cookies (<code>sb-&lt;project&gt;-auth-token</code>, sometimes split into numbered parts)</strong>: Keep partners logged in to the partner dashboard. Only set when a partner logs in.</li>
          <li><strong><code>partner-auth</code></strong>: A fallback partner login cookie (HTTP-only, expires after 14 days), used only when Supabase login is not available.</li>
          <li><strong><code>admin-auth</code></strong>: Keeps the site administrator logged in to the private dashboard (HTTP-only, expires after 7 days). It is not set for regular visitors.</li>
        </ul>

        <h3>Analytics Cookies</h3>
        <p>
          When Google Analytics 4 is enabled on the site, Google sets cookies such as <code>_ga</code> and <code>_ga_&lt;ID&gt;</code> to distinguish visitors and sessions. According to Google&apos;s documentation, these last up to 2 years by default. We use this information to understand which pages and tools are used, how visitors find us, and how we can improve the site.
        </p>

        <h3>Marketing Cookies</h3>
        <p>
          We do not currently use advertising or marketing cookies. The share buttons on blog posts are plain links and do not load third-party scripts.
        </p>

        <h3>Third-Party Embeds</h3>
        <p>
          The form on our <a href="/contact" className={LINK_CLASS}>contact page</a> is embedded from Tally (tally.so). Tally may use its own cookies or storage within that form, as described in its own policies.
        </p>

        <h2>3. Browser Storage We Use</h2>
        <p>
          The following items are kept in your browser and are not sent to our servers:
        </p>
        <ul>
          <li><strong><code>theme</code></strong> (local storage): Remembers whether you chose the light, dark, or system theme.</li>
          <li><strong>Editor drafts</strong> (local storage): Our Markdown, YAML, and JSON tools autosave your work so it is still there when you return. Keys used: <code>md-editor-content</code>, <code>md-html-content</code>, <code>md-pdf-content</code>, <code>md-formatter-input</code>, <code>md-table-state</code>, <code>yaml-editor-content</code>, <code>yaml-formatter-content</code>, <code>yaml-validator-content</code>, <code>yaml-to-json-content</code>, <code>json-to-yaml-content</code>, <code>yaml-diff-left</code>, and <code>yaml-diff-right</code>.</li>
          <li><strong><code>md-tool-transfer</code></strong> (session storage): Temporarily holds content when you send it from one of our tools to another. It is removed as soon as the receiving tool reads it.</li>
          <li><strong><code>partner_ref</code></strong> (session storage): A backup copy of a partner referral code, used if cookies are blocked. It is cleared when you close the browser tab.</li>
        </ul>
        <p>
          Share links created by our Markdown tools work differently: the content is encoded in the link itself (the <code>?c=</code> parameter) rather than stored on your device or on our servers. Anyone with the link can read that content.
        </p>

        <h2>4. How to Manage Cookies and Storage</h2>
        <p>
          Most browsers allow you to control cookies through their settings. You can:
        </p>
        <ul>
          <li>Block all cookies (may limit site functionality, such as partner login)</li>
          <li>Block third-party cookies only</li>
          <li>Delete cookies and site data after each session</li>
        </ul>
        <p>
          Clearing site data for kolavistudio.com also deletes any autosaved editor drafts. For instructions, check your browser&apos;s help or privacy settings. You can opt out of Google Analytics using Google&apos;s Analytics Opt-out Browser Add-on or a content-blocking browser extension.
        </p>

        <h2>5. Do Not Track</h2>
        <p>
          Some browsers send a &quot;Do Not Track&quot; (DNT) signal. Our website does not currently change its behavior in response to DNT signals. You can use the options in Section 4 to limit cookies and analytics.
        </p>

        <h2>6. Updates</h2>
        <p>
          We may update this Cookie Policy to reflect changes in our practices or applicable law. The &quot;Last updated&quot; date indicates when changes were last made.
        </p>

        <h2>7. More Information</h2>
        <p>
          For details on how we handle personal data, see our <a href="/privacy" className={LINK_CLASS}>Privacy Policy</a>. If you have questions, email us at <a href={`mailto:${CONTACT_EMAIL}`} className={LINK_CLASS}>{CONTACT_EMAIL}</a> or reach us via our <a href="/contact" className={LINK_CLASS}>contact page</a>.
        </p>
      </LegalPageLayout>
    </main>
  );
}
