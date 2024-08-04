import {string } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const MakerRole = string().brand("MakerRole").openapi("MakerRole");

export default MakerRole;
