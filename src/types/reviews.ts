import type { ChangeEventHandler, FormEventHandler } from 'react';
import type { RatingValue } from './general';

type ReviewHandleChange = ChangeEventHandler<HTMLInputElement>;
type ReviewSubmit = FormEventHandler<HTMLFormElement>;
type ReviewHandleText = ChangeEventHandler<HTMLTextAreaElement>;
type ReviewText = string;
type SubmitReviewType = (rating: RatingValue) => Promise<void>;

export type {
  ReviewHandleChange,
  ReviewSubmit,
  ReviewHandleText,
  ReviewText,
  SubmitReviewType,
};
