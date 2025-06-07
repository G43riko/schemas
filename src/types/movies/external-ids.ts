import { string, record } from "https://deno.land/x/zod@v3.23.8/mod.ts";
export const ExternalId = string();
export const ExternalSource = string();
export const ExternalIds = record(ExternalSource, ExternalId).readonly().default({}).openapi("ExternalIds");

export default ExternalIds;
