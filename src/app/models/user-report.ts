import { UserAccount } from "./user-account";

export interface UserReport {
    user: UserAccount
    reporter: UserAccount
    reason: string
    createdAt: string
}
