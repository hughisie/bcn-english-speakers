import cn from 'classnames';
import { createContext, type ComponentChild, type ComponentChildren } from 'preact';
import { useContext, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import styles from './ModalDrawer.module.scss';
import type { ReactNode, SetStateAction } from 'preact/compat';
import { RiCloseLargeFill } from '../Icons/Icons';

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
            <header class="flex flex-row items-center py-4 px-4">
              <h2 class="font-barlow text-2xl flex-grow min-w-0 m-0 leading-normal">{title}</h2>
              <button
                className={styles.closeButton}
                type="button"
                onClick={onClose}
                // biome-ignore lint/a11y/noAutofocus: <explanation>
                autoFocus
                aria-label={closeIconAltText}
              >
                <RiCloseLargeFill width={28} height={28} />
              </button>
            </header>
            <div class="flex flex-col overflow-y-auto flex-shrink flex-grow px-4 pt-4 my-0">
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
