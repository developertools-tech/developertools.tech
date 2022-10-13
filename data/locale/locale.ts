export type LocaleText = {
  drawer: DrawerText;
  home: HomeText;
  base64: Base64Text;
  common: CommonText;
  css: CssText;
  html: HtmlText;
  htmlCharCode: HtmlCharCodeText;
};

type CommonText = {
  copy: string;
  paste: string;
  clear: string;
};

type DrawerText = {
  searchTools: string;
  search: string;
};

type HomeText = {
  welcome: string;
  chooseFromMenu: string;
  dontSeeTheToolYouNeed: string;
  requestItHere: string;
  foundBug: string;
  reportItHere: string;
  wantToHelp: string;
  contributeOnGit: string;
};

type Base64Text = {
  description: string;
};

type CssText = {
  description: string;
  note: string;
  minify: string;
  format: string;
  formattedCss: string;
  minifiedCss: string;
};

type HtmlText = {
  description: string;
  formattedHtml: string;
};
type HtmlCharCodeText = {
  description: string;
  unescaped: string;
  escaped: string;
};