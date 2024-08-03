import { string, record } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const ExternalIds = record(string(), string()).readonly()

export default ExternalIds;
