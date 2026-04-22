import { useUserStatus } from "../tanStack/userStatusHook";
import LoadingComponent from "../components/loading";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { signout } from "../api/auth";

export default function Profile() {
  const { userDetails, isPending } = useUserStatus();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function handleLogout() {
    await signout();
    queryClient.removeQueries({ queryKey: ["authStatus"] });
    navigate({ to: "/signin" });
  }

  if (isPending) {
    return <LoadingComponent />;
  }

  if (!userDetails) {
    return null;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 rounded-xl shadow space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white">
          {userDetails.name.firstName[0]}{userDetails.name.lastName[0]}
        </div>
        <div>
          <h1 className="text-xl font-semibold">
            {userDetails.name.firstName} {userDetails.name.lastName}
          </h1>
          <p className="text-gray-500">@{userDetails.username}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Email</span>
          <span>{userDetails.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Gender</span>
          <span>{userDetails.gender}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Posts</span>
          <span>{userDetails.blogs?.length ?? 0}</span>
        </div>
      </div>

      <div className=" mt-4 mx-auto flex justify-end items-center">
        <button className=" bg-red-500 text-white tracking-wider font-lora p-3 rounded cursor-pointer active:scale-[90%]" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}