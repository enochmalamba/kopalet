// app/find-jobs/page.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Section from "@/components/ui/section";
import { H1, H2, P } from "@/components/ui/typography";
import VacancyCard from "@/components/ui/vacancy-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search } from "lucide-react";

const PER_PAGE = 9;

// TEMP fake data — replace with real Laravel fetch when backend is wired back in
const FAKE_VACANCIES = [
  {
    id: 1,
    slug: "engineer-electrical-distribution-escom",
    title: "Engineer - Electrical Distribution",
    company: "Electricity Supply Corporation of Malawi (ESCOM)",
    companyLogo: "/escom.jpg",
    location: "Lilongwe, Malawi",
    jobType: "full-time",
    salaryRange: "MWK 800,000 - 1,200,000",
    deadline: "2026-08-15",
  },
  {
    id: 2,
    slug: "branch-accountant-nbs-bank",
    title: "Branch Accountant",
    company: "NBS Bank",
    companyLogo: "/escom.jpg",
    location: "Blantyre, Malawi",
    jobType: "full-time",
    salaryRange: "MWK 600,000 - 900,000",
    deadline: "2026-07-28",
  },
  {
    id: 3,
    slug: "delivery-driver-puma-energy",
    title: "Delivery Driver",
    company: "Puma Energy Malawi",
    companyLogo: "/escom.jpg",
    location: "Mzuzu, Malawi",
    jobType: "full-time",
    salaryRange: "MWK 300,000 - 400,000",
    deadline: "2026-07-20",
  },
  {
    id: 4,
    slug: "hr-officer-airtel-malawi",
    title: "HR Officer",
    company: "Airtel Malawi",
    companyLogo: "/escom.jpg",
    location: "Lilongwe, Malawi",
    jobType: "full-time",
    salaryRange: "MWK 700,000 - 950,000",
    deadline: "2026-08-01",
  },
  {
    id: 5,
    slug: "restaurant-waiter-sunbird-hotels",
    title: "Waiter",
    company: "Sunbird Hotels",
    companyLogo: "/escom.jpg",
    location: "Blantyre, Malawi",
    jobType: "part-time",
    salaryRange: "MWK 150,000 - 200,000",
    deadline: "2026-07-18",
  },
  {
    id: 6,
    slug: "clerk-registrar-general",
    title: "Records Clerk",
    company: "Registrar General's Department",
    companyLogo: "/escom.jpg",
    location: "Zomba, Malawi",
    jobType: "full-time",
    salaryRange: "MWK 350,000 - 450,000",
    deadline: "2026-08-10",
  },
  {
    id: 7,
    slug: "security-guard-fmb-capital",
    title: "Security Guard",
    company: "FMB Capital Holdings",
    companyLogo: "/escom.jpg",
    location: "Lilongwe, Malawi",
    jobType: "full-time",
    salaryRange: "MWK 250,000 - 300,000",
    deadline: "2026-07-25",
  },
  {
    id: 8,
    slug: "software-developer-standard-bank",
    title: "Software Developer",
    company: "Standard Bank Malawi",
    companyLogo: "/escom.jpg",
    location: "Blantyre, Malawi",
    jobType: "full-time",
    salaryRange: "MWK 1,000,000 - 1,500,000",
    deadline: "2026-08-20",
  },
  {
    id: 9,
    slug: "electrician-escom-mzuzu",
    title: "Electrician",
    company: "Electricity Supply Corporation of Malawi (ESCOM)",
    companyLogo: "/escom.jpg",
    location: "Mzuzu, Malawi",
    jobType: "full-time",
    salaryRange: "MWK 400,000 - 550,000",
    deadline: "2026-07-30",
  },
  {
    id: 10,
    slug: "sales-rep-castel-malawi",
    title: "Sales Representative",
    company: "Castel Malawi",
    companyLogo: "/escom.jpg",
    location: "Lilongwe, Malawi",
    jobType: "full-time",
    salaryRange: "MWK 350,000 - 500,000",
    deadline: "2026-08-05",
  },
  {
    id: 11,
    slug: "teacher-st-andrews",
    title: "Secondary School Teacher",
    company: "St. Andrew's International High School",
    companyLogo: "/escom.jpg",
    location: "Blantyre, Malawi",
    jobType: "full-time",
    salaryRange: "MWK 500,000 - 700,000",
    deadline: "2026-08-12",
  },
  {
    id: 12,
    slug: "warehouse-clerk-illovo",
    title: "Warehouse Clerk",
    company: "Illovo Sugar Malawi",
    companyLogo: "/escom.jpg",
    location: "Chikwawa, Malawi",
    jobType: "full-time",
    salaryRange: "MWK 300,000 - 400,000",
    deadline: "2026-07-22",
  },
];

function getJobs({ query, page }) {
  const filtered = query
    ? FAKE_VACANCIES.filter((v) =>
        `${v.title} ${v.company}`.toLowerCase().includes(query.toLowerCase()),
      )
    : FAKE_VACANCIES;

  const total = filtered.length;
  const last_page = Math.max(1, Math.ceil(total / PER_PAGE));
  const current_page = Math.min(Math.max(1, page), last_page);
  const start = (current_page - 1) * PER_PAGE;

  return {
    data: filtered.slice(start, start + PER_PAGE),
    meta: { current_page, last_page, total },
  };
}

export default function FindJobsPage({ searchParams }) {
  const query = searchParams?.q ?? "";
  const page = Number(searchParams?.page) || 1;

  const { data: vacancies, meta } = getJobs({ query, page });

  return (
    <>
      {/* Hero + search */}
      <Section className="flex flex-col items-center justify-center gap-8 lg:min-h-[45vh] pt-10 pb-16">
        <div className="flex flex-col justify-center items-center gap-4 max-w-2xl text-center">
          <H1 className="text-4xl sm:text-4xl lg:text-5xl font-bold leading-[1.4]">
            Find the latest jobs in Malawi
          </H1>
          <P className="text-base sm:text-lg lg:text-xl max-w-150">
            Fresh vacancies from employers across the country, updated daily.
          </P>
        </div>

        <form
          action="/find-jobs"
          method="get"
          className="flex w-full max-w-xl items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Job title, company, or keyword"
              className="pl-9"
            />
          </div>
          <Button type="submit" size="lg">
            Search
          </Button>
        </form>
      </Section>

      {/* Job listing grid */}
      <Section className="w-full py-10 lg:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
          <div>
            <H2>{query ? `Results for "${query}"` : "Latest job vacancies"}</H2>
            <P className="text-muted-foreground mt-1">
              {meta.total} {meta.total === 1 ? "vacancy" : "vacancies"} found
            </P>
          </div>
        </div>

        {vacancies.length === 0 ? (
          <div className="border border-black/10 rounded-2xl py-20 text-center">
            <P className="text-muted-foreground">
              No vacancies match your search. Try a different keyword.
            </P>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-0 md:gap-4 lg:grid-cols-3 w-full">
            {vacancies.map((vacancy) => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
          </div>
        )}

        {meta.last_page > 1 && (
          <JobsPagination
            currentPage={meta.current_page}
            lastPage={meta.last_page}
            query={query}
          />
        )}
      </Section>
    </>
  );
}

function buildHref(page, query) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  params.set("page", String(page));
  return `/find-jobs?${params.toString()}`;
}

// Builds a compact page list: 1 … currentPage-1, currentPage, currentPage+1 … lastPage
function getPageRange(current, last) {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= last; i++) {
    if (
      i === 1 ||
      i === last ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("ellipsis");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

function JobsPagination({ currentPage, lastPage, query }) {
  const pages = getPageRange(currentPage, lastPage);
  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= lastPage;

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={prevDisabled ? undefined : buildHref(currentPage - 1, query)}
            aria-disabled={prevDisabled}
            className={prevDisabled ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {pages.map((page, i) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href={buildHref(page, query)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href={nextDisabled ? undefined : buildHref(currentPage + 1, query)}
            aria-disabled={nextDisabled}
            className={nextDisabled ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
