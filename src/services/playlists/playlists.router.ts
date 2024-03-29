import { query, Router } from "express";
import { ensureAuthUser } from "../../middlewares/ensureAuthUser";
import { ensureAuthUserSoft } from "../../middlewares/ensureAuthUserSoft";
import { parseJson } from "../../middlewares/parseJson.middleware";
import { validateAndParsePlaylistPictureUpload } from "../../middlewares/playlists/uploadPlaylistPicture";
import { validateBody, validateQuery } from "../../utils/validations";
import { buildAddPlaylistToUser } from "./AddPlaylistToUser/buildAddPlaylistToUser";
import { buildCreatePlaylist } from "./CreatePlaylist/buildCreatePlaylist";
import { playlistSchema } from "./CreatePlaylist/CreatePlaylist.middleware";
import { buildDeletePlaylist } from "./DeletePlaylist/buildDeletePlaylist";
import { buildDownloadPlaylistPicture } from "./DownloadPlaylistPicture/buildDownloadPlaylistPicure";
import { buildGetPlaylist } from "./GetPlaylist/buildGetPlaylist";
import { getPlaylistSchema } from "./GetPlaylist/getPlaylist.middleware";
import { buildGetPlaylists } from "./GetPlaylists/buildGetPlaylists";
import { buildGetPlaylistsFromUser } from "./GetPlaylistsFromUser/buildGetPlaylistsFromUser";
import { buildRemoveSongFromPlaylist } from "./RemoveSongFromPlaylist/buildRemoveSongFromPlaylist";
import { buildUpdatePlaylist } from "./UpdatePlaylist/buildUpdatePlaylist";

const router = Router();

router.get("/playlist/:id", ensureAuthUserSoft, query({ plainObjects: true }), validateQuery(getPlaylistSchema), (req, res) => buildGetPlaylist().handle(req, res));

router.get("/user/:user_id/playlist", ensureAuthUser, query({ plainObjects: true }), validateQuery(getPlaylistSchema), (req, res) => buildGetPlaylistsFromUser().handle(req, res));

router.get("/playlist", query({ plainObjects: true }), (req, res) => buildGetPlaylists().handle(req, res));

router.get("/playlist/:id/picture", ensureAuthUser, (req, res) => buildDownloadPlaylistPicture().handle(req, res));

router.post("/playlist", ensureAuthUser, validateAndParsePlaylistPictureUpload, parseJson, validateBody(playlistSchema), (req, res) => buildCreatePlaylist().handle(req, res));

router.post("/user/playlist/:id", ensureAuthUser, (req, res) => buildAddPlaylistToUser().handle(req, res));

router.delete("/playlist/:playlist_id", ensureAuthUser, (req, res) => buildDeletePlaylist().handle(req, res));

router.delete("/playlist/:playlist/song/:song", ensureAuthUser, (req, res) => buildRemoveSongFromPlaylist().handle(req, res));

router.put("/playlist/:id", validateAndParsePlaylistPictureUpload, ensureAuthUser, (req, res) => buildUpdatePlaylist().handle(req, res));

export { router as playlistsRouter };