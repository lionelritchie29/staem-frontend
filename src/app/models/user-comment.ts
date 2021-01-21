import { UserAccount } from "./user-account";

export interface UserComment {
    srcUser: UserAccount
    destUser: UserAccount
    content: string
    createdAt: string
}
