import { Button, Card, Col, DatePicker, Input, Row, Select, Form } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./MasterReport.scss";
import ReportTable from "../ReportTable";
import {
  useDataReportMutation,
  useLazyUserListQuery,
} from "../../../../store/service/supermasteAccountStatementServices";
import { useLocation, useNavigate } from "react-router-dom";
import DownloadReport from "../../../common/DownloadReport/DownloadReport";

const MasterReport = ({ reportName, userType }) => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [clientId, setClientId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nav = useNavigate();

  const { Option } = Select;
  const [form] = Form.useForm();
  const onChange = (date, dateString) => {
    setDateData(dateString);
  };

  const { pathname } = useLocation();
  const [userList, { data: resultData }] = useLazyUserListQuery();
  const [trigger, { data: loginReport, isLoading }] = useDataReportMutation();

  useEffect(() => {
    trigger({
      userType: userType,
      startDate: dateData[0],
      endDate: dateData[1],
      reportType: "all",
      userId:""
    });
  }, [userType]);


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
      userType: userType,
      userName: "",
    });
  }, [pathname]);

  const handleSelect = (value) => {
    setClientId(value);
  };

  const onFinish = (value)=>{
    trigger({
        userType: userType,
        startDate: dateData[0],
        endDate: dateData[1],
        reportType: value?.reportType || "All",
        userId:clientId || ""
      });
  }

  const headerField = [
    "User",
    "Type",
    "Old",
    "New",
    "Done By",
    "Date",
    "IP",
  ];

  return (
    <>
     {
    
    isModalOpen && <div onClick={()=>setIsModalOpen(false)} className="report_overlay"></div>
    }
     <Card
      className="sport_detail ledger_data"
      title={`${reportName} Reports`}
      extra={<button onClick={()=>nav(-1)}>Back</button>}
    >
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
              <Form.Item
                label={reportName}
                name="client">
                <Select
                  placeholder="Select Client"
                  options={
                    resultData?.data.map((i) => ({
                      label: i,
                      value: i,
                    })) || []
                  }
                  showSearch
                  allowClear
                  onSelect={handleSelect}
                  onSearch={handleChange}></Select>
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={24} xs={24}>
              <Form.Item
                label="Report Type"
                name="reportType">
                <Select defaultValue="All">
                  <Option value="All">All</Option>
                  {/* <Option value="Casino Share">Casino Share</Option>
                  <Option value="Sport Share">Sport Share</Option> */}
                  <Option value="Share">Share</Option>
                  <Option value="Status">Status</Option>
                  <Option value="Password">Password</Option>
                  <Option value="Mobile">Mobile</Option>
                  <Option value="UserName">UserName</Option>
                  {/* <Option value="Casino Commission">Casino Commission</Option> */}
                  <Option value="Session Commission">Session Commission</Option>
                  <Option value="Match Commission">Match Commission</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={24} xs={24}>
              <Form.Item
                label="Date"
                name="Date">
                <DatePicker.RangePicker
                allowClear={false}
                  className="report_date_picker"
                  defaultValue={[dayjs(timeBefore), dayjs(time)]}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="report_download">
            <Form.Item>
              <Button loading={isLoading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Form.Item>
              <DownloadReport
                startDate={dateData[0]}
                endDate={dateData[1]}
                userType={userType}
                reportName={`${reportName.replace(/ /g, "_")}_reports`}
                headerField={headerField}
                reportType="dataReport"
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
      <ReportTable data={loginReport?.data} isLoading={isLoading}/>
    </Card>
    </>
   
  );
};

export default MasterReport;
