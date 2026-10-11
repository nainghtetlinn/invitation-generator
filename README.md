# Invitation Generator

A web application for generating Microsoft Word (`.docx`) invitation letters for university events, configured for Technological University Taunggyi (TUT).

[Live Demo](https://tut-invitation.netlify.app/)

## Features

* **Department templates:** Configured for all majors and departments across the university.
* **Form-driven generation:** Input event type, recipient/professor, department, academic year, date, time, and venue.
* **Batch recipient management:** Group and member lists for bulk invitations, including drag-and-drop reordering.
* **Input validation:** Schema validation via Zod before document compilation.
* **Local persistence:** Form state automatically saves to `localStorage` to prevent data loss.
* **Docx exports:** Client-side generation and direct download of completed `.docx` files.
* **Template downloads:** Route to grab blank `.docx` templates by department for manual editing.

## Tech Stack

* **Framework:** React, Vite, TypeScript
* **Styling:** Tailwind CSS, DaisyUI, Lucide React
* **Forms & Validation:** React Hook Form, Zod
* **Document Processing:** Docxtemplater, Pizzip, FileSaver
* **Utilities:** Day.js, dnd-kit, Sonner

## Getting Started

### Prerequisites

* Node.js (v18 or higher recommended)
* `pnpm` (install via `npm install -g pnpm` if needed)

### Installation

```bash
git clone https://github.com/nainghtetlinn/invitation-generator.git
cd invitation-generator
pnpm install

```

### Development

```bash
pnpm dev

```

The app will be available at `http://localhost:5173`.

### Build

```bash
pnpm build

```

## How It Works

1. **Fill in event details:** Select the department and add event metadata (date, time, venue, academic year).
2. **Add recipients:** Group recipients (e.g., by class or committee) and add individual members. Reorder rows with drag-and-drop as needed.
3. **Generate:** Click **Generate** to compile the data into the template and download the final `.docx` file.
4. **Blank templates:** Visit `/download` to fetch raw `.docx` templates for individual departments.

## Project Structure

```text
invitation-generator/
├── public/
│   └── template.docx
├── src/
│   ├── components/
│   │   ├── footer.tsx
│   │   ├── form-fields.tsx
│   │   ├── group-dialog.tsx
│   │   ├── groups-table.tsx
│   │   ├── header.tsx
│   │   ├── member-dialog.tsx
│   │   ├── members-table.tsx
│   │   ├── toast.tsx
│   │   └── warning-dialog.tsx
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── dto.ts
│   │   ├── schema.ts
│   │   └── utils.ts
│   ├── App.tsx
│   ├── Download.tsx
│   ├── Layout.tsx
│   ├── index.css
│   └── index.tsx
├── package.json
└── vite.config.ts

```

## Contributing

1. Fork the repo and create a branch (`git checkout -b feature/my-feature`).
2. Commit your changes (`git commit -m 'Add my feature'`).
3. Push to your branch (`git push origin feature/my-feature`).
4. Open a Pull Request.

## License

MIT
