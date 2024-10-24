import { object,  string, array } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import MakerId from "./maker-id.ts";
import MakerRole from "./maker-role.ts";

/**
 * @see https://hackmd.io/LtxhCZgAR92vmgmCceCfnA
 * @see https://studio.apicur.io/apis/80194/editor
 * @see https://github.com/G43riko/homepage-nx/blob/master/libs/movies/movies-nest/src/lib/models/makers/maker.model.ts
 */
const MakerAssignment = object({
    makerId: MakerId,
    characterNames: array(string().optional()).default([]),
    role: MakerRole,
}).readonly().openapi("MakerAssignment")

export default MakerAssignment;
