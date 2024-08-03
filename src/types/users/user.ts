import { object, string } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import UserId from "./user-id.ts";

export const User = object({
    id: UserId,
    userName: string(),
    creationDate: string().datetime(),
}).readonly()

export default User;
