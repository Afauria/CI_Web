import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { ciProjectColumns } from "../../utils/tableKeys";
import { data } from "../mockData";
import styles from "../index.scss";
import {
  projectBuildStatusMap,
  projectIntegrateStatusMap
} from "../../utils/statusMap";
import { formatTime } from "../../utils/timeFormat";
//超小屏显示一列，小屏显示1列，中屏显示2列，大屏显示3列
const responsive = { xs: 24, sm: 24, md: 12, lg: 8 };
const InfoItem = ({ label, value, color = "" }) => {
  const colorStyle = { color: color };
  return (
    // 栅格布局，24等分，Col在Row里面
    <Col {...responsive}>
      <div className={styles.infoLabel}>{label}</div>
      <div className={styles.infoValue} style={colorStyle}>
        {value}
      </div>
    </Col>
  );
};
export default class ProjectInfo extends React.Component<any> {
  render() {
    const gutter = 32;
    const { info } = this.props;
    return (
      <div>
        <div className={styles.infoTitle}>项目详情</div>
        <Row gutter={gutter}>
          <InfoItem label="项目 ID:" value={info.projectId} />

          <InfoItem label="项目名称" value={info.name} />

          <InfoItem label="项目描述" value={info.descr} />

          <InfoItem label="项目分支" value={info.branch} />

          <InfoItem label="项目依赖分支" value={info.dependBranch} />

          <InfoItem
            label="构建状态"
            value={projectBuildStatusMap[info.buildStatus]}
            color={
              info.buildStatus == 4
                ? "red"
                : info.buildStatus == 2
                ? "blue"
                : ""
            }
          />

          <InfoItem
            label="集成状态"
            value={projectIntegrateStatusMap[info.integrateStatus]}
          />

          <InfoItem label="上次操作时间" value={formatTime(info.gmtUpdate)} />

          <InfoItem label="仓库" value={info.repo} />
        </Row>
      </div>
    );
  }
}
