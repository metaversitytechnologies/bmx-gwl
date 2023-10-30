import {
  Card,
  Col,
  DatePicker,
  Divider,
  Empty,
  Pagination,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import "./MatchLedger.scss";
import { useLazyProfitAndLossLedgerQuery } from "../../../../store/service/ledgerServices";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import DownloadReport from "../../../common/DownloadReport/DownloadReport";

// const columns = [
//   {
//     title: "Date",
//     dataIndex: "date",
//     key: "date",
//   },
//   {
//     title: "Title",
//     dataIndex: "matchName",
//     key: "matchName",
//   },
//   {
//     title: "CR",
//     dataIndex: "netPnl",
//     key: "netPnl",
// render: (text, record) => (
//   console.log(record, "asdasda")
//   <span>
//    0
//   </span>
// ),
//   },
//   {
//     title: "DR",
//     dataIndex: "netPnl",
//     key: "netPnl",
//   },
// ];

const MatchLedger = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [totalPage, setTotalPage] = useState();
  const [indexData, setIndexData] = useState(0);
  const [paginationTotal, setPaginationTotal] = useState(50);

  const onChange = (date, dateString) => {
    setDateData(dateString);
  };

  // const [data, setData] = useState({});
  const [trigger, { data, isLoading, isFetching }] =
    useLazyProfitAndLossLedgerQuery();

  useEffect(() => {
    trigger({
      startDate: dateData[0],
      endDate: dateData[1],
      index: indexData < 0 ? 0 : indexData,
      noOfRecords: paginationTotal,
    });
    setTotalPage(data?.data?.totalPages);
  }, [data?.data, dateData, paginationTotal, indexData]);

  const nav = useNavigate();

  // console.log(data?.data?.list?.length , "sdasdas");

  const dataSource = data?.data?.list?.map((curElm) => {
    return {
      date: curElm?.date,
      title: curElm?.matchName,
      debit: curElm?.netPnl < 0 ? curElm?.netPnl : "0",
      credit: curElm?.netPnl > 0 ? curElm?.netPnl : "0",
    };
  });

  const headerField = ["Date", "Title", "CR", "DR"];
  const lenadenaHeading = ["Total"];

  const arrBalance = [
    {
      total: data?.data?.total?.toFixed(2),
    },
  ];

  return (
    <Card
      className="sport_detail my_ledger main_match_ledger"
      title="Profit/Loss"
      extra={<button onClick={() => nav(-1)}>Back</button>}>
      <Row className="main_super_super_ledger">
        <Col lg={8} xs={24} className="match_ladger profit_loss_ledger">
          <DatePicker.RangePicker
            defaultValue={[dayjs(timeBefore), dayjs(time)]}
            onChange={onChange}
          />
        </Col>
        <Col lg={6} xs={12}>
          <div className="matchladger_total">
            <p style={{ fontSize: "20px" }}>
              Total :{" "}
              <span
                className={
                  data?.data?.total > 0 ? "text_success" : "text_danger"
                }>
                {data?.data?.total?.toFixed(2)}
              </span>
            </p>
          </div>
        </Col>
        <Col lg={6} xs={11}>
          <div className="matchladger_total rep_download">
            {/* <DownloadReport dataSource={dataSource} headerField={headerField} reportType="MyLedgerProfitLoss"/> */}
            <DownloadReport
              balanceData={arrBalance}
              lenadenaHeading={lenadenaHeading}
              dataSource={dataSource}
              headerField={headerField}
              reportType="MyLedgerProfitLoss"
              reportName="profit/loss"
            />
          </div>
        </Col>
      </Row>

      <div className="table_section statement_tabs_data ant-spin-nested-loading">
        <table className="">
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>CR</th>
            <th>DR</th>
          </tr>
          {isLoading || isFetching ? (
            <Spin className="spin_icon" size="large"></Spin>
          ) : (
            ""
          )}
          {data?.data?.list?.map((res, id) => {
            return (
              <tr key={id} style={{ cursor: "pointer" }}>
                <td>{moment(res?.date).format("YYYY-MM-DD")}</td>
                <td>{res?.matchName}</td>
                <td className="text_success">
                  {res?.netPnl > 0 ? res?.netPnl : 0}
                </td>
                <td className="text_danger">
                  {res?.netPnl < 0 ? res?.netPnl : 0}
                </td>
              </tr>
            );
          })}
        </table>
        {data?.data?.list?.length === 0 ||
        data?.data?.list?.length == undefined ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <>
            <Divider />
            <Pagination
              className="pagination_main ledger_pagination"
              onShowSizeChange={(c, s) => setPaginationTotal(s)}
              total={totalPage && totalPage * paginationTotal}
              defaultPageSize={50}
              pageSizeOptions={[50, 100, 150, 200, 250]}
              onChange={(e) => setIndexData(e - 1)}
            />
          </>
        )}
      </div>
    </Card>
  );
};

export default MatchLedger;
