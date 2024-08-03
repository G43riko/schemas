import { object,  string } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import MakerId from "./maker-id.ts";
import MakerRole from "./maker-role.ts";

/**
 * @see https://hackmd.io/LtxhCZgAR92vmgmCceCfnA
 * @see https://studio.apicur.io/apis/80194/editor
 * @see https://github.com/G43riko/homepage-nx/blob/master/libs/movies/movies-nest/src/lib/models/makers/maker.model.ts
 */
export const MakerAssignment = object({
    makerId: MakerId,
    characterName: string().optional(),
    role: MakerRole,
}).readonly()

export default MakerAssignment;
