const BASE_URL:string = "http://localhost:2000";

export const GLOBALS = {
    GRAPHQL_ENDPOINT : `${BASE_URL}/api`,
    IMAGE_ENDPOINT : `${BASE_URL}/images`,
}

export const getGameImageUrl = (gameId: number, url: string): string => {
    return `${GLOBALS.IMAGE_ENDPOINT}/games/${gameId}/${url}`;
}

export const getUserImageUrl = (url: string): string => {
    return `${GLOBALS.IMAGE_ENDPOINT}/avatars/${url}`;
    // return `${GLOBALS.IMAGE_ENDPOINT}/avatars/default.jpg`;
} 

export const convertDateTimeToDate = (datetime: string) => {
    return new Date(Date.parse(datetime));
}

export const getMonthName = (monthNumber: number): string => {
    switch(monthNumber) {
        case 1:
            return 'January'
        case 2:
            return 'February'
        case 3:
            return 'March'
        case 4:
            return 'April'
        case 5:
            return 'May'
        case 6:
            return 'June'
        case 7:
            return 'July'
        case 8:
            return 'August'
        case 9:
            return 'September'
        case 10:
            return 'October'
        case 11:
            return 'November'
        case 12:
            return 'December'
    }
}