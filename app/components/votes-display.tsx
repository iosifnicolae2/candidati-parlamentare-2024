import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { CountyData, PartyData, Candidate } from "../data/counties";

interface CandidateTableProps {
  candidates: Candidate[];
}

function CandidateTable({ candidates }: CandidateTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">Poziție</TableHead>
          <TableHead>Nume</TableHead>
          <TableHead>Profesie</TableHead>
          <TableHead className="text-right">Vârstă</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {candidates.map((candidate) => (
          <TableRow key={`${candidate.name}-${candidate.position}`}>
            <TableCell className="font-medium">{candidate.position}</TableCell>
            <TableCell>{candidate.name}</TableCell>
            <TableCell>{candidate.profession}</TableCell>
            <TableCell className="text-right">{candidate.age}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

interface PartyListProps {
  parties: PartyData[];
  type: "senate" | "deputy";
}

function PartyList({ parties, type }: PartyListProps) {
  return (
    <Accordion type="single" aria-expanded={true} className="w-full">
      {parties.map((party) => (
        <AccordionItem key={party.name} value={party.name}>
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: party.color }}
              />
              <span>{party.name}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <CandidateTable
                candidates={
                  type === "senate"
                    ? party.senateCandidates
                    : party.deputyCandidates
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

interface VotesDisplayProps {
  data: CountyData | null;
}

export function VotesDisplay({ data }: VotesDisplayProps) {
  if (!data) return null;

  return (
    <div className="w-full max-w-4xl mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Candidați Electorali pentru Județul {data.name}
      </h2>
      <Tabs defaultValue="senate" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="senate">Senat</TabsTrigger>
          <TabsTrigger value="deputy">Camera Deputaților</TabsTrigger>
        </TabsList>
        <TabsContent value="senate">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Candidați pentru Senat</h3>
            <PartyList parties={data.parties} type="senate" />
          </div>
        </TabsContent>
        <TabsContent value="deputy">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Candidați pentru Camera Deputaților</h3>
            <PartyList parties={data.parties} type="deputy" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
