import type { JSX } from 'preact';
import cn from 'classnames';
import styles from './SkeletonShape.module.scss';

export default function SkeletonShape({
  class: className,
  ...rest
}: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div class={cn(styles.container, className)} {...rest}>
      &nbsp;
    </div>
  );
}
