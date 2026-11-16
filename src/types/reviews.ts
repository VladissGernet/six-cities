import type { ChangeEventHandler, FormEventHandler } from 'react';

type ReviewHandleChange = ChangeEventHandler<HTMLInputElement>;
type ReviewSubmit = FormEventHandler<HTMLFormElement>;
type ReviewHandleText = ChangeEventHandler<HTMLTextAreaElement>;
type ReviewText = string;

export type { ReviewHandleChange, ReviewSubmit, ReviewHandleText, ReviewText };
