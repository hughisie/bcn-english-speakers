import type { JSX } from "preact";
import cn from "classnames";
import styles from "./SkeletonText.module.scss";

export default function SkeletonText({
  class: className,
  ...rest
}: JSX.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span class={cn(styles.container, className)} {...rest}>
      &nbsp;
    </span>
  );
}
