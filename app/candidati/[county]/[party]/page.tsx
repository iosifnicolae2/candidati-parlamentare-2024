import {CandidateTable, PartyCandidatesDisplay, VotesDisplay} from "@/app/components/votes-display";
import { Breadcrumb } from "@/app/components/breadcrumb";
import {candidatesByCountyAndParty, generateCountrySlug, getCountyData, romanianCounties} from "@/app/data/counties";
import { notFound } from "next/navigation";
import {Footer} from "../../../components/footer";

export const runtime = 'edge';

// Generate static params for all counties
export function generateStaticParams() {
    // generate county and party params
    const results = [];
    const counties = Object.keys(romanianCounties);
    for(const countySlug of counties) {
        const countyData = candidatesByCountyAndParty[countySlug];
        for(const partySlug in countyData) {
            results.push({
                county: encodeURIComponent(countySlug),
                party: encodeURIComponent(partySlug),
            });
        }
    }
    return results;
}

export default async function CountyPage({params}: any) {
    const {county, party} = await params;
    const countySlug = decodeURIComponent(county as string);
    const partySlug = decodeURIComponent(party as string);

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
                <PartyCandidatesDisplay countySlug={countySlug} partySlug={partySlug} data={countyData}/>
                <Footer/>
            </div>
        </div>
    );
}
