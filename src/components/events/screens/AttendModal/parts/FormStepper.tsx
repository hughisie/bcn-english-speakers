import cn from "classnames";
import { signal } from "@preact/signals";
import type { MeetupRsvpAttendanceStatusEnum } from "../../../../../types/types";
import useAppStateContext from "../../../contexts/AppStateProvider";
import {
  getRsvpEmojiList,
  getRsvpOptionLabel,
  getRSVPOptionsByCertainty,
} from "../../../../../services/events.service";
import Step from './Step';

type ResponseItem = {
  name: string;
  mobile: string;
  avatar: string;
  lastname?: string;
  email?: string;
  barrio?: number;
  response: MeetupRsvpAttendanceStatusEnum | undefined;
  comment?: string;
};

type ResponseFormState = {
  /** Zero-indexed step */
  currentStep: number;
  meetupId: string;
  response: MeetupRsvpAttendanceStatusEnum | undefined;
  rsvps: ResponseItem[];
};

const localFormState = signal<ResponseFormState>({
  currentStep: 0,
  meetupId: "",
  response: undefined,
  rsvps: [],
});

export default function FormStepper() {
  const {
    api: { attendModalState, currentEvent, group },
  } = useAppStateContext();

  const event = currentEvent.value;
  const groupInfo = group.value.data;

  if (!event || !groupInfo) {
    return null;
  }

  const { meetupId, rsvpType, eventConfig } = event;

  const responseOptions = getRSVPOptionsByCertainty(rsvpType);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleRadioClick = (ev: any) => {
    const { value } = ev.target as HTMLInputElement;
    if (!value) {
      return;
    }
    const parsedValue = Number.parseInt(value, 10);
    if (localFormState.value.response === parsedValue) return;
    localFormState.value = {
      ...localFormState.value,
      response: parsedValue,
      meetupId,
      // currentStep: localFormState.value.currentStep + 1,
    };
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleNameChange = (ev: any) => {
    const { value } = ev.target as HTMLInputElement;
    if (!value) {
      return;
    }
    const newRsvps = [...localFormState.value.rsvps];
    newRsvps[0] = {
      ...newRsvps[0],
      name: value,
    };
    localFormState.value = {
      ...localFormState.value,
      rsvps: newRsvps,
    };
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleSurnameChange = (ev: any) => {
    const { value } = ev.target as HTMLInputElement;
    if (!value) {
      return;
    }
    const newRsvps = [...localFormState.value.rsvps];
    newRsvps[0] = {
      ...newRsvps[0],
      lastname: value,
    };
    localFormState.value = {
      ...localFormState.value,
      rsvps: newRsvps,
    };
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleMobileNumberChange = (ev: any) => {
    const { value } = ev.target as HTMLInputElement;
    if (!value) {
      return;
    }
    const newRsvps = [...localFormState.value.rsvps];
    newRsvps[0] = {
      ...newRsvps[0],
      mobile: value,
    };
    localFormState.value = {
      ...localFormState.value,
      rsvps: newRsvps,
    };
  };

  const avatarsList = getRsvpEmojiList();

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
              <div
                key={optionId}
                class={cn(
                  "flex items-center gap-x-3"
                )}
              >
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
        currentStep={localFormState.value.currentStep}
      >
        <div class="space-y-6">
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
                  value={localFormState.value.rsvps[0]?.name}
                  id="firstname"
                  placeholder="Your name"
                  required
                  onChange={handleNameChange}
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
                  onChange={handleSurnameChange}
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
                  // onChange={handleSurnameChange}
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
                  value={localFormState.value.rsvps[0]?.avatar}
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
        {localFormState.value.rsvps.length > 0 && (
          <div class="flex flex-col gap-2">
            <p>Step: {localFormState.value.currentStep}</p>
            <p>Response: {localFormState.value.response}</p>
            <p>Step: {localFormState.value.meetupId}</p>

            {localFormState.value.rsvps.map((rsvp, index) => {
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div class="flex flex-row gap-2" key={index}>
                  <div>{rsvp.avatar}</div>
                  <div>{rsvp.name}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

