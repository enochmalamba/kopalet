import Image from "next/image";
import Link from "next/link";
import React from "react";
import { H3, P } from "./typography";
import ShareVacancyButton from "./save-vacany-button";
// import SaveVacancyButton from "./save-vacancy-button";

const VacancyCard = ({ vacancy }) => {
  const {
    slug,
    title,
    company,
    companyLogo,
    location,
    jobType, // "full-time" | "part-time" | "contract" | "internship"
    salaryRange,
    deadline,
  } = vacancy || {};

  return (
    <div className="w-full lg:w-100 border-b border-t p-4 shrink-0 hover:bg-muted/50 transition-colors duration-200 ease-in-out">
      {" "}
      <Link href={`/vacancies/${slug}`} className="block w-full mt-1">
        {/* card header */}
        <H3 className="text-[18px] font-semibold line-clamp-2">{title}</H3>
        {/* card body */}
        <div className="w-full flex items-center justify-between gap-2 mt-2">
          <div className="rounded h-6 w-6 shrink-0">
            <Image
              src={companyLogo || "/globe.svg"}
              alt={`${company} logo`}
              width={40}
              height={40}
              className="h-full w-full object-cover rounded"
            />
          </div>
          <div className="flex-1 min-w-0">
            <P className="text-[16px]  line-clamp-1">{company}</P>
          </div>
          {/* <ShareVacancyButton url={`/vacancies/${slug}`} title={title} /> */}
        </div>
        {/* card meta */}
        <div className="w-full flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-muted-foreground">
          {location && <span>{location}</span>}
          {jobType && <span className="capitalize">{jobType}</span>}
        </div>
        {deadline && (
          <P className="text-xs text-muted-foreground ">
            Apply by {new Date(deadline).toLocaleDateString()}
          </P>
        )}{" "}
      </Link>
    </div>
  );
};

export default VacancyCard;
