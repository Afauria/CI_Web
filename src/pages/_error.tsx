
import * as React from 'react';
import { connect } from 'react-redux';
import ErrorCom from '../components/common/error';

interface Props {
  __: any,
  status: number
}

class Error extends React.Component<Props, any> {
  static getInitialProps({ res, err }) {
    const status = res ? res.statusCode : err ? err.statusCode : null
    return { status }
  }

  render() {
    const { __, status } = this.props

    return (
      <div>
        <header>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge, chrome=1" />
          <meta name="renderer" content="webkit|ie-comp|ie-stand" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0"
          />
        </header>
        <ErrorCom __={__} status={status} />
      </div>
    )
  }
}

export default connect(x => x)(Error)
