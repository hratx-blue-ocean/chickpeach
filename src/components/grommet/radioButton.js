import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";

const customTheme = deepMerge(grommet, {
  radioButton: {
    gap: "medium",
    size: "30px",
    check: {
      color: {
        light: "#FFB084"
      }
    },
    icon: {
      size: "100%"
    }
  }
});

export default customTheme