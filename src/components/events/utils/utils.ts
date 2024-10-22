import type { GenericMediaItem } from "../../../types/types";

export const getFeaturedMediaItem = (
  mediaItems: GenericMediaItem[]
): GenericMediaItem | undefined => {
  return mediaItems.find((i) => i.featured);
};
