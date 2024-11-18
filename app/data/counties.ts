import senatData from '../../public/json/candidati_senat.json'
import chamberData from '../../public/json/candidati_camera_deputatilor.json'
import {removeDiacritics} from "../../lib/utils";
import _ from 'lodash';

const partyData: any = {
    'partidul-social-democrat': {
        abreviation: 'PSD',
        name: 'Partidul Social Democrat',
        image: '/images/parties/psd.png',
        lastScore: 29
    },
    'partidul-national-liberal': {
        abreviation: 'PNL',
        name: 'Partidul Național Liberal',
        image: '/images/parties/pnl.png',
        lastScore: 20
    },
    'uniunea-salvati-romania': {
        abreviation: 'USR',
        name: 'Uniunea Salvați România',
        image: '/images/parties/usr.png',
        lastScore: 8.53
    },
    'alianta-pentru-unirea-romanilor': {
        abreviation: 'AUR',
        name: 'Alianța pentru Unirea Românilor',
        image: '/images/parties/aur.png',
        lastScore: 14.93
    },
    'uniunea-democrata-maghiara-din-romania': {
        abreviation: 'UDMR',
        name: 'Uniunea Democrată Maghiară din România',
        image: '/images/parties/udmr.png',
        lastScore: 6.61
    },
    'partidul-s-o-s-romania': {
        abreviation: 'SOS',
        name: 'Partidul S.O.S. România',
        image: '/images/parties/sos.png',
        lastScore: 4.83
    },
    'reinnoim-proiectul-european-al-romaniei': {
        abreviation: 'REPER',
        name: 'Reînnoim Proiectul European Al României',
        image: '/images/parties/reper.png',
        lastScore: 0
    },
    'alianta-national-crestina': {
        abreviation: 'ANC',
        name: 'Alianța Național Creștină',
        image: '/images/parties/anc.png',
        lastScore: 0
    },
    'alternativa-pentru-demnitate-nationala': {
        abreviation: 'ADN',
        name: 'Alternativa pentru Demnitate Națională',
        image: '/images/parties/adn.jpg',
        lastScore: 0
    },
    'asociatia-italienilor-din-romania---ro-as-it': {
        abreviation: 'ASIT',
        name: 'Asociația Italienilor din România - RO.AS.IT',
        image: '/images/parties/asit.png',
        lastScore: 0
    },
    'dreptate-si-respect-in-europa-pentru-toti': {
        abreviation: 'DREPT',
        name: 'Dreptate și Respect în Europa pentru Toți',
        image: '/images/parties/drept.jpg',
        lastScore: 0
    },
    'forta-dreptei': {
        abreviation: 'FD',
        name: 'Forța Dreptei',
        image: '/images/parties/fd.jpg',
        lastScore: 0
    },
    'partidul-ecologist-roman': {
        abreviation: 'PER',
        name: 'Partidul Ecologist Român',
        image: '/images/parties/per.png',
        lastScore: 0
    },
    'partidul-national-conservator-roman': {
        abreviation: 'PNCR',
        name: 'Partidul Național Conservator Român',
        image: '/images/parties/pncr.png',
        lastScore: 0
    },
    'partidul-noua-romanie': {
        abreviation: 'PNR',
        name: 'Partidul Noua Românie',
        lastScore: -1
    },
    'partidul-oamenilor-tineri': {
        abreviation: 'POT',
        name: 'Partidul Oamenilor Tineri',
        image: '/images/parties/pot.jpg',
        lastScore: 0,
    },
    'partidul-romania-in-actiune': {
        abreviation: 'PRA',
        name: 'Partidul România în Acțiune',
        image: '/images/parties/pra.png',
        lastScore: 0
    },
    'partidul-social-democrat-independent': {
        abreviation: 'PSDI',
        name: 'Partidul Social Democrat Independent',
        // image: '/images/parties/psdi.png',
        lastScore: -1
    },
    'partidul-social-democrat-unit': {
        abreviation: 'PSDU',
        name: 'Partidul Social Democrat Unit',
        image: '/images/parties/psdu.png',
        lastScore: 0
    },
    'patriotii-poporului-roman': {
        abreviation: 'PPR',
        name: 'Patrioții Poporului Român',
        image: '/images/parties/ppr.png',
        lastScore: 0
    },
    'romania-socialista': {
        abreviation: 'RS',
        name: 'Romania Socialista',
        image: '/images/parties/rs.png',
        lastScore: 0
    },
    'sanatate-educatie-natura-sustenabilitate': {
        abreviation: 'SENS',
        name: 'Sănătate, Educație, Natură, Sustenabilitate',
        image: '/images/parties/sens.png',
        lastScore: 0
    },
}

export const generateCountrySlug = (countryName: string) => {
    return removeDiacritics(countryName).toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

export const generatePartySlug = (partyName: string) => {
    return removeDiacritics(partyName).toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

const generatePartyAbbreviation = (partyName: string) => {
    return partyName
        .split(/[\s-]+/) // Split by spaces or hyphens
        .map(word => word.charAt(0)) // Get the first character of each word
        .join('') // Join them together
        .toUpperCase(); // Convert to uppercase
};

const getPartyInfo = (partyName: string) => {
    const slug = generatePartySlug(partyName);
    const existingParty = partyData[slug];

    if (existingParty) {
        return existingParty;
    }

    // Generate default values
    return {
        abreviation: generatePartyAbbreviation(partyName),
        name: _.startCase(partyName),
        image: null,
        lastScore: 0
    };
};


type CandidateRawData = {
    name: string,
    position: number
};

const senatDataWithType = senatData.map((candidate) => ({...candidate, type: 'senate'}));
const chamberDataWithType = chamberData.map((candidate) => ({...candidate, type: 'chamber'}));
const candidatesData = [...senatDataWithType, ...chamberDataWithType];


export type County = {
    name: string;
}
export const romanianCounties: {
    [key: string]: County;
} = candidatesData.reduce((acc: { [key: string]: County }, candidate: any) => {
    const countyName = candidate["Denumirea circumscripției electorale"];
    const countySlug = generateCountrySlug(countyName);
    
    if (!acc[countySlug]) {
        acc[countySlug] = {
            name: capitalizeEachWord(countyName)
        };
    }
    
    return acc;
}, {});
export const candidatesByCountyAndParty: Record<string, Record<string, {
    partyName: string;
    senateCandidates: CandidateRawData[];
    chamberCandidates: CandidateRawData[];
}>> = {};

function capitalizeWord(word: string) {
    // Check if the word contains a hyphen
    if (word.includes('-')) {
        // Split the word by the hyphen and capitalize each part separately
        return word.split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
            .join('-');
    } else {
        // For regular words, capitalize the first letter and lowercase the rest
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
}

function capitalizeEachWord(str: string) {
    return str
        .split(' ') // Split the string into an array of words
        .map(capitalizeWord) // Use the capitalizeWord function for each word
        .join(' '); // Join the array back into a string
}

// Process all candidates
candidatesData.forEach((candidate: any) => {
    const countyName = candidate["Denumirea circumscripției electorale"];
    const partyName = candidate["Denumirea formațiunii politice/Candidat independent"];
    
    // Generate slugs
    const countySlug = generateCountrySlug(countyName);
    const partySlug = generatePartySlug(partyName);
    
    // Initialize county if it doesn't exist
    if (!candidatesByCountyAndParty[countySlug]) {
        candidatesByCountyAndParty[countySlug] = {};
    }
    
    // Initialize party if it doesn't exist
    if (!candidatesByCountyAndParty[countySlug][partySlug]) {
        candidatesByCountyAndParty[countySlug][partySlug] = {
            partyName: partyName.toLowerCase()
                .split(' ')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '),
            senateCandidates: [],
            chamberCandidates: [],
        };
    }

    if(candidate.type === 'senate') {
        candidatesByCountyAndParty[countySlug][partySlug].senateCandidates.push({
            name: capitalizeEachWord(`${candidate["Numele candidatului"]} ${candidate["Prenumele candidatului"]}`),
            position: candidate["Pozitie lista"]
        });
    } else {
        candidatesByCountyAndParty[countySlug][partySlug].chamberCandidates.push({
            name: capitalizeEachWord(`${candidate["Numele candidatului"]} ${candidate["Prenumele candidatului"]}`),
            position: candidate["Pozitie lista"]
        });
    }
});


export type Candidate = {
    name: string;
    position: number;
};

export type PartyData = {
    partySlug: string;
    name: string;
    abreviation: string;
    latestScore: number;
    image: string;
    senateCandidates: Candidate[];
    deputyCandidates: Candidate[];
};

export type CountyData = {
    name: string;
    parties: PartyData[];
};

export const getCountyData = (countySlug: string): CountyData => {
    const county = romanianCounties[countySlug];
    const countyData = candidatesByCountyAndParty[countySlug];
    const parties = Object.entries(countyData).map(([partySlug, party]) => {
        const partyInfo = getPartyInfo(party.partyName);
        return {
            partySlug,
            name: partyInfo.name,
            abreviation: partyInfo.abreviation,
            latestScore: partyInfo.lastScore,
            image: partyInfo.image,
            senateCandidates: party.senateCandidates,
            deputyCandidates: party.chamberCandidates
        };
    })
    /*
    [
            {
                name: "PSD",
                latestScore: 20,
                image: "/images/parties/psd.png",
                senateCandidates: generateCandidates(4),
                deputyCandidates: generateCandidates(6)
            },
            {
                name: "PNL",
                latestScore: 20,
                image: "/images/parties/pnl.png",
                senateCandidates: generateCandidates(4),
                deputyCandidates: generateCandidates(6)
            },
            {
                name: "USR",
                latestScore: 8.53,
                image: "/images/parties/usr.png",
                senateCandidates: generateCandidates(4),
                deputyCandidates: generateCandidates(6)
            },
            {
                name: "AUR",
                latestScore: 14.93,
                image: "/images/parties/aur.png",
                senateCandidates: generateCandidates(4),
                deputyCandidates: generateCandidates(6)
            },
            {
                name: "UDMR",
                latestScore: 6.61,
                image: "/images/parties/udmr.png",
                senateCandidates: generateCandidates(4),
                deputyCandidates: generateCandidates(6)
            },
            {
                name: "SOS",
                latestScore: 4.83,
                image: "/images/parties/sos.png",
                senateCandidates: generateCandidates(4),
                deputyCandidates: generateCandidates(6)
            },
            {
                name: "REPER",
                latestScore: 3.6,
                image: "/images/parties/reper.png",
                senateCandidates: generateCandidates(4),
                deputyCandidates: generateCandidates(6)
            }
        ]
     */


    return {
        name: county.name,
        parties
    };
};
