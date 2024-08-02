import {record, string} from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const LangMap = record(string(), string());
export default LangMap;