import {enum as enumZ } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const MovieListType = enumZ(["WATCHED", "FAVOURITES", "CUSTOM"])

export default MovieListType;