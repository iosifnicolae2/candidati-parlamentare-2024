import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {CountyData, PartyData, Candidate} from "../data/counties";
import Image from "next/image";
import Link from 'next/link'
interface CandidateTableProps {
    party: PartyData;
    candidates: Candidate[];
}

export function CandidateTable({party, candidates}: CandidateTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-20">Poziție</TableHead>
                    <TableHead>Nume</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {candidates.map((candidate) => (
                    <TableRow key={`${candidate.name}-${candidate.position}`}>
                        <TableCell className="font-medium">{candidate.position}</TableCell>
                        <TableCell>
                            <Link href={`https://www.google.com/search?q=${candidate.name} - ${party.name}`} target="_blank" rel="noreferrer"
                                  className={'font-medium text-blue-600 dark:text-blue-500 hover:underline'}>
                                {candidate.name}
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

interface PartyListProps {
    parties: PartyData[]
    type: "senate" | "deputy";
}

function PartyList({parties, type}: PartyListProps) {
    const sortedParties = [...parties].sort((a, b) => {
        const aResult = a.latestScore || 0;
        const bResult = b.latestScore || 0;
        if (aResult === bResult) {
            return a.name.localeCompare(b.name);
        }
        return bResult - aResult;
    });

    return (
        <Accordion type="single" collapsible={true} className="w-full">
            {sortedParties.map((party) => {
                if (type === "senate" && (!party.senateCandidates || party.senateCandidates.length === 0)) {
                    return null;
                }
                if (type === "deputy" && (!party.deputyCandidates || party.deputyCandidates.length === 0)) {
                    return null;
                }
                return (
                    <AccordionItem key={party.name} value={party.name}>
                        <AccordionTrigger>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    {party.image && (
                                        <Image
                                            src={party.image}
                                            alt={party.name}
                                            width={24}
                                            height={24}
                                            className="object-contain"
                                        />
                                    )}
                                    <span>{party.name}</span>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="pt-4">
                                <CandidateTable
                                    party={party}
                                    candidates={
                                        type === "senate"
                                            ? party.senateCandidates
                                            : party.deputyCandidates
                                    }
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}

interface VotesDisplayProps {
    data: CountyData | null;
}

export function VotesDisplay({data}: VotesDisplayProps) {
    if (!data) return null;

    return (
        <div className="w-full max-w-4xl mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Candidați Parlamentare 2024 pentru Județul {data.name}
            </h2>
            <Tabs defaultValue="senate" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="senate">Senat</TabsTrigger>
                    <TabsTrigger value="deputy">Camera Deputaților</TabsTrigger>
                </TabsList>
                <TabsContent value="senate">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Candidați pentru Senat</h3>
                        <PartyList parties={data.parties} type="senate"/>
                    </div>
                </TabsContent>
                <TabsContent value="deputy">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Candidați pentru Camera Deputaților</h3>
                        <PartyList parties={data.parties} type="deputy"/>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
export function PartyCandidatesDisplay({countySlug, partySlug, data}: VotesDisplayProps & {
    countySlug: string;
    partySlug: string;
}) {
    if (!data) return null;
    const party = data.parties.find((party) => party.partySlug === partySlug);
    if (!party) return null;

    return (
        <div className="w-full max-w-4xl mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Candidați Parlamentare 2024 pentru Județul {data.name}
            </h2>
            <h3 className="flex w-fit text-xl font-bold mb-7 text-center items-center mx-auto gap-2">
                {party.image && (
                    <Image
                        src={party.image}
                        alt={party.name}
                        width={24}
                        height={24}
                        className="object-contain"
                    />
                )}
                <span>{party.name} ({party.abreviation})</span>
            </h3>
            <Tabs defaultValue="senate" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="senate">Senat</TabsTrigger>
                    <TabsTrigger value="deputy">Camera Deputaților</TabsTrigger>
                </TabsList>
                <TabsContent value="senate">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <CandidateTable
                            party={party}
                            candidates={party.senateCandidates}
                        />
                    </div>
                </TabsContent>
                <TabsContent value="deputy">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <CandidateTable
                            party={party}
                            candidates={party.deputyCandidates}
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
