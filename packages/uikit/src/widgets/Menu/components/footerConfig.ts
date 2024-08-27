import { ContextApi } from "@pancakeswap/localization";
import { FooterLinkType } from "../../../components/Footer/types";

export const footerLinks: (t: ContextApi["t"]) => FooterLinkType[] = (t) => [
  {
    label: t("About"),
    items: [
      {
        label: t("Contact"),
        href: "https://docs.iguanadex.com/community/contact-us",
      },
      {
        label: t("Etherlink Community"),
        href: "https://discord.gg/etherlink",
      },
      {
        label: t("Brand Assets"),
        href: "https://github.com/Iguana-DEX/assets/tree/main/iguana_brand_assets",
      },
      {
        label: t("IGN Token"),
        href: "https://docs.iguanadex.com/iguanadex-on-mainnet/tokenomics",
      },
      {
        label: t("Terms Of Service"),
        href: "https://iguanadex.com/terms-of-service",
      },
    ],
  },
  {
    label: t("Developers"),
    items: [
      {
        label: "GitHub",
        href: "https://github.com/iguanadex?tab=repositories",
      },
      {
        label: t("Documentation"),
        href: "https://docs.iguanadex.com",
      },
      {
        label: t("Audits"),
        href: "https://docs.iguanadex.com/iguanadex-on-mainnet/security-audits",
      },
    ],
  },
];
