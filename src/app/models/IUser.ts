export interface IUser
{
    id: number,
    username: string,
    password: string,
    email: string,
    isActive: boolean,
    action?: string
}