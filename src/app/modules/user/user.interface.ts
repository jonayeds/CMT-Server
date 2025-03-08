export interface IUser {
    name:string;
    id:string;
    password:string;
    email:string;
    profileImage:string;
    role:"faculty" | "student";
}