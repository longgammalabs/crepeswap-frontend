import noop from "lodash/noop";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";
import { footerLinks, langs } from "./config";
import { FooterProps } from "./types";

export default {
  title: "Components/Menu/Footer",
  component: Footer,
};

const Template: React.FC<React.PropsWithChildren<FooterProps>> = ({ ...args }) => {
  return (
    <BrowserRouter>
      <Footer {...args} />
    </BrowserRouter>
  );
};

export const Default = Template.bind({});
Default.args = {
  items: footerLinks,
  isDark: true,
  toggleTheme: noop,
  langs,
  setLang: noop,
  currentLang: "EN",
  cakePriceUsd: 0.01,
  buyCakeLabel: "Buy IGN",
};
