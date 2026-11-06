// General.
import { Helmet } from 'react-helmet-async';

// Components.
import Gallery from '../../components/gallery/gallery';
import OfferPlaces from './offer-places';
import OfferMap from './offer-map';

// Types.
import { useAppSelector } from '../../hooks/redux';
import { getExtraOffer } from '../../store/selectors/offer';
import OfferInfo from './offer-info';

export default function OfferContent(): JSX.Element | null {
  const extraOffer = useAppSelector(getExtraOffer);

  if (!extraOffer) {
    return null;
  }

  const { title, images } = extraOffer;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <section className="offer">
        <Gallery images={images} />
        <OfferInfo offerData={extraOffer} />
        <OfferMap />
      </section>
      <OfferPlaces />
    </>
  );
}
