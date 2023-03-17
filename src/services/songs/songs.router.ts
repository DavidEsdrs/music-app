import { query, Router } from "express";
import { ensureAuthUser } from "../../middlewares/ensureAuthUser";
import { ensureAuthUserSoft } from "../../middlewares/ensureAuthUserSoft";
import { validateAndParseSongFileUpload } from "../../middlewares/songs/uploadSongFile";
import { buildAddSongToPlaylist } from "../playlists/AddSongToPlaylist/builAddSongToPlaylist";
import { buildCreateSong } from "./CreateSong/buildCreateSong";
import { buildDeleteSong } from "./DeleteSong/buildDeleteSong";
import { buildDonwloadSong } from "./DownloadSong/buildDownloadSong";
import { buildGetSong } from "./GetSong/buildGetSong";
import { buildGetSongsFromPlaylist } from "./GetSongsFromPlaylist/buildGetSongsFromPlaylist";
import { getSongsFromPlaylistQuerySchema } from "./GetSongsFromPlaylist/getSongsFromPlaylist.middleware";
import { validateBody, validateQuery } from "../../utils/validations";
import { getSongSchema } from "./GetSong/getSong.middleware";
import { createSongSchema } from "./CreateSong/CreateSong.middleware";

const router = Router();

router.post("/playlist/:playlist/song/:song", ensureAuthUser, (req, res) => buildAddSongToPlaylist().handle(req, res));

router.post("/songs", ensureAuthUser, validateAndParseSongFileUpload, validateBody(createSongSchema), (req, res) => buildCreateSong().handle(req, res));

router.get("/playlist/:id/song", ensureAuthUserSoft, query({ plainObjects: true }), validateQuery(getSongsFromPlaylistQuerySchema), (req, res) => buildGetSongsFromPlaylist().handle(req, res));

router.get("/song/:song/stream", ensureAuthUserSoft, (req, res) => buildDonwloadSong().handle(req, res));

router.get("/song/:id", ensureAuthUser, query({ plainObjects: true }), validateQuery(getSongSchema), (req, res) => buildGetSong().handle(req, res));

router.delete("/song/:id", ensureAuthUser, (req, res) => buildDeleteSong().handle(req, res));

export { router as songsRouter };