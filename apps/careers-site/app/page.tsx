import { businessDetails } from "@wellcare/content";
import { Container, Section } from "@wellcare/ui";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, HeartHandshake, MapPin, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CareersButton } from "@/components/careers-button";

const highlights = [
  "Flexible scheduling that fits real life",
  "Warm, supportive team and consistent coordinator support",
  "Paid training and a clear path for growth",
  "Meaningful work helping local families stay home with dignity",
];

const roles = [
  { title: "Home Caregiver", details: "Companion care • personal care • respite support" },
  { title: "Dementia Care Specialist", details: "Memory care support • routine-based care plans" },
  { title: "Private Pay Caregiver", details: "Flexible scheduling • one-on-one client support" },
];

export default function CareerLandingPage() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-teal-300/20 bg-sand-50/90 backdrop-blur">
        <Container className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="WellCare home">
            <Image src="/logo.png" alt={businessDetails.name} width={52} height={52} className="h-12 w-12 rounded-full object-cover" priority />
            <div>
              <div className="font-display text-xl font-medium text-teal-900">{businessDetails.name}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-teal-900/50">Caregiver Careers</div>
            </div>
          </Link>

          <CareersButton asChild>
            <Link href="/apply">Apply now <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </CareersButton>
        </Container>
      </header>

      <Section tone="sand" className="pt-14 md:pt-20">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-900/10 bg-white/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-900/70">
              <HeartHandshake size={14} className="text-teal-600" />
              Join our care team
            </span>

            <h1 className="mt-6 max-w-xl font-display text-4xl font-medium tracking-tight text-teal-900 md:text-6xl">
              Make a real difference in every home you visit.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-teal-900/70">
              We’re hiring compassionate caregivers who want stable work, meaningful relationships, and a team that truly values the work behind every visit.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CareersButton asChild size="lg" className="w-full sm:w-auto">
                <Link href="/apply">Start your application <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </CareersButton>
              <CareersButton asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                <Link href="#roles"><BriefcaseBusiness className="h-4 w-4" aria-hidden="true" /> View open roles</Link>
              </CareersButton>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-teal-900/70">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-amber-500" /> Fort Bend County
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-amber-500" /> Background checked
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-amber-500" /> Supportive team
              </div>
            </div>
          </div>

          <div id="benefits" className="rounded-[2rem] border border-teal-900/10 bg-white/80 p-5 shadow-[0_25px_80px_rgba(18,57,58,0.12)] backdrop-blur-sm">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 p-6 text-white">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-teal-100/70">Why caregivers stay</p>
                  <h2 className="mt-2 font-display text-3xl font-medium">A purpose-led role</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <BriefcaseBusiness size={22} />
                </div>
              </div>

              <div className="space-y-4">
                {highlights.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-white/5 p-3.5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-amber-300" />
                    <p className="text-sm leading-6 text-teal-50">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <div id="roles" className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700">Open positions</p>
            <h2 className="mt-3 font-display text-3xl font-medium text-teal-900 md:text-4xl">Care roles designed for real life.</h2>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {roles.map((role) => (
              <div key={role.title} className="rounded-[1.75rem] border border-teal-900/10 bg-white/80 p-6 shadow-[0_18px_40px_rgba(18,57,58,0.04)]">
                <div className="mb-5 inline-flex rounded-full bg-teal-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-800">
                  Care team
                </div>
                <h3 className="font-display text-2xl font-medium text-teal-900">{role.title}</h3>
                <p className="mt-3 text-sm leading-7 text-teal-900/70">{role.details}</p>
                <Link href="/apply" className="mt-6 inline-flex items-center gap-2 font-medium text-teal-800 transition hover:text-teal-600">
                  Apply for this role <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
