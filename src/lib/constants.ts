import { env } from "../config/env";

export const DEPARTMENTS = [
  {
    long: "Computer Engineering and Information Technology",
    short: "CEIT",
    templateId: env.IT_TEMPLATE_ID,
  },
  {
    long: "Civil",
    short: "CIVIL",
    templateId: env.CIVIL_TEMPLATE_ID,
  },
  {
    long: "Electronic Circuit",
    short: "EC",
    templateId: env.EC_TEMPLATE_ID,
  },
  {
    long: "Electrical Power",
    short: "EP",
    templateId: env.EP_TEMPLATE_ID,
  },
  {
    long: "Mechenical",
    short: "MECH",
    templateId: env.MECH_TEMPLATE_ID,
  },
  {
    long: "Mining",
    short: "MN",
    templateId: env.MINING_TEMPLATE_ID,
  },
];

export const YEARS = [
  {
    text: "First",
    number: 1,
    suffix: "st",
  },
  {
    text: "Second",
    number: 2,
    suffix: "nd",
  },
  {
    text: "Third",
    number: 3,
    suffix: "rd",
  },
  {
    text: "Fourth",
    number: 4,
    suffix: "th",
  },
  {
    text: "Fifth",
    number: 5,
    suffix: "th",
  },
  {
    text: "Sixth",
    number: 6,
    suffix: "th",
  },
];
