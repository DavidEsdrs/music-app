import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

const execute = promisify(exec);

export interface FileHandling {
    getFileType(path: string): Promise<string>;
    getSongDuration(path: string): Promise<number>;
    getPath(file_name: string): string;
} 

export class FFmpegFileHandling implements FileHandling {
    async getFileType(path: string): Promise<string> {
        const { stdout: file_type } = await execute(`ffprobe -v error "${path}" -print_format default=noprint_wrappers=1:nokey=1 -show_entries format=format_name`);
        return file_type;
    }

    async getSongDuration(path: string): Promise<number> {
        const { stdout: duration } = await execute(`ffprobe -v error "${path}" -print_format default=noprint_wrappers=1:nokey=1 -select_streams a -show_entries stream=duration`);
        return Number(duration);
    }

    getPath(file_name: string) {
        const __path = path.resolve(__dirname, "..", "..", "..", "uploads", "songs", file_name);
        return __path;
    }
}