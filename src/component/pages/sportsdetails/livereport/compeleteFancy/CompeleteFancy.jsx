import { Card, Empty, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setData } from "../../../../../store/global/slice";
import { useLazyCompleteFancyQuery } from "../../../../../store/service/supermasteAccountStatementServices";

const CompeleteFancy = () => {
  const [marketId, setMarketId] = useState("");
  const { pathname } = useLocation();


  const dispatch = useDispatch();
  const nav = useNavigate();

  const { id } = useParams();

  const [trigger, { data: completeFancyData, isLoading, isFetching }] =
    useLazyCompleteFancyQuery();

  useEffect(() => {
    trigger({
      matchid: Number(id),
    });
  }, [id]);

  const handleShowBets = (val) => {
    setMarketId(val);
    dispatch(setData(val));
    nav(`/Events/${id}/pl/live-report`, { state: { id: val } });
  };

  const handleRefresh = () => {
    trigger({
      matchid: Number(id),
    });
  };



  return (
    <>
      <div>
        <Card
          style={{
            margin: "12px",
            width: "100%",
          }}
          className="sport_detail completed_fancy"
          title="Completed fancy"
          extra={
            <div>
              <button onClick={handleRefresh}>Refresh</button>
              {pathname?.includes("completed-fancy-slips") && (
                <button style={{marginLeft:"10px"}} onClick={()=>nav(-1)}>Back</button>
              )}
            </div>
          }>
          <div className="table_section ant-spin-nested-loading">
            <table className="">
              <tr>
                <th>Title</th>
                <th>P&L</th>
                <th>Won By</th>
                <th>Net P&L</th>
                <th>Action</th>
              </tr>
              {isLoading || isFetching ? (
                <div className="spin_icon comp_spin">
                  <Spin size="large" />
                </div>
              ) : (
                ""
              )}

              {(completeFancyData?.data?.list?.length != null ||
                completeFancyData?.data?.list?.length == 0) && (
                <tr>
                  <td>Total</td>
                  <td
                    className={
                      completeFancyData?.data?.total?.pnl < 0
                        ? "text_danger"
                        : "text_success"
                    }>
                    {(completeFancyData?.data?.total?.pnl)?.toFixed(2)}
                  </td>
                  <td></td>
                  <td
                    className={
                      completeFancyData?.data?.total?.netpnl > 0
                        ? "text_success"
                        : "text_danger"
                    }>
                    {(completeFancyData?.data?.total?.netpnl)?.toFixed(2)}
                  </td>
                  <td></td>
                </tr>
              )}

              {completeFancyData?.data?.list?.map((res) => {
                return (
                  <tr key={res?.key}>
                    <td>{res?.selectionname}</td>
                    <td
                      className={`${
                        res?.pnl < 0 ? "text_danger" : "text_success"
                      }`}>
                      {(res?.pnl)?.toFixed(2)}
                    </td>
                    <td>{res?.result}</td>
                    <td
                      className={`${
                        res?.pnl < 0 ? "text_danger" : "text_success"
                      }`}>
                      {(res?.netpnl)?.toFixed(2)}
                    </td>
                    <td>
                      <button
                        className="show_bets"
                        onClick={() => handleShowBets(res?._id)}>
                        Show Bets
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={5}>
                  {completeFancyData?.data?.list?.length == undefined && (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )}
                </td>
              </tr>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CompeleteFancy;
