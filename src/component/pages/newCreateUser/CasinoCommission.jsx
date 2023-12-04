import { Col, Form, Input, Row, Select } from 'antd'
import React from 'react'

const CasinoCommission = ({createName, commiType}) => {
  return (
    <>
    {commiType === "bbb" && (
                <div>
                  <h2 className="match_share">
                    {createName} Casino Commission
                  </h2>
                </div>
              )}

              <Row className="super_agent sub_super">
                {commiType === "bbb" && (
                  <>
                    <Col span={12}>
                      <Form.Item
                        label="My Casino comm(%)"
                        name="cassinoComm"
                        required={false}>
                        <Input type="number" disabled />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Casino comm(%)"
                        name="cassino_Comm"
                        required
                        rules={[
                          {
                            required: true,
                            message: "Please enter valid Casino commission",
                          },
                        ]}>
                        <Select
                          defaultValue="Select Casino Comm(%)"
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
                            // {
                            //   value: "1.25",
                            //   label: "1.25",
                            // },
                            // {
                            //   value: "1.50",
                            //   label: "1.50",
                            // },
                            // {
                            //   value: "1.75",
                            //   label: "1.75",
                            // },
                            // {
                            //   value: "2.00",
                            //   label: "2.00",
                            // },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}
              </Row>
    </>
  )
}

export default CasinoCommission