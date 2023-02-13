import { Router, Request, Response } from "express";
import { ensureAuthUser } from "./middlewares/ensureAuthUser";
import { ensureAuthUserSoft } from "./middlewares/ensureAuthUserSoft";
import { validateAndPartPlaylistPictureUpload } from "./middlewares/playlists/uploadPlaylistPicture";
import { validateAndParseSongFileUpload } from "./middlewares/songs/uploadSongFile";
import { buildAddPlaylistToUser } from "./services/playlists/AddPlaylistToUser/buildAddPlaylistToUser";
import { buildAddSongToPlaylist } from "./services/playlists/AddSongToPlaylist/builAddSongToPlaylist";
import { buildCreatePlaylist } from "./services/playlists/CreatePlaylist/buildCreatePlaylist";
import { validateCreatePlaylist } from "./services/playlists/CreatePlaylist/CreatePlaylist.middleware";
import { buildDeletePlaylist } from "./services/playlists/DeletePlaylist/buildDeletePlaylist";
import { buildGetPlaylistsFromUser } from "./services/playlists/GetPlaylistsFromUser/buildGetPlaylistsFromUser";
import { buildCreateSong } from "./services/songs/CreateSong/buildCreateSong";
import { buildCreateUser } from "./services/users/CreateUser/buildCreateUser";
import { buildLoginService } from "./services/users/LoginUser/buildLoginService";
import { validateLoginUser } from "./services/users/LoginUser/LoginUser.middleware";

const router = Router();

router.get("/", (req, res) => res.json("running"));

router.post("/users", (req, res) => buildCreateUser().handle(req, res));
router.post("/login", validateLoginUser, (req, res) => buildLoginService().handle(req, res));

router.post("/playlist", ensureAuthUser, validateCreatePlaylist, (req, res) => buildCreatePlaylist().handle(req, res));
router.delete("/playlist/:id", ensureAuthUser, (req, res) => buildDeletePlaylist().handle(req, res));

router.get("/user/:user_id/playlist", ensureAuthUserSoft, (req, res) => buildGetPlaylistsFromUser().handle(req, res));

router.post("/playlist/:playlist/song/:song", ensureAuthUser, (req, res) => buildAddSongToPlaylist().handle(req, res));

router.post("/playlist/songs", ensureAuthUser, validateAndParseSongFileUpload, (req, res) => buildCreateSong().handle(req, res));

router.post("/user/playlist/:id", ensureAuthUser, (req, res) => buildAddPlaylistToUser().handle(req, res));

export default router;