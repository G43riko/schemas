import { object, number, string, array, record } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import Country from "../country.ts";
import MovieId from "./movie-id.ts";
import MakerAssignment from "./maker-assignment.ts";
import ExternalIds from "./external-ids.ts";
import MovieTag from "./movie-tag.ts";

export const MovieRating = number().int().min(0).max(100).describe("Value in percentage");

const UserId = string();
/**
 * @see https://hackmd.io/LtxhCZgAR92vmgmCceCfnA
 * @see https://studio.apicur.io/apis/80194/editor
 * @see https://github.com/G43riko/homepage-nx/blob/master/libs/movies/movies-nest/src/lib/models/movies/movie.model.ts
 * This should contains all data saved in server
 */
export const Movie = object({
    id: MovieId,
    title: string(),
    originalTitle: string().optional(),
    titles: record(string(), string()).readonly().default({}),
    year: number().int().optional().meta({examples: [2021]}),
    contents: record(string(), string()).readonly().default({}).describe("Contents in different languages"),
    externalIds: ExternalIds,
    genres: array(string()).readonly(),
    duration: number().positive().int().describe("Duration in minutes"),
    ratings: record(string(), object({
        rating: MovieRating,
        count: number(),
        date: string().datetime(),
    })).readonly().describe("Ratings in different sources in percentage").default({}),
    userRatings: record(UserId, MovieRating).readonly().describe("User ratings in percentage").default({}),
    calculatedDuration: object({
        calculationDate: string().datetime(),
        value: number().int().positive().describe("Estimated average duration calculated from multiple sources")
    }).readonly().optional(),
    classification: string().optional().describe("PEGI classification. Available values are 'PEGI 3', 'PEGI 7', 'PEGI 12', 'PEGI 16', 'PEGI 18'"),
    calculatedRating: object({
        calculationDate: string().datetime(),
        value: MovieRating.describe("Average rating calculated based on ratings")
    }).readonly().optional(),
    durations: record(string(), number().int().positive()).readonly().describe("Durations in minutes from different sources").default({}),
    countries: array(Country).readonly().default([]).describe("Array of countries"),
    posters: array(string().url()).readonly().default([]),
    similar: array(MovieId).readonly().default([]),
    related: array(MovieId).readonly().default([]),
    tags: array(MovieTag).readonly().default([]),
    makers: array(MakerAssignment).readonly().default([]),
}).readonly()

export default Movie;
