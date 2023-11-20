import "./RouletteDetail.scss";
import { Card, DatePicker, Empty, Spin, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import moment from "moment";
import { useRouletteDetailsQuery } from "../../../store/service/CasinoServices";

const { RangePicker } = DatePicker;

const RouletteDetail = ({isAura, Id}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState([]);
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [rouletteDate, setRouletteDate] = useState();
  const [isAuraDetails, setIsAuraDetails] = useState();

  const navigate = useNavigate();
  
  const handleBackbtn = () => {
    navigate(-1);
  };


  const handleDroupDown = (val) => {
    setRouletteDate(val);
    setIsAuraDetails(isAura);
  };

  const handlePlusMinus = () => {
    navigate(`/casino/${Id}/plus-minus-type`, { state: { rouletteDate, isAuraDetails } });
  };

  const handleDisplayGame = () => {
    navigate(`/casino/${Id}/all-games`, { state: { rouletteDate, isAuraDetails } });
  };

  const items = [
    {
      label: (
        <p onClick={handlePlusMinus} className="title_section">
         { `${isAura} Plus Minus`}
        </p>
      ),
      key: "0",
    },
    {
      label: (
        <p onClick={handleDisplayGame} className="title_section">
          Display Game
        </p>
      ),
      key: "1",
    },
  ];

  const onChange = (data, dateString) => {
    setDateData(dateString);
  };

  const handleScroll = () => {
    const updatedDropdownStates = dropdownStates.map(() => false);
    setDropdownStates(updatedDropdownStates);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (index) => {
    const updatedDropdownStates = [...dropdownStates];
    updatedDropdownStates[index] = !updatedDropdownStates[index];
    setDropdownStates(updatedDropdownStates);
  };
  const myElementRef = useRef(null);

  useEffect(() => {
    const element = myElementRef.current;
    if (!isDropdownOpen) {
      window.addEventListener("scroll", handleScroll);
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      element.removeEventListener("scroll", handleScroll);
    };
  }, [isDropdownOpen]);


  const {
    data: rouletteData,
    isLoading,
    isFetching,
  } = useRouletteDetailsQuery(
    {
      casinoId: Id,
      startDate: dateData[0],
      endDate: dateData[1],
    },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <>
      <Card
        className="sport_detail roulette"
        title={`${isAura} Details`}
        extra={
          <>
            <button onClick={console.log("")}>Book</button>
            <button onClick={handleBackbtn}>Back</button>
          </>
        }>
        <div className="date_picker m-12">
          <RangePicker
            style={{ marginBottom: "10px" }}
            defaultValue={[dayjs(timeBefore), dayjs(time)]}
            onChange={onChange}
            bordered={false}
          />
        </div>
        <div ref={myElementRef} className="table_section">
          <table className="ant-spin-nested-loading">
            <tr>
              <th style={{width:"4%"}}></th>
              <th>Name</th>
              <th className="text-right">Comm Liya</th>
              <th className="text-right">Comm Diya</th>
              <th className="text-right">Comm Liya Share Wise</th>
              <th className="text-right">Pnl</th>
            </tr>
            {isLoading || isFetching ? (
              <div className="spin_icon comp_spin">
                <Spin size="large" />
              </div>
            ) : (
              ""
            )}
            {rouletteData?.data?.map((res, id) => {
              return (
                <tr key={res?.key}>
                  <td style={{ cursor: "pointer" }}>
                    <Dropdown
                      className="table_dropdown sport_droupdown"
                      open={dropdownStates[id]}
                      onOpenChange={() => toggleDropdown(id)}
                      menu={{
                        items,
                        className: "sport_list",
                      }}
                      trigger={["click", "contextMenu"]}>
                      <p>
                        <a onClick={() => handleDroupDown(res?.date)}>
                          <Space>
                            <CaretDownOutlined />
                          </Space>
                        </a>
                      </p>
                    </Dropdown>
                  </td>
                  <td>
                    {res?.name} {res?.date}
                  </td>
                  <td className="text-right"
                    >
                    {(res?.comm)?.toFixed(2)}
                  </td>
                  <td className="text-right"
                    >
                    {(res?.commDiya)?.toFixed(2) || 0}
                  </td>
                  <td className="text-right"
                    >
                    {(res?.commLiyaShareWise)?.toFixed(2) || 0}
                  </td>
                  <td
                    className={`text-right ${
                      res?.netPnl - res?.comm < 0
                        ? "text_danger"
                        : "text_success"
                    }`}>
                    {" "}
                    {(res?.netPnl - res?.comm)?.toFixed(2)}
                  </td>
                </tr>
              );
            })}
            {(rouletteData?.data === undefined ||
              rouletteData?.data?.length === 0) && (
              <tr>
                {" "}
                <td colSpan={9}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </td>
              </tr>
            )}
          </table>
        </div>
      </Card>
    </>
  );
};

export default RouletteDetail;
