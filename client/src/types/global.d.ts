import { Icon } from "@expo/vector-icons/build/createIconSet";

export type ContactItem =
  | {
      icon: Icon;
      iconName: string;
      type: "redirect";
      provider: string;
      account: string;
      redirectUrl: string;
      copyValue?: never;
    }
  | {
      icon: Icon;
      iconName: string;
      type: "copy";
      provider: string;
      account: string;
      redirectUrl?: never;
      copyValue: string;
    };