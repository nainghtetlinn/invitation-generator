import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import expressionParser from 'docxtemplater/expressions'
import { saveAs } from 'file-saver'

export async function generate(data: unknown) {
  // Load the template file as binary
  const response = await fetch('/template.docx')
  const arrayBuffer = await response.arrayBuffer()

  const zip = new PizZip(arrayBuffer)
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    parser: expressionParser.configure({
      filters: {
        joinNames: arr => arr.map((m: { name: string }) => m.name).join('\n'),
        joinRolls: arr => arr.map((m: { roll: string }) => m.roll).join('\n'),
      },
    }),
  })

  doc.render(data)

  // Get the document as a blob
  const out = doc.getZip().generate({
    type: 'blob',
    mimeType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  })

  // Trigger download
  saveAs(out, 'output.docx')
}
