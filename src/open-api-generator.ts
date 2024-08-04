import { OpenAPIRegistry, extendZodWithOpenApi, OpenApiGeneratorV3 } from "npm:@asteasolutions/zod-to-openapi";
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import { basename } from "https://deno.land/std@0.224.0/path/mod.ts";
import { GenerationData } from "./generation-data.ts";
import {kebabCaseToUpperCamelCase} from "./misc-utils.ts";

extendZodWithOpenApi(z);

const OPEN_API_DIR = `${import.meta.dirname}/../open-api`;

export function generateOpenApisFor(schemasToProcess: GenerationData): void {
    const registry = new OpenAPIRegistry();

    for (const { zodSchema, name } of schemasToProcess) {

        const openapiName = zodSchema._def.openapi?._internal.refId;
        registry.register(openapiName ?? kebabCaseToUpperCamelCase(name), zodSchema);
    }

    const generator = new OpenApiGeneratorV3(registry.definitions);
    const openApiFileContent = generator.generateComponents();

    const openApiFileDocumentContent = generator.generateDocument({
        openapi: '3.0.0',
        info: {
          version: '1.0.0',
          title: 'Schemas',
          description: 'This is the API containing all the schemas',
        },
    })
    Deno.mkdirSync(OPEN_API_DIR, { recursive: true });
    Deno.writeTextFileSync(`${OPEN_API_DIR}/openapi.json`, JSON.stringify(openApiFileDocumentContent, null, 4));
}
