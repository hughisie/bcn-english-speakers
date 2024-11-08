import cn from "classnames";
import useAppStateContext from "../../../contexts/AppStateProvider";
import Step from "./Step";
import type {
  AttendFormState,
  GuestItem,
} from "../../../services/meetup.service";
import { getRsvpEmojiList, getRsvpOptionLabel, getRSVPOptionsByCertainty } from '../../../utils/utils';

export default function FormStepper() {
  const {
    api: { currentEvent, group, attendModalState, setAttendModalState },
  } = useAppStateContext();

  const event = currentEvent.value;
  const groupInfo = group.value.data;

  if (!event || !groupInfo) {
    return null;
  }

  const { meetupId, rsvpType, eventConfig } = event;
  const responseOptions = getRSVPOptionsByCertainty(rsvpType);

  const handleRadioClick = (ev: Event) => {
    const { value } = ev.target as HTMLInputElement;
    if (!value) {
      return;
    }
    const parsedValue = Number.parseInt(value, 10);
    if (attendModalState.value.formData.isAttending === parsedValue) return;
    attendModalState.value = {
      ...attendModalState.value,
      formData: {
        ...attendModalState.value.formData,
        isAttending: parsedValue,
      },
      // currentStep: attendModalState.value.currentStep + 1,
    };
  };

  const handleFieldChange = (ev: Event, fieldName: keyof GuestItem) => {
    let { value } = ev.target as HTMLInputElement;
    value = value.trim();
    const newRsvps = [...attendModalState.value.formData.guests];
    newRsvps[0] = {
      ...newRsvps[0],
      [fieldName]: value,
    };
    attendModalState.value = {
      ...attendModalState.value,
      formData: {
        ...attendModalState.value.formData,
        guests: newRsvps,
      },
    };
  };

  const avatarsList = getRsvpEmojiList();
  const { formData, currentStep } = attendModalState.value;

  return (
    <div>
      <Step
        currentStep={0}
        stepIndex={0}
        stepTitle="Attendance"
        stepDescription="Please let us know if you can make it."
        fieldsetTitle="Are you coming?"
      >
        <div class="space-y-6">
          {responseOptions.map((option) => {
            const optionId = `option_${option}`;
            return (
              <div key={optionId} class={cn("flex items-center gap-x-3")}>
                <input
                  name="rsvpOption"
                  type="radio"
                  required
                  value={option}
                  id={optionId}
                  onClick={handleRadioClick}
                  class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                />
                <label
                  htmlFor={optionId}
                  class="block text-sm/6 font-medium text-gray-900 cursor-pointer"
                >
                  {getRsvpOptionLabel(option)}
                </label>
              </div>
            );
          })}
        </div>
      </Step>

      <Step
        stepTitle="Personal Information"
        stepDescription="Please tell us who you are."
        stepIndex={1}
        currentStep={currentStep}
      >
        <div class="space-y-6">
          <h2 class="text-base">Guest 1 (Main)</h2>
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* First name */}
            <div class="sm:col-span-3">
              <label
                for="firstname"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Name
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="rsvpName"
                  value={formData.guests[0]?.name}
                  id="firstname"
                  placeholder="Your name"
                  required
                  onChange={(e) => handleFieldChange(e, "name")}
                  autocomplete="given-name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Lastname */}
            <div class="sm:col-span-3">
              <label
                for="lastname"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Last name (or initial)
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Last name"
                  onChange={(e) => handleFieldChange(e, "lastname")}
                  autocomplete="family-name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Mobile */}
            <div class="sm:col-span-3">
              <label
                for="mobile"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Mobile number
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  placeholder="Mobile"
                  onChange={(e) => handleFieldChange(e, "mobile")}
                  autocomplete=""
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Avatar */}
            <div class="sm:col-span-3">
              <label
                for="avatar"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Avatar (optional)
              </label>
              <div class="mt-2">
                <select
                  name="rsvpAvatar"
                  id="rsvpAvatar"
                  onChange={(e) => handleFieldChange(e, "avatar")}
                  value={formData.guests[0]?.avatar}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                >
                  <option value="">- choose -</option>
                  {avatarsList.map((emoji, key) => {
                    return (
                      <option key={emoji} value={emoji}>
                        {emoji}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div class="col-span-full">
              <label
                for="about"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Comment (optional)
              </label>
              <div class="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  maxLength={512}
                  onChange={(e) => handleFieldChange(e, "comment")}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
              <p class="mt-1 text-sm/6 text-gray-400 font-light">
                Leave a comment for the organiser
              </p>
            </div>
          </div>
        </div>
      </Step>

      <div>
        {formData.guests.length > 0 && (
          <div class="flex flex-col gap-2 mb-4">
            <h2 class="text-sm">Guests ({formData.guests.length})</h2>

            {formData.guests.map((rsvp, index) => {
              return (
                // <div class="flex flex-row gap-1" key={index}>
                //   <div>{rsvp.avatar}</div>
                //   <div>Name: {rsvp.name}</div>
                //   <div>Surname: {rsvp.lastname || '-'}</div>
                //   <div>Mobile: {rsvp.mobile || '-'}</div>
                // </div>
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div class="col-span-full" key={index}>
                  <div class="mt-1 flex items-center gap-x-3">
                    {rsvp.avatar ? (
                      <span class="h-12 w-12 text-5xl rounded-full text-center overflow-hidden">
                        {rsvp.avatar}
                      </span>
                    ) : (
                      <svg
                        class="h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    )}
                    <span>
                      {rsvp.name} {rsvp.lastname}
                    </span>
                    {/* <button
                      type="button"
                      class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </button> */}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
