// app/marketplace/page.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Section from "@/components/ui/section";
import { H1, H2, H3, P, Lead } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Smartphone,
  Sofa,
  Shirt,
  Car,
  Wrench,
  Tv,
  ShieldCheck,
  MessageCircle,
  Handshake,
} from "lucide-react";

const categories = [
  { icon: Smartphone, label: "Phones & Tablets" },
  { icon: Tv, label: "Electronics" },
  { icon: Shirt, label: "Fashion" },
  { icon: Sofa, label: "Home & Furniture" },
  { icon: Car, label: "Vehicles" },
  { icon: Wrench, label: "Services" },
];

function Hero() {
  return (
    <Section className="pt-14 pb-10 flex flex-col items-center text-center gap-6">
      <H1 className="max-w-125">Buy and sell locally, anywhere in Malawi</H1>
      <Lead className="max-w-100 text-black/70">
        Phones, furniture, vehicles, services — find it nearby or list what
        you're selling in minutes.
      </Lead>
      <div className="w-full max-w-125 flex items-center gap-2 mt-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
          <Input
            placeholder="Search phones, furniture, services..."
            className="pl-10 h-12"
          />
        </div>
        <Button size="lg" className="h-12 shrink-0">
          Search
        </Button>
      </div>

      {/* Category chips - horizontal scroll on mobile, wrap on desktop */}
      <div className="w-full flex sm:flex-wrap sm:justify-center gap-2 overflow-x-auto sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 pt-2 scrollbar-hide">
        {categories.map(({ icon: Icon, label }) => (
          <Link
            key={label}
            href="/"
            className="shrink-0 flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/5 transition-colors"
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </div>
    </Section>
  );
}

const listings = [
  {
    id: 1,
    title: "Samsung Galaxy A54, barely used",
    price: "MWK 320,000",
    location: "Blantyre",
    image: "/hero.webp",
  },
  {
    id: 2,
    title: "3-Seater Sofa Set",
    price: "MWK 180,000",
    location: "Lilongwe",
    image: "/hero.webp",
  },
  {
    id: 3,
    title: "Toyota Vitz 2015",
    price: "MWK 6,500,000",
    location: "Mzuzu",
    image: "/hero.webp",
  },
  {
    id: 4,
    title: "Tailoring & alterations service",
    price: "From MWK 5,000",
    location: "Zomba",
    image: "/hero.webp",
  },
];

function ListingCard({ listing }) {
  return (
    <Link
      href={`/marketplace/${listing.id}`}
      className="group rounded-2xl overflow-hidden border border-black/10 block"
    >
      <div className="relative aspect-4/3 bg-neutral-100 overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <p className="font-semibold">{listing.price}</p>
        <H3 className="text-base font-medium line-clamp-1 mt-1">
          {listing.title}
        </H3>
        <p className="text-sm text-black/50 mt-1">{listing.location}</p>
      </div>
    </Link>
  );
}

function ListingsSection() {
  return (
    <Section className="py-10 lg:py-16">
      <div className="flex justify-between items-end mb-6">
        <H2>Recently listed</H2>
        <Link
          href="/"
          className="hidden sm:inline text-sm font-medium text-primary underline underline-offset-4"
        >
          View all listings
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
      <Button asChild size="lg" className="mt-8 w-fit mx-auto sm:hidden flex">
        <Link href="/">View all listings</Link>
      </Button>
    </Section>
  );
}

const steps = [
  {
    number: "1",
    title: "Snap a photo",
    body: "Take a clear photo of what you're selling.",
  },
  {
    number: "2",
    title: "List it free",
    body: "Add a price and short description. Takes under two minutes.",
  },
  {
    number: "3",
    title: "Chat and close",
    body: "Buyers message you directly. Agree on a meetup, done.",
  },
];

function HowItWorksSection() {
  return (
    <Section className="py-14 lg:py-20 bg-black/[0.02]">
      <H2 className="text-center mb-10">Selling takes three steps</H2>
      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {/* connecting line - desktop only */}
        <div className="hidden sm:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-black/15" />
        {steps.map(({ number, title, body }) => (
          <div
            key={number}
            className="relative flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold z-10">
              {number}
            </div>
            <h3 className="mt-4 font-semibold text-lg">{title}</h3>
            <P className="mt-1 text-black/70 text-sm max-w-50">{body}</P>
          </div>
        ))}
      </div>
    </Section>
  );
}

function TrustStrip() {
  return (
    <Section className="py-10">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-black/60 shrink-0" />
          <P className="text-sm text-black/70">Meet locally, pay in person</P>
        </div>
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-black/60 shrink-0" />
          <P className="text-sm text-black/70">Chat before you commit</P>
        </div>
        <div className="flex items-center gap-3">
          <Handshake className="w-6 h-6 text-black/60 shrink-0" />
          <P className="text-sm text-black/70">No listing fees, ever</P>
        </div>
      </div>
    </Section>
  );
}

function CTASection() {
  return (
    <Section className="py-10 lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl p-10 flex flex-col items-start gap-4 bg-neutral-900 text-white min-h-55 justify-end">
          <h3 className="text-2xl font-bold">Looking to buy?</h3>
          <Button asChild size="lg" variant="secondary" className="w-fit">
            <Link href="/">Browse listings</Link>
          </Button>
        </div>
        <div className="rounded-2xl p-10 flex flex-col items-start gap-4 bg-linear-to-br from-green-800 to-neutral-900 text-white min-h-55 justify-end">
          <h3 className="text-2xl font-bold">Got something to sell?</h3>
          <Button asChild size="lg" variant="secondary" className="w-fit">
            <Link href="/">List it for free</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default function MarketplacePage() {
  return (
    <>
      <Hero />
      <ListingsSection />
      <HowItWorksSection />
      <TrustStrip />
      <CTASection />
    </>
  );
}
