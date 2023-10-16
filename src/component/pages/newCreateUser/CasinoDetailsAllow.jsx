import { Switch } from 'antd';
import React from 'react'

const CasinoDetailsAllow = ({casinoDetalisData}) => {
  return (
    <>
    {casinoDetalisData?.data?.length != 0 && (
                <div>
                  <h2 className="match_share">Casino Details</h2>
                </div>
              )}

              <div className="casino_details">
                {casinoDetalisData?.data?.map((item, id) => {
                  return (
                    <div key={id}>
                      <div className="casino_name">{item?.name}</div>
                      <div className="casino_switch">
                        <Switch
                          defaultChecked={item?.active}
                          disabled
                          // onChange={() => onChange(item?.casinoId)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
    </>
  )
}

export default CasinoDetailsAllow