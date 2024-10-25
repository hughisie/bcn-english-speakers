import cn from 'classnames';
import { createContext, type ComponentChild, type ComponentChildren } from 'preact';
import { useContext, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import styles from './ModalDrawer.module.scss';
import type { ReactNode, SetStateAction } from 'preact/compat';

type ParentContext = {
  setFooter: SetStateAction<unknown>;
};

const Context = createContext<ParentContext>({ setFooter: () => {} });

export type ModalDrawerProps = {
  title: ReactNode;
  children: ComponentChild;
  closeIconAltText?: string;
  isOpen?: boolean;
  maxHeightMobile?: 25 | 33 | 50 | 66 | 75 | 87 | 100;
  onClose?: () => void;
  preventClose?: boolean;
};

export default function ModalDrawer({
  children,
  title,
  closeIconAltText,
  isOpen = false,
  maxHeightMobile = 75,
  preventClose = false,
  onClose = () => {},
}: ModalDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [footer, setFooter] = useState<ReactNode>(null);

  function hideModal() {
    setIsClosing(true);
    // Have to manually close after animation due to Safari
    const close = () => {
      setIsClosing(false);
      dialogRef.current?.close();
      dialogRef.current?.removeEventListener('animationend', close);
    };
    dialogRef.current?.addEventListener('animationend', close);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!dialogRef.current) return undefined;

    function onDialogClick(event: MouseEvent) {
      if (!preventClose && event.target === dialogRef.current) {
        onClose();
      }
    }

    function onCancel(event: Event) {
      event.preventDefault();
    }

    dialogRef.current.addEventListener('click', onDialogClick);

    preventClose && dialogRef.current.addEventListener('cancel', onCancel);

    return () => {
      dialogRef.current?.removeEventListener('click', onDialogClick);
      preventClose && dialogRef.current?.removeEventListener('cancel', onCancel);
    };
  }, [dialogRef.current]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!dialogRef.current) return;

    if (isOpen) {
      dialogRef.current.showModal();
    } else if (dialogRef.current.open) {
      hideModal();
    }
  }, [isOpen]);

  const parentContext = useMemo<ParentContext>(
    () => ({
      setFooter,
    }),
    []
  );

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={event => preventClose && event.preventDefault()}
      className={cn(styles.container, { [styles.isClosing]: isClosing }, styles[`h${maxHeightMobile}`])}
    >
      {(isOpen || isClosing) && (
        <article className={styles.article}>
          <Context.Provider value={parentContext}>
            <header class="flex items-center py-3 px-4">
              <h2 class="font-barlow text-2xl flex-grow min-w-0 m-0 leading-normal">{title}</h2>
              <button
                className={styles.closeButton}
                type="button"
                onClick={onClose}
                // biome-ignore lint/a11y/noAutofocus: <explanation>
                autoFocus
                aria-label={closeIconAltText}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 750 750"
                  x="0px"
                  y="0px"
                  width={48}
                  height={48}
                  fill="#000"
                >
                  <title>Close button</title>
                  <path d="M607.41,288.4c-10.39-49.7-35.7-101.39-83.1-124.75-24.04-11.26-50.51-15.69-75.76-23.51-25.41-5.31-49.3-17.71-75.46-18.4-67.56-.45-124.37,38.25-161.69,92.51-29.54,40.33-59.78,82.46-69.23,132.56-13.09,70.45,3.36,151.59,50.76,206.48,56.89,53,140.36,69.83,215.84,74.89,77.32,2.54,143.1-55.97,174.08-123.04,28.76-65.56,35.05-146.3,24.56-216.74Zm-217.42,315.39c-76.39-2.5-164.58-62.47-205.76-125.37-31.09-55.29-10.83-122.12,6.76-178.64,16.98-49.64,48.73-96.59,97.07-119.86,34.13-17.44,74.95-29.42,112.2-14.74,75.4,15.91,131.31,31.83,171.4,104.05,74.84,114.4-45.9,334.3-181.67,334.57Z" />
                  <path d="M451.45,331.79c7.7-6.63,15.34-13.38,23.46-19.5,5.2-3.52,11.58-5.58,13.97-12.01,5.06-9.63,1.34-24.9-10.19-27.6-14.98-.26-25.73,13.33-36.33,22.24-21.04,19.33-40.99,39.76-60.45,60.66-28.11-21.69-56.48-42.99-86.38-62.1-14.89-10.57-28.37,8.23-22.56,22.37,2.96,10.16,14.2,13.34,21.9,19.21,13.35,8.75,26.75,17.45,39.98,26.38,8.27,6.15,16.56,12.26,24.87,18.34-7.24,7.99-14.44,16.02-21.63,24.05-13.52,14.05-27.05,28.1-40.7,42.03-5.34,5.99-5.47,15.98-1.2,22.59,3.63,6.33,12.54,7.33,17.16,1.57,14.09-14.39,28.06-28.89,42.02-43.4,9.93-9.36,19.5-19.1,28.96-28.93,29.56,21.32,59.38,42.27,89.5,62.83,16.42,7.84,22.95-21.17,10.05-28.46-26.51-18.14-52-37.73-77.41-57.44,14.4-14.89,29.07-29.5,44.98-42.82Z" />
                </svg>
              </button>
            </header>
            <div class="flex flex-col overflow-y-auto flex-shrink flex-grow px-4 my-4">
              <div>{children}</div>
            </div>
            {footer && <footer className={styles.footer}>{footer}</footer>}
          </Context.Provider>
        </article>
      )}
    </dialog>
  );
}

export type ModalDrawerFooterProps = {
  children: ComponentChildren;
};

ModalDrawer.Footer = function Footer({ children }: ModalDrawerFooterProps) {
  const { setFooter } = useContext(Context);

  // useEffect fixes render warning:
  // https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // @ts-ignore
    setFooter(children);
  }, [children]);

  return null;
};
