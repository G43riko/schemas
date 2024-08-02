import { zodToJsonSchema, ignoreOverride } from "npm:zod-to-json-schema";
import {ZodSchema} from "https://deno.land/x/zod@v3.23.8/mod.ts";
const map = new Map<ZodSchema, string>();
const TYPES_DIR = `${import.meta.dirname}/types`;
const SCHEMAS_DIR = `${import.meta.dirname}/../schemas`;


function copyModule(module: any, name: string): void {
    const zodSchema = module.default;
    const jsonSchema = zodToJsonSchema(zodSchema, {
        name,
        basePath:["https://g43riko.github.io/schemas"], 
        nameStrategy: "title", 
        // definitionPath: "ascac",
        override: (zod, refs) =>  {
            const lastName = refs.currentPath.at(-1);
            const existingZodValue =  map.get(zod)
            
            if(lastName !== name && existingZodValue) {
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
    Deno.mkdirSync(SCHEMAS_DIR, {recursive: true});
    const modulesToParse = new Array<{module: any, name: string}>()
    for await (const dirEntry of Deno.readDir(TYPES_DIR)) {
        
        const [name] = dirEntry.name.split(".");
        const module = await import(`${TYPES_DIR}/${dirEntry.name}`);
        modulesToParse.push({module, name});
        const zodSchema = module.default;
        map.set(zodSchema._def, name);
    }

    for await (const {module, name} of modulesToParse) {
        await copyModule(module, `${name}`);
    }
}

copyFiles();
