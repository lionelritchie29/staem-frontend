import { rejects } from 'assert';
import { resolve } from 'dns';
import { environment } from 'src/environments/environment';

const BASE_URL: string = environment.BASE_URL;

export const GLOBALS = {
  GRAPHQL_ENDPOINT: `${BASE_URL}/api`,
  IMAGE_ENDPOINT: `${BASE_URL}/images`,
  USER_DEFAULT_ROLE: 'user-default',
  ADMIN_GAME_ROLE: 'admin-game',
  ADMIN_PROMO_ROLE: 'admin-promo',
  ADMIN_USER_ROLE: 'admin-user',
  ADMIN_MASTER_ROLE: 'admin-master',
};

export const getGameImageUrl = (gameId: number, url: string): string => {
  return `${GLOBALS.IMAGE_ENDPOINT}/games/${gameId}/${url}`;
};

export const getUserImageUrl = (url: string): string => {
  return `${GLOBALS.IMAGE_ENDPOINT}/avatars/${url}`;
  // return `${GLOBALS.IMAGE_ENDPOINT}/avatars/default.jpg`;
};

export const getAvatarFrameImageUrl = (url: string): string => {
  return `${GLOBALS.IMAGE_ENDPOINT}/avatar-frame/${url}`;
};

export const getProfileBgUrl = (url: string): string => {
  return `${GLOBALS.IMAGE_ENDPOINT}/background/${url}`;
};

export const getMiniProfileBgUrl = (url: string): string => {
  return `${GLOBALS.IMAGE_ENDPOINT}/mini-background/${url}`;
};

export const getChatStickerUrl = (url: string): string => {
  return `${GLOBALS.IMAGE_ENDPOINT}/stickers/${url}`;
};

export const getAnimatedAvatarUrl = (url: string): string => {
  return `${GLOBALS.IMAGE_ENDPOINT}/animated-avatars/${url}`;
};

export const getGameItemImageUrl = (gameId: number, url: string): string => {
  return `${GLOBALS.IMAGE_ENDPOINT}/game-items/1/${url}`;
};

export const getImageVideoPostImageUrl = (url: string): string => {
  return `${GLOBALS.IMAGE_ENDPOINT}/image-video-posts/${url}`;
};

export const convertDateTimeToDate = (datetime: string) => {
  return new Date(Date.parse(datetime));
};

export const convertFileToBase64 = (file): Promise<any> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((<any>reader.result).replace(/^.*,/, ''));
  });
};

export const getMonthName = (monthNumber: number): string => {
  switch (monthNumber) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
  }
};
