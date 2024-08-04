import {string } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const MovieId = string().brand("MovieId").openapi("MovieId");
export default MovieId;
