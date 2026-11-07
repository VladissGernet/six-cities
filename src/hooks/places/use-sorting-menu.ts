import { useEffect, type RefObject, type SetStateAction } from 'react';

/**
 * Закрывает меню при клике вне элемента, на который указывает ref.
 *
 * @param menuRef - Ref на элемент, который считается меню.
 * Клик внутри этого элемента не приводит к закрытию.
 * @param setIsMenuOpened - Функция обновления состояния открытости меню.
 * Вызывается со значением `false` при клике вне меню.
 */
const useSortingMenu = (
  menuRef: RefObject<HTMLSpanElement | null>,
  setIsMenuOpened: (value: SetStateAction<boolean>) => void,
) => {
  useEffect(() => {
    const hideMenu = (evt: MouseEvent) => {
      const menu = menuRef.current;

      if (
        evt.target instanceof HTMLElement &&
        menu &&
        !menu.contains(evt.target)
      ) {
        setIsMenuOpened(false);
      }
    };

    document.addEventListener('click', hideMenu);

    return () => {
      document.removeEventListener('click', hideMenu);
    };
  }, [menuRef, setIsMenuOpened]);
};

export { useSortingMenu };
