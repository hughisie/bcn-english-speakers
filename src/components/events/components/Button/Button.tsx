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
  primary: "btn-primary",
  secondary: "btn-secondary",
  tertiary: "btn btn-tertiary",
  outline: "btn btn-outline",
  link: "cursor-pointer hover:text-velvet",
};

export default function Button({
  type = "button",
  variant = "primary",
  text,
  classes,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      class={twMerge(
        variants[variant] || "",
        "disabled:opacity-25 disabled:cursor-default disabled:pointer-events-none rounded-md whitespace-nowrap",
        classes
      )}
      {...rest}
    >
      {text}
    </button>
  );
}
