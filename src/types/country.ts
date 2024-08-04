import { string } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const Country = string().brand("Country").openapi("Country");

export default Country;
