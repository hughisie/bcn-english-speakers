import type { MeetupGroupItem } from "../../../../types/types";
import { RiFacebookBoxFill, RiInstagramLine, RiLinkedinFill, RiTelegram2Fill, RiTiktokFill, RiTwitterXFill, RiLink, RiWhatsappLine, RiYoutubeLine } from '../Icons/Icons';

type SocialIconsProps = {
  item: MeetupGroupItem;
};
export default function SocialIcons({ item }: SocialIconsProps) {
  const iconsList = Object.entries(item.social).filter(
    ([key, value]) => (value ?? '') !== ''
  );

  return (
    <div class="flex flex-row gap-1">
      {iconsList.map(([key, value]) => (
        <ClickableIcon key={key} type={key} value={value} />
      ))}
    </div>
  );
}

type ClickableIconProps = {
  type: string;
  value: string;
  // children: ComponentChildren;
};
function ClickableIcon({ type, value }: ClickableIconProps) {
  const href = value;
  const Icon = getSocialIcon(type);
  // @todo - Telegram, Instagram, Bizum are not URLs
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <Icon />
    </a>
  );
}

function getSocialIcon(type: string) {
  switch (type) {
    case "facebook":
      return () => <RiFacebookBoxFill />;
    case "instagram":
      return () => <RiInstagramLine />;
    case "linkedin":
      return () => <RiLinkedinFill />;
    case "telegram":
      return () => <RiTelegram2Fill />;
    case "tiktok":
      return () => <RiTiktokFill />;
    case "twitter":
      return () => <RiTwitterXFill />;
    case "website":
      return () => <RiLink />;
    case "whatsapp":
      return () => <RiWhatsappLine />;
    case "youtube":
      return () => <RiYoutubeLine />;
    // case "email":
    //   return () => <RiMailLine />;
    default:
      return () => null;
  }
}
