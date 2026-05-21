export interface IUser {
    name: string;
    email: string;
    password: string;
    role: "contributor" | "maintainer";
}

export const  UserRole = {
    contributor: "contributor",
    maintainer: "maintainer"
} as const;

export type Role = "contributor" | "maintainer"