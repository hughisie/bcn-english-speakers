import type { MeetupItem } from "../../../../../types/types";

type EventRegistrationProps = {
  event: MeetupItem;
};
export default function EventRegistration({ event }: EventRegistrationProps) {
  return (
    <div class="my-4 rounded-md overflow-hidden border border-slate-100">
      <h3 class="bg-slate-100 m-0 p-1 px-4">Registration</h3>
      <div class="p-4">
        Check Bizum info Form for signup?
        <div class="flex flex-row items-center gap-2">
          <span class="text-sm">Price:</span>
          <span class="text-sm font-bold">{event.price.priceCents}</span>
        </div>
      </div>
    </div>
  );
}
