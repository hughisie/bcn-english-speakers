import cn from "classnames";
import type { GenericMediaItem } from '../../types/types';

type HeroImageProps = {
  image: GenericMediaItem;
  class?: string;
};
export default function HeroImage({
  image,
  class: classes = "",
}: HeroImageProps) {
  if (!image) return null;
  return (
    <img
      src={image.url}
      alt={image.alt}
      class={cn("min-h-full object-cover", classes )}
    />
  );
}
