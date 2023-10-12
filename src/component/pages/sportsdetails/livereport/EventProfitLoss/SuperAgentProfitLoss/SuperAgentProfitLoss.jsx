import { Table } from 'antd'
import React from 'react'


const columns = [
    {
      title: "A/C Name",
      dataIndex: "userId",
      key: "userId",
      className:"user_id",
      render: (text, record) => (
        <span className="user_id">{ record?.userId} </span>
      ),
    },
    {
      title: "P&L",
      dataIndex: "pnl",
      key: "pnl",
      render: (text, record) => (
        // console.log(record?.pnl, "dsdass")
        <span className={record?.pnl > 0?"text_success":"text_danger"}>
         {record?.pnl}
        </span>
      ),
    },
    {
      title: "Comm.",
      dataIndex: "comm",
      key: "comm",
    }
  ];

const SuperAgentProfitLoss = ({name, data}) => {
  return (
    <>
      <div className="main_live_section">
            <div className="_match">
              <div
                className="sub_live_section live_report"
                style={{ borderRadius: "2px 2px 0 0", fontSize: "16px" }}>
                <div style={{ padding: "9px 8px" }} className="team_name">
                  Master P&L
                </div>
              </div>
            </div>
            <div>
              <div className="table_section">
                <Table
                  className="live_table limit_update"
                  bordered
                  pagination={false}
                  columns={columns}
                  dataSource={data?.superMaster}
                ></Table>
              </div>
            </div>
          </div>
    </>
  )
}

export default SuperAgentProfitLoss
