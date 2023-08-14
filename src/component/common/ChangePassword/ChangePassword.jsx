import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { useChangePasswordMutation } from "../../../store/service/changePasswordService";
import { useNavigate } from "react-router-dom";

const ChangePassword = ({setIsModalOpen}) => {
  const [trigger, { data: chnagePassdata, error, isLoading}] =
    useChangePasswordMutation();

    const nav = useNavigate()

    useEffect(() => {
        if(chnagePassdata?.status === true){
            localStorage.clear();
            nav('/')
            message.success(chnagePassdata?.message);
            setIsModalOpen(false)
        }else if(chnagePassdata?.status === false){
            message.error(chnagePassdata?.message)
        }
      }, [chnagePassdata, error]);

  const onFinish = (values) => {
    const chnagePassdata = {
      currentPassword: values?.password,
      newPassword: values?.newpassword,
      password: values?.newpassword,
    };
    trigger(chnagePassdata);
  };

  const passw = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,15}$/;

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          remember: true,
        }}>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}>
          <Input.Password placeholder="Enter Old Password" />
        </Form.Item>

        <Form.Item
          name="newpassword"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
            { pattern: passw, message: "Minimun 6 charecter, must contain letters and numbers" },
          ]}>
          <Input.Password placeholder="Enter New Password" />
        </Form.Item>

        <div className="change_button">
          <Form.Item>
            <Button onClick={()=>setIsModalOpen(false)} className="return" type="primary">
              Return
            </Button>
          </Form.Item>
          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default ChangePassword;
