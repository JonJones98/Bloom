"use client";

import { BusinessCardFormProvider } from "@/contexts/business-card-form-context";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BusinessCardFormProvider>
      {children}
    </BusinessCardFormProvider>
  );
}