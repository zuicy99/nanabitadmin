import React from "react";
import { Divider, Table } from "antd";

export const columns = [
  {
    title: "총 주문건수",
    dataIndex: "name",
  },
  {
    title: "총 주문액",
    dataIndex: "address",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
];

const MainTable = () => {
  return (
    <div>
      <Divider>전체 주문현황</Divider>

      <Table
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={false}
      />
    </div>
  );
};

export default MainTable;