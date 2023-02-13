declare namespace Express {
    export interface Request {
        user_id: number;
        file_props?: { file_name: string, file_type: string };
    }
}