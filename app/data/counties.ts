export const romanianCounties = [
  "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani",
  "Brașov", "Brăila", "București", "Buzău", "Caraș-Severin", "Cluj", "Constanța",
  "Covasna", "Călărași", "Dolj", "Dâmbovița", "Galați", "Giurgiu", "Gorj",
  "Harghita", "Hunedoara", "Ialomița", "Iași", "Ilfov", "Maramureș", "Mehedinți",
  "Mureș", "Neamț", "Olt", "Prahova", "Satu Mare", "Sibiu", "Suceava", "Sălaj",
  "Teleorman", "Timiș", "Tulcea", "Vaslui", "Vrancea", "Vâlcea"
];

export type Candidate = {
  name: string;
  position: number;
  profession: string;
  age: number;
};

export type PartyData = {
  name: string;
  color: string;
  senateCandidates: Candidate[];
  deputyCandidates: Candidate[];
};

export type CountyData = {
  name: string;
  parties: PartyData[];
};

const generateCandidates = (count: number): Candidate[] => {
  const firstNames = ["Alexandru", "Maria", "Ioan", "Elena", "Andrei", "Ana", "Mihai", "Ioana"];
  const lastNames = ["Popescu", "Ionescu", "Popa", "Constantinescu", "Stancu", "Dumitrescu"];
  const professions = ["Lawyer", "Engineer", "Doctor", "Professor", "Economist", "Architect"];
  
  return Array.from({ length: count }, (_, i) => ({
    name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
      lastNames[Math.floor(Math.random() * lastNames.length)]
    }`,
    position: i + 1,
    profession: professions[Math.floor(Math.random() * professions.length)],
    age: Math.floor(Math.random() * 30) + 35, // Ages between 35-65
  }));
};

export const getCountyData = (county: string): CountyData => {
  return {
    name: county,
    parties: [
      {
        name: "PSD",
        color: "#FF0000",
        senateCandidates: generateCandidates(4),
        deputyCandidates: generateCandidates(6)
      },
      {
        name: "PNL",
        color: "#FFED00",
        senateCandidates: generateCandidates(4),
        deputyCandidates: generateCandidates(6)
      },
      {
        name: "USR",
        color: "#00FF00",
        senateCandidates: generateCandidates(4),
        deputyCandidates: generateCandidates(6)
      },
      {
        name: "AUR",
        color: "#0000FF",
        senateCandidates: generateCandidates(4),
        deputyCandidates: generateCandidates(6)
      },
      {
        name: "UDMR",
        color: "#800080",
        senateCandidates: generateCandidates(4),
        deputyCandidates: generateCandidates(6)
      }
    ]
  };
};