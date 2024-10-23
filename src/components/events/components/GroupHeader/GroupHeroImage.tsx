import type { GenericMediaItem } from "../../../../types/types";

type GroupHeroImageProps = {
  image: GenericMediaItem;
};
export default function GroupHeroImage({ image }: GroupHeroImageProps) {
  if (!image) return null;
  return (
    <img src={image.url} alt={image.alt} class="min-h-full object-cover" />
  );
}
