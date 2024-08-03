import { object, number, string, array, record } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const MakerId = string().brand("MakerId");
/**
 * @see https://hackmd.io/LtxhCZgAR92vmgmCceCfnA
 * @see https://github.com/G43riko/homepage-nx/blob/master/libs/movies/movies-nest/src/lib/models/makers/maker.model.ts
 */
export const Maker = object({
    id: MakerId,
    externalIds: record(string(), string()),
    fullName: string(),
    birthday: string().describe("Year of full birdhday in format YYYY-MM-DD"),
    photos: array(string().url()),
}).readonly()

export default Maker;
