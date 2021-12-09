import { ErrorDescription, ErrorKey } from "../models/article-dialog.model";

export const articleDialogErrors: Map<ErrorKey, ErrorDescription> = new Map([
  ['required', 'Required field'],
  ['minlength', 'Min length should be 2 symbols'],
]);
