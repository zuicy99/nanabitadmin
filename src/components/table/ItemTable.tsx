import styled from "@emotion/styled";
import { Table } from "antd";
import React, { useState } from "react";
import { Common, SearchButton } from "../../styles/AdminBasic";
import ResultModal from "../common/Modal";

export interface IDataItem {
  key: number;
  name: string;
  item: string;
  bt?: JSX.Element;
  img?: JSX.Element;
}

const ItemTable: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  // ResultModal을 보여주는 함수
  const handleShowModal = () => {
    setShowModal(true);
  };

  // ResultModal을 닫는 함수
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "No",
      dataIndex: "key",
    },
    {
      title: "이미지",
      dataIndex: "img",
    },
    {
      title: "상품명",
      dataIndex: "item",
    },
    {
      title: "카테고리",
      dataIndex: "name",
    },
    {
      title: "재고",
      dataIndex: "name",
    },
    {
      title: "판매가",
      dataIndex: "name",
    },
    {
      title: "관리",
      dataIndex: "bt",
    },
  ];

  const data: IDataItem[] = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      key: i + 1,
      name: `Edward King ${i}`,
      item: `London, Park Lane no. ${i}`,
      bt: <SearchButton onClick={handleShowModal}>수정</SearchButton>,
      img: (
        <img
          style={{ width: "100px", height: "50px" }}
          src="data:image/jpeg;base64,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"
        />
      ),
    });
  }

  const Aaa = styled(Table)`
    :where(.css-dev-only-do-not-override-1xg9z9n).ant-table-wrapper
      .ant-table-tbody
      .ant-table-row.ant-table-row-selected
      > .ant-table-cell {
      background-color: ${Common.color.p800};
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: ${Common.color.p600};
      border-color: ${Common.color.p800};
    }
    .ant-checkbox-wrapper-checked:hover .ant-checkbox-inner,
    .ant-checkbox-checked:hover .ant-checkbox-inner {
      border-color: rgba(40, 40, 40, 0.8) !important;
    }

    .ant-checkbox-wrapper:hover .ant-checkbox-inner,
    .ant-checkbox:hover .ant-checkbox-inner,
    .ant-checkbox-input:focus + .ant-checkbox-inner {
      border-color: #d9d9d9 !important;
    }
    :where(.css-dev-only-do-not-override-1xg9z9n).ant-checkbox-indeterminate
      .ant-checkbox-inner:after {
      background-color: ${Common.color.p800};
    }
  `;

  return (
    <>
      <Aaa
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      {showModal && <ResultModal onClose={handleCloseModal} />}
    </>
  );
};

export default ItemTable;