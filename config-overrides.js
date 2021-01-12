const {
  override,
  fixBabelImports,
  addWebpackPlugin,
  adjustStyleLoaders,
  addWebpackAlias,
  overrideDevServer,
} = require("customize-cra");

const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const path = require("path");
const ENV = {
  DEV:
    "https://www.fastmock.site/mock/e33ad4c325a72379a033cc016a595eb5/jjsk_mock",
  PROD: "http://www.example.com/",
};
const devServerConfig = () => (config) => {
  return {
    ...config,
    proxy: {
      "/api": {
        target: ENV.DEV,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  };
};

module.exports = {
  webpack: override(
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: "css",
    }),
    addWebpackPlugin(new AntdDayjsWebpackPlugin()),
    adjustStyleLoaders((rule) => {
      if (rule.test.toString().includes("scss")) {
        rule.use.push({
          loader: require.resolve("sass-resources-loader"),
          options: {
            resources: ["./src/styles/main.scss"],
          },
        });
      }
    }),
    addWebpackAlias({
      ["@"]: path.resolve(__dirname, "src"),
    })
  ),
  devServer: overrideDevServer(devServerConfig()),
};
