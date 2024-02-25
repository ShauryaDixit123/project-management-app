"use client";

import { Button, Flex, Form, Input, Modal, notification } from "antd";
import React, { FC, useEffect, useState } from "react";
import { boolean } from "zod";
import { api } from "~/utils/api";

const OnboardModal: FC<{
  isSignUp?: boolean;
}> = ({ isSignUp }) => {
  const [signUp, setIsSignup] = useState<boolean>(isSignUp ? true : false);
  const userTkn = localStorage.getItem("ut");
  const [openModal, setOpenModal] = useState<boolean>(userTkn ? false : true);
  const { mutate: mutateSignUp, isLoading } = api.user.createAdmin.useMutation({
    onSuccess: (data) => {
      console.log(data, "data324234");
      notification.success({
        message: "User created successfully",
        description: "Welcome to the team",
      });
      setOpenModal(false);
      localStorage.setItem("ut", data.user.token);
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });
  const { mutate: mutateSignIn } = api.user.signIn.useMutation({
    onSuccess: (data) => {
      console.log(data, "data324234");
      notification.success({
        message: "User created successfully",
        description: "Welcome to the team",
      });
      setOpenModal(false);
      localStorage.setItem("ut", data.user.token);
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });

  const onFinish = async (values: {
    email: string;
    password: string;
    name?: string;
    mob?: string;
  }) => {
    console.log(values, "zxczczxzxvalal");
    signUp
      ? mutateSignUp({ ...values, name: values.name ?? null, mob: values.mob })
      : mutateSignIn({
          email: values.email,
          password: values.password,
          name: values.name ?? null,
        });
    // await handleFetch({ email, password, name, mob });
  };
  return (
    <Modal
      footer={null}
      closeIcon={false}
      open={openModal}
      title={
        signUp ? (
          <h1 className="text-[30px]">Sign up</h1>
        ) : (
          <h1 className="text-[30px]">Sign in</h1>
        )
      }
    >
      <Form onFinish={onFinish} className="mt-4">
        <Flex vertical justify="space-between">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
            name="email"
          >
            <Input
              type="email"
              name="email"
              placeholder={
                signUp
                  ? "need your email, you will be registered as admin"
                  : "need your email here"
              }
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            name="password"
          >
            <Input
              type="password"
              name="password"
              placeholder="need your password here"
            />
          </Form.Item>
          {signUp ? (
            <>
              <Form.Item name="name">
                <Input placeholder="need your name here" name="name" />
              </Form.Item>
              <Form.Item name="mob">
                <Input
                  name="mob"
                  placeholder="don't 'need' 'need' your number, but if you wanna, your number here!"
                />
              </Form.Item>
            </>
          ) : null}
        </Flex>
        <Flex vertical align="center" justify="space-evenly" gap={5}>
          <Form.Item className="w-full">
            <Button
              htmlType="submit"
              className="w-full rounded-md bg-[#1677FF] px-4 py-1 text-white"
            >
              {signUp ? " Sign up" : "Sign in"}
            </Button>
          </Form.Item>

          <span>-OR-</span>
          <Form.Item>
            <Button
              onClick={() => setIsSignup(!signUp)}
              type="link"
              className="text-[#1677FF]"
            >
              {signUp ? "Sign in" : "Sign up"}
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};

export default OnboardModal;
