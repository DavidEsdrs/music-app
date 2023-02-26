export interface FileHandling {
    getFileType(path: string): Promise<string>;
    getSongDuration(path: string): Promise<number>;
    getPath(file_name: string): string;
} 
