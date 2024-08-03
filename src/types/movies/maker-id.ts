import { string } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const MakerId = string().brand("MakerId");

export default MakerId;
