import React from "react";
import { Button, Row, Col, Table } from "antd";

export interface IArticle {
  _id: string;
  title: string;
  description: string;
  user: {
    _id: string;
    name: string;
  };
}

interface ArticleViewProps {
  articles: IArticle[];
  setShowModal: (value: boolean) => void;
  tableColumns: any[];
  loading: boolean;
  userLogout: Function;
}

const ArticleView = ({
  articles,
  setShowModal,
  tableColumns,
  loading,
  userLogout,
}: ArticleViewProps) => {
  return (
    <Row style={{ marginTop: "10px" }}>
      <Col lg={{ span: 8, offset: 8 }} md={{ span: 12, offset: 6 }}>
        <div style={{ textAlign: "right" }}>
          <a onClick={() => userLogout()}>Logout</a>
        </div>
        <h2>ARTICLES</h2>
        <p>Click on "published by" header title to filter by user</p>
        <Button onClick={() => setShowModal(true)} type="primary">
          Create Article
        </Button>
        <Table
          pagination={{}}
          columns={tableColumns}
          dataSource={articles}
          loading={loading}
        />
      </Col>
    </Row>
  );
};

export default ArticleView;
