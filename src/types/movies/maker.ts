import { object, string, array, record } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import ExternalIds from "./external-ids.ts";
import Country from "../country.ts";
import MakerId from "./maker-id.ts";

/**
 * @see https://hackmd.io/LtxhCZgAR92vmgmCceCfnA
 * @see https://studio.apicur.io/apis/80194/editor
 * @see https://github.com/G43riko/homepage-nx/blob/master/libs/movies/movies-nest/src/lib/models/makers/maker.model.ts
 */
export const Maker = object({
    id: MakerId,
    externalIds: ExternalIds.readonly().default({}),
    bibliography: record(string(), string()).optional(),
    fullName: string(),
    firstName: string(),
    lastName: string(),
    birthplace: string().optional(),
    fromCountry: Country.optional(),
    birthday: string().optional().describe("Year of full birdhday in format YYYY-MM-DD"),
    photos: array(string().url()).default([]),
}).readonly()

export default Maker;
