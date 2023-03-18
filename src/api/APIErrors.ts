export class APIErrors extends Error {
    status: number;

    constructor(status: number, message?: string) {
        super(message);
        Object.setPrototypeOf(this, APIErrors.prototype);
        this.status = status;
    }
}

export class EmailAlreadyExistsError extends APIErrors {
    constructor() {
        super(401, "Invalid credentials!");
    }
}

export class InvalidCredentialsError extends APIErrors {
    constructor() {
        super(401, "Invalid credentials!");
    }
}

export class UserDoesntExistsError extends APIErrors {
    constructor() {
        super(401, "Invalid credentials!");
    }
}

export class UnprocessableEntityError extends APIErrors {
    constructor(message?: string) {
        super(422, message ?? "Unprocessable Entity!");
    }
}

export class UnauthorizedRequestError extends APIErrors {
    constructor() {
        super(401, "Access denied! You need to be authorized to perform this action!");
    }
}

export class ForbiddenRequestError extends APIErrors {
    constructor() {
        super(403, "Access forbidden! Invalid credentials!");
    }
}

export class PlaylistsNotFoundError extends APIErrors {
    constructor() {
        super(404, "Playlist not found!");
    }
}

export class SongNotFoundError extends APIErrors {
    constructor() {
        super(404, "Song not found!");
    }
}

export class DuplicateSongEntryError extends APIErrors {
    constructor() {
        super(409, "The song is already in the playlist!");
    }
}

export class DefaultPlaylistDeleteError extends APIErrors {
    constructor() {
        super(422, "Can't delete default playlist!");
    }
}

export class DuplicateTagError extends APIErrors {
    constructor() {
        super(409, "Duplicate tag entry!");
    }
}