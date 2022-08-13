import { createNodeCalloutAsyncThunk } from '../../util/nodeActions';
import { LocalEmail } from '../mail';

export type SearchMailboxRequest = { searchQuery: string };
export type SearchMailboxResponse = Array<LocalEmail>;
export const searchMailbox = createNodeCalloutAsyncThunk<
  SearchMailboxRequest,
  SearchMailboxResponse
>('email:searchMailbox');
