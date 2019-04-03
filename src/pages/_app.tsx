import React from "react";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import createStore from "../redux/store";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps, socketUrl: publicRuntimeConfig.socketUrl };
  }

  render() {
    const { Component, pageProps, store, socketUrl } = this.props;
    // console.log(store.getState());
    return (
      //antd默认英文，国际化方案，全局设置中文
      <LocaleProvider locale={zh_CN}>
        <Container>
          <Provider store={store}>
            <Component {...pageProps} socketUrl={socketUrl} />
          </Provider>
        </Container>
      </LocaleProvider>
    );
  }
}

export default withRedux(createStore)(MyApp);
