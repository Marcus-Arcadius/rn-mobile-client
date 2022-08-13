import { createEntityAdapter } from '@reduxjs/toolkit';
import { LocalEmail } from '../mail';

export const searchAdapter = createEntityAdapter<LocalEmail>({
  selectId: search => search._id,
  sortComparer: (a, b) => a.date.localeCompare(b.date),
});
export const searchSelectors = searchAdapter.getSelectors();
