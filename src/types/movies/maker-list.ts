import { object, boolean, string, array, number } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import Maker from "./maker.ts";
import UserId from "../users/user-id.ts";
import MakerListType from "./maker-list-type.ts";

const MakerList = object({
    creationDate: string().datetime(),
    updateDate: string().datetime(),
    makers: array(Maker).readonly(),
    name: string(),
    ownerId: UserId,
    description: string().optional(),
    ownerName: string().optional(),
    movieCount: number().optional(),
    public: boolean(),
    type: MakerListType,
})

export default MakerList;
