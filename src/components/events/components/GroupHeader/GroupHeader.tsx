import type { Signal } from "@preact/signals";
import type { AppState } from "../../state/state";
import { getFeaturedMediaItem } from "../../utils/utils";
import type { GenericMediaItem } from "../../../../types/types";
import GroupLogo from "./GroupLogo";
import GroupHeroImage from "./GroupHeroImage";

const groupPlaceholderHero: GenericMediaItem = {
  id: "generic-item",
  url: "https://cdn.pocketbarcelona.com/app/places/images/avif/placeholder_large.avif",
  alt: "Hero",
  mediaType: "IMAGE",
  createdTime: new Date(),
};
type GroupHeaderProps = {
  state: Signal<AppState>;
};
export default function GroupHeader({ state }: GroupHeaderProps) {
  const { data: group } = state.value.groupInfo;
  if (!group) return <div>Loading group info skeleton...</div>;

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
          <h3>About: {groupName}</h3>
          <div
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: about,
            }}
          />
        </div>
        <div>
          <h3>Topics</h3>
          <div>{topics}</div>
        </div>
        <div>
          <h3>Refund Policy</h3>
          <div>{refundPolicy}</div>
        </div>
        {/* <div>
          <h3>Social</h3>
          <div>{social}</div>
        </div> */}
      </div>
    </section>
  );
}
