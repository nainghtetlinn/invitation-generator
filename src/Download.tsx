import { DEPARTMENTS } from "./lib/constants";

export const Download = () => {
  return (
    <main className="mx-auto container max-w-5xl px-2 py-4 min-h-[700px]">
      <ul>
        {DEPARTMENTS.map((dep) => (
          <li>
            <a
              download
              href={`https://drive.google.com/uc?export=download&id=${dep.templateId}`}
              className="link"
            >
              {dep.long}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
};
