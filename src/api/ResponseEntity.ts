export class ResponseEntity<T> {
    deleted?: T;
    updated?: T;

    constructor(
        public message: string, 
        public status_code: number
    ) {}

    public static create<T>(args: ConstructorParameters<typeof ResponseEntity<T>>[0], args1: ConstructorParameters<typeof ResponseEntity<T>>[1]) {
        return new ResponseEntity<T>(args, args1);
    }
}