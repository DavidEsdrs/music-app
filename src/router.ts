import { Router, Request, Response } from "express";
import { playlistsRouter } from "./services/playlists/playlists.router";
import { songsRouter } from "./services/songs/songs.router";
import { usersRouter } from "./services/users/users.router";

const router = Router();

router.get("/", (req, res) => res.json("running"));

router.use(playlistsRouter);
router.use(usersRouter);
router.use(songsRouter);

export default router;