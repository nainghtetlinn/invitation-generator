import Docxtemplater from "docxtemplater";
import expressionParser from "docxtemplater/expressions";
import { saveAs } from "file-saver";
import PizZip from "pizzip";
import { toDto } from "./dto";
import type { Invitation, Member } from "./schema";

export async function generate(data: Invitation) {
  const transformedData = toDto(data);

  // Load the template file as binary
  const templateBuffer = await fetch(
    `https://docs.google.com/document/d/${
      transformedData.department!.templateId
    }/export?format=docx`
  ).then((res) => res.arrayBuffer());

  const zip = new PizZip(templateBuffer);
  const doc = new Docxtemplater(zip, {
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
                .join(" ")
            )
            .join("\n"),
      },
    }),
  });

  doc.render(transformedData);

  // Get the document as a blob
  const out = doc.getZip().generate({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  // Trigger download
  saveAs(out, "output.docx");
}
