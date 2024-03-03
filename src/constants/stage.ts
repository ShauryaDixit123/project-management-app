import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useRouter } from "next/router";
import React from "react";
export const TYPE_OF_STAGES = [
  "TO DO",
  "IN PROGRESS",
  "BLOCKER",
  "READY FOR QA",
  "IN TESTING",
  "DONE",
];

export const TYPE_OF_ISSUE = [
  {
    label: "Story",
    value: "story",
  },
  {
    label: "Task",
    value: "task",
  },
];

export const TYPE_OF_PRIORITY = [
  {
    label: "High",
    value: "high",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Low",
    value: "low",
  },
];

export const TYPE_OF_STATUS = [
  {
    label: "TO DO",
    value: "open",
  },
  {
    label: "In Progress",
    value: "inProgress",
  },
  {
    label: "Blocker",
    value: "blocker",
  },
  {
    label: "Ready for QA",
    value: "readyForQa",
  },
  {
    label: "In Testing",
    value: "inTesting",
  },
  {
    label: "Done",
    value: "done",
  },
];

export const SIDE_NAV_ITEMS: (
  onClick?: (key: string) => void,
) => MenuProps["items"] = (onClick?: (key: string) => void) => {
  const router = useRouter();

  return [
    {
      key: 1,
      icon: React.createElement(UserOutlined),
      label: `Board`,

      children: [
        {
          key: `1.1`,
          label: `Story`,
          icon: React.createElement(NotificationOutlined),
        },
        {
          key: `1.2`,
          label: `Tasks`,
          icon: React.createElement(LaptopOutlined),
        },
      ],
    },
    {
      key: 2,
      icon: React.createElement(UserOutlined),
      label: `Team and Profile`,
      children: [
        {
          key: `2.1`,
          label: `Invite to Team`,
          icon: React.createElement(UserOutlined),
        },
        {
          key: `2.2`,
          label: `Profile`,
          icon: React.createElement(NotificationOutlined),
        },
      ],
    },
    {
      key: 3,
      icon: React.createElement(UserOutlined),
      label: `Logout`,
      onClick: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("ut");
        }
        router.reload();
      },
    },
  ];
};
