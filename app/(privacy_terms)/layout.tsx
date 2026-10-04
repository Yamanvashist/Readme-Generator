import Header from "@/components/termsAndPrivacy/Header";

export default function PrivacyAndTermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
