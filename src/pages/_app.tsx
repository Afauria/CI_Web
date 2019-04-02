import React from "react";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import createStore from "../redux/store";

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps, socketUrl: publicRuntimeConfig.socketUrl  };
  }

  render() {
    const { Component, pageProps, store, socketUrl } = this.props;
    // console.log(store.getState());
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} socketUrl={socketUrl}/>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(
  createStore
)(MyApp);
