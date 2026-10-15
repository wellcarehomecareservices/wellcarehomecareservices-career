import { Container, Section } from "@wellcare/ui";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CareerApplicationFlow } from "@/components/career-application-flow";

export default function CareerApplyPage() {
  return (
    <main className="min-h-screen bg-sand-50">
      <div className="border-b border-teal-300/20 bg-sand-50/90 backdrop-blur">
        <Container className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-teal-900 transition hover:text-teal-600">
            <ArrowLeft size={16} /> Back to home
          </Link>
        </Container>
      </div>

      <Section tone="sand" className="pt-12 md:pt-16">
        <Container className="max-w-4xl">
          <div className="mb-10 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700">Apply today</p>
            <h1 className="mt-4 font-display text-4xl font-medium text-teal-900 md:text-5xl">Apply to Join WellCare</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-teal-900/70">
              Three short steps. A hiring coordinator reviews every application personally.
            </p>
          </div>

          <CareerApplicationFlow />
        </Container>
      </Section>
    </main>
  );
}
