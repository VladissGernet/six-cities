import type { OfferType } from '../../types/offers';
import type { SelectedOffer } from '../../types/selected-offer';
import { capitalizeFirstLetter, pluralizeEn } from '../../utils/utils';

type OfferFeaturesProps = Pick<SelectedOffer, 'bedrooms' | 'maxAdults'> & {
  type: OfferType;
};

export default function OfferFeatures({
  type,
  bedrooms,
  maxAdults,
}: OfferFeaturesProps): JSX.Element {
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">
        {capitalizeFirstLetter(type)}
      </li>
      <li className="offer__feature offer__feature--bedrooms">
        {pluralizeEn(bedrooms, { one: 'bedroom', other: 'bedrooms' })}
      </li>
      <li className="offer__feature offer__feature--adults">
        {pluralizeEn(maxAdults, { one: 'adult', other: 'adults' })}
      </li>
    </ul>
  );
}
