import { UserAccount } from "./user-account";

export interface UnsuspendRequest {
    user: UserAccount,
    reason: string,
    status: string,
    createdAt: string
}
