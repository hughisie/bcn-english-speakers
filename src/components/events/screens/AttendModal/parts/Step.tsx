import type { ComponentChildren } from "preact";

type StepProps = {
  children: ComponentChildren;
  stepTitle: string;
  stepDescription?: string;
  fieldsetTitle?: string;
  stepIndex: number;
  currentStep: number;
};
export default function Step({
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
