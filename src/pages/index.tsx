/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import React, { useEffect, useMemo } from "react";
// import "./index.css";
// f04732b8-5c3d-4991-b2b7-4cfa19115552
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
import {
  SIDE_NAV_ITEMS,
  TYPE_OF_STAGES,
  TYPE_OF_STATUS,
} from "~/constants/stage";
import CreateTaskModal from "~/components/blocks/create-task-modal";
import { api } from "~/utils/api";
import { handleSubmitTask } from "~/helpers/functions";
import OnboardModal, {
  CreateTeamModal,
  InviteModal,
} from "~/components/users/onboard";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useRouter as useRouterOld } from "next/router";
import Sidebar from "~/components/blocks/sidebar";
import RenderTaskUnit from "~/components/blocks/task-blocks";
import { Prisma, Task } from "@prisma/client";

const { Content, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const routerO = useRouterOld();
  const [currentActive, setCurrentActive] = React.useState<string>(
    (routerO.query.tab as string) ?? "1.2",
  );
  const [currentTasks, setCurrentTasks] = React.useState<
    Record<string, Task[]>
  >({});

  const [openInviteModal, setOpenInviteModal] = React.useState<boolean>(false);
  const [createTeamModal, setCreateTeamModal] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string | null>(null);

  const fetchUD = api.user.getUserDetailsByToken.useQuery({
    token: token ?? "",
  });
  const userD = fetchUD.data;
  const stryByTeam = api.task.getStoryByTeam.useQuery({
    id: userD?.TeamMembers?.[0]?.teamIdId.id ?? "",
  });
  const trs = api.user.getTeamsByAdminId.useQuery({
    adminId: userD?.id ?? "",
  }).data;
  const [currentSelectedTeam, setCurrentSelectedTeam] = React.useState<{
    id: string;
    name: string;
  }>();
  const tmMembers = api.user.getTeamMembers.useQuery({
    teamId: currentSelectedTeam?.id ?? "",
  }).data;
  console.log(userD, "tmMembers");
  const router = useRouter();
  const { mutate: createTask } = api.task.createTask.useMutation({});
  const { mutate: createStory } = api.task.createStory.useMutation({});
  const teamTasks = api.task.getTeamTasksByStage.useQuery({
    id: currentSelectedTeam?.id ?? "",
  });
  const storiesByTeam = api.task.getStoryByTeamIdByStage.useQuery({
    id: currentSelectedTeam?.id ?? "",
  }).data;

  console.log(storiesByTeam, "storiesByTeam");
  useEffect(() => {
    setCurrentSelectedTeam({
      id: userD?.TeamMembers?.[0]?.teamIdId.id ?? "",
      name: userD?.TeamMembers?.[0]?.teamIdId.name ?? "",
    });
    console.log(teamTasks.data, "userD");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-type-assertion
    setCurrentTasks(teamTasks.data);
  }, [userD]);
  console.log(currentTasks, "currentActive");
  useEffect(() => {
    if (routerO.query.tab === "1.1") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-type-assertion
      setCurrentTasks(storiesByTeam);
    } else {
      console.log(teamTasks.data, "teamTasks.data");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-type-assertion
      setCurrentTasks(teamTasks.data);
    }
  }, [currentActive, routerO.query.tab, storiesByTeam]);
  const opts = trs && [
    ...trs?.map((team) => ({
      label: team.name,
      value: team.id,
    })),
  ];
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("ut"));
    }
  }, []);
  userD?.isAdmin && opts?.push({ label: "Create Team", value: "createTeam" });
  console.log(currentTasks, "currentTasks");
  return (
    <Layout className="h-[100vh] ">
      <Layout>
        <Sidebar teamId={currentSelectedTeam?.id ?? ""} />
        <OnboardModal
          onFinish={async (data) => {
            console.log("zxczxcxzczdindidush");
            // const ud = await fetchUD.refetch();
            const ud = await fetchUD.refetch();
            console.log(data, "uxcxzcd");
            setCurrentActive("1.2");
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setToken(data?.user?.token);
            // setCurrentSelectedTeam({});
            // setCurrentSelectedTeam({
            //   id: ud.data?.TeamMembers?.[0]?.teamIdId.id ?? "",
            //   name: ud.data?.TeamMembers?.[0]?.teamIdId.name ?? "",
            // });
            // setTimeout(() => {
            //   const tres = teamTasks.refetch().then((res) => {
            //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            //     setCurrentTasks(res.data);
            //   });
            //   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-type-assertion
            // }, 1000);
            // setCurrentSelectedTeam({
            //   id: ud.data?.TeamMembers?.[0]?.teamIdId.id ?? "",
            //   name: ud.data?.TeamMembers?.[0]?.teamIdId.name ?? "",
            // });
            // const tsks = await teamTasks.refetch();
            // // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-type-assertion
            // setCurrentTasks(tsks.data);
          }}
        />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Flex align="center" justify="start" gap={25}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Story</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>Board</Breadcrumb.Item>
            </Breadcrumb>
            <Flex gap={20} justify="space-between">
              <CreateTaskModal
                uid={userD?.id ?? ""}
                onFinish={async (values) => {
                  console.log(values, "values");
                  handleSubmitTask(
                    values,
                    currentSelectedTeam?.id ?? "",
                    userD?.id ?? "",
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    (payload) => createStory(payload),
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    (payload) => createTask(payload),
                  );
                  const tsks = await teamTasks.refetch();
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-type-assertion
                  setCurrentTasks(tsks.data);
                }}
                storyList={
                  stryByTeam.data?.map((val, i) => ({
                    key: i,
                    label: val.title,
                    value: val.id,
                  })) ?? []
                }
                userList={
                  tmMembers?.TeamMembers?.map((val, i) => ({
                    key: i,
                    label:
                      val.userIdId?.name === null
                        ? val.userIdId.email ?? "Unknown"
                        : val.userIdId.name,
                    value: val.userId,
                  })) ?? []
                }
              >
                <Button className="bg-[#1677FF] px-4 py-1 text-white">
                  Create
                </Button>
              </CreateTaskModal>
              <CreateTeamModal
                open={createTeamModal}
                onClose={() => setCreateTeamModal(false)}
                adminId={userD?.id ?? ""}
              />
              <Select
                optionRender={(val) => (
                  <option
                    onClick={async () => {
                      if (val.value === "createTeam") {
                        setCreateTeamModal(true);
                        return;
                      }
                      setCurrentSelectedTeam({
                        id: val.value as string,
                        name: val.label as string,
                      });

                      router.push(`/?tid=${val.value}`);
                      const tres = await teamTasks.refetch();
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-type-assertion
                      setCurrentTasks(tres.data);
                    }}
                  >
                    {val.label}
                  </option>
                )}
                options={opts}
                defaultValue={currentSelectedTeam?.id}
                placeholder={currentSelectedTeam?.name}
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
              {TYPE_OF_STATUS.map((stg, j) => {
                if (Object.keys(currentTasks ?? {}).includes(stg.value)) {
                  const taskByStg = currentTasks?.[stg.value]?.map(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (task: any, i: number) => {
                      // const day = new dayjs(task.dueDate).format("DD/MM/YYYY"
                      const dueDate = dayjs(
                        task.dueDate as unknown as string,
                      ).format("DD/MM/YYYY");

                      return (
                        <RenderTaskUnit
                          task={{
                            ...task,
                            dueDate,
                            assignee: task.assigneeId?.name,
                            email: task.assigneeId?.email,
                          }}
                          key={i}
                          callBack={async (ele) => {
                            const tres = await teamTasks.refetch();
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-type-assertion
                            setCurrentTasks(tres.data);
                          }}
                        />
                      );
                    },
                  );
                  return (
                    <div
                      key={j}
                      className="flex h-[80vh] max-w-40 flex-col items-center justify-center gap-4 rounded-lg bg-[#FAF8F8] p-2 "
                    >
                      <div className="border-1 min-w-40 rounded-md border border-gray-100 bg-orange-100 p-4 text-center font-[600] shadow-lg">
                        {stg.label}
                      </div>
                      <Flex
                        vertical
                        justify="center"
                        align="center"
                        className=" h-full overflow-y-scroll"
                      >
                        <div className="h-full">
                          {taskByStg ? [...taskByStg] : []}
                        </div>
                      </Flex>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={j}
                      className="flex h-[80vh] flex-col items-center  gap-4 rounded-lg bg-[#FAF8F8] p-2 "
                    >
                      <div className="border-1 min-w-40 rounded-md border border-gray-100 bg-orange-100 p-4 text-center font-[600] shadow-lg">
                        {stg.label}
                      </div>
                      <div>No tasks</div>
                    </div>
                  );
                }
              })}
            </Flex>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
