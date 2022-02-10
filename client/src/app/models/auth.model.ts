export interface SignInSuccess {
  token: string;
  id: string;
}

export interface SignUpSuccess {
  message: string;
}

export type Controls = 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword';
