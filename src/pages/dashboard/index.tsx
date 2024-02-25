import React, { useEffect } from "react";
// import "./index.css";

import { Breadcrumb, Button, Flex, Layout, Menu, Select, theme } from "antd";
import { SIDE_NAV_ITEMS, TYPE_OF_STAGES } from "~/constants/stage";
import CreateTaskModal from "~/components/blocks/create-task-modal";
import { api } from "~/utils/api";

const { Content, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [currentActive, setCurrentActive] = React.useState<string>("1.2");
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("ut");
  }
  console.log(token, "token");
  const userD = api.user.getUserDetailsByToken.useQuery({
    token: token ?? "",
  });

  console.log(userD.data, "userD");
  return (
    <Layout className="h-[100vh] ">
      <Layout>
        <Sider
          width={200}
          style={{ background: colorBgContainer, height: "100%" }}
        >
          <Menu
            mode="inline"
            theme="dark"
            onClick={(e) => setCurrentActive(e.key)}
            defaultSelectedKeys={[currentActive]}
            style={{ height: "100%", borderRight: 0 }}
            items={SIDE_NAV_ITEMS((key) => setCurrentActive(key))}
            defaultOpenKeys={["1"]}
            activeKey={currentActive}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Flex align="center" justify="start" gap={25}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Story</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>Board</Breadcrumb.Item>
            </Breadcrumb>
            <Flex gap={20} justify="space-between">
              <CreateTaskModal>
                <Button className="bg-[#1677FF] px-4 py-1 text-white">
                  Create
                </Button>
              </CreateTaskModal>
              <Select
                options={
                  userD.data?.TeamMembers?.map((team) => ({
                    label: team.teamIdId.name,
                    value: team.teamIdId.id,
                  })) ?? []
                }
                defaultValue={userD.data?.TeamMembers?.[0]?.teamIdId.name}
                placeholder={userD.data?.TeamMembers?.[0]?.teamIdId.name}
              />
            </Flex>
          </Flex>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Flex justify="space-between">
              {TYPE_OF_STAGES.map((stage) => {
                return (
                  <div
                    key={stage}
                    className="flex h-[80vh] flex-col items-center justify-center gap-4 rounded-lg bg-[#FAF8F8]  p-2 "
                  >
                    <div className="border-1 min-w-40 rounded-md border border-gray-100 bg-orange-100 p-4 text-center font-[600] shadow-lg">
                      {stage}
                    </div>

                    <Flex
                      vertical
                      justify="center"
                      align="center"
                      className="h-full overflow-y-scroll"
                    >
                      <div className="text-xs text-gray-400">0</div>
                      <div className="text-xs text-gray-400">/</div>
                      <div className="text-xs text-gray-400">0</div>
                    </Flex>
                  </div>
                );
              })}
            </Flex>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
