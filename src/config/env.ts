import { z } from "zod";

const createEnv = () => {
  const EnvSchema = z.object({
    CIVIL_TEMPLATE_ID: z.string(),
    IT_TEMPLATE_ID: z.string(),
    EC_TEMPLATE_ID: z.string(),
    MECH_TEMPLATE_ID: z.string(),
    EP_TEMPLATE_ID: z.string(),
    MINING_TEMPLATE_ID: z.string(),
  });

  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, curr) => {
    const [key, value] = curr;
    if (key.startsWith("VITE_")) {
      acc[key.replace("VITE_", "")] = value;
    }
    return acc;
  }, {});

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    console.log(z.treeifyError(parsedEnv.error));
    throw new Error(
      `Invalid env provided.
The following variables are missing or invalid:
${Object.entries(z.treeifyError(parsedEnv.error).properties ?? {})
  .map(([k, v]) => `- ${k}: ${v.errors.join(" | ")}`)
  .join("\n")}
`
    );
  }

  return parsedEnv.data;
};

export const env = createEnv();
