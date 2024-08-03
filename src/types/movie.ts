import { object, number, string, array, record } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import Maker from "./maker.ts";

export const MovieId = string().brand("MovieId");
export const MovieRating = number().int().min(0).max(100);
/**
 * @see https://hackmd.io/LtxhCZgAR92vmgmCceCfnA
 * @see https://github.com/G43riko/homepage-nx/blob/master/libs/movies/movies-nest/src/lib/models/movies/movie.model.ts
 */
export const Movie = object({
    year: number(),
    id: MovieId,
    titles: record(string(), string()),
    content: string(),
    contents: record(string(), string()),
    externalIds: record(string(), string()),
    title: string(),
    originalTitle: string().optional(),
    genres: array(string()).readonly(),
    duration: number().positive().int().describe("Duration in minutes"),
    ratings: record(string(), MovieRating).describe("Ratings in different sources in percentage").default({}),
    userRatings: record(string(), MovieRating).describe("User ratings in percentage").default({}),
    calculatedDuration: object({
        calculationDate: string().datetime(),
        value: number().int().positive().describe("Average duration calculated based on durations")
    }).optional(),
    classification: string().optional().describe("PEGI classification"),
    calculatedRating: object({
        calculationDate: string().datetime(),
        value: MovieRating.describe("Average rating calculated based on ratings")
    }).optional(),
    durations: record(string(), number().int().positive()).describe("Durations from different sources").default({}),
    countries: array(string()).readonly(),
    posters: array(string().url()).default([]),
    similar: array(MovieId).default([]),
    related: array(MovieId).default([]),
    makers: array(Maker),
}).readonly()

export default Movie;
