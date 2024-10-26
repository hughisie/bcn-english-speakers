import type { HTMLAttributes } from "preact/compat";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "link" | "outline";
  text?: string;
  icon?: string;
  classes?: string;
  type?: "button" | "submit" | "reset";
}

const variants = {
  primary: "btn-primary bg-cyan-700 border-cyan-700 text-white",
  secondary: "btn-secondary border-orange-700 bg-orange-700 ",
  tertiary: "btn btn-tertiary bg-white border-white",
  outline: "btn btn-outline border border-cyan-700 text-cyan-700",
  link: "cursor-pointer hover:text-velvet border border-transparent",
};

export default function Button({
  type = "button",
  variant = "primary",
  text,
  classes,
  ...rest
}: ButtonProps) {
  const buttonClasses = 'border px-8 whitespace-nowrap py-4 font-semibold text-lg'
  return (
    <button
      type={type}
      class={twMerge(
        variants[variant] || "",
        buttonClasses,
        "disabled:opacity-25 disabled:cursor-default disabled:pointer-events-none rounded-md whitespace-nowrap",
        classes
      )}
      {...rest}
    >
      {text}
    </button>
  );
}
