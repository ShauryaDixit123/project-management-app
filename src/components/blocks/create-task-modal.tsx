import { Button, DatePicker, Flex, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { FC } from "react";
import {
  TYPE_OF_ISSUE,
  TYPE_OF_PRIORITY,
  TYPE_OF_STATUS,
} from "~/constants/stage";

const CreateTaskModal: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [typeOfIssue, setTypeOfIssue] = React.useState<string>(
    TYPE_OF_ISSUE?.[0]?.value ?? "",
  );
  console.log(form.getFieldsValue(), "sadsa");
  return (
    <>
      <span onClick={() => setIsModalVisible(!isModalVisible)}>{children}</span>
      <Modal
        title={<span className="text-[24px]">Create Issue</span>}
        className="min-w-max"
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(!isModalVisible)}
        destroyOnClose
      >
        <Form
          onFinish={(values) => {
            console.log(values, "valallala");
          }}
          className="h-[450px] w-[600px] bg-white"
        >
          <Flex vertical className="h-full overflow-y-scroll">
            <Flex
              vertical
              gap={10}
              className="w-[40%] border-b border-[#DDDDDD] py-4"
            >
              <Flex vertical justify="center">
                <label className="text-[16px]">
                  Type of Issue<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <Form.Item
                  initialValue={TYPE_OF_ISSUE?.[0]?.value}
                  name="typeOfIssue"
                  className="mb-0 "
                >
                  <Select
                    defaultValue={TYPE_OF_ISSUE?.[0]?.value}
                    options={TYPE_OF_ISSUE}
                    className="mt-2"
                    onChange={(value) => {
                      setTypeOfIssue(value);
                    }}
                  />
                </Form.Item>
              </Flex>
              <Flex vertical justify="center">
                <label className="text-[16px]">
                  Due Date
                  <span style={{ color: "red" }}>*</span>{" "}
                </label>
                <Form.Item name="dueDate" className="mb-0 ">
                  <DatePicker className="mt-2 w-full" />
                </Form.Item>
              </Flex>

              {typeOfIssue === "task" && (
                <>
                  <Flex vertical justify="center">
                    <label className="text-[16px]">Story</label>
                    <Form.Item name="story" className="mb-0 ">
                      <Select className="mt-2" />
                    </Form.Item>
                  </Flex>
                </>
              )}
              <Flex vertical justify="center">
                <label className="text-[16px]">
                  Priority
                  <span style={{ color: "red" }}>*</span>{" "}
                </label>
                <Form.Item
                  initialValue={TYPE_OF_PRIORITY?.[0]?.value}
                  name="priority"
                  className="mb-0 "
                >
                  <Select
                    defaultValue={TYPE_OF_PRIORITY?.[0]?.value}
                    options={TYPE_OF_PRIORITY}
                    className="mt-2"
                  />
                </Form.Item>
              </Flex>
              <Flex vertical justify="center">
                <label className="text-[16px]">
                  Status
                  <span style={{ color: "red" }}>*</span>{" "}
                </label>
                <Form.Item
                  initialValue={TYPE_OF_STATUS?.[0]?.value}
                  name="status"
                  className="mb-0 "
                >
                  <Select
                    defaultValue={TYPE_OF_STATUS?.[0]?.value}
                    options={TYPE_OF_STATUS}
                    className="mt-2"
                  />
                </Form.Item>
              </Flex>
            </Flex>
            <Flex vertical gap={10} className="w-80 py-4">
              <Flex vertical justify="center">
                <label className="text-[16px]">
                  Assignee
                  <span style={{ color: "red" }}>*</span>{" "}
                </label>
                <Form.Item name="assignee" className="mb-0 ">
                  <Select className="mt-2" />
                </Form.Item>
              </Flex>
              <Flex vertical justify="center">
                <label className="text-[16px]">
                  Reporter
                  <span style={{ color: "red" }}>*</span>{" "}
                </label>
                <Form.Item name="reporter" className="mb-0 ">
                  <Select className="mt-2" />
                </Form.Item>
              </Flex>
            </Flex>
            <Flex vertical justify="center">
              <label className="text-[16px]">Description</label>
              <Form.Item name="des" className="mb-0 py-4">
                <TextArea className="mt-2" />
              </Form.Item>
            </Flex>
            <Form.Item>
              <Flex justify="flex-end" className="mt-4 px-2">
                <Button
                  htmlType="submit"
                  className="bg-[#1677FF] px-4 py-1 text-white"
                >
                  Create
                </Button>
              </Flex>
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default CreateTaskModal;
