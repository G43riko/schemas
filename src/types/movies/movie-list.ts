import { object, boolean, string, array } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import Movie from "./movie.ts";
import UserId from "../users/user-id.ts";
import MovieListType from "./movie-list-type.ts";

const MovieList = object({
    creationDate: string().datetime(),
    movies: array(Movie).readonly(),
    name: string(),
    ownerId: UserId,
    public: boolean(),
    type: MovieListType,
})

export default MovieList;
