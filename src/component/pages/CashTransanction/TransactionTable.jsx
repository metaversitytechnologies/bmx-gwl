import {
  Button,
  Col,
  Divider,
  Dropdown,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Space,
  message,  
  notification,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useDeleteByUserIDMutation } from "../../../store/service/supermasteAccountStatementServices";

const dateFormat = "YYYY/MM/DD";

const TransactionTable = ({ data, clientId, balanceData }) => {
  const [deletedId, setDeletedId] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const nav = useNavigate();

  // useEffect(() => {
  //   const debitCal = data
  //     ?.map((res) => res?.debit)
  //     .reduce((prev, curr) => Number(prev) + Number(curr), 0);
  //   const creditCal = data
  //     ?.map((res) =>  res?.credit)
  //     .reduce((prev, curr) => Number(prev) + Number(curr), 0);
  //   setDebitCal(debitCal);
  //   setCreditCal(creditCal);
  // }, [data]);


  const [DeleteByUserId, { data: deletedData, error }] = useDeleteByUserIDMutation();

  const fetchDeletedTran = () => {
    nav(`/client/deletedlenden/${clientId}`);
  };

  const handelDeleteUser = (val) => {
    setDeletedId(val)
  };


  const openNotification = (mess) => {
    api.success({
      message: mess,
      description: "Success",
      closeIcon: false,
      placement: "top",
    });
  };

  const openNotificationError = (mess) => {
    api.error({
      message: mess,
      closeIcon: false,
      placement: "top",
    });
  };


  const confirm = (e) => {
      DeleteByUserId({
      _id: deletedId,
    });
  };


  useEffect(()=>{
    if(deletedData?.status === true){
        openNotification(deletedData?.message);
    }else if(deletedData?.status === false || error?.data?.message){
        openNotificationError(deletedData?.message || error?.data?.message);
    }
}, [deletedData?.data, error])


  const items = [
    {
      label: (
        <Popconfirm
          description="Are you sure delete this task?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No">
          <p>Delete</p>
        </Popconfirm>
      ),
      key: "0",
    },
  ];

  return (
    <>
    {contextHolder}
      <div className="my_ledger" style={{ padding: "12px 0px" }}>
        <div>
          <h3 style={{ padding: "5px", color: "rgb(214, 75, 75)" }}>
            Dena : {(balanceData?.credit)?.toFixed(2)}
          </h3>
        </div>
        <div>
          <h3 style={{ padding: "5px", color: "rgb(51, 181, 28)" }}>
            Lena :  {(balanceData?.debit)?.toFixed(2)}
          </h3>
        </div>

        <div>
          <h3 style={{ padding: "5px"}} className={balanceData?.balance < 0 ?"text_danger":"text_success"}>
            Balance: {Math.abs(balanceData?.balance)}{" "}
            {balanceData?.balance > 0 ? "(Lena)" : "(Dena)"}
          </h3>
        </div>
        <div className="deleted_sec">
          <Button onClick={fetchDeletedTran}>Deleted</Button>
        </div>
      </div>
      <div className="table_section" style={{ paddingBottom: "20px" }}>
        <table className="">
          <tr>
            <th className="text-right">#</th>
            <th>Date</th>
            <th>Post Date</th>
            <th>Collection Name </th>
            <th className="text-right">Debit</th>
            <th className="text-right">Credit</th>
            <th className="text-right">Balance</th>
            <th>Payment Type</th>
            <th>Remark</th>
            <th>Done By</th>
          </tr>
          {data?.length != 0 &&
            data?.map((res) => {
              console.log(res, "dasdasd")
              return (
                <tr key={res?.key}>
                  <td>
                    {(res?.doneBy && !res?.isRollback) && (
                      <Dropdown
                        className="table_dropdown sport_droupdown"
                        onClick={() => handelDeleteUser(res?._id?.$oid)}
                        menu={{
                          items,
                          className: "trans",
                          
                        }}
                        trigger={["click", "contextMenu"]}>
                        <p
                          onClick={(e) => {
                            e.preventDefault();
                          }}>
                          <Space>
                            <CaretDownOutlined />
                          </Space>
                        </p>
                      </Dropdown>
                    )}
                  </td>
                  <td>
                    {res?.date?.$date || res?.date}
                  </td>
                  <td>
                  {res?.date?.$date || res?.date}
                  </td>
                  <td>{res?.collectionName}</td>
                  <td className="text-right">{res?.debit}</td>
                  <td className="text-right">{res?.credit}</td>
                  <td className="text-right">{Math.abs(res?.balance)} - {res?.balance > 0? "Lena":"Dena"}</td>
                  <td>{res?.paymentType}</td>
                  <td>{res?.remarks}</td>
                  <td>{res?.doneBy}</td>  
                </tr>
              );
            })}
        </table>
      </div>
      {/* <Divider />
      <Pagination
        className="pagination_main ledger_pagination"
        defaultCurrent={1}
        total={50}
      /> */}
    </>
  );
};

export default TransactionTable;
