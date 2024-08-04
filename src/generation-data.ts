import { ZodSchema } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export interface SchemaToGenerateEntry {
    readonly zodSchema: ZodSchema, 
    readonly path: string,
    /**
     * Name in kebab-case
     */
    readonly name: string
}
export type GenerationData = SchemaToGenerateEntry[]