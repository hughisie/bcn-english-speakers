import type { GenericMediaItem } from './types';

export const LOCAL_STORAGE_KEYS = {
  APP_STATE: "appState",
};

export const PLACEHOLDER_HERO: GenericMediaItem = {
  id: "generic-item",
  url: "https://cdn.pocketbarcelona.com/app/places/images/avif/placeholder_large.avif",
  alt: "Hero",
  mediaType: "IMAGE",
  createdTime: new Date(),
};
