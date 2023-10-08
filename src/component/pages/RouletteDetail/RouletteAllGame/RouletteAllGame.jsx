import { Card, Divider, Empty, Pagination, Spin } from "antd";
import "./RouletteAllGame.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAllGameQuery } from "../../../../store/service/CasinoServices";
const RouletteAllGame = () => {

const {id} = useParams();
const {state} = useLocation()

  const {data: allGamesData, isLoading, isError} = useAllGameQuery({
    casinoId: id,
    date: state?.rouletteDate,
  }, {refetchOnMountOrArgChange: true})

    const nav = useNavigate();

    const handleShowBets = (val)=>{
      nav(`/casino/show-bets/${val}`, {state: {state, id }})
    }


  return (
    <Card
    className="sport_detail main_match_ledger"
    title={`${state?.isAuraDetails?"AURA":"Super Nowa"} ${state?.rouletteDate}`}
    extra={<button onClick={() => nav(-1)}>Back</button>}>
    {/* <div className="matchladger_total">
      <p
        style={{
          fontSize: "20px",
          textAlign: "center",
          margin: "10px 0px 40px 0px",
        }}>
        Total : -36.96
      </p>
    </div> */}
    <div className="table_section ant-spin-nested-loading" style={{marginBottom:"12px"}}>
    {isLoading && (
          <>
            <Spin
              className="spin_icon betting_icon comp_spin"
              size="large"></Spin>
          </>
        )}
      <table>
        <thead>
          <tr>
            <th>S no.</th>
            <th >Game ID</th>
            {/* <th className="text-right" >Winner</th> */}
            {/* <th className="text-right">Pnl</th> */}
            {/* <th className="text-right">Comm</th> */}
            <th className="text-right">Net Pnl</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {allGamesData?.data?.map((res, id) => (
            <tr key={res.key}>
              <td>{id + 1}</td>
              <td >{res?.roundId}</td>
              {/* <td className="text-right">{res?.result}</td> */}
              {/* <td className={`text-right ${(res?.netPnl - res?.comm) < 0? "text_danger":(res?.netPnl - res?.comm)>0?"text_success":""}`}>{(res?.netPnl - res?.comm)?.toFixed(2)}</td> */}
              {/* <td className="text-right">{res?.comm}</td> */}
              <td className={`text-right ${res?.netPnl  < 0? "text_danger":res?.netPnl>0?"text_success":""}`}>{(res?.netPnl)?.toFixed(2)}</td>
              <td className="text-center">
                <button className="action_btn" onClick={()=>handleShowBets(res?.roundId)}>Show Bets</button>
              </td> 
            </tr>
          ))}
        </tbody>
      </table>

      {allGamesData?.data?.length == 0 || isError ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <>
            {/* <Divider />
            <div className="pagination_cus">
              <Pagination
                className="pagination_main ledger_pagination"
                onShowSizeChange={(c, s) => setPaginationTotal(s)}
                total={
                  results?.data?.totalPages &&
                  results?.data?.totalPages * paginationTotal
                }
                defaultPageSize={50}
                pageSizeOptions={[50, 100, 150, 200, 250]}
                onChange={(e) => setIndexData(e - 1)}
              />
            </div> */}
          </>
        )}
    </div>
    {/* <Divider />
    <Pagination
      className="pagination_main ledger_pagination"
      defaultCurrent={1}
      total={50}
    /> */}
  </Card>
  )
}

export default RouletteAllGame
