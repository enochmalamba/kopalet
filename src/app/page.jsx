import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

  return (
    <main className="flex flex-col px-8 py-4 lg:min-w-300 max-w-300 justify-start  mx-auto">
      <section className="flex flex-col items-center justify-center gap-10 lg:min-h-[60vh] pt-10 pb-20 ">
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
          <div className="flex  justify-center items-center gap-3 mt-6 mb-10">
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
      </section>
      <section className="w-full">
        <H2>Latest job vacancies in Malawi</H2>
        <div>
          <VacancyCard />
        </div>
      </section>
      <section className="lg:mt-20 md:mt-8 w-full flex-1">
        <H2 className="font-bold lg:text-4xl max-w-150">
          Kopalet is where HRs' and Job Seekers meet and connect
        </H2>
        <div className="flex flex-col lg:flex-row gap-10 mt-5">
          <Card className="w-full lg:w-[50%]">
            <Image
              src="/hero.webp"
              alt="Hero Image"
              width={800}
              height={400}
              className="w-full h-auto rounded-lg"
            />
            <div className="flex flex-col gap-2 p-3">
              <H3>Corporate and casual jobs, all in one place</H3>
              <P>Filter by qualifications, location, or job type and apply.</P>
              <Button asChild size="lg">
                <Link href="/">Browse latest jobs</Link>
              </Button>
            </div>
          </Card>

          <Card className="w-full lg:w-[50%]">
            <Image
              src="/hero.webp"
              alt="Hero Image"
              width={800}
              height={400}
              className="w-full h-auto rounded-lg"
            />
            <div className="flex flex-col gap-2 p-3">
              <H3>Individuals, companies, or businesses can hire</H3>
              <P>Post a vacancy and reach candidates ready to work.</P>
              <Button asChild size="lg">
                <Link href="/">Learn how to hire </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
      <section className="mt-10 bg-black text-white px-8 py-20  ">
        <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative  ">
          {/* Left column */}
          <div>
            <p className="text-neutral-400 text-sm font-medium mb-3">
              How it works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Simple enough to start today, powerful enough to grow with you.
            </h2>
          </div>

          {/* Right column */}
          <div className="flex flex-col">
            {howItWorks.map((item, i, arr) => (
              <div
                key={item.desc}
                className={`flex gap-6 py-6 ${
                  i !== arr.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <span className="text-2xl font-semibold text-white/90 w-6 shrink-0">
                  {/* {item.step} */}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-neutral-400 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
