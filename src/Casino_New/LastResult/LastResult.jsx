import {  useState } from "react";

import { Link, useParams  } from "react-router-dom";
import { LetterAndColorById, tableIdtoUrl } from "../Constant/Constant";
import ResultModalContainer from "./ResultModalContainer";
import { useLastValueQuery } from "../../store/service/LiveCasinoServices";

const LastResult = ({ matchId }) => {
  const { id } = useParams();
  const [first, setFirst] = useState("");

  const {data} = useLastValueQuery({
    value: tableIdtoUrl[id]
  }, {refetchOnMountOrArgChange: true})

  return (
    <>
      <ResultModalContainer
        mid={first}
        setMid={(mid) => setFirst(mid)}
      />
      <div
        className="w-100  text-white p-2 d-flex last-font"
        style={{ background: "#74766f" }}>
        Last Result
        <Link to={`/casinoresult/${id}`} className="ms-auto text-white last-font">
          View All
        </Link>
      </div>
      <div className="w-100 text-end min-max-casino">
        {data?.data?.result?.map((item, index) => {
          return (
            <span
            key={item + index}
              style={{
                color: LetterAndColorById[id]?.[item.result]?.color,
              }}
              onClick={() => setFirst(item.mid)}
              className="ball_result">
              {LetterAndColorById[id]?.[item.result]?.label}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default LastResult;
