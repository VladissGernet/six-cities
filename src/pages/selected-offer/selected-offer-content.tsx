// General.
import { Helmet } from 'react-helmet-async';

// Components.
import Gallery from '../../components/gallery/gallery';
import OfferPlaces from './selected-offer-places';
import OfferMap from './selected-offer-map';
import OfferInfo from './selected-offer-info';

// Selectors.
import { getSelectedOffer } from '../../store/selected-offer/selected-offer.selectors';

// Types.
import { useAppSelector } from '../../hooks/redux';

export default function OfferContent(): JSX.Element | null {
  const selectedOffer = useAppSelector(getSelectedOffer);

  if (!selectedOffer) {
    return null;
  }

  const { title, images } = selectedOffer;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <section className="offer">
        <Gallery images={images} />
        <OfferInfo offerData={selectedOffer} />
        <OfferMap />
      </section>
      <OfferPlaces />
    </>
  );
}
