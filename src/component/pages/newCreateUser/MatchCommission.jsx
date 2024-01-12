import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import React from "react";

const MatchCommission = ({
  commissionType,
  commiType,
  userData,
  data,
  createName,
}) => {

  console.log(userData, "userData")

  return (
    <>
      <div>
        <h2 className="match_share">{createName} Match Share and Commission</h2>
      </div>
      <Row className="super_agent sub_super">
        {window.location.pathname.includes("create-client") ? (
          <></>
        ) : (
          <>
            <Col lg={12} xs={24}>
              <Form.Item
                label="My Match Share(%)"
                name="MyMatchShare"
                required={false}>
                <InputNumber
                  className="number_field"
                  min={0}
                  defaultChecked={userData && userData?.myMatchCommission}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                label="Match Share(%)"
                name="matchShare"
                rules={[
                  {
                    required: true,
                    message: "Invalid Match Share",
                  },
                  {
                    validator: async (_, values) => {
                      if (
                        data?.data?.myShare < values &&
                        values != "" &&
                        values != null
                      ) {
                        return Promise.reject(
                          new Error(
                            "Match share can not be more than" +
                              " " +
                              `${data?.data?.myShare}`
                          )
                        );
                      }
                    },
                  },
                ]}>
                <InputNumber
                  className="number_field"
                  min={0}
                  step="1"
                  type="number"
                  placeholder="Enter Match Share"
                  onKeyDown={(e) => {
                    if (e.key == ".") {
                      e.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </Col>
          </>
        )}

        <Col lg={12} xs={24}>
          <Form.Item label="My Comm type" name="MyCommtype" required={false}>
            <Input type="text" disabled />
          </Form.Item>
        </Col>

        <Col lg={12} xs={24}>
          <Form.Item
            name="Commtype"
            label="Comm type"
            required
            rules={[
              {
                required: true,
                message: "Please select commission type",
              },
            ]}>
            <Select
              onChange={commissionType}
              defaultValue="Commision Type"
              allowClear>
              <Option value="nocomm">No Comm</Option>
              <Option value="bbb">Bet by bet</Option>
            </Select>
          </Form.Item>
        </Col>
        {commiType === "bbb" && (
          <>
            <Col lg={12} xs={24}>
              <Form.Item name="My_Match_comm" label="My Match comm(%)">
                <InputNumber
                  className="number_field"
                  min={0}
                  step="0.1"
                  disabled
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                name="Match_comm"
                required
                label="Match comm(%)"
                rules={[
                  {
                    required: true,
                    message: "Please select odds commission",
                  },
                ]}>
                <Select
                  defaultValue="Select Match comm(%)"
                  options={[
                    {
                      value: "0.00",
                      label: "0.00",
                    },
                    {
                      value: "0.25",
                      label: "0.25",
                    },
                    {
                      value: "0.50",
                      label: "0.50",
                    },
                    {
                      value: "0.75",
                      label: "0.75",
                    },
                    {
                      value: "1.00",
                      label: "1.00",
                    },
                    {
                      value: "1.25",
                      label: "1.25",
                    },
                    {
                      value: "1.50",
                      label: "1.50",
                    },
                    {
                      value: "1.75",
                      label: "1.75",
                    },
                    {
                      value: "2.00",
                      label: "2.00",
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col lg={12} xs={24}>
              <Form.Item name="My_sess_comm" label="My Sess comm(%)">
                <InputNumber
                  className="number_field"
                  min={0}
                  step="0.1"
                  disabled
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                name="sess_comm"
                required
                label="Sess Comm(%)"
                rules={[
                  {
                    required: true,
                    message: "Please select session commission",
                  },
                ]}>
                <Select
                  defaultValue="Select Sess Comm(%)"
                  options={[
                    {
                      value: "0.00",
                      label: "0.00",
                    },
                    {
                      value: "0.25",
                      label: "0.25",
                    },
                    {
                      value: "0.50",
                      label: "0.50",
                    },
                    {
                      value: "0.75",
                      label: "0.75",
                    },
                    {
                      value: "1.00",
                      label: "1.00",
                    },
                    {
                      value: "1.25",
                      label: "1.25",
                    },
                    {
                      value: "1.50",
                      label: "1.50",
                    },
                    {
                      value: "1.75",
                      label: "1.75",
                    },
                    {
                      value: "2.00",
                      label: "2.00",
                    },
                    {
                      value: "2.25",
                      label: "2.25",
                    },
                    {
                      value: "2.50",
                      label: "2.50",
                    },
                    {
                      value: "2.75",
                      label: "2.75",
                    },
                    {
                      value: "3.00",
                      label: "3.00",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </>
        )}
      </Row>

      <div>
        {
          window.location.pathname.includes("create-client") ? null : <h2 className="match_share">{createName} Casino Share </h2>
        }
       
        <Row className="super_agent sub_super">
        {window.location.pathname.includes("create-client") ? (
          <></>
        ) : (
          <>
            <Col lg={12} xs={24}>
              <Form.Item
                label="My Casino Share(%)"
                name="MyCasinoShare"
                required={false}>
                <InputNumber
                  className="number_field"
                  min={0}
                  defaultChecked={userData && userData?.myCasinoShare}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                label="Casino Share(%)"
                name="casinoShare"
                rules={[
                  {
                    required: true,
                    message: "Invalid Casino Share",
                  },
                  {
                    validator: async (_, values) => {
                      if (
                        data?.data?.myCasinoShare < values &&
                        values != "" &&
                        values != null
                      ) {
                        return Promise.reject(
                          new Error(
                            "Casino share can not be more than" +
                              " " +
                              `${data?.data?.myCasinoShare}`
                          )
                        );
                      }
                    },
                  },
                ]}>
                <InputNumber
                  className="number_field"
                  min={0}
                  step="1"
                  type="number"
                  placeholder="Enter Match Share"
                  onKeyDown={(e) => {
                    if (e.key == ".") {
                      e.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </Col>
          </>
        )}
      </Row>
      </div>
    </>
  );
};

export default MatchCommission;
