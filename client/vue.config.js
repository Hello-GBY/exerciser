const path = require("path");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

// https://cli.vuejs.org/zh/config/#configurewebpack
module.exports = {
  outputDir: "./build/",
  // publicPath: './',
  // 配置代理
  // devServer: {},
  configureWebpack: (config) => {
    config.resolve.alias = {
      "@": path.resolve(__dirname, "src"), // 要是绝对路径
      components: "@/components",
    };

    config.plugins.push(
      Components({
        resolvers: [ElementPlusResolver()],
      })
    );
    // return config
  },
  //链式调用
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
};
