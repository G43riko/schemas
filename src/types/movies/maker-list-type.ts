import {nativeEnum } from "https://deno.land/x/zod@v3.23.8/mod.ts";

enum MakerListType {
    FAVOURITES = "FAVOURITES",
    CUSTOM = "CUSTOM",
}
const MakerListTypeZ = nativeEnum(MakerListType).openapi("MakerListType");

export default MakerListTypeZ;