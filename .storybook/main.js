import { dirname, join } from "path";
export default {
  "stories": [
    "../packages/**/*.stories.mdx",
    "../packages/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {}
  }
}

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
