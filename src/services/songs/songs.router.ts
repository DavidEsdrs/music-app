import { Router } from "express";
import { ensureAuthUser } from "../../middlewares/ensureAuthUser";
import { validateAndParseSongFileUpload } from "../../middlewares/songs/uploadSongFile";
import { buildAddSongToPlaylist } from "../playlists/AddSongToPlaylist/builAddSongToPlaylist";
import { buildCreateSong } from "./CreateSong/buildCreateSong";
import { buildDonwloadSong } from "./DownloadSong/buildDownloadSong";
import { buildGetSongsFromPlaylist } from "./GetSongsFromPlaylist/buildGetSongsFromPlaylist";

const router = Router();

router.use(ensureAuthUser);

router.post("/playlist/:playlist/song/:song", (req, res) => buildAddSongToPlaylist().handle(req, res));

router.post("/playlist/songs", validateAndParseSongFileUpload, (req, res) => buildCreateSong().handle(req, res));

router.get("/playlist/:id/song", (req, res) => buildGetSongsFromPlaylist().handle(req, res));

router.get("/song/:song/donwload", (req, res) => buildDonwloadSong().handle(req, res));

export { router as songsRouter };