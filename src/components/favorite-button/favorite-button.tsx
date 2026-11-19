import cn from 'classnames';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { favoriteAction, fetchOffersAction } from '../../store/api-actions';
import { isApiError } from '../../services/api-error';

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
  const [isFavoriteButtonDisabled, setIsFavoriteButtonDisabled] =
    useState<boolean>(false);
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
      setIsFavoriteButtonDisabled(true);
      await dispatch(favoriteAction(dispatchData)).unwrap();
      setIsBookmarkFavorite((prevValue) => !prevValue);
      //TODO рабочее решение, попробовать оптимизировать и не использовать fetchOffersAction.
      // Добавить мониторинг количества favorite offers в header.
      await dispatch(fetchOffersAction());
    } catch (error: unknown) {
      if (isApiError(error)) {
        switch (error.kind) {
          case 'unauthorized':
            toast.error('Login to add to favorites.');
            break;

          case 'transport':
            toast.error('Connection lost. Try again.');
            break;

          case 'http':
            toast.error(
              `Failed to add to favorites. HTTP error: ${error.status}`,
            );
            break;
        }
      }

      throw error;
    } finally {
      setIsFavoriteButtonDisabled(false);
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
      disabled={isFavoriteButtonDisabled}
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
