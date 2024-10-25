import { getFeaturedMediaItem } from "../../utils/utils";
import type {
  GenericMediaItem,
  MeetupGroupItem,
} from "../../../../types/types";
import GroupLogo from "./GroupLogo";
import GroupHeroImage from "./GroupHeroImage";
import SocialIcons from "./SocialIcons";
import SkeletonShape from "../Skeleton/SkeletonShape";
import type { SVGProps } from "preact/compat";

const groupPlaceholderHero: GenericMediaItem = {
  id: "generic-item",
  url: "https://cdn.pocketbarcelona.com/app/places/images/avif/placeholder_large.avif",
  alt: "Hero",
  mediaType: "IMAGE",
  createdTime: new Date(),
};
type GroupHeaderProps = {
  group: MeetupGroupItem | null;
};
export default function GroupHeader({ group }: GroupHeaderProps) {
  if (!group) return <GroupHeaderSkeleton />;

  const {
    about,
    groupId,
    groupLocation,
    groupName,
    isVerified,
    logo = [],
    profilePhoto = [],
    refundPolicy,
    social,
    timezone,
    topics,
  } = group;

  const heroPhoto = getFeaturedMediaItem(profilePhoto);
  const logoImage = getFeaturedMediaItem(logo);
  return (
    <section>
      <div class="relative aspect-video flex justify-center items-center mb-16">
        <div class="absolute z-10">
          <h1 class="text-xl my-1 text-center">{groupName}</h1>
          <h2 class="text-lg my-1 text-center">{groupLocation}</h2>
        </div>
        {heroPhoto && <GroupHeroImage image={heroPhoto} />}
        {!heroPhoto && <GroupHeroImage image={groupPlaceholderHero} />}
        {logoImage && <GroupLogo logo={groupPlaceholderHero} />}
        {!logoImage && <GroupLogo logo={groupPlaceholderHero} />}
      </div>
      <div class="py-6 px-4">
        <div>
          <h3 class="flex flex-row items-center gap-1 text-xl">
            {groupName}, <RiMapPin2Line />
            <span class="text-sm">based in {groupLocation}</span>
          </h3>
          <div
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: about,
            }}
            class="my-4"
          />
        </div>
        <div class="my-4">
          <h3>Topics</h3>
          <div class="flex flex-row gap-1">
            {topics.map((topic) => {
              <span key={topic}>{topic}</span>;
            })}
          </div>
        </div>
        <div class="my-4">
          <h3 class="text-sm">Refund Policy</h3>
          <div>{refundPolicy}</div>
        </div>
        <SocialIcons item={group} />
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

export function RiMapPin2Line(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <title>Map pin icon</title>
      <path
        fill="currentColor"
        d="m12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zm4.95-7.778a7 7 0 1 0-9.9 0L12 20.9zM12 13a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
      />
    </svg>
  );
}
