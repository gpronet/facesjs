import override from "./override.js";
import { svgsGenders, svgsIndex } from "./svgs-index.js";
import { Feature, Gender, Overrides, Race, TeamColors } from "./types.js";

function randomInt(
  minInclusive: number,
  max: number,
  inclusiveMax: boolean = false,
) {
  if (inclusiveMax) {
    max += 1;
  }
  return Math.floor(Math.random() * (max - minInclusive)) + minInclusive;
}

const getID = (type: Feature, gender: Gender): string => {
  const validIDs = svgsIndex[type].filter((_id, index) => {
    return (
      svgsGenders[type][index] === "both" || svgsGenders[type][index] === gender
    );
  });

  return validIDs[randomInt(0, validIDs.length)];
};

export const colors = {
  white: {
    skin: ["#f2d6cb", "#ddb7a0"],
    hair: [
      "#272421",
      "#3D2314",
      "#5A3825",
      "#CC9966",
      "#2C1608",
      "#B55239",
      "#e9c67b",
      "#D7BF91",
    ],
    eye: [
      "#634e34",
      "#2e536f",
      "#3d671d",
      "#1c7847",
      "#497665",
      "#000000",
      "#81badd",
      "#81b1ce",
      "#579ec9",
      "#989696",
      "#7c7c7c",
      "#0D5176",
      "#0D98BA",
      "#A1CAF1",
      "#8D9B87",
    ],
  },
  asian: {
    // https://imgur.com/a/GrBuWYw
    skin: ["#fedac7", "#f0c5a3", "#eab687"],
    hair: ["#272421", "#0f0902"],
    eye: [
      "#634e34",
      "#2e536f",
      "#3d671d",
      "#1c7847",
      "#497665",
      "#000000",
      "#81badd",
      "#81b1ce",
      "#579ec9",
      "#989696",
      "#7c7c7c",
      "#0D5176",
      "#0D98BA",
      "#A1CAF1",
      "#8D9B87",
    ],
  },
  brown: {
    skin: ["#bb876f", "#aa816f", "#a67358"],
    hair: ["#272421", "#1c1008"],
    eye: [
      "#634e34",
      "#2e536f",
      "#3d671d",
      "#1c7847",
      "#497665",
      "#000000",
      "#81badd",
      "#81b1ce",
      "#579ec9",
      "#989696",
      "#7c7c7c",
      "#0D5176",
      "#0D98BA",
      "#A1CAF1",
      "#8D9B87",
    ],
  },
  black: {
    skin: ["#ad6453", "#74453d", "#5c3937"],
    hair: ["#272421"],
    eye: [
      "#634e34",
      "#2e536f",
      "#3d671d",
      "#1c7847",
      "#497665",
      "#000000",
      "#0D5176",
      "#0D98BA",
      "#A1CAF1",
      "#8D9B87",
    ],
  },
};

const defaultTeamColors: TeamColors = ["#89bfd3", "#7a1319", "#07364f"];

const roundTwoDecimals = (x: number) => Math.round(x * 100) / 100;

export const generate = (
  overrides?: Overrides,
  options?: { gender?: Gender; race?: Race },
) => {
  const playerRace: Race = (() => {
    if (options && options.race) {
      return options.race;
    }
    switch (randomInt(0, 4)) {
      case 0:
        return "white";
      case 1:
        return "asian";
      case 2:
        return "brown";
      default:
        return "black";
    }
  })();

  const gender = options && options.gender ? options.gender : "male";

  const eyeAngle = randomInt(-10, 15, true);

  const palette = (() => {
    switch (playerRace) {
      case "white":
        return colors.white;
      case "asian":
        return colors.asian;
      case "brown":
        return colors.brown;
      case "black":
        return colors.black;
    }
  })();
  const skinColor = palette.skin[randomInt(0, palette.skin.length)];
  const hairColor = palette.hair[randomInt(0, palette.hair.length)];
  const eyeColor = palette.hair[randomInt(0, palette.eye.length)];
  const isFlipped = Math.random() < 0.5;

  const face = {
    fatness: roundTwoDecimals((gender === "female" ? 0.4 : 1) * Math.random()),
    teamColors: defaultTeamColors,
    hairBg: {
      id:
        Math.random() < (gender === "male" ? 0.1 : 0.9)
          ? getID("hairBg", gender)
          : "none",
    },
    body: {
      id: getID("body", gender),
      color: skinColor,
      size: roundTwoDecimals(
        Math.random() * 0.1 + (gender === "female" ? 0.8 : 0.95),
      ),
    },
    jersey: {
      id: getID("jersey", gender),
    },
    ear: {
      id: getID("ear", gender),
      size: roundTwoDecimals(
        0.5 + (gender === "female" ? 0.5 : 1) * Math.random(),
      ),
    },
    head: {
      id: getID("head", gender),
      shave: `rgba(0,0,0,${
        gender === "male" && Math.random() < 0.25
          ? roundTwoDecimals(Math.random() / 5)
          : 0
      })`,
    },
    eyeLine: {
      id: Math.random() < 0.75 ? getID("eyeLine", gender) : "none",
    },
    smileLine: {
      id:
        Math.random() < (gender === "male" ? 0.75 : 0.1)
          ? getID("smileLine", gender)
          : "none",
      size: roundTwoDecimals(0.25 + 2 * Math.random()),
    },
    miscLine: {
      id: Math.random() < 0.5 ? getID("miscLine", gender) : "none",
    },
    facialHair: {
      id: Math.random() < 0.5 ? getID("facialHair", gender) : "none",
    },
    eye: { id: getID("eye", gender), angle: eyeAngle, color: eyeColor },
    eyebrow: {
      id: getID("eyebrow", gender),
      angle: randomInt(-15, 20, true),
    },
    hair: {
      id: getID("hair", gender),
      color: hairColor,
      flip: isFlipped,
    },
    mouth: {
      id: getID("mouth", gender),
      flip: isFlipped,
    },
    nose: {
      id: getID("nose", gender),
      flip: isFlipped,
      size: roundTwoDecimals(
        0.5 + Math.random() * (gender === "female" ? 0.5 : 0.75),
      ),
    },
    glasses: {
      id: Math.random() < 0.1 ? getID("glasses", gender) : "none",
    },
    accessories: {
      id: Math.random() < 0.2 ? getID("accessories", gender) : "none",
    },
    blemish: {
      id: getID("blemish", gender),
      // mirror: isFlipped(),
      // flip: isFlipped(),
      // angle: randomInt(-90, 90, true),
    },
    earring: {
      id:
        (gender === "female" ? 1 : 0.1) * Math.random() > 0.25
          ? getID("earring", gender)
          : "none",
    },
  };

  override(face, overrides);

  return face;
};
