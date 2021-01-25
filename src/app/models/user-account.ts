import { UserProfile } from "./user-profile";
import { UserRole } from "./user-role";

export interface UserAccount {
    id: number
    accountName: string
    email: string
    walletAmount: number
    suspendedAt: string
    role: UserRole
    profile: UserProfile
}
