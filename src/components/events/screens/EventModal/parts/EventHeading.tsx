import cn from "classnames";

type EventHeadingProps = {
  label: string;
  class?: string;
};

export default function EventHeading({
  label,
  class: classes,
}: EventHeadingProps) {
  return (
    <h3 class={cn("tracking-tight mt-2 font-semibold", classes)}>{label}</h3>
  );
}
