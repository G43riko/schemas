import { object, boolean, string, array } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import Maker from "./maker.ts";
import UserId from "../users/user-id.ts";
import MakerListType from "./maker-list-type.ts";

const MakerList = object({
    creationDate: string().datetime(),
    makers: array(Maker).readonly(),
    name: string(),
    ownerId: UserId,
    public: boolean(),
    type: MakerListType,
})

export default MakerList;
