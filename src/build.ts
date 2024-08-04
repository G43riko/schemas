import { existsSync } from "https://deno.land/std/fs/mod.ts";
import { generateSchemasFor } from "./json-schema-generator.ts";
import { generateOpenApisFor } from "./open-api-generator.ts";
import { basename } from "https://deno.land/std@0.224.0/path/mod.ts";

const TYPES_DIR = `${import.meta.dirname}/types`;
const SCHEMAS_DIR = `${import.meta.dirname}/../definitions`;

async function getAllFilesRecursive(directory: string): Promise<readonly string[]> {
    const files = new Array<string>();

    for await (const dirEntry of Deno.readDir(directory)) {
        if (dirEntry.isDirectory) {
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

    const schemasToProcess = new Array<SchemaToGenerateEntry>();
    const filesToProcess = await getAllFilesRecursive(TYPES_DIR);
    for (const fileName of filesToProcess) {
        const path = fileName.replace(/\.tsx?$/, "");
        const module = await import(`${TYPES_DIR}/${fileName}`);
        const zodSchema = module.default;
        schemasToProcess.push({ zodSchema, path, name: basename(path) });
    }

    generateSchemasFor(schemasToProcess);
    generateOpenApisFor(schemasToProcess);
}

copyFiles();
