import { ContactItem } from "@/types/global";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export const ContactsSocial: ContactItem[] = [
  {
    icon: AntDesign,
    iconName: "github",
    type: "redirect",
    provider: "GitHub",
    account: "@giamimino",
    redirectUrl: "https://github.com/giamimino/"
  },
  {
    icon: FontAwesome6,
    iconName: "linkedin",
    type: "redirect",
    provider: "LinkedIn",
    account: "Gia M",
    redirectUrl: "https://www.linkedin.com/in/gia-miminoshvili-2a89642aa/"
  },
  {
    icon: FontAwesome6,
    iconName: "discord",
    type: "copy",
    provider: "Discord",
    account: "0_jade",
    copyValue: "0_jade"
  },
  {
    icon: MaterialIcons,
    iconName: "mail-outline",
    type: "copy",
    provider: "Gmail",
    account: "miminoshvili2102@gmail.com",
    copyValue: "miminoshvili2102@gmail.com"
  },
];