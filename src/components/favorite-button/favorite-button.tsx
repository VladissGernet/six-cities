import cn from 'classnames';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { favoriteAction } from '../../store/api-actions';

// Types.
import type { MouseEventHandler } from 'react';
import type { ImageSizes } from '../../types/general';
import type { DispatchFavoriteData, OfferId } from '../../types/offers';

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
  const dispatch = useAppDispatch();

  const bookmarkButtonClass = cn(
    `${rootClassName}__bookmark-button`,
    isBookmarkFavorite && `${rootClassName}__bookmark-button--active`,
    'button',
  );

  const postFavoriteStatus = async () => {
    const newOfferStatusCode = Number(!isBookmarkFavorite);
    const dispatchData: DispatchFavoriteData = {
      offerStatusCode: newOfferStatusCode,
      offerId,
    };

    try {
      await dispatch(favoriteAction(dispatchData)).unwrap();
      setIsBookmarkFavorite((prevValue) => !prevValue);
    } catch (error: unknown) {
      // TODO, описать ошибку.
      console.log(error);
    }
  };

  const handleBookmarkClick: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();
    postFavoriteStatus();
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
