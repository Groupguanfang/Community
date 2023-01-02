import type { GlobalThemeOverrides } from "naive-ui"
import type { ToolbarNames } from "md-editor-v3"
export const ThemeConfig: GlobalThemeOverrides = {
  common: {
    primaryColor: "#F94646FF",
    primaryColorHover: "#D6812CFF",
    primaryColorPressed: "#D6812CFF",
    infoColor: "#894F99FF",
    infoColorHover: "#894F99FF",
    infoColorPressed: "#894F99FF",
    successColor: "#2E8931FF",
    successColorHover: "#48894AFF",
    successColorPressed: "#48894AFF",
    baseColor: "#ffffffFF",
    warningColor: "#C9930BFF",
    errorColor: "#781212FF",
    errorColorHover: "#781212FF",
    warningColorHover: "#C9930BFF",
    borderRadius: "8px",
    borderRadiusSmall: "5px",
  },
}

export const tools: Array<ToolbarNames> = [
  "revoke",
  "next",
  "-",
  "bold",
  "underline",
  "italic",
  "image",
  "-",
  "strikeThrough",
  "title",
  "sub",
  "sup",
  "quote",
  "unorderedList",
  "orderedList",
  "-",
  "codeRow",
  "code",
  "link",
  "table",
  "=",
  "pageFullscreen",
  "fullscreen",
  "preview",
  "htmlPreview",
  "catalog",
]

export default ThemeConfig
