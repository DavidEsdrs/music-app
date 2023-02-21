import { Playlist } from "../entities/Playlist";
import { User } from "../entities/User";

export const fulfillPlaylist = (playlist: Playlist) => ({ ...playlist, songs_url: `${process.env.API_URL}/playlist/${playlist.id}/song` }) as Playlist;

export const fulfillUser = (user: User) => ({ ...user, playlists_url: `${process.env.API_URL}/user/${user.id}/playlist`, password: undefined }) as User;