import {string } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const MovieTag = string().brand("MovieTag").openapi("MovieTag");
export default MovieTag;
