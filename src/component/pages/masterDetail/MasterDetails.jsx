import React from "react";
import CardItem from "../../common/carditem/CardItem";
import { BiUserCircle } from "react-icons/bi";

const MasterDetails = () => {
  const data = [
    {
      image: <BiUserCircle />,
      name: "Super Master",
      path: "/client/list-super",
      size: "20",
      id: 0,
      userType:0
    },
    {
      image: <BiUserCircle />,
      name: "Master",
      path: `/client/list-agent`,
      size: "20",
      userType:1

    },
    {
      image: <BiUserCircle />,
      name: "Agent",
      path: `/client/list-dealer`,
      size: "20",
      userType:2

    },
    {
      image: <BiUserCircle />,
      name: "Client",
      path: "/client/list-client",
      size: "20",
      userType:3
    },
  ];
  const uType =localStorage.getItem("userType")
  const userTypeMatch={
    0:[1,2,3],
    1:[2,3],
    2:[3],
    5:[0,1,2,3]
  }
  return (
    <>
      <CardItem data={data.filter(
        res=>
        ((userTypeMatch[uType]?.includes(res?.userType))) 
      )} />
    </>
  );
};

export default MasterDetails;
