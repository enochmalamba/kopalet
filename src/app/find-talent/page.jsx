// app/find-talent/page.jsx
import { Button } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { H1, H2, H3, P, Lead } from "@/components/ui/typography";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import { HardHat, Briefcase, Users, Handshake } from "lucide-react";

const categories = [
  { label: "Drivers", weight: "sm" },
  { label: "House Help", weight: "sm" },
  { label: "Security Guards", weight: "sm" },
  { label: "Waiters", weight: "sm" },
  { label: "Clerks", weight: "sm" },
  { label: "Gardeners", weight: "sm" },
  { label: "Cooks", weight: "sm" },
  { label: "Cleaners", weight: "sm" },
  { label: "Tailors", weight: "sm" },
  { label: "Electricians", weight: "sm" },
  { label: "Plumbers", weight: "sm" },
  { label: "Nannies", weight: "sm" },
  { label: "Mechanics", weight: "sm" },
  { label: "Painters", weight: "sm" },
];

const weightClasses = {
  sm: "text-lg md:text-xl px-6 py-3 font-semibold",
  md: "text-base md:text-lg px-5 py-2.5 font-medium",
  sm: "text-sm md:text-base px-4 py-2 font-normal",
};

const steps = [
  {
    title: "Create your account",
    desc: "Sign up free — takes less than a minute.",
  },
  {
    title: "Post what you need",
    desc: "Describe the job or task, or search available talent directly.",
  },
  {
    title: "Connect and hire",
    desc: "Message people directly and get things done.",
  },
];

function Hero() {
  return (
    <Section className="py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <div className="max-w-xl">
          <H1 className="text-4xl sm:text-5xl lg:text-6xl">
            Find skilled people, or post what needs doing.
          </H1>
          <Lead className="mt-6">
            From skilled professionals to quick one-off tasks.
          </Lead>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/find-talent/browse"
              className="inline-flex items-center justify-center rounded-md border border-black bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
            >
              Find Talent
            </Link>
            <Link
              href="/find-talent/post"
              className="inline-flex items-center justify-center rounded-md border border-black px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-neutral-100"
            >
              Post a Task
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-square w-full">
            <Image
              src="/hero.webp"
              alt="Illustration representing people offering skills and services on Kopalet"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function CorporateBanner() {
  return (
    <Section className="mt-10">
      <div className="w-full bg-neutral-900 text-white rounded-2xl px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-neutral-400 text-sm font-medium mb-3">
              For corporate employers
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              Find talent for all your corporate hiring needs
            </h2>
            <ul className="space-y-2 text-neutral-300 text-sm mb-6">
              <li>Contracts, internships, and full-time roles</li>
              <li>Filter by qualification, location, and experience</li>
            </ul>
            <Button asChild size="lg" variant="secondary">
              <Link href="/find-talent/corporate">Get started</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 w-full max-w-80 flex items-center justify-center gap-4">
              <Briefcase className="w-10 h-10 text-white/70" />
              <HardHat className="w-10 h-10 text-white/70" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function EverydayBanner() {
  return (
    <Section className="mt-10">
      <div className="w-full border border-black/10 rounded-2xl px-8 py-14 lg:py-20 bg-neutral-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1 flex items-center justify-center">
            <div className="bg-white border border-black/10 rounded-xl p-8 w-full max-w-80 flex items-center justify-center gap-4">
              <Users className="w-10 h-10 text-neutral-700" />
              <Handshake className="w-10 h-10 text-neutral-700" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-neutral-500 text-sm font-medium mb-3">
              For everyday hiring
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              Find people for simple or one-off tasks
            </h2>
            <P className="text-neutral-600 mb-6">
              From quick jobs around the house to hiring a service provider —
              find the right person, fast.
            </P>
            <Button asChild size="lg">
              <Link href="/find-talent/individual">Get started</Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function CategoryCloud() {
  return (
    <Section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <H2>What people are hiring for</H2>
        <P className="text-muted-foreground mt-1">
          Common roles and tasks people post on Kopalet.
        </P>
      </div>

      <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => (
          <span
            key={cat.label}
            className={`inline-flex items-center rounded-full border border-black/10 bg-white text-black transition-colors hover:border-black hover:bg-black hover:text-white ${weightClasses[cat.weight]}`}
          >
            {cat.label}
          </span>
        ))}
      </div>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <H2>Easy, and free to get started</H2>
        <P className="text-muted-foreground mt-1">
          No hidden fees — post a task or find talent in minutes.
        </P>
      </div>

      <div className="mx-auto mt-14 grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
        {steps.map((step, i) => (
          <Card
            key={step.title}
            className="relative overflow-visible border-black/10 "
          >
            <Image
              src="/hero.webp"
              width={400}
              height={400}
              className="w-full h-75 rounded-t-lg object-cover"
              alt={`How to get started with Kopalet | Step ${i + 1} illustration`}
            />
            <CardContent className="flex flex-col gap-4 text-center">
              <CardTitle className="p-0">{step.title}</CardTitle>
              <CardDescription>{step.desc}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function FinalCta() {
  return (
    <Section className="mt-10">
      <div className="w-full bg-black text-white rounded-2xl px-8 py-16 lg:py-24 text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-2xl">
          Ready to find the right person?
        </h2>
        <Button asChild size="lg" variant="secondary" className="mt-2">
          <Link href="/find-talent/post">Post a Task</Link>
        </Button>
      </div>
    </Section>
  );
}

function Faq() {
  return (
    <Section className="mt-10 lg:mt-20 py-10 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
        <div>
          <p className="text-neutral-500 text-sm font-medium mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-100">
            Questions people ask before hiring on Kopalet
          </h2>
        </div>

        <Accordion
          type="single"
          defaultValue="item-1"
          collapsible
          className="w-full"
        >
          <AccordionItem value="item-1" className="py-2">
            <AccordionTrigger className="text-left text-xl sm:text-2xl font-semibold py-6">
              How does payment work?
            </AccordionTrigger>
            <AccordionContent className="text-base sm:text-lg text-muted-foreground leading-relaxed pb-6">
              Payment is agreed directly between you and the person you hire.
              We'll update this once on-platform payments are available.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="py-2">
            <AccordionTrigger className="text-left text-xl sm:text-2xl font-semibold py-6">
              Is there a fee to post a task?
            </AccordionTrigger>
            <AccordionContent className="text-base sm:text-lg text-muted-foreground leading-relaxed pb-6">
              No — posting a task or job is free.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="py-2">
            <AccordionTrigger className="text-left text-xl sm:text-2xl font-semibold py-6">
              How do I know who I'm hiring?
            </AccordionTrigger>
            <AccordionContent className="text-base sm:text-lg text-muted-foreground leading-relaxed pb-6">
              You can view a profile and message someone directly before
              agreeing to anything. We're actively building stronger
              verification tools.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="py-2">
            <AccordionTrigger className="text-left text-xl sm:text-2xl font-semibold py-6">
              What happens if the work isn't done well?
            </AccordionTrigger>
            <AccordionContent className="text-base sm:text-lg text-muted-foreground leading-relaxed pb-6">
              You can report an issue directly to our team. A more robust
              resolution process is on the roadmap as the platform grows.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Section>
  );
}

export default function FindTalentPage() {
  return (
    <>
      <Hero />
      <CorporateBanner />
      <EverydayBanner />
      <CategoryCloud />
      <HowItWorks />
      <FinalCta />
      <Faq />
    </>
  );
}
