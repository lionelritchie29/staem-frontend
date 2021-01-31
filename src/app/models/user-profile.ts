import { AnimatedAvatar } from './animated-avatar';
import { AvatarFrame } from './avatar-frame';
import { ChatSticker } from './chat-sticker';
import { MiniProfileBackground } from './mini-profile-background';
import { ProfileBackground } from './profile-background';

export interface UserProfile {
  displayName: string;
  level: number;
  point: number;
  customURL: string;
  avatarFrameUrl: string;
  profilePictureUrl: string;
  profileBackgroundUrl: string;
  miniProfileBackgroundUrl: string;
  theme: string;
  featuredBadgeUrl: string;
  realName: string;
  country: string;
  summary: string;
  avatarFrames: AvatarFrame[];
  profileBackgrounds: ProfileBackground[];
  miniProfileBackgrounds: MiniProfileBackground[];
  chatStickers: ChatSticker[];
  animatedAvatars: AnimatedAvatar[];
}
