const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },

  lintOnSave: false,

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
        // add other feature flags as needed
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      }),
    ],
  },

  // 根據環境變數動態設置 publicPath
  publicPath:
    process.env.DEPLOY_ENV === "GH_PAGES"
      ? "/vue3-ecommerce-pojui/" // GitHub Pages
      : "./", // Zeabur 或其他環境
});
