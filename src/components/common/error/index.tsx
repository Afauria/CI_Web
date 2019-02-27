import * as React from 'react';
import styles from './index.scss';

interface Props {
  __: any,
  status: number
}

class Error extends React.Component<Props, any> {
  render403() {
    return (
      <div>
        <p className={styles.title}>{'您好像没有权限访问这个页面喔'}</p>
        <div className={styles.erroimg403} />
      </div>
    )
  }

  render404() {
    return (
      <div>
        <p className={styles.title}>{'404，找不到网页啦！'}</p>
        <div className={styles.erroimg404} />
      </div>
    )
  }

  render500() {
    return (
      <div>
        <p className={styles.title}>{'正在开发中……'}</p>
        <div className={styles.erroimg500} />
      </div>
    )
  }

  renderImg() {
    const { status } = this.props
    switch (status) {
      case 403:
        return this.render403()
      case 404:
        return this.render404()
      default:
        return this.render500()
    }
  }

  render() {
    return (
      <div className={styles.wrp}>
        <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0 }' }} />
        <div className={styles.content}>
          <div className={styles.main}>
            {this.renderImg()}
            <a className={styles.return_home} href="/">
              {'回到首页'}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
