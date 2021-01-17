const BASE_URL:string = "http://localhost:2000";

export const GLOBALS = {
    GRAPHQL_ENDPOINT : `${BASE_URL}/api`,
    IMAGE_ENDPOINT : `${BASE_URL}/images`,
}

export const getGameImageUrl = (gameId: number, url: string): string => {
    return `${GLOBALS.IMAGE_ENDPOINT}/games/${gameId}/${url}`;
}