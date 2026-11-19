type FavoriteButtonTypes = {
  className: string;
  sizes: {
    width: number;
    height: number;
  };
};

export default function FavoriteButton({
  className,
  sizes,
}: FavoriteButtonTypes): JSX.Element {
  return (
    <button className={className} type="button">
      <svg
        className="place-card__bookmark-icon"
        width={sizes.width}
        height={sizes.height}
      >
        <use href="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}
