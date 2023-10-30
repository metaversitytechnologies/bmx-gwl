import { Card, Col, DatePicker, Table } from "antd";
import "./MyLedger.scss";
import { useMyLedgerQuery } from "../../../../store/service/ledgerServices";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs'
import DownloadReport from "../../../common/DownloadReport/DownloadReport";

const columns = [
  {
    title: "Date",
    dataIndex: "dateStr",
    key: "dateStr",
  },
  {
    title: "Collection Name",
    dataIndex: "collectionName",
    key: "collectionName",
  },
  {
    title: "Debit",
    dataIndex: "debit",
    key: "debit",
    align: "right",
  },
  {
    title: "Credit",
    dataIndex: "credit",
    key: "credit",
    align: "right",
  },

  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
    align: "right",
    render: (text, record) => (
      <span>
       {Math.abs(record?.balance)}
      </span>
    ),
  },
  {
    title: "Payment Type",
    dataIndex: "paymentType",
    key: "paymentType",
    render: (text, record) => (
        // console.log(record, "dsdscsd")
      <span>
       {`${record?.paymentType} ${record?.showDate ? `- ${record?.dateOnlyStr}`  : ""} ${record?.isRollBack ? "- RollBack" : ""}`}
      </span>
    ),
  },
  {
    title: "Remark",
    dataIndex: "remarks",
    key: "remarks",
  },
  {
    title: "Rollback",
    dataIndex: "isRollback",
    key: "isRollback",
    render: (text, record) => (
      // console.log(record?.isRollback, "dsasasds")
    <span>
     {record?.isRollback ? "Yes" : "No"}
    </span>
  ),
  },
];

const MyLedger = () => {
  const nav = useNavigate()
  const handleBackbtn = () => {
    nav(-1);
  };

  const timeBefore = moment().subtract(30, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore,time]);

  const onChange = (date,dateString) => {
    setDateData(dateString);
  };

  const { data, isLoading, isFetching } = useMyLedgerQuery({
    startDate: dateData[0],
    endDate: dateData[1],
    index: 0,
    noOfRecords:100
  }, {refetchOnMountOrArgChange: true});

  const dataSource = data?.data?.list?.map((curElm) => {
    return {
      date: curElm?.date,
      collectionName: curElm?.collectionName,
      debit: curElm?.debit,
      credit: curElm?.credit,
      balance: Math.abs(curElm?.balance),
      paymentType: curElm?.paymentType,
      remarks: curElm?.remarks,
      isRollback: curElm?.isRollback ? "Yes" : "NO",
    };
  });

  const headerField = [
    "Date",
    "Collection Name",
    "Debit",
    "Credit",
    "Balance",
    "Payment Type",
    "Remark",
    "Rollback",
  ];
  
  const lenadenaHeading = [
    "Lena",
    "Dena",
    "Balance",
  ];


  const arrBalance= [{
    lena:data?.data?.data?.credit?.toFixed(2),
    dena:data?.data?.data?.debit?.toFixed(2),
    balance:data?.data?.data?.balance?.toFixed(2)
  }]

  return (
    <>
      <Card
        className="sport_detail ledger_data"
        title="My Ledger"
        extra={<button onClick={handleBackbtn}>Back</button>}>
        <div className="my_ledger">
        <Col lg={8} xs={24} className="match_ladger">
          <DatePicker.RangePicker style={{margin: "10px 0px 10px 0px"}} defaultValue={[dayjs(timeBefore), dayjs(time)]}  onChange={onChange}/>
        </Col>
          <div>
            <h3 style={{ padding: "5px", color: "rgb(51, 181, 28)" }}>
              Lena : {(data?.data?.data?.credit)?.toFixed(2)}
            </h3>
          </div>
          <div>
            <h3 style={{ padding: "5px", color: "rgb(214, 75, 75)" }}>
              Dena : {(data?.data?.data?.debit)?.toFixed(2)}
            </h3>
          </div>
          <div>
            <h3 className={data?.data?.data?.balance>0?"text_danger":"text_success"}>
              Balance: {Math.abs(data?.data?.data?.balance?.toFixed(2))}  {data?.data?.data?.balance>0?"( Dena )":"( Lena )"} 
            </h3>
          </div>
          <DownloadReport
              balanceData={arrBalance}
              lenadenaHeading={lenadenaHeading}
              reportType="MyLedger"
              reportName="MyLedger"
              dataSource={dataSource}
              headerField={headerField}
            />
          {/* <DownloadReport dataSource={dataSource} headerField={headerField} reportType="MyLedger"/> */}
        </div>
        <div className="table_section">
          <Table
            className="live_table limit_update"
            bordered
            columns={columns}
            loading={isFetching||isLoading}
            pagination={{ defaultPageSize: 50, pageSizeOptions:[50, 100, 150, 200, 250]}}
            dataSource={data?.data?.list}/>
        </div> 
      </Card>
    </>
  );
};

export default MyLedger;