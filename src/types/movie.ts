import {object, number, string, array, record} from "https://deno.land/x/zod@v3.23.8/mod.ts";
import {LangMap} from "./lang-map.ts";

export const MovieId = string().brand("MovieId");

/**
 * @see https://hackmd.io/LtxhCZgAR92vmgmCceCfnA
 */
export const Movie = object({
    year: number(),
    id: MovieId,
    titles: LangMap,
    content: string(),
    contents: LangMap,
    title: string(),
    originalTitle: string().optional(),
    genres: array(string()).readonly(),
    duration: number().positive().int().describe("Duration in minutes"),
    ratings: record(string(), number().int().min(0).max(100)).describe("Ratings in different sources in percentage").default({}),
    userRatings: record(string(), number().int().min(0).max(100)).describe("User ratings in percentage").default({}),
    calculatedDuratio : object({
        calculationDate: string().datetime(),
        value: number().int().positive().describe("Average duration calculated based on durations")
    }),
    classification: string().optional().describe("PEGI classification"),
    calculatedRating: object({
        calculationDate: string().datetime(),
        value: number().int().min(0).max(100).describe("Average rating calculated based on ratings")
    }),
    durations: record(string(), number().int().positive()).describe("Durations from different sources").default({}),
    countries: array(string()).readonly(),
    posters: array(string().url()).default([]),
    similar: array(MovieId).default([]),
    related: array(MovieId).default([]),
}).readonly()

export default Movie;

export const definitions = {["lang-map"]: LangMap}