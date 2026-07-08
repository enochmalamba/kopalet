import { Button } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { H1, H2, H3, P } from "@/components/ui/typography";
import VacancyCard from "@/components/ui/vacancy-card";
import {
  Briefcase,
  Users,
  ShoppingBag,
  GraduationCap,
  Handshake,
  HardHat,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const heroIcons = [
    { icon: HardHat, bg: "bg-amber-100", ring: "ring-amber-200" },
    { icon: Briefcase, bg: "bg-blue-100", ring: "ring-blue-200" },
    { icon: Users, bg: "bg-emerald-100", ring: "ring-emerald-200" },
    { icon: ShoppingBag, bg: "bg-orange-100", ring: "ring-orange-200" },
    { icon: GraduationCap, bg: "bg-purple-100", ring: "ring-purple-200" },
    { icon: Handshake, bg: "bg-red-100", ring: "ring-red-200" },
  ];
  const howItWorks = [
    {
      icon: "1",
      title: "Create your account",
      desc: "Sign up free with your email or Google account",
    },
    {
      icon: "2",
      title: "Browse or post",
      desc: "Find what you need or list what you're offering",
    },
    {
      icon: "3",
      title: "Connect and act",
      desc: "Reach out, apply, or close the deal directly",
    },
  ];
  const vacancy = {
    id: 1,
    slug: "engineer-electrical-distribution-escom",
    title: "Engineer - Electrical Distribution",
    company: "Electricity Supply Corporation of Malawi (ESCOM)",
    companyLogo: "/escom.jpg",
    location: "Lilongwe, Malawi",
    jobType: "full-time",
    salaryRange: "MWK 800,000 - 1,200,000",
    deadline: "2026-08-15",
  };

  return (
    <main className="w-full min-h-screen flex flex-col justify-start">
      <Section className="flex flex-col items-center justify-center gap-10 lg:min-h-[60vh] pt-10 pb-20 ">
        <div className="flex justify-center -space-x-2.5">
          {heroIcons.map(({ icon: Icon, bg, ring }, i) => (
            <div
              key={i}
              className={`w-15 h-15 rounded-full ${bg} ring-2 ${ring} ring-offset-2 ring-offset-background flex items-center justify-center relative`}
              style={{ zIndex: heroIcons.length - i }}
            >
              <Icon className="w-10 h-10 text-neutral-700" />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <H1 className="text-4xl text-center sm:text-4xl lg:text-5xl max-w-full lg:max-w-150 font-bold leading-[1.4]">
            Find{" "}
            <span className="relative inline-flex items-center bg-green-100 text-green-600 pl-6 pr-4 py-1 rounded-full before:content-[''] before:absolute before:left-2.5 before:w-2.5 before:h-2.5 before:rounded-full before:bg-green-500">
              jobs
            </span>{" "}
            and hire the best talent in Malawi.
          </H1>
          <P className="text-base text-center sm:text-lg lg:text-xl max-w-150">
            Latest vacancies and job opportunities in Malawi. Find your dream
            job or hire the best talent for your company.
          </P>
          <div className="flex  flex-wrap justify-center items-center gap-3 mt-6 mb-10">
            <Button asChild size="lg">
              <Link href="/" className="p-4">
                Create a free account
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/">Continue without account</Link>
            </Button>
          </div>
        </div>
      </Section>
      <Section className="w-full py-10 lg:py-20">
        <H2>Latest job vacancies in Malawi</H2>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-2 mt-2">
          <P>See the latest job opportunities in Malawi.</P>{" "}
          <Link href="/" className="text-primary underline">
            View all vacancies
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-0 md:gap-4 lg:grid-cols-3 mt-4 w-full">
          <VacancyCard vacancy={vacancy} />
          <VacancyCard vacancy={vacancy} />
          <VacancyCard vacancy={vacancy} />
          <VacancyCard vacancy={vacancy} />
          <VacancyCard vacancy={vacancy} />
          <VacancyCard vacancy={vacancy} />
        </div>
        <Button asChild size="lg" className="mt-7 w-fit mx-auto">
          <Link href="/">View all vacancies</Link>
        </Button>
      </Section>

      {/* For Employers - dark banner */}
      <Section className="mt-10">
        <div className="w-full bg-neutral-900 text-white rounded-2xl px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-neutral-400 text-sm font-medium mb-3">
                For employers
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
                Let Kopalet connect you with the right candidates
              </h2>
              <ul className="space-y-2 text-neutral-300 text-sm mb-6">
                <li>
                  Post a vacancy and reach thousands of job seekers across
                  Malawi
                </li>
                <li>
                  Filter applicants by qualification, location, and experience
                </li>
                <li>
                  Hire with confidence — every profile is reviewed before it
                  goes live
                </li>
              </ul>
              <Button asChild size="lg" variant="secondary">
                <Link href="/">Post a job for free</Link>
              </Button>
              <p className="text-xs text-neutral-500 mt-3">
                No card required to post your first vacancy
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 w-full max-w-80 text-center">
                <p className="text-4xl font-bold">1,200+</p>
                <p className="text-neutral-400 text-sm mt-1">
                  vacancies posted this year
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Marketplace - light banner */}
      <Section className="mt-10">
        <div className="w-full border border-black/10 rounded-2xl px-8 py-14 lg:py-20 bg-neutral-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-80">
                {[GraduationCap, ShoppingBag, HardHat, Handshake].map(
                  (Icon, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl bg-white border border-black/10 flex items-center justify-center"
                    >
                      <Icon className="w-8 h-8 text-neutral-700" />
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
                More than job hunting — a marketplace for every hustle
              </h2>
              <P className="text-neutral-600 mb-6">
                From casual gigs and scholarships to second-hand goods, Kopalet
                connects Malawians with opportunity in every corner of the
                informal and formal economy.
              </P>
              <Button asChild size="lg">
                <Link href="/">Explore the marketplace</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
      {/* Value props grid - 4 cards, Malawi flag palette */}
      <Section className="mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1 - blended gradient (black/red/green) */}
          <div className="rounded-2xl p-8 flex flex-col justify-end min-h-[280px] bg-linear-to-br from-green-900 via-red-800 to-neutral-800 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold leading-snug">
              Kopalet is where everything — and everyone — connects.
            </h2>
          </div>

          {/* Card 2 - solid black */}
          <div className="rounded-2xl p-8 flex flex-col justify-between min-h-[280px] bg-neutral-900 text-white">
            <div>
              <h3 className="text-2xl font-bold mb-3">Find jobs, for free</h3>
              <P className="text-white/80">
                No hidden fees to search or apply. Browse thousands of vacancies
                across every industry in Malawi.
              </P>
            </div>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-fit mt-6"
            >
              <Link href="/">Find jobs</Link>
            </Button>
          </div>

          {/* Card 3 - solid red */}
          <div className="rounded-2xl p-8 flex flex-col justify-between min-h-[280px] bg-red-800 text-white">
            <div>
              <h3 className="text-2xl font-bold mb-3">Hire talent, fast</h3>
              <P className="text-white/80">
                From casual work to skilled professionals — post a vacancy and
                reach candidates ready to start.
              </P>
            </div>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-fit mt-6"
            >
              <Link href="/">Hire talent</Link>
            </Button>
          </div>

          {/* Card 4 - solid green */}
          <div className="rounded-2xl p-8 flex flex-col justify-between min-h-[280px] bg-green-800 text-white">
            <div>
              <h3 className="text-2xl font-bold mb-3">Share what you know</h3>
              <P className="text-white/80">
                Trade ideas and tips shaping Malawi's job market with people
                navigating the same industry.
              </P>
            </div>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-fit mt-6"
            >
              <Link href="/">Read insights</Link>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
