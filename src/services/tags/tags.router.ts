import { query, Router } from "express";
import { ensureAuthUser } from "../../middlewares/ensureAuthUser";
import { buildCreateTag } from "./CreateTag/buildCreateTag";
import { buildGetFeaturedSongs } from "./GetFeaturedSongs/buildGetFeaturedSongs";
import { buildSearchByTag } from "./SearchByTag/buildSearchByTag";

const router = Router();

router.post("/tag", ensureAuthUser, (req, res) => buildCreateTag().handle(req, res));

router.get("/search", ensureAuthUser, query({ plainObjects: true }), (req, res) => buildSearchByTag().handle(req, res));

router.get("/song/:song/related", ensureAuthUser, (req, res) => buildGetFeaturedSongs().handle(req, res));

export { router as tagsRouter };