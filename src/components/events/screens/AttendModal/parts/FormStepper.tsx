import cn from "classnames";
import { signal } from "@preact/signals";
import type { MeetupRsvpAttendanceStatusEnum } from "../../../../../types/types";
import useAppStateContext from "../../../contexts/AppStateProvider";
import {
  getRsvpEmojiList,
  getRsvpOptionLabel,
  getRSVPOptionsByCertainty,
} from "../../../../../services/events.service";
import type { ComponentChildren } from "preact";

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
                  // "border-b border-b-slate-200 py-8 last:border-b-0"
                )}
              >
                <input
                  name="rsvpOption"
                  type="radio"
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
      {/* STEP 0 */}
      {/* <Step
        stepTitle="Are you coming?"
        stepIndex={0}
        currentStep={localFormState.value.currentStep}
      >
        <div class="rounded-md overflow-hidden border border-slate-200 bg-slate-50">
          <div class="flex flex-col">
            {responseOptions.map((option) => {
              const optionId = `option_${option}`;
              return (
                <div
                  key={optionId}
                  class={cn(
                    "flex justify-between gap-4 px-6",
                    "border-b border-b-slate-200 py-8 last:border-b-0"
                  )}
                >
                  <label
                    htmlFor={optionId}
                    class="text-xl cursor-pointer w-full select-none"
                  >
                    {getRsvpOptionLabel(option)}
                  </label>
                  <input
                    name="rsvpOption"
                    type="radio"
                    value={option}
                    id={optionId}
                    class="scale-125 cursor-pointer"
                    onClick={handleRadioClick}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Step> */}

      {/* STEP 1 */}
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
                for="first-name"
                class="block text-sm/6 font-medium text-gray-900"
              >
                First name
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="last-name"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Last name (or initial)
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* <div class="sm:col-span-4">
              <label
                for="email"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div> */}

            {/* <div class="sm:col-span-3">
              <label
                for="country"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Country
              </label>
              <div class="mt-2">
                <select
                  id="country"
                  name="country"
                  autocomplete="country-name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div> */}

            {/* <div class="col-span-full">
              <label
                for="street-address"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Street address
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autocomplete="street-address"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div> */}

            

            
          </div>

          <div class="flex flex-col">
            <div class="py-4 px-6 flex flex-col gap-1">
              <label
                htmlFor="firstname"
                class="text-xl cursor-pointer w-full select-none"
              >
                Name
              </label>
              <input
                name="rsvpName"
                type="text"
                value={localFormState.value.rsvps[0]?.name}
                id="firstname"
                placeholder="Your name"
                class="border border-slate-200 bg-white rounded-md py-2.5 px-3"
                onChange={handleNameChange}
              />
            </div>

            <div class="py-4 px-6 flex flex-col gap-1">
              <label
                htmlFor="mobileNumber"
                class="text-xl cursor-pointer w-full select-none"
              >
                Mobile
              </label>
              <input
                name="rsvpMobileNumber"
                type="text"
                value={localFormState.value.rsvps[0]?.mobile}
                id="mobileNumber"
                placeholder="Mobile number"
                class="border border-slate-200 bg-white rounded-md py-2.5 px-3"
                onChange={handleMobileNumberChange}
              />
            </div>

            <div class="py-4 px-6 flex flex-col gap-1">
              <label
                htmlFor="avatar"
                class="text-xl cursor-pointer w-full select-none"
              >
                Your avatar (just for fun)
              </label>
              <select
                name="rsvpAvatar"
                id="rsvpAvatar"
                value={localFormState.value.rsvps[0]?.avatar}
                class="border border-slate-200 bg-white rounded-md py-2.5 px-3 pr-6"
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
      </Step>

      {/* <div class="border-b border-gray-900/10 pb-6 my-6">
        <h2 class="text-base/7 font-semibold text-gray-900">
          Personal Information
        </h2>
        <p class="mt-1 text-sm/6 text-gray-600">Please tell us who you are.</p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label
              for="first-name"
              class="block text-sm/6 font-medium text-gray-900"
            >
              First name
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="last-name"
              class="block text-sm/6 font-medium text-gray-900"
            >
              Last name (or initial)
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label
              for="email"
              class="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="country"
              class="block text-sm/6 font-medium text-gray-900"
            >
              Country
            </label>
            <div class="mt-2">
              <select
                id="country"
                name="country"
                autocomplete="country-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div class="col-span-full">
            <label
              for="street-address"
              class="block text-sm/6 font-medium text-gray-900"
            >
              Street address
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="street-address"
                id="street-address"
                autocomplete="street-address"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-2 sm:col-start-1">
            <label for="city" class="block text-sm/6 font-medium text-gray-900">
              City
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                autocomplete="address-level2"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="region"
              class="block text-sm/6 font-medium text-gray-900"
            >
              State / Province
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="region"
                id="region"
                autocomplete="address-level1"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="postal-code"
              class="block text-sm/6 font-medium text-gray-900"
            >
              ZIP / Postal code
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                autocomplete="postal-code"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div> */}

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

type StepProps = {
  children: ComponentChildren;
  stepTitle: string;
  stepDescription?: string;
  fieldsetTitle?: string;
  stepIndex: number;
  currentStep: number;
};
function Step({
  stepTitle,
  stepDescription,
  fieldsetTitle,
  stepIndex,
  currentStep,
  children,
}: StepProps) {
  return (
    <div class="border-b border-gray-900/10 pb-6 my-6">
      {stepTitle && (
        <h2 class="text-xl/7 font-semibold text-gray-900">{stepTitle}</h2>
      )}
      {stepDescription && (
        <p class="mt-1 mb-4 text-sm/6 text-gray-600">{stepDescription}</p>
      )}
      <div class="p-4 py-6 bg-slate-100 border border-slate-200 rounded-md space-y-10">
        <fieldset class="text-xl mb-2 font-semibold tracking-tight">
          {fieldsetTitle && (
            <legend class="text-sm/6 font-normal text-gray-600 mb-4">
              {fieldsetTitle}
            </legend>
          )}
          {children}
        </fieldset>
      </div>
    </div>
  );
}
