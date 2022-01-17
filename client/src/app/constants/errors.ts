export type ErrorKey = 'required' | 'email' | 'minlength' | 'passwordMatchingError';
export type ErrorDescription = 'Required field' | 'Invalid email' | 'Min length should be 6 symbols' | 'Password and Confirm Password must be match';
export const dialogErrors: Map<ErrorKey, ErrorDescription> = new Map([
  ['required', 'Required field'],
  ['email', 'Invalid email'],
  ['minlength', 'Min length should be 6 symbols'],
  ['passwordMatchingError', 'Password and Confirm Password must be match'],
]);
