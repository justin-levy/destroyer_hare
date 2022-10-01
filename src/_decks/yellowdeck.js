const bunny = [
    {
        id: 111,
        type: "run",
        kind: "bunny",
        deck: "yellow",
    },
    {
        id: 112,
        type: "run",
        kind: "bunny",
        deck: "yellow",
    },
    {
        id: 113,
        type: "run",
        kind: "bunny",
        deck: "yellow",
    },
    {
        id: 114,
        type: "run",
        kind: "bunny",
        deck: "yellow",
    },
    {
        id: 115,
        type: "run",
        kind: "bunny",
        deck: "yellow",
    },
    {
        id: 116,
        type: "run",
        kind: "bunny",
        deck: "yellow",
    },
    {
        id: 117,
        type: "run",
        kind: "bunny",
        deck: "yellow",
    },
    {
        id: 118,
        type: "run",
        kind: "bunny",
        deck: "yellow",
    },
    {
        id: 119,
        type: "run",
        kind: "bunny",
        deck: "yellow",
    },
    {
        id: 120,
        type: "run",
        kind: "bunny",
        deck: "yellow",
    },
    {
        id: 138,
        type: "run",
        kind: "bunny",
        deck: "yellow",
    },
];

const carrot = [
    {
        id: 121,
        type: "run",
        kind: "chooseCarrot",
        deck: "yellow",
    },
    {
        id: 122,
        type: "run",
        kind: "chooseCarrot",
        deck: "yellow",
    },
    {
        id: 123,
        type: "run",
        kind: "chooseCarrot",
        deck: "yellow",
    },
    {
        id: 124,
        type: "run",
        kind: "chooseCarrot",
        deck: "yellow",
    },
];

const feed = [
    {
        id: 125,
        type: "run",
        kind: "feed",
        deck: "yellow",
    },
    {
        id: 126,
        type: "run",
        kind: "feed",
        deck: "yellow",
    },
    {
        id: 127,
        type: "run",
        kind: "feed",
        deck: "yellow",
    },
];

const weapon = [
    {
        id: 128,
        type: "run",
        kind: "weapon",
        deck: "yellow",
    },
    {
        id: 129,
        type: "run",
        kind: "weapon",
        deck: "yellow",
    },
    {
        id: 130,
        type: "run",
        kind: "weapon",
        deck: "yellow",
    },
    {
        id: 131,
        type: "run",
        kind: "weapon",
        deck: "yellow",
    },
    {
        id: 132,
        type: "run",
        kind: "weapon",
        deck: "yellow",
    },
    {
        id: 133,
        type: "run",
        kind: "weapon",
        deck: "yellow",
    },
];

const otherRun = [
    {
        id: 134,
        type: "run",
        kind: "abduction",
        deck: "yellow",
    },
    {
        id: 135,
        type: "run",
        kind: "other",
        deck: "yellow",
    },
    {
        id: 136,
        type: "run",
        kind: "other",
        deck: "yellow",
    },
    {
        id: 137,
        type: "run",
        kind: "other",
        deck: "yellow",
    },
    {
        id: 139,
        type: "run",
        kind: "market",
        deck: "yellow",
    },
    {
        id: 140,
        type: "run",
        kind: "market",
        deck: "yellow",
    },
    {
        id: 141,
        type: "run",
        kind: "modifier",
        deck: "yellow",
    },
    {
        id: 142,
        type: "run",
        kind: "other",
        deck: "yellow",
    },
    {
        id: 143,
        type: "run",
        kind: "other",
        deck: "yellow",
    },
    {
        id: 144,
        type: "run",
        kind: "other",
        deck: "yellow",
    },
];

const special = [
    {
        id: 145,
        type: "special",
        deck: "yellow",
    },
    {
        id: 146,
        type: "special",
        deck: "yellow",
    },
    {
        id: 147,
        type: "special",
        deck: "yellow",
    },
    {
        id: 148,
        type: "special",
        deck: "yellow",
    },
    {
        id: 149,
        type: "special",
        deck: "yellow",
    },
    {
        id: 150,
        type: "special",
        deck: "yellow",
    },
];

const verySpecial = [
    {
        id: 151,
        type: "verySpecial",
        deck: "yellow",
    },
    {
        id: 152,
        type: "verySpecial",
        deck: "yellow",
    },
];

const misfortune = [
    {
        id: 153,
        type: "playImmediately",
        kind: "misfortune",
        deck: "yellow",
    },
    {
        id: 154,
        type: "playImmediately",
        kind: "misfortune",
        deck: "yellow",
    },
];

const dolla = [
    {
        id: 155,
        type: "dolla",
        kind: "dolla",
        deck: "yellow",
    },
    {
        id: 156,
        type: "dolla",
        kind: "dolla",
        deck: "yellow",
    },
    {
        id: 157,
        type: "dolla",
        kind: "dolla",
        deck: "yellow",
    },
    {
        id: 158,
        type: "dolla",
        kind: "dolla",
        deck: "yellow",
    },
    {
        id: 159,
        type: "dolla",
        kind: "dolla",
        deck: "yellow",
    },
    {
        id: 160,
        type: "dolla",
        kind: "dolla",
        deck: "yellow",
    },
    {
        id: 161,
        type: "dolla",
        kind: "dolla",
        deck: "yellow",
    },
];

const yellowDeck = [
    ...bunny,
    ...carrot,
    ...feed,
    ...weapon,
    ...otherRun,
    ...special,
    ...verySpecial,
    ...misfortune,
    ...dolla,
];

const yellowCarrotDeck = [
    {
        id: 162,
        number: "Carrot #9",
        name: "Norman",
        kind: "carrotCard",
        deck: "yellow",
    },
    {
        id: 163,
        number: "Carrot #10",
        name: "Dex",
        kind: "carrotCard",
        deck: "yellow",
    },
    {
        id: 164,
        number: "Carrot #11",
        name: "Rick",
        kind: "carrotCard",
        deck: "yellow",
    },
    {
        id: 165,
        number: "Carrot #12",
        name: "Arnie",
        kind: "carrotCard",
        deck: "yellow",
    },
];

const yellowSmallCarrotDeck = [
    {
        id: 162,
        number: "Carrot #9",
        name: "Norman",
        kind: "carrotCard",
        deck: "yellow",
    },
    {
        id: 163,
        number: "Carrot #10",
        name: "Dex",
        kind: "carrotCard",
        deck: "yellow",
    },
    {
        id: 164,
        number: "Carrot #11",
        name: "Rick",
        kind: "carrotCard",
        deck: "yellow",
    },
    {
        id: 165,
        number: "Carrot #12",
        name: "Arnie",
        kind: "carrotCard",
        deck: "yellow",
    },
];

export { yellowDeck, yellowCarrotDeck, yellowSmallCarrotDeck };