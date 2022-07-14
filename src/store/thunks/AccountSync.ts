import { createNodeCalloutAsyncThunk } from '../../util/nodeActions';
import { ACCOUNT_CREATE_SYNC_INFO, ACCOUNT_SYNC_GET_INFO } from '../events';

type GetAccountSyncRequest = {
  code: string;
};

export type GetAccountSyncResponse = {
  drive_key: string;
  email: string;
};

export type CreateAccountSyncInfoResponse = {
  code: string;
  drive_key: string;
  email: string;
};

export const getAccountSyncInfo = createNodeCalloutAsyncThunk<
  GetAccountSyncRequest,
  GetAccountSyncResponse
>(ACCOUNT_SYNC_GET_INFO);

export const createAccountSyncInfo = createNodeCalloutAsyncThunk<
  void,
  CreateAccountSyncInfoResponse
>(ACCOUNT_CREATE_SYNC_INFO);

// export const getSyncInfoFlow = createAsyncThunk<GetAccountSyncResponse, GetAccountSyncRequest>(
//   'flow/getSyncInfo',
//   async (arg, {dispatch}): Promise<GetAccountSyncResponse> => {
//     const response = await getAccountSyncInfo(arg);
//     return response;
//   }
// )
