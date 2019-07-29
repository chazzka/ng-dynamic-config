export interface User {
    dbID: number;
    description: string;
    fullName: string;
    roleNames: string[];
    userId: string;
    removed?: boolean;
}
