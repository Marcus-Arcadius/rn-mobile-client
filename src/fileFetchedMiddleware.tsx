import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch } from './store';
import { Email, saveMailToDB } from './store/mail';

type FileFetchedPayload = {
  _id: string;
  email: Email;
};

export const fileFetchedMiddleware: Middleware<{}, {}> =
  (api: MiddlewareAPI<AppDispatch>) => next => action => {
    if (action.type === 'node/messageHandler:fileFetched') {
      console.log('caught fileFetched event', action);
      const data = action.data as FileFetchedPayload;
      const email = {
        ...data.email.content,
        _id: data._id,
        bodyAsText: data.email.content.text_body,
        bodyAsHTML: data.email.content.html_body,
      };
      api.dispatch(
        saveMailToDB({ messageType: 'Incoming', messages: [email] }),
      );
    }

    return next(action);
  };
