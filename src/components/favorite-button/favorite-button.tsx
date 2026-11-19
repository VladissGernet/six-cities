// General.
import cn from 'classnames';
import { useState } from 'react';

// Types.
import type { MouseEventHandler } from 'react';
import type { ImageSizes } from '../../types/general';
import type { OfferId } from '../../types/offers';

type FavoriteButtonTypes = ImageSizes & {
  rootClassName: string;
  isFavorite: boolean;
  offerId: OfferId;
};

export default function FavoriteButton({
  rootClassName,
  imageSizes,
  isFavorite,
  offerId,
}: FavoriteButtonTypes): JSX.Element {
  const [isBookmarkFavorite, setIsBookmarkFavorite] =
    useState<boolean>(isFavorite);

  const bookmarkButtonClass = cn(
    `${rootClassName}__bookmark-button`,
    isBookmarkFavorite && `${rootClassName}__bookmark-button--active`,
    'button',
  );

  const handleBookmarkClick: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();
    setIsBookmarkFavorite((prevValue) => !prevValue);
    console.log(offerId);

    // TODO, добавить отправку на сервер.
  };

  return (
    <button
      className={bookmarkButtonClass}
      type="button"
      onClick={handleBookmarkClick}
    >
      <svg
        className={`${rootClassName}__bookmark-icon`}
        width={imageSizes.width}
        height={imageSizes.height}
      >
        <use href="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}
