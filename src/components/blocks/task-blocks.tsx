/* eslint-disable @typescript-eslint/no-explicit-any */
import { InteractionFilled } from "@ant-design/icons";
import { Dropdown, Flex, MenuProps, Popover, notification } from "antd";
import React from "react";
import { TYPE_OF_STATUS } from "~/constants/stage";
import { api } from "~/utils/api";

const RenderTaskUnit = (props: {
  task: {
    id: string;
    title: string;
    des: string;
    status: string;
    priority: string;
    dueDate: string;
    assignee: string;
    email: string;
  };
}) => {
  const task = props.task;
  const { mutate: updateTask } = api.task.updateTask.useMutation({
    onSuccess: (data) => {
      notification.success({
        message: "Stage Changed successfully",
      });
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });
  return (
    <div className="border-1 my-4 flex max-w-40  flex-col items-center justify-center rounded-md border bg-white p-4">
      <span className="text-xs font-[600] text-[#616060]">{task.title}</span>
      <span className="text-xs text-gray-400">{task.des}</span>
      <span className="text-[12px] text-gray-400">
        <span className="font-[600] text-gray-800">Due:</span> {task.dueDate}
      </span>
      <Flex wrap="wrap" justify="center" className="text-xs text-gray-400">
        <span className="font-[600] text-gray-800">For:</span>{" "}
        {task.assignee ?? task.email}
      </Flex>
      {/* <div className="text-xs text-gray-400">{}</div> */}
      <Flex align="end" className="h-30 w-full" justify="end">
        <RenderChangeStage
          onClick={(ele) => {
            updateTask({
              id: task.id,
              stage: ele.key as string,
            });
            console.log(ele, "elexzcxzc");
          }}
        >
          <InteractionFilled className="cursor-pointer text-[#1677FF]" />
        </RenderChangeStage>
      </Flex>
    </div>
  );
};

// export const RenderTaskUnitWrapper = (props: { children: React.ReactNode }) => {
//   return <d>{props.children}</d>;
// };

const RenderChangeStage = (props: {
  children: JSX.Element;
  onClick: (ele: any) => void;
}) => {
  return (
    <>
      <Dropdown
        className="h-50"
        menu={{ items, onClick: (ele) => props.onClick(ele) }}
      >
        {props.children}
      </Dropdown>
    </>
  );
};
const items: any = [
  {
    label: "TO DO",
    key: "open",
  },
  {
    label: "In Progress",
    key: "inProgress",
  },
  {
    label: "Blocker",
    key: "blocker",
  },
  {
    label: "Ready for QA",
    key: "readyForQa",
  },
  {
    label: "In Testing",
    key: "inTesting",
  },
  {
    label: "Done",
    key: "done",
  },
];

export default RenderTaskUnit;
