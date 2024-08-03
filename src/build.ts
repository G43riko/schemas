import { zodToJsonSchema, ignoreOverride } from "npm:zod-to-json-schema";
import { ZodSchema } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import { existsSync } from "https://deno.land/std/fs/mod.ts";

const TYPES_DIR = `${import.meta.dirname}/types`;
const SCHEMAS_DIR = `${import.meta.dirname}/../definitions`;

function processSchema(zodSchema: ZodSchema, name: string, schemaMap: Map<ZodSchema, string>): void {
    const jsonSchema = zodToJsonSchema(zodSchema, {
        name,
        basePath: ["https://g43riko.github.io/schemas"],
        nameStrategy: "title",
        // definitionPath: "ascac",
        override: (zod, refs) => {
            const lastName = refs.currentPath.at(-1);
            const existingZodValue = schemaMap.get(zod)

            if (lastName !== name && existingZodValue) {
                return {
                    $ref: `${refs.basePath.join("/")}/${refs.definitionPath}/${existingZodValue}.json`,
                }
            }

            return ignoreOverride
        },
        $refStrategy: "root",
    });

    Deno.writeTextFileSync(`${SCHEMAS_DIR}/${name}.json`, JSON.stringify(jsonSchema, null, 4));
}
async function copyFiles(): Promise<void> {
    if (existsSync(SCHEMAS_DIR)) {
        Deno.removeSync(SCHEMAS_DIR, { recursive: true });
    }
    Deno.mkdirSync(SCHEMAS_DIR, { recursive: true });

    const schemasToProcess = new Array<{ readonly zodSchema: ZodSchema, readonly name: string }>();

    for await (const dirEntry of Deno.readDir(TYPES_DIR)) {
        const [name] = dirEntry.name.split(".");
        const module = await import(`${TYPES_DIR}/${dirEntry.name}`);
        const zodSchema = module.default;
        schemasToProcess.push({ zodSchema, name });
    }

    const schemaMap = new Map<ZodSchema, string>(
        schemasToProcess.map(({ zodSchema, name }) => [zodSchema._def, name])
    );

    for (const { zodSchema, name } of schemasToProcess) {
        processSchema(zodSchema, `${name}`, schemaMap);
    }
}

copyFiles();
