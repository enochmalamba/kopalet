import { Button } from "@/components/ui/button";
import { H1, P } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="max-w-300 mt-5 mx-auto flex flex-col-reverse lg:flex-row items-stretch md:gap-5">
        <div className="flex flex-1 flex-col lg:w-[50%]">
          <H1 className="">
            For job seekers and <br /> human resource managers
          </H1>
          <P className="max-w-75 mt-5">
            Find job opportunities and best talent in your local area. Specially
            made for Malawians
          </P>
          <div className="flex flex-col gap-3 max-w-100 mt-auto pt-5">
            <Button asChild size="lg">
              <Link href="/">Create account for free</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/">Continue without an account</Link>
            </Button>
          </div>
        </div>
        <div className="w-full lg:w-[50%]">
          <Image
            width={400}
            height={300}
            alt="Kopalet | Find jobs and hire the best talent"
            src={"/hero.webp"}
            className="w-full h-full object-cover rounded-b-md"
          />
        </div>
      </section>
    </main>
  );
}
