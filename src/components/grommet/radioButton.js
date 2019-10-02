import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";

const customTheme = deepMerge(grommet, {
  radioButton: {
    gap: "xsmall",
    size: "18px",
    hover: {
      border: {
        color: "dark-3"
      }
    },
    check: {
      color: {
        light: "neutral-1"
      }
    },
    icon: {
      size: "10px"
    }
  }
});

export default customTheme