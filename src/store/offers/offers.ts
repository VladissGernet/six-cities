import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

/* TODO 8 раздел
    createSelector мемоизирует вычисления: пока offers не изменились, повторно группировать данные не придётся.

    import { createSelector } from '@reduxjs/toolkit';

    const getOffers = (state: RootState) => state.offers;

    const getGroupedOffers = createSelector(
      [getOffers],
      (offers) => groupOffers(offers),
    );

    const getGroupedFavoriteOffers = createSelector(
      [getGroupedOffers],
      (groupedOffers) => filterFavoriteOffers(groupedOffers),
    );

    2. Разделить reducer по смыслу (combineReducers и createSlice).
    store/
      index.ts
      root-reducer.ts

      offers/
        offers-slice.ts
        offers-selectors.ts

      offer/
        offer-slice.ts
        offer-selectors.ts

      user/
        user-slice.ts
        user-selectors.ts

      api-actions.ts
  */

const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
});

export { offersProcess };
