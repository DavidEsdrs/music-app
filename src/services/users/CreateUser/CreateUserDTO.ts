export interface ICreateUserDTO {
    username: string;
    email: string;
    password: string;
    bio?: string;
    path_profile_picture?: string;
}