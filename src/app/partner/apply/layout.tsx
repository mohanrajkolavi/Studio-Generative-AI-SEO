import { getPageMetadata } from "@/lib/seo/metadata";

export const metadata = getPageMetadata({
  title: "Apply to Partner Program",
  description:
    "Apply to join the Kolavi Studio Partner Program. Refer local businesses and earn recurring commission. Simple application for consultants, vendors, and agencies.",
  path: "/partner/apply",
  keywords: "partner program application, business referral program, agency partner apply",
});

export default function PartnerApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
