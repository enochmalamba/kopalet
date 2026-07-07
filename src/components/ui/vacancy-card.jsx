import Image from "next/image";
import React from "react";
import { P } from "./typography";

const VacancyCard = () => {
  return (
    <div className="w-full lg:max-w-75 border py-2 px-3">
      <div className="flex w-full items-center gap-3 border ">
        <div className="h-10 w-10 overflow-hidden rounded ">
          <Image
            src="/hero.webp"
            alt="Hero Image"
            width={40}
            height={40}
            className=" h-full w-full object-cover "
          />
        </div>
        <P className="text-sm">Frekwency Media Co.</P>
      </div>
    </div>
  );
};

export default VacancyCard;
