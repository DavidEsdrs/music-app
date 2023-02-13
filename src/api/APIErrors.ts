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