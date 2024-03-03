import React, { FC } from "react";
import {
  Breadcrumb,
  Button,
  Flex,
  Layout,
  Menu,
  Select,
  notification,
  theme,
} from "antd";
import { useRouter as useRouterNew } from "next/navigation";
import { SIDE_NAV_ITEMS } from "~/constants/stage";
import { InviteModal } from "../users/onboard";
import Sider from "antd/es/layout/Sider";

const Sidebar: FC<{ teamId: string }> = ({ teamId }) => {
  const [openInviteModal, setOpenInviteModal] = React.useState<boolean>(false);
  const [currentActive, setCurrentActive] = React.useState<string>("1.2");
  const router = useRouterNew();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Sider width={200} style={{ background: colorBgContainer, height: "100%" }}>
      {/* {typeof window !== "undefined" && ( */}
      <InviteModal
        teamId={teamId}
        open={openInviteModal}
        onClose={() => setOpenInviteModal(false)}
      />
      {/* )} */}
      <Menu
        mode="inline"
        theme="dark"
        onClick={(e) => {
          if (e.key === "2.1") {
            setOpenInviteModal(true);
            return;
          }
          if (e.key === "2.2") {
            router.push(`/profile?tab=2.2&tid=${teamId}`);
          } else {
            router.push(`/?tab=${e.key}`);
            setCurrentActive(e.key);
          }
        }}
        defaultSelectedKeys={[currentActive]}
        style={{ height: "100%", borderRight: 0 }}
        items={SIDE_NAV_ITEMS()}
        defaultOpenKeys={["1"]}
        activeKey={currentActive}
      />
    </Sider>
  );
};

export default Sidebar;
