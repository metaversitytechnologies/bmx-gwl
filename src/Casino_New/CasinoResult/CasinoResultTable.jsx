/* eslint-disable react/prop-types */
import {  Table } from "antd";


const CasinoResultTable = ({
  resultList,
  setMid,
}) => {
  const columns = [
    {
      title: "Round Id",
      dataIndex: "mid",
      key: "mid",
      render: (text, record) => (
        <span
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            color: "deepskyblue",
            width: "17%",
            height: "40px",
          }}
          onClick={() => setMid(record.mid)}>
          {record.mid?.split(".")[1]}
        </span>
      ),
    },
    {
      title: "Winner",
      dataIndex: "nat",
      key: "nat",
      render: (text, record) => (
        <span>
          <b className="mob-view-casino">Winner: - </b> {record.nat}
        </span>
      ),
    },
  ];
  return (
    <>
      <Table
        dataSource={resultList &&  Array.isArray(resultList) && resultList}
        columns={columns}
        bordered
        className={ window.innerWidth > 800 ? "table-bordered table table-striped" : ""}
        pagination={true}
      />
     
    </>
  );
};

export default CasinoResultTable;
