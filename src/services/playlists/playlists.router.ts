import { Router } from "express";
import { ensureAuthUser } from "../../middlewares/ensureAuthUser";
import { ensureAuthUserSoft } from "../../middlewares/ensureAuthUserSoft";
import { buildAddPlaylistToUser } from "./AddPlaylistToUser/buildAddPlaylistToUser";
import { buildCreatePlaylist } from "./CreatePlaylist/buildCreatePlaylist";
import { validateCreatePlaylist } from "./CreatePlaylist/CreatePlaylist.middleware";
import { buildDeletePlaylist } from "./DeletePlaylist/buildDeletePlaylist";
import { buildGetPlaylistsFromUser } from "./GetPlaylistsFromUser/buildGetPlaylistsFromUser";

const router = Router();

router.get("/user/:user_id/playlist", ensureAuthUserSoft, (req, res) => buildGetPlaylistsFromUser().handle(req, res));

router.post("/playlist", ensureAuthUser, validateCreatePlaylist, (req, res) => buildCreatePlaylist().handle(req, res));

router.post("/user/playlist/:id", ensureAuthUser, (req, res) => buildAddPlaylistToUser().handle(req, res));

router.delete("/playlist/:playlist_id", ensureAuthUser, (req, res) => buildDeletePlaylist().handle(req, res));

export { router as playlistsRouter };