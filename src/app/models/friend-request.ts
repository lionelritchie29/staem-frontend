import { UserAccount } from "./user-account";

export interface FriendRequest {
    friend: UserAccount
    status: string
    createdAt: string
}
