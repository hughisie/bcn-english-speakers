import type { GenericMediaItem } from "../../../../types/types";

type GroupLogoProps = {
  logo: GenericMediaItem;
};
export default function GroupLogo({ logo }: GroupLogoProps) {
  if (!logo) return null;
  return (
    <img
      src={logo.url}
      alt="Placeholder"
      class="object-cover aspect-square w-32 h-32 absolute -bottom-16 left-4 border-4 border-white rounded-md"
    />
  );
}
