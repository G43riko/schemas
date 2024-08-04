import { string } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const UserId = string().brand("UserId").openapi("UserId");

export default UserId;
