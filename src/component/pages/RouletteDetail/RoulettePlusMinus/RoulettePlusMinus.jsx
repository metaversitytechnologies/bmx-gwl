import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./RoulettePlusMinus.scss";
import {  useEffect,  useState } from "react";
import { Table } from "antd";
import { useRoulettePlusMinusQuery } from "../../../../store/service/CasinoServices";

const RoulettePlusMinus = () => {
  // const [droupSearch, setDroupSearch] = useState(false);
  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const columns = [
    {
      title: (
        <>
          <div className="main_search_droup ">
            <p className="menu_search">Code</p>
            {/* {droupSearch && (
              <Menu className="menu_item search_menu">
                <Form
                  name="code"
                  // form={form}
                  initialValues={{
                    remember: true,
                  }}
                  // onFinish={onFinish}
                  autoComplete="off">
                  <Form.Item name="username">
                    <Input />
                  </Form.Item>

                  <div className="agent_search_deatil">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          width: "86px",
                          marginRight: "8px",
                        }}>
                        <SearchOutlined /> Search
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        // onClick={() => form.resetFields()}
                        className="ant_reset_btn"
                        style={{ width: "86px" }}>
                        Reset
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </Menu>
            )}
            <p className="search_code">
              <Space>
                <SearchOutlined onClick={() => setDroupSearch(!droupSearch)} />
              </Space>
            </p> */}
          </div>
        </>
      ),
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Casino Amt",
      dataIndex: "casinoAmount",
      key: "casinoAmount",
      align: "right",
      render: (text, record) => (
        <span
          className={`text-right ${
            record?.casinoAmount < 0
              ? "text_danger"
              : record?.casinoAmount > 0
              ? "text_success"
              : ""
          }`}>
          {record?.casinoAmount}
        </span>
      ),
    },
    {
      title: "Comm",
      dataIndex: "comm",
      key: "comm",
      align: "right",
      render: (text, record) => (
        <span>
          {record?.isLedgerCreated ? record?.comm :"0"}
        </span>
      ),
      hideen: true 
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      align: "right",
      render: (text, record) => (
        <span
          className={`text-right ${
            record?.totalAmount < 0
              ? "text_danger"
              : record?.totalAmount > 0
              ? "text_success"
              : ""
          }`}>
          {record?.totalAmount}
        </span>
      ),
    },
    {
      title: "My Share",
      dataIndex: "myShare",
      key: "myShare",
      align: "right",
      render: (text, record) => (
        <span
          className={`text-right ${
            record?.myShare < 0
              ? "text_danger"
              : record?.myShare > 0
              ? "text_success"
              : ""
          }`}>
          {record?.myShare}
        </span>
      ),
    },
    {
      title: "Net Amount",
      dataIndex: "finalAmount",
      key: "finalAmount",
      align: "right",
      render: (text, record) => (
        <span
          className={`text-right ${
            record?.finalAmount < 0
              ? "text_danger"
              : record?.finalAmount > 0
              ? "text_success"
              : ""
          }`}>
          {record?.finalAmount}
        </span>
      ),
    },
  ];

  const { state } = useLocation();
  const { id } = useParams();

  const {
    data: plusMinus,
    isFetching,
    isLoading,
  } = useRoulettePlusMinusQuery(
    {
      casinoId: id,
      date: state?.rouletteDate,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [plusMinusData, setPlusMinusTable] = useState([]);

  useEffect(() => {
    if (plusMinus?.data) {
      setPlusMinusTable([
        plusMinus?.data,
        { ...plusMinus?.data, userId: "Total" },
      ]);
    }
  }, [plusMinus]);

  const uType = localStorage.getItem("userType");

  return (
    <>
      <div className="main_live_section list_supers">
        <div className="_match">
          <div className="sub_live_section live_report">
            <div
              style={{ padding: "5px 8px", fontSize: "22px" }}
              className="team_name">
              <p>{
                `${uType == 5? "Sub Admin ": uType == 0?"Super Master ":uType == 1?"Master ": uType == 2?"Agent ":""} Company Report`
              }</p>
              <p style={{ fontSize: "16px" }}>
                {`${state?.isAuraDetails?"AURA":"Super Nowa"} ${state?.rouletteDate}`}{" "}
              </p>
            </div>
            <div className="show_btn">
              <button onClick={handleBackClick}>Back</button>
            </div>
          </div>
          <div className="table_section "></div>
        </div>
        <div>
          <div className="table_section">
            <Table
              className="live_table roulette_table"
              bordered
              columns={columns}
              loading={isFetching || isLoading}
              dataSource={plusMinusData}
              rowClassName={(record) => {
                return record?.userId == "Total" ? "dateHiglight" : "";
              }}
              // pagination={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoulettePlusMinus;
