import Docxtemplater from "docxtemplater";
import expressionParser from "docxtemplater/expressions";
import ImageModule from "docxtemplater-image-module-free";
import { saveAs } from "file-saver";
import PizZip from "pizzip";
import { toDto } from "./dto";
import type { Invitation, Member } from "./schema";

const TEMPLATE_PATH = "/template.docx";
const LOGO_SIZE: [number, number] = [86, 86];
type Department = {
  long: string;
  short: string;
  logoPath: string;
};

async function fetchArrayBuffer(path: string) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  return response.arrayBuffer();
}

async function createDocument() {
  const templateBuffer = await fetchArrayBuffer(TEMPLATE_PATH);
  const imageModule = new ImageModule({
    centered: true,
    getImage: (path: string) => fetchArrayBuffer(path),
    getSize: () => LOGO_SIZE,
  });

  return new Docxtemplater(new PizZip(templateBuffer), {
    modules: [imageModule],
    paragraphLoop: true,
    linebreaks: true,
    parser: expressionParser.configure({
      filters: {
        joinNames: (arr: Member[]) => arr.map((m) => m.name).join("\n"),
        joinRolls: (arr: Member[]) =>
          arr.map((m) => `${m.rollNo}${m.repeater ? " ®" : ""}`).join("\n"),
        upper: (str: string) => str.toUpperCase(),
        lower: (str: string) => str.toLowerCase(),
        capitalize: (str: string) =>
          str
            .split("\n")
            .map((line) =>
              line
                .split(" ")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" "),
            )
            .join("\n"),
      },
    }),
  });
}

function saveDocument(doc: Docxtemplater, filename: string) {
  const out = doc.getZip().generate({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  saveAs(out, filename);
}

export async function downloadTemplate(department: Department) {
  const doc = await createDocument();

  await doc.renderAsync({
    date: "<Date>",
    day: "<Day>",
    time: "<Time>",
    place: "<Place>",
    department: {
      long: "<Department Name>",
      short: "<Department>",
    },
    logo: department.logoPath,
    type: "<Invitation Type>",
    year: {
      number: "<Year>",
      suffix: "<Suffix>",
      text: "<Year Text>",
    },
    academic: "<Academic Year>",
    groups: [
      {
        no: 1,
        title: "<Project Title>",
        members: [
          {
            name: "<Student Name>",
            rollNo: "<Roll Number>",
            repeater: false,
          },
        ],
      },
    ],
    professor: "<Professor Name>",
  });

  saveDocument(doc, `${department.short.toLowerCase()}-template.docx`);
}

export async function generate(data: Invitation) {
  const transformedData = toDto(data);
  const logoPath = transformedData.department?.logoPath;

  if (!logoPath) {
    throw new Error("Department logo path is missing");
  }

  const doc = await createDocument();

  await doc.renderAsync({
    ...transformedData,
    logo: logoPath,
  });

  saveDocument(doc, "output.docx");
}
