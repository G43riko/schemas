import { zodToJsonSchema, ignoreOverride, Refs, JsonSchema7Type } from "npm:zod-to-json-schema";
import { ZodSchema, ZodTypeDef } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import { dirname } from "https://deno.land/std@0.224.0/path/mod.ts";
import { GenerationData } from "./generation-data.ts";

const SCHEMAS_DIR = `${import.meta.dirname}/../definitions`;
const BASE_PATH = "https://g43riko.github.io/schemas";

function createJsonSchema(zodSchema: ZodSchema, filePath: string, name: string, schemaMap: Map<ZodTypeDef, string>): void {
    const override = (zod: ZodSchema, refs: Refs): JsonSchema7Type | typeof ignoreOverride => {
        const lastName = refs.currentPath.at(-1);
        const existingZodValue = schemaMap.get(zod)

        if (lastName !== name && existingZodValue) {
            return {
                $ref: `${refs.basePath.join("/")}/${refs.definitionPath}/${existingZodValue}.json`,
            }
        }

        return ignoreOverride
    }
    const jsonSchema = zodToJsonSchema(zodSchema, {
        name,
        override,
        basePath: [BASE_PATH],
        nameStrategy: "title",
        // definitionPath: "ascac",
        $refStrategy: "root",
    });
    const filename = `${SCHEMAS_DIR}/${filePath}.json`;
    Deno.mkdirSync(dirname(filename), { recursive: true });
    Deno.writeTextFileSync(filename, JSON.stringify(jsonSchema, null, 4));
}

export function generateSchemasFor(schemasToProcess: GenerationData): void {
    const schemaMap = new Map<ZodTypeDef, string>(
        schemasToProcess.map(({ zodSchema, path }) => [zodSchema._def, path])
    );

    for (const { zodSchema, path, name } of schemasToProcess) {
        createJsonSchema(zodSchema, path, name, schemaMap);
    }
}