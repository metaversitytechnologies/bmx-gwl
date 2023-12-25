import { Spin } from "antd";
import "./ModalsData.scss";

const ModalsData = ({ partnershipDetails, loading }) => {
  const uType = localStorage.getItem("userType");

  // let subAdminTotal;
  // let subAdminCommTotal;
  // if (uType == 5) {
  //   subAdminTotal =
  //     100 -
  //     (Number(partnershipDetails?.subadminpartnership) +
  //       Number(partnershipDetails?.supermastepartnership) +
  //       Number(partnershipDetails?.masterpartership) +
  //       Number(partnershipDetails?.delearpartership));

  //   subAdminCommTotal =
  //     100 -
  //     (Number(partnershipDetails?.subadminpartnershipc) +
  //       Number(partnershipDetails?.supermastepartnershipc) +
  //       Number(partnershipDetails?.masterpartershipc) +
  //       Number(partnershipDetails?.delearpartershipc));
  // } else if (uType == 0) {
  //   subAdminTotal =
  //     100 -
  //     (Number(partnershipDetails?.supermastepartnership) +
  //       Number(partnershipDetails?.masterpartership) +
  //       Number(partnershipDetails?.delearpartership));
  //   subAdminCommTotal =
  //     100 -
  //     (Number(partnershipDetails?.supermastepartnershipc) +
  //       Number(partnershipDetails?.masterpartershipc) +
  //       Number(partnershipDetails?.delearpartershipc));
  // } else if (uType == 1) {
  //   subAdminTotal =
  //     100 -
  //     (Number(partnershipDetails?.masterpartership) +
  //       Number(partnershipDetails?.delearpartership));
  //   subAdminCommTotal =
  //     100 -
  //     (Number(partnershipDetails?.masterpartershipc) +
  //       Number(partnershipDetails?.delearpartershipc));
  // } else if (uType == 2) {
  //   subAdminTotal = 100 - Number(partnershipDetails?.delearpartership);
  //   subAdminCommTotal = 100 - Number(partnershipDetails?.delearpartershipc);
  // }


  return (
    <>
      <div className="ant-spin-nested-loading">
        {loading ? (
          <div className="spin_icon">
            <Spin size="large" />
          </div>
        ) : (
          ""
        )}
        <div className="partnership">
          <div className="sub_partnership">
            <div className="partnership_name">
              <p>Match Share</p>
            </div>
            <div className="partnership_data">
              <table className="">
                <tr>
                  <th>Up Line</th>
                  <th className={uType != 5 && "d_none"}>Sub Admin</th>
                  <th className={(uType == 0 || uType == 5) ?"": "d_none"}>Master</th>
                  <th className={(uType == 0 || uType == 5 || uType == 1) ?"": "d_none"}>Super</th>
                  <th>Agent</th>
                </tr>
                <tr>
                  <td>{partnershipDetails?.uplinepartership}</td>
                  <td className={uType != 5 && "d_none"}>
                    {partnershipDetails?.subadminpartnership}
                  </td>
                  <td className={(uType == 0 || uType == 5) ?"": "d_none"}>{partnershipDetails?.supermastepartnership}</td>
                  <td className={(uType == 0 || uType == 5 || uType == 1) ?"": "d_none"}>{partnershipDetails?.masterpartership}</td>
                  <td>{partnershipDetails?.delearpartership}</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="sub_partnership">
            <div className="partnership_name">
              <p>Match Commission</p>
            </div>
            <div className="partnership_data">
              <table className="">
                <tr>
                  <th className={uType != 5 && "d_none"}>Sub Admin</th>
                  <th className={(uType == 0 || uType == 5) ?"": "d_none"}>Master</th>
                  <th className={(uType == 0 || uType == 5 || uType == 1) ?"": "d_none"}>Super</th>
                  <th>Agent</th>
                  <th>Client</th>
                </tr>
                <tr>
                  <td className={uType != 5 && "d_none"}>
                    {partnershipDetails?.subadminoddsloss}
                  </td>
                  <td className={(uType == 0 || uType == 5) ?"": "d_none"}>{partnershipDetails?.supermasteroddsloss}</td>
                  <td className={(uType == 0 || uType == 5 || uType == 1) ?"": "d_none"}> {partnershipDetails?.masteroddsloss}</td>
                  <td>{partnershipDetails?.agentoddsloss}</td>
                  <td>{partnershipDetails?.oddsloss}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="sub_partnership">
            <div className="partnership_name">
              <p>Session Commission</p>
            </div>
            <div className="partnership_data">
              <table className="">
                <tr>
                  <th className={uType != 5 && "d_none"}>Sub Admin</th>
                  <th className={(uType == 0 || uType == 5) ?"": "d_none"}>Master</th>
                  <th className={(uType == 0 || uType == 5 || uType == 1) ?"": "d_none"}>Super</th>
                  <th>Agent</th>
                  <th>Client</th>
                </tr>
                <tr>
                  <td className={uType != 5 && "d_none"}>
                    {partnershipDetails?.subadminfancyloss}
                  </td>
                  <td className={(uType == 0 || uType == 5) ?"": "d_none"}>{partnershipDetails?.supermasterfancyloss}</td>
                  <td className={(uType == 0 || uType == 5 || uType == 1) ?"": "d_none"}>{partnershipDetails?.masterfancyloss}</td>
                  <td>{partnershipDetails?.agentfancyloss}</td>
                  <td>{partnershipDetails?.fancyloss}</td>
                </tr>
              </table>
            </div>
          </div>
         
          {/* <div className="sub_partnership">
            <div className="partnership_name">
              <p>Casino Share</p>
            </div>
            <div className="partnership_data">
              <table className="">
                <tr>
                  <th>Up Line</th>
                  <th className={uType != 5 && "d_none"}>Sub Admin</th>
                  <th className={(uType == 0 || uType == 5) ?"": "d_none"}>Master</th>
                  <th className={(uType == 0 || uType == 5 || uType == 1) ?"": "d_none"}>Master</th>
                  <th>Agent</th>
                </tr>
                <tr>
                  <td>{partnershipDetails?.uplinepartershipc}</td>
                  <td className={uType != 5 && "d_none"}>
                    {partnershipDetails?.subadminpartnershipc}
                  </td>
                  <td className={(uType == 0 || uType == 5) ?"": "d_none"}>{partnershipDetails?.supermastepartnershipc}</td>
                  <td className={(uType == 0 || uType == 5 || uType == 1) ?"": "d_none"}>{partnershipDetails?.masterpartershipc}</td>
                  <td>{partnershipDetails?.delearpartershipc}</td>
                </tr>
              </table>
            </div>
          </div> */}
          {/* <div className="sub_partnership">
            <div className="partnership_name">
              <p>Casino Commission</p>
            </div>
            <div className="partnership_data">
              <table className="">
                <tr>
                  <th className={uType != 5 && "d_none"}>Sub Admin</th>
                  <th className={(uType == 0 || uType == 5) ?"": "d_none"}>Master</th>
                  <th className={(uType == 0 || uType == 5 || uType == 1) ?"": "d_none"}>Super</th>
                  <th>Agent</th>
                  <th>Client</th>
                </tr>
                <tr>
                  <td className={uType != 5 && "d_none"}>
                    {partnershipDetails?.subadmincasinocommssion}
                  </td>
                  <td className={(uType == 0 || uType == 5) ?"": "d_none"}>{partnershipDetails?.supermastercasinocommssion}</td>
                  <td className={(uType == 0 || uType == 5 || uType == 1) ?"": "d_none"}>{partnershipDetails?.mastercasinocommssion}</td>
                  <td>{partnershipDetails?.agentcasinocommssion}</td>
                  <td>{partnershipDetails?.casinocommssion}</td>
                </tr>
              </table>
            </div>
          </div> */}
        </div>
        <br />
      </div>
    </>
  );
};

export default ModalsData;
