import React from 'react';
import { connect } from 'react-redux';
import { CommonLayout } from '../layouts/common';

class Test extends React.Component{
  render(){
    return <CommonLayout/>
  }
}

export default connect(x => x)(Test);