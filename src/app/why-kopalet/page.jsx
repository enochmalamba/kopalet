// app/why-kopalet/page.jsx
import { Button } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { H1, H2, H3, P, Lead } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { ListChecks, Wallet, Sparkles, Filter } from "lucide-react";
import Link from "next/link";

function Hero() {
  return (
    <Section className="pt-14 pb-10 flex flex-col items-center text-center gap-4">
      <span className="relative inline-flex items-center bg-green-100 text-green-700 pl-6 pr-4 py-1 rounded-full text-sm font-medium before:content-[''] before:absolute before:left-2.5 before:w-2.5 before:h-2.5 before:rounded-full before:bg-green-500">
        Why Kopalet
      </span>
      <H1 className="max-w-150">Built for how Malawi actually finds work</H1>
      <Lead className="max-w-125 text-black/70">
        A real, growing list of vacancies — free to post, free to browse, no
        scrolling through WhatsApp channels required.
      </Lead>
    </Section>
  );
}

const liveFeatures = [
  {
    icon: ListChecks,
    bg: "bg-blue-100",
    ring: "ring-blue-200",
    iconColor: "text-blue-700",
    title: "A real, growing list of jobs",
    body: "Browse vacancies across roles and regions in one place instead of scattered WhatsApp channels.",
  },
  {
    icon: Wallet,
    bg: "bg-emerald-100",
    ring: "ring-emerald-200",
    iconColor: "text-emerald-700",
    title: "Free to post",
    body: "Any employer can post a vacancy on Kopalet at no cost — no listing fees to get started.",
  },
];

function LiveSection() {
  return (
    <Section className="py-14 lg:py-20">
      <div className="text-center mb-10">
        <p className="text-neutral-500 text-sm font-medium mb-2">
          Available today
        </p>
        <H2>What you get right now</H2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {liveFeatures.map(
          ({ icon: Icon, bg, ring, iconColor, title, body }) => (
            <div key={title} className="rounded-2xl border border-black/10 p-6">
              <div
                className={`w-12 h-12 rounded-full ${bg} ring-2 ${ring} ring-offset-2 ring-offset-background flex items-center justify-center`}
              >
                <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-semibold text-lg">{title}</h3>
              <P className="mt-2 text-black/70">{body}</P>
            </div>
          ),
        )}
      </div>
    </Section>
  );
}

function RoadmapSection() {
  return (
    <Section className="py-14 lg:py-20">
      <div className="text-center mb-10">
        <p className="text-neutral-500 text-sm font-medium mb-2">
          On the roadmap
        </p>
        <H2>What's coming next</H2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Kopalet Plus - job seekers */}
        <div className="relative rounded-2xl p-8 flex flex-col justify-end min-h-[260px] bg-linear-to-br from-green-900 to-neutral-900 text-white">
          <Badge className="absolute top-6 left-6 bg-white/10 text-white border-none">
            Coming soon
          </Badge>
          <Sparkles className="w-7 h-7 mb-4" strokeWidth={1.5} />
          <H3 className="text-white text-2xl font-bold mb-2">Kopalet Plus</H3>
          <P className="text-white/70">
            AI-assisted matching and CV guidance to help job seekers find and
            apply to roles that actually fit.
          </P>
        </div>

        {/* Kopalet Pro - employers */}
        <div className="relative rounded-2xl p-8 flex flex-col justify-end min-h-[260px] bg-linear-to-br from-red-800 to-neutral-900 text-white">
          <Badge className="absolute top-6 left-6 bg-white/10 text-white border-none">
            Coming soon
          </Badge>
          <Filter className="w-7 h-7 mb-4" strokeWidth={1.5} />
          <H3 className="text-white text-2xl font-bold mb-2">Kopalet Pro</H3>
          <P className="text-white/70">
            AI-assisted candidate filtering so employers can rank applicants
            automatically instead of reading every application by hand.
          </P>
        </div>
      </div>
    </Section>
  );
}

function CTASection() {
  return (
    <Section className="py-16 lg:py-20">
      <div className="w-full bg-black text-white rounded-2xl px-8 py-16 text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl sm:text-4xl font-bold max-w-125">
          Ready to see it for yourself?
        </h2>
        <P className="text-white/70 max-w-100">
          Browse open vacancies or post one in minutes.
        </P>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg" variant="secondary">
            <Link href="/find-jobs">Browse jobs</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black"
          >
            <Link href="/find-talent">Post a vacancy</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default function WhyKopaletPage() {
  return (
    <>
      <Hero />
      <LiveSection />
      <RoadmapSection />
      <CTASection />
    </>
  );
}
