import { string, record } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const ExternalIds = record(string(), string()).readonly().default({}).openapi("ExternalIds");

export default ExternalIds;
