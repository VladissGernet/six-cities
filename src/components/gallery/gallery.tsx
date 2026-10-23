import type { ExtraOfferImages } from '../../types/offers';

type GalleryProps = {
  images: ExtraOfferImages;
};

export default function Gallery({ images }: GalleryProps): JSX.Element {
  return (
    <div className="offer__gallery">
      {images.map((image) => (
        <div key={image} className="offer__image-wrapper">
          <img className="offer__image" src={image} alt="Photo studio" />
        </div>
      ))}
    </div>
  );
}
