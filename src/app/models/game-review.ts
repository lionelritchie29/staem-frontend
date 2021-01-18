import { UserAccount } from "./user-account";

export interface GameReview {
    id: number
    gameId: number
    title: string
    content: string
    upvoteCount: number
    downvoteCount: number
    isRecommended: boolean
    reviewDateTime: string
    user: UserAccount
}
