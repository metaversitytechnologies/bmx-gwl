import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { LuBarChart4 } from "react-icons/lu";
import { AiOutlineSetting } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { HiUser } from "react-icons/hi";
import { SlDiamond } from "react-icons/sl";
import { IoMdInformationCircle } from "react-icons/io";

import { Card } from "antd";
import "./Dashboard.scss";
import CardItem from "../../common/carditem/CardItem";
import CardItemWithDes from "../../common/cordItemWithdes/CardItemWithDes";
import { useDashboardQuery } from "../../../store/service/dashboardServices";
import ActiveMatch from "../../common/ActiveMatch/ActiveMatch";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../store/service/authService";

const gridStyle = {
  width: "23%",
  background: "#74766f",
  color: "#fff",
  margin: "10px",
};

const Dashboard = () => {

  const nav = useNavigate()

  const handleRules = ()=>{
    nav('/rules')
  }

  const data = [
    {
      image: <BiUserCircle />,
      name: "Master details",
      path: "/client/details-master",
      size: "14",
    },
    {
      image: <LuBarChart4 />,
      name: "Sport's Detail",
      path: "/Events/sports-details",
      size: "14",
    },
    {
      image: <BiUserCircle />,
      name: "Ledger",
      path: "/Events/ladger-details",
      size: "14",
    },
    {
      image: <BiUserCircle />,
      name: "Cash Transaction",
      path: "/client/cash-transanction",
      size: "14",
    },
    {
      image: <AiOutlineSetting />,
      name: "Settings",
      path: "/markets",
      size: "14",
    },
    {
      image: <CiLogin />,
      name: "Logout",
      path: "/",
      size: "14",
    },
  ];

  const gridStyle = {
    width: "23%",
    background: "#74766f",
    color: "#fff",
    margin: "10px",
  };

  const { data: dataDes } = useDashboardQuery();

  const [logOut, {data:logOutData}] = useLogoutMutation()

const handleLogout = ()=>{
  localStorage.clear();
  nav('/')
  logOut()
}

const uType = localStorage.getItem("userType")
  return (
    <>
      <Card>
        {data.map((res, id) => {
          return (
            <Card.Grid
              key={id}
              hoverable={false}
              className=""
              style={gridStyle}>
              <Link to={res?.path} onClick={res?.path == "/"? handleLogout: ""}>
                <div className="main_card_section">
                  <div className="icon_card_section">{res?.image}</div>
                  <div className="tital_card_section">
                    <p style={{ fontSize: `${res?.size}px` }}>{res?.name}</p>
                  </div>
                </div>
              </Link>
            </Card.Grid>
          );
        })}
      </Card>

      <Card>
        <Card.Grid hoverable={false} style={gridStyle}>
          <div className="main_card_section">
            <div className="icon_card_section">
              <HiUser />
            </div>
            <div className="tital_card_section f-w">
              <h2>{dataDes?.data?.username}</h2>
              <p>You are {uType == 5?"Sub Admin":uType==0?"Super Master":uType==1?"Master":uType==2?"Agent":"Client"}</p>
            </div>
          </div>
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          <div className="main_card_section">
            <div className="icon_card_section">
              <SlDiamond />
            </div>
            <div className="tital_card_section f-w">
              <h2>{dataDes?.data?.availablebalance}</h2>
              <p>Chips</p>
            </div>
          </div>
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          <div className="main_card_section">
            <div className="icon_card_section">
              <HiUser />
            </div>
            <div className="tital_card_section f-w">
              <h2>{dataDes?.data?.downline}</h2>
              <p>Members</p>
            </div>
          </div>
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          <div className="main_card_section">
            <div className="icon_card_section">
              <LuBarChart4 />
            </div>
            <div className="tital_card_section f-w">
              <h2>{dataDes?.data?.myshare}</h2>
              <p>My Share</p>
            </div>
          </div>
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          <div className="main_card_section">
            <div className="icon_card_section">
              <LuBarChart4 />
            </div>
            <div className="tital_card_section f-w">
              <h2>{dataDes?.data?.companyshare}</h2>
              <p>Company Share</p>
            </div>
          </div>
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          <div className="main_card_section">
            <div className="icon_card_section"></div>
            <div className="tital_card_section f-w">
              <h2>{dataDes?.data?.matchcomminssion}%</h2>
              <p>Match Commission</p>
            </div>
          </div>
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          <div className="main_card_section">
            <div className="icon_card_section"></div>
            <div className="tital_card_section f-w">
              <h2>{dataDes?.data?.sessioncomminssion}%</h2>
              <p>Session Commission</p>
            </div>
          </div>
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          <div className="main_card_section">
            <div className="icon_card_section">
              <HiUser />
            </div>
            <div className="tital_card_section f-w">
              <h2>{dataDes?.data?.user}</h2>
              <p>Client</p>
            </div>
          </div>
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          <div onClick={handleRules} style={{cursor:"pointer"}} className="main_card_section">
            <div className="icon_card_section">
              <IoMdInformationCircle />
            </div>
            <div  className="tital_card_section f-w">
              <h2>Rules</h2>
            </div>
          </div>
        </Card.Grid>
      </Card>
      <ActiveMatch />
    </>
  );
};

export default Dashboard;
