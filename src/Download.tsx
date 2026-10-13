import { DEPARTMENTS } from "./lib/constants";
import { downloadTemplate } from "./lib/utils";

export const Download = () => {
  return (
    <main className="flex-1 mx-auto container max-w-5xl px-2 py-4 min-h-[700px]">
      <ul>
        {DEPARTMENTS.map((dep) => (
          <li key={dep.short}>
            <button
              type="button"
              className="link"
              onClick={() => {
                void downloadTemplate(dep);
              }}
            >
              {dep.long}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};
