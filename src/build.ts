import { zodToJsonSchema, ignoreOverride } from "npm:zod-to-json-schema";
import { ZodSchema } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import { existsSync } from "https://deno.land/std/fs/mod.ts";
import {dirname, basename} from "https://deno.land/std@0.224.0/path/mod.ts";


const TYPES_DIR = `${import.meta.dirname}/types`;
const SCHEMAS_DIR = `${import.meta.dirname}/../definitions`;
const BASE_PATH = "https://g43riko.github.io/schemas";

function processSchema(zodSchema: ZodSchema, filePath: string, schemaMap: Map<ZodSchema, string>): void {
    const name = basename(filePath);
    const jsonSchema = zodToJsonSchema(zodSchema, {
        name,
        basePath: [BASE_PATH],
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
    const filename = `${SCHEMAS_DIR}/${filePath}.json`;
    Deno.mkdirSync(dirname(filename), {recursive: true});
    Deno.writeTextFileSync(filename, JSON.stringify(jsonSchema, null, 4));
}

async function getAllFilesRecursive(directory: string): Promise<readonly string[]> {
    const files = new Array<string>();

    for await (const dirEntry of Deno.readDir(directory)) {
        if(dirEntry.isDirectory) {
            const innerFiles = await getAllFilesRecursive(`${directory}/${dirEntry.name}`);
            innerFiles.forEach((path) => files.push(`${dirEntry.name}/${path}`))
        } else {
            files.push(dirEntry.name);
        }
    }

    return files
}
async function copyFiles(): Promise<void> {
    if (existsSync(SCHEMAS_DIR)) {
        Deno.removeSync(SCHEMAS_DIR, { recursive: true });
    }
    Deno.mkdirSync(SCHEMAS_DIR, { recursive: true });

    const schemasToProcess = new Array<{ readonly zodSchema: ZodSchema, readonly name: string }>();
    const filesToProcess = await getAllFilesRecursive(TYPES_DIR);
    for (const fileName of filesToProcess) {
        const name = fileName.replace(/\.tsx?$/, "");
        const module = await import(`${TYPES_DIR}/${fileName}`);
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
