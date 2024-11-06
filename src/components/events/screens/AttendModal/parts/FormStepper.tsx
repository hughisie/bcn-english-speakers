import cn from "classnames";
import useAppStateContext from "../../../contexts/AppStateProvider";
import {
  getRsvpEmojiList,
  getRsvpOptionLabel,
  getRSVPOptionsByCertainty,
} from "../../../../../services/events.service";
import Step from "./Step";
import type {
  AttendFormState,
  GuestItem,
} from "../../../services/meetup.service";

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
        stepIndex={-1}
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
          <h2 class="text-base">Guest 1 - Main</h2>
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label
                for="firstname"
                class="block text-sm/6 font-medium text-gray-900"
              >
                First name
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
          </div>
        </div>
      </Step>

      <div>
        {formData.guests.length > 0 && (
          <div class="flex flex-col gap-2">
            <h2>Guests:</h2>

            {formData.guests.map((rsvp, index) => {
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div class="flex flex-row gap-1" key={index}>
                  <div>{rsvp.avatar}</div>
                  <div>Name: {rsvp.name}</div>
                  <div>Surname: {rsvp.lastname || '-'}</div>
                  <div>Mobile: {rsvp.mobile || '-'}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
