import {PartyCandidatesDisplay, VotesDisplay} from "@/app/components/votes-display";
import { Breadcrumb } from "@/app/components/breadcrumb";
import {generateCountrySlug, getCountyData, romanianCounties} from "@/app/data/counties";
import { notFound } from "next/navigation";

export const runtime = 'edge';

// Generate static params for all counties
export function generateStaticParams() {
  return Object.keys(romanianCounties).map((county) => ({
    county: encodeURIComponent(county.toLowerCase()),
  }));
}

export default async function CountyPage({params}: any) {
    const {county} = await params;
    const countySlug = decodeURIComponent(county as string);

    // Find the matching county (case-insensitive)
    const matchedCounty = romanianCounties[generateCountrySlug(countySlug)];

    if (!matchedCounty) {
        notFound();
    }

    const countyData = getCountyData(countySlug);

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb
                items={[
                    {label: "Județe", href: "/"},
                    {label: matchedCounty.name},
                ]}
            />
            <div className="flex flex-col items-center justify-center">
                <VotesDisplay data={countyData}/>
            </div>
        </div>
    );
}
