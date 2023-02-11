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
    constructor() {
        super(422, "Unprocessable Entity!");
    }
}