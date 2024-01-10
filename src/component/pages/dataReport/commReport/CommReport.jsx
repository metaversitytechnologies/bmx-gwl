import { Button, Card, Col, DatePicker, Input, Row, Select, Form } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import ReportTable from "../ReportTable";
import {
  useCommReportMutation,
  useLazyUserListQuery,
} from "../../../../store/service/supermasteAccountStatementServices";
import { useLocation, useNavigate } from "react-router-dom";
import CommReportTable from "./CommReportTable";
import DownloadReport from "../../../common/DownloadReport/DownloadReport";

const CommReport = ({ reportName, userType }) => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [clientId, setClientId] = useState("");
  const [paginationTotal, setPaginationTotal] = useState(50);
  const [totalPage, setTotalPage] = useState();
  const [indexData, setIndexData] = useState(0);

  const nav = useNavigate();

  const { Option } = Select;
  const [form] = Form.useForm();
  const onChange = (date, dateString) => {
    setDateData(dateString);
  };

  const { pathname } = useLocation();
  const [userList, { data: resultData }] = useLazyUserListQuery();
  const [trigger, { data: commReport, isLoading }] = useCommReportMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    trigger({
      userType: userType,
      startDate: dateData[0],
      endDate: dateData[1],
      userId: "",
      noOfRecords: paginationTotal,
      index: indexData,
    });
    setTotalPage(commReport?.data?.totalPages);
  }, [userType, totalPage, indexData, paginationTotal]);

  // console.log(commReport?.data?.list, "adsfasfas");

  const handleChange = (value) => {
    userList({
      userType: userType,
      userName: value,
    });
  };

  useEffect(() => {
    form?.resetFields();
    setClientId("");
    userList({
      userType,
      userName: "",
    });
  }, [pathname]);

  const handleSelect = (value) => {
    setClientId(value);
  };

  const onFinish = (value) => {
    trigger({
      userType: userType,
      startDate: dateData[0],
      endDate: dateData[1],
      userId: clientId || "",
      noOfRecords: "50",
      index: "0",
    });
  };

  const dataSource = commReport?.data?.list?.map((curElm) => {
    return {
      userid: curElm?.userId,
      matchName: curElm?.matchName,
      commDiya: curElm?.commDiya,
      comm: curElm?.comm,
      date: curElm?.date,
    };
  });

  const headerField = ["User", "Match Name", "Comm Diya", "Comm Liye", "Date"];

  return (
    <>
     {
    
    isModalOpen && <div onClick={()=>setIsModalOpen(false)} className="report_overlay"></div>
    }
    <Card
      className="sport_detail ledger_data"
      title={`${reportName} Comm Reports`}
      extra={<button onClick={() => nav(-1)}>Back</button>}>
      <div className="">
        <Form
          className="form_data mt-16 cash_data"
          name="basic"
          style={{ marginTop: "12px" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
          autoComplete="off">
          <Row>
            <Col xl={8} lg={8} md={24} xs={24}>
              <Form.Item label={reportName} name="client">
                <Select
                  placeholder="Select Client"
                  options={
                    resultData?.data.map((i) => ({
                      label: `${i?.userId}  (${i?.userName})`,
                      value: i?.userId,
                    })) || []
                  }
                  showSearch
                  allowClear
                  onSelect={handleSelect}
                  onSearch={handleChange}></Select>
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={24} xs={24}>
              <Form.Item label="Date" name="Date">
                <DatePicker.RangePicker
                  allowClear={false}
                  className="report_date_picker"
                  defaultValue={[dayjs(timeBefore), dayjs(time)]}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
            <Col xl={4} lg={4} md={12} xs={12}>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button loading={isLoading} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
            <Col xl={4} lg={4} md={12} xs={12}>
              <Form.Item>
                  <DownloadReport
                  startDate= {dateData[0]}
                  endDate= {dateData[1]}
                    userType={userType}
                    reportName={`${reportName?.replace(
                      / /g,
                      "_"
                    )}_Comm_Reports`}
                    headerField={headerField}
                    reportType="CasinoCommReport"
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                  />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <CommReportTable
        data={commReport?.data?.list}
        setTotalPage
        paginationTotal={paginationTotal}
        totalPage={totalPage}
        indexData={indexData}
        setIndexData={setIndexData}
        setPaginationTotal={setPaginationTotal}
        isLoading={isLoading}
      />
    </Card>
    </>
    
  );
};

export default CommReport;
