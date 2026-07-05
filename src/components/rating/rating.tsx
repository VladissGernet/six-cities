import cn from 'classnames';
import { PERCENT_PER_STAR } from '../../const';

type RatingProps = {
  rating: number;
  /** Внешний контейнер: place-card__rating / offer__rating */
  rootClassName?: string;
  /** Контейнер звёзд: place-card__stars / offer__stars */
  starsWrapperClassName?: string;
  /** Контейнер числового значения (если нужен): offer__rating-value */
  valueClassName?: string;
  /** Показывать ли числовое значение */
  showValue?: boolean;
};

export default function Rating({
  rating,
  rootClassName,
  starsWrapperClassName,
  valueClassName,
  // TODO, TypeGuard
  showValue = false,
}: RatingProps): JSX.Element {
  /** Расчет получения ширины полосы закрашиваний фона звезд рейтинга. */
  const finalWidth = `${Math.round(rating) * PERCENT_PER_STAR}%`;

  return (
    <div className={cn(rootClassName, 'rating')}>
      <div className={cn(starsWrapperClassName, 'rating__stars')}>
        <span style={{ width: finalWidth }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {showValue && (
        <span className={cn(valueClassName, 'rating__value')}>{rating}</span>
      )}
    </div>
  );
}
