import { EditFilled } from "@ant-design/icons";
import { Image, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useRouter } from "next/router";
import React from "react";
import Sidebar from "~/components/blocks/sidebar";
import Briefcase from "~/components/icons/briefcase";
import Peoples from "~/components/icons/people";
import Star from "~/components/icons/star";
import OnboardModal from "~/components/users/onboard";
import { api } from "~/utils/api";

const Profile = () => {
  const tkn = typeof window !== "undefined" ? localStorage.getItem("ut") : null;
  const router = useRouter();
  const tmId = router.query.tid;
  const ud = api.user.getUserDetailsByToken.useQuery({
    token: tkn ?? "",
  }).data;
  const tms = api.user.getTeamsByUserId.useQuery({
    userId: ud?.id ?? "",
  }).data;
  const utmbm = api.user.getTeamMembers.useQuery({
    teamId: tmId as string,
  }).data;
  const [openEditModal, setOpenEditModal] = React.useState<boolean>(false);
  console.log(ud, tms, utmbm, "ud.data");
  return (
    <Layout className="h-[100vh]">
      <Layout>
        <Sidebar teamId={tmId as string} />
        <Layout>
          <Content>
            <div className="h-[100vh] p-[8rem]">
              <div className="flex h-[100%] flex-col items-center ">
                <h1 className="text-3xl">Profile</h1>
                <div className="relative mx-auto -mt-16 h-32 w-32 overflow-hidden rounded-full border-4 border-white">
                  <Image
                    className="h-32 object-cover object-center"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                    alt="Woman looking front"
                  />
                </div>
                <EditFilled onClick={() => setOpenEditModal(!openEditModal)} />
                <OnboardModal open={openEditModal} />
                <div className="mt-8 text-center">
                  <h2 className="font-semibold">{ud?.name}</h2>
                  <p className="text-gray-500">{ud?.email}</p>
                  <p className="text-gray-500">{ud?.mob}</p>
                  <p className="text-gray-500">
                    {ud?.isAdmin ? "You admin" : "You are a member"}
                  </p>
                </div>
                <ul className="mt-2 flex min-w-max flex-col items-center justify-around py-4 text-gray-700">
                  {ud?.isAdmin && (
                    <li className="flex min-w-[140px] items-center justify-around">
                      Admin for:
                      <div className="flex gap-2">
                        {tms?.length}
                        <Star />
                      </div>{" "}
                      team
                      {/* {`${tms?.length > 1 ? "s" : ""}`} */}
                    </li>
                  )}
                  <li className="flex flex-col items-center justify-between">
                    <li className="flex min-w-[140px] items-center justify-around">
                      team
                      <div className="flex gap-2">
                        {utmbm?.TeamMembers?.length}
                        <Peoples />
                      </div>{" "}
                    </li>
                  </li>
                </ul>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Profile;
