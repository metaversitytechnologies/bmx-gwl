import "./AccountStatement.scss";
import { Card, Tabs, DatePicker, Form, Select, Row, Col } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import AllStatement from "./AllStatement/AllStatement";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { globalSelector } from "../../../../store/global/slice";
import dayjs from "dayjs";
import {
  useLazySearchUserDownlineQuery,
} from "../../../../store/service/SportDetailServices";

const { RangePicker } = DatePicker;

const AccountStatement = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [clientId, setClientId] = useState("");

  const { id } = useParams();

  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };
  const onChange = (date, dateString) => {
    setDateData(dateString);
  };


  const handleSelect = (value) => {
    setClientId(value);
  };

  const [userList, resultData] = useLazySearchUserDownlineQuery();

  const handleChange = (value) => {
    userList({
      term: value,
      _type: value,
      q: value,
    });
  };


  const items =[
      {
        key: "13",
        label: `All`,
        children: <AllStatement gameType={1} clientId={clientId} dateData={dateData} />,
      },
      {
        key: "14",
        label: `P&L`,
        children: <AllStatement gameType={2} clientId={clientId} dateData={dateData} />,
      },
      // {
      //   key: "3",
      //   label: `PDC`,
      //   children: <AllStatement gameType={3} clientId={clientId} dateData={dateData} />,
      //   type: 1,
      // },
      // {
      //   key: "4",
      //   label: `Comm.`,
      //   children: <AllStatement gameType={4} clientId={clientId} dateData={dateData} />,
      //   type: 1,
      // },
      // {
      //   key: "5",
      //   label: `Account`,
      //   children: <AllStatement gameType={5} clientId={clientId} dateData={dateData} />,
      //   type: 1,
      // },
    ]

  const data = useSelector(globalSelector);
  

  
  const pName = window.location.pathname;

  console.log(clientId, "clientId")

  return (
    <>
      <div  className={pName == "/markets"?"":"match_slip"}>
        <div>
          <Card
            style={{
              margin: "0px",
              width: "100%",
            }}
            className="sport_detail "
            title={`Transactions (${
              data?.data === undefined ? 0 : data?.data
            })`}
            extra={<button onClick={handleBackClick}>Back</button>}>
            <div className="main_acc_section">
              <div className="datepicker">
              <Form 
                autoComplete="off"
                name="basic"
                // onFinish={onFinish}
                >
                <Row>
                <Col xs={24} lg={8}>
                <RangePicker
                  defaultValue={[dayjs(timeBefore), dayjs(time)]}
                  style={{ marginBottom: "12px", width:"100%" }}
                  onChange={onChange}
                />
                </Col>
                <Col xs={24} lg={8}>
                <Form.Item
                    // label="Client"
                    name="username"
                    className="selected_user"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please Select User",
                      },
                    ]}>
                    <Select
                      placeholder={id ? id : "Select User"}
                      options={
                        resultData?.isError ?[] :resultData?.data?.data?.map((i) => ({
                          label: `${i.text} (${i?.userName})`,
                          value: i.id,
                        })) || []
                      }
                      showSearch
                      allowClear
                      onSelect={handleSelect}
                      onSearch={handleChange}>

                      </Select>
                  </Form.Item>
                  </Col>
                  </Row>
                  </Form>
              </div>
              <div className="tab_section transtion_tab">
                <Tabs destroyInactiveTabPane type="card" items={items} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AccountStatement;
