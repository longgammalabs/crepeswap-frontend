import { Language } from "../LangSelector/types";
import { DiscordIcon, GithubIcon, TwitterIcon } from "../Svg";
import { FooterLinkType } from "./types";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Help",
        href: "https://docs.iguanadex.com/help",
      },
      {
        label: "Contact",
        href: "https://docs.iguanadex.com/contact-us",
      },
      {
        label: "Etherlink Community",
        href: "https://discord.gg/etherlink",
      },
      {
        label: "IGN",
        href: "https://docs.iguanadex.com/tokenomics/ign",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "GitHub",
        href: "https://github.com/iguanadex?tab=repositories",
      },
      {
        label: "Documentation",
        href: "https://docs.iguanadex.com",
      },
      {
        label: "Audits",
        href: "https://docs.iguanadex.com/iguanadex-on-mainnet/security-audits",
      },
    ],
  },
];

export const socials = [
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://x.com/etherlink",
  },
  {
    label: "GitHub",
    icon: GithubIcon,
    href: "https://github.com/iguana-dex",
  },
  {
    label: "Discord",
    icon: DiscordIcon,
    href: "https://discord.gg/etherlink",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
