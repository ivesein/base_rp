# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

config-overrides
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
const webpack = require("webpack");
const isDEV = process.env.NODE_ENV === "development"; //引入当前的node环境
const BUILD_ENV = process.env.BUILD_ENV; //引入当前的cross-env build环境
const {
  TEST_BUILD_URL, //测试环境线上地址
  DEV_BUILD_URL, //开发环境线上地址
  GATEWAY_URL_PREFIX, //后台服务API接口网关转发修正前缀
  OUTPUT_PORT, //线上部署访问端口
  GATEWAY_PORT, //线上部署后台接口服务端口
} = require("./build_options.js");
const devServerConfig = () => (config) => {
  return {
    ...config,
    proxy: {
      "/api": {
        target: "http://192.168.11.118:30071",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/noticeApi": {
        // target: "http://192.168.112.220:18089/jjsk_notice",
        target: "http://192.168.11.118:30071/notification",
        changeOrigin: true,
        pathRewrite: {
          "^/noticeApi": "",
        },
      },
      "/messageApi": {
        target: "http://192.168.11.118:30071/notification",
        changeOrigin: true,
        pathRewrite: {
          "^/messageApi": "",
        },
      },
      "/authApi": {
        target: "http://192.168.11.118:30071/userperm",
        changeOrigin: true,
        pathRewrite: {
          "^/authApi": "",
        },
      },
      "/sysApi": {
        target: "http://192.168.11.118:30071/sysmange",
        changeOrigin: true,
        pathRewrite: {
          "^/sysApi": "",
        },
      },
      "/monitorApi": {
        target: "http://192.168.11.118:30071/sys_log",
        changeOrigin: true,
        pathRewrite: {
          "^/monitorApi": "",
        },
      },
      "/workflowApi": {
        target: "http://192.168.1.252:18080",
        changeOrigin: true,
        pathRewrite: {
          "^/workflowApi": "",
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
    addWebpackPlugin(
      new webpack.DefinePlugin({
        "process.env.CURRENT_BUILD_ENV": JSON.stringify(BUILD_ENV),
        "process.env.ENTRY_PORT": isDEV
          ? JSON.stringify(process.env.PORT)
          : JSON.stringify(OUTPUT_PORT),
        "process.env.ENTRY_PATH":
          BUILD_ENV === "develop"
            ? JSON.stringify(DEV_BUILD_URL)
            : BUILD_ENV === "release"
            ? JSON.stringify(TEST_BUILD_URL)
            : JSON.stringify("http://localhost"),
        "process.env.API_BASE":
          BUILD_ENV === "develop"
            ? JSON.stringify(
                DEV_BUILD_URL + ":" + GATEWAY_PORT + GATEWAY_URL_PREFIX
              )
            : BUILD_ENV === "release"
            ? JSON.stringify(
                TEST_BUILD_URL + ":" + GATEWAY_PORT + GATEWAY_URL_PREFIX
              )
            : JSON.stringify(""),
      })
    ),
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
package.json
{
  "name": "base_react_project",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "antd": "^4.10.1",
    "antd-dayjs-webpack-plugin": "^1.0.4",
    "axios": "^0.21.1",
    "babel-plugin-import": "^1.13.3",
    "node-sass": "4.14.1",
    "qiankun": "^2.3.6",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.1",
    "sass-resources-loader": "^2.1.1",
    "universal-cookie": "^4.0.4",
    "web-vitals": "^0.2.4"
  },
  "scripts": {
    "start": "react-app-rewired start",
    "build:develop": "cross-env BUILD_ENV=develop react-app-rewired build",
    "build:release": "cross-env BUILD_ENV=release react-app-rewired build",
    "build:dev": "cross-env BUILD_ENV=development react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "cross-env": "^7.0.3",
    "customize-cra": "^1.0.0",
    "react-app-rewired": "^2.1.8"
  }
}

