import {string } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const MovieId = string().brand("MovieId");
export default MovieId;
