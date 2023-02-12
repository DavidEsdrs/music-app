import { Router, Request, Response } from "express";
import { ensureAuthUser } from "./middlewares/ensureAuthUser";
import { validateAndPartPlaylistPictureUpload } from "./middlewares/playlists/uploadPlaylistPicture";
import AppDataSource from "./ormconfig";
import { buildCreatePlaylist } from "./services/playlists/CreatePlaylist/buildCreatePlaylist";
import { buildGetFeaturedImg } from "./services/playlists/GetFeaturedImage/buildGetFeaturedImg";
import { buildGetOnePLaylist } from "./services/playlists/GetOne/buildGetOnePlaylist";
import { buildUploadFeaturedImgPlaylist } from "./services/playlists/UploadFeaturedImage/buildUploadFeaturedImgPlaylist";
import { buildCreateUser } from "./services/users/CreateUser/buildCreateUser";
import { buildLoginService } from "./services/users/LoginUser/buildLoginService";
import { validateLoginUser } from "./services/users/LoginUser/LoginUser.middleware";

const router = Router();

router.get("/", (req, res) => res.json("running"));

router.post("/users", (req, res) => buildCreateUser().handle(req, res));
router.post("/login", validateLoginUser, (req, res) => buildLoginService().handle(req, res));

router.post("/playlists", ensureAuthUser, (req, res) => buildCreatePlaylist().handle(req, res));

router.post("/playlists/:id/featured-image", ensureAuthUser, validateAndPartPlaylistPictureUpload, (req, res) => buildUploadFeaturedImgPlaylist().handle(req, res));

router.get("/playlists/:id", ensureAuthUser, (req, res) => buildGetOnePLaylist().handle(req, res));

router.get("/playlists/:id/featured-image", (req, res) => buildGetFeaturedImg().handle(req, res));

export default router;