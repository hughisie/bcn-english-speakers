import { getFeaturedMediaItem } from "../../utils/utils";
import type {
  GenericMediaItem,
  MeetupGroupItem,
} from "../../../../types/types";
import GroupLogo from "./GroupLogo";
import HeroImage from "../HeroImage/HeroImage";
import SocialIcons from "./SocialIcons";
import SkeletonShape from "../Skeleton/SkeletonShape";
import { RiAwardFill, RiMapPin2Line } from "../Icons/Icons";
import { PLACEHOLDER_HERO } from '../../types/config';

type GroupHeaderProps = {
  group: MeetupGroupItem | null;
};
export default function GroupHeader({ group }: GroupHeaderProps) {
  if (!group) return <GroupHeaderSkeleton />;

  const {
    about,
    groupLocation,
    groupName,
    isVerified,
    logo = [],
    profilePhoto = [],
    refundPolicy,
    timezone,
    topics,
  } = group;

  const heroPhoto = getFeaturedMediaItem(profilePhoto);
  const logoImage = getFeaturedMediaItem(logo);
  return (
    <section>
      <div class="relative aspect-video flex justify-center items-center mb-16">
        <div class="absolute z-10">
          <h1 class="text-xl my-1 text-center tracking-tight">{groupName}</h1>
          <h2 class="text-lg my-1 text-center tracking-tight">{groupLocation}</h2>
        </div>
        {isVerified && (
          <div class="absolute z-10 bottom-3 right-3 text-white bg-green-600 px-3 py-1.5 rounded-md text-xs uppercase flex flex-row items-center gap-1 shadow-md">
            <RiAwardFill width={13} height={13} />
            <span>Verified Group</span>
          </div>
        )}
        {heroPhoto && <HeroImage image={heroPhoto} />}
        {!heroPhoto && <HeroImage image={PLACEHOLDER_HERO} />}
        {logoImage && <GroupLogo logo={PLACEHOLDER_HERO} />}
        {!logoImage && <GroupLogo logo={PLACEHOLDER_HERO} />}
      </div>

      <div class="py-6 px-4">
        <div>
          <h3 class="flex flex-row items-center gap-1 text-xl tracking-tight">
            {groupName}<RiMapPin2Line />
            <span class="text-sm">based in {groupLocation}</span>
          </h3>
          <div class="my-2 mb-6">
            <div class="flex flex-row flex-wrap gap-2 items-center">
              <span class="tracking-tight text-sm">Social:</span>
              <SocialIcons item={group} />
              
            </div>
          </div>
          <div
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: about,
            }}
            class="my-6 prose tracking-tight line-clamp-6 overflow-hidden text-ellipsis"
          />
        </div>
        <hr />
        <div class="my-4">
          <h3 class="text-lg font-semibold">Topics</h3>
          <div class="italic text-gray-700">
            {topics.map((topic) => {
              return (
                <span key={topic} class="whitespace-nowrap inline-block mr-4">
                  {topic}
                </span>
              );
            })}
          </div>
        </div>
        
        
      </div>
    </section>
  );
}

function GroupHeaderSkeleton() {
  return (
    <div class="relative aspect-video flex flex-col justify-center items-center gap-4 p-4">
      <SkeletonShape
        class="w-full h-32"
        style={{
          "--height": "240px",
        }}
      />
    </div>
  );
}

