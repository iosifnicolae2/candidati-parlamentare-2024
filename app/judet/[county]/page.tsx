import { useParams } from "next/navigation";
import { VotesDisplay } from "@/app/components/votes-display";
import { Breadcrumb } from "@/app/components/breadcrumb";
import { getCountyData, romanianCounties } from "@/app/data/counties";
import { notFound } from "next/navigation";

// Generate static params for all counties
export function generateStaticParams() {
  return romanianCounties.map((county) => ({
    county: county.toLowerCase(),
  }));
}

export default function CountyPage({params}: any) {
  const county = decodeURIComponent(params.county as string);
  
  // Find the matching county (case-insensitive)
  const matchedCounty = romanianCounties.find(
    (c) => c.toLowerCase() === county.toLowerCase()
  );

  if (!matchedCounty) {
    notFound();
  }

  const countyData = getCountyData(matchedCounty);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Județe", href: "/" },
          { label: matchedCounty },
        ]}
      />
      <div className="flex flex-col items-center justify-center">
        <VotesDisplay data={countyData} />
      </div>
    </div>
  );
}