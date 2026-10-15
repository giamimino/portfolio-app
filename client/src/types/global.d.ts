import { Icon } from '@expo/vector-icons/build/createIconSet';

export type ContactItem =
  | {
      icon: Icon;
      iconName: string;
      type: 'redirect';
      provider: string;
      account: string;
      redirectUrl: string;
      copyValue?: never;
    }
  | {
      icon: Icon;
      iconName: string;
      type: 'copy';
      provider: string;
      account: string;
      redirectUrl?: never;
      copyValue: string;
    };

export type ApiError = {
  code: string;
  message: string;
};

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiFailure = {
  success: false;
  error: ApiError;
};
