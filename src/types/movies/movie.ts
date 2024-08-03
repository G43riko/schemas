import { object, number, string, array, record } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import Country from "../country.ts";
import MovieId from "./movie-id.ts";
import MakerAssignment from "./maker-assignment.ts";
import ExternalIds from "./external-ids.ts";

export const MovieRating = number().int().min(0).max(100);
/**
 * @see https://hackmd.io/LtxhCZgAR92vmgmCceCfnA
 * @see https://studio.apicur.io/apis/80194/editor
 * @see https://github.com/G43riko/homepage-nx/blob/master/libs/movies/movies-nest/src/lib/models/movies/movie.model.ts
 * This should contains all data saved in server
 */
export const Movie = object({
    year: number().optional(),
    id: MovieId,
    titles: record(string(), string()).readonly().default({}),
    contents: record(string(), string()).readonly().default({}),
    externalIds: ExternalIds.readonly().default({}),
    title: string(),
    originalTitle: string().optional(),
    genres: array(string()).readonly(),
    duration: number().positive().int().describe("Duration in minutes"),
    ratings: record(string(), MovieRating).readonly().describe("Ratings in different sources in percentage").default({}),
    userRatings: record(string(), MovieRating).readonly().describe("User ratings in percentage").default({}),
    calculatedDuration: object({
        calculationDate: string().datetime(),
        value: number().int().positive().describe("Average duration calculated based on durations")
    }).readonly().optional(),
    classification: string().optional().describe("PEGI classification"),
    calculatedRating: object({
        calculationDate: string().datetime(),
        value: MovieRating.describe("Average rating calculated based on ratings")
    }).readonly().optional(),
    durations: record(string(), number().int().positive()).readonly().describe("Durations from different sources").default({}),
    countries: array(Country).readonly().default([]),
    posters: array(string().url()).readonly().default([]),
    similar: array(MovieId).readonly().default([]),
    related: array(MovieId).readonly().default([]),
    makers: array(MakerAssignment).readonly().default([]),
}).readonly()

export default Movie;
