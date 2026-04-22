import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { signout } from "../api/auth";
import { useUserStatus } from "../tanStack/userStatusHook";

function ProfileLogo() {
  const { userDetails, isPending } = useUserStatus();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function handleLogout() {
    await signout();
    queryClient.removeQueries({ queryKey: ["authStatus"] });
    navigate({ to: "/signin" });
  }

  const initials = userDetails
    ? `${userDetails.name.firstName[0]}${userDetails.name.lastName[0]}`
    : null;

  return (
    <div className="relative group">
      {/* Avatar */}
      <div className="rounded-full aspect-square w-9 h-9 flex items-center justify-center bg-gray-400 text-white font-semibold text-sm cursor-pointer select-none">
        {initials ?? "?"}
      </div>

      {/* Submenu */}
      <div className="absolute right-0 top-full w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150">
        {!isPending && userDetails && (
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {userDetails.name.firstName} {userDetails.name.lastName}
            </p>
            <p className="text-xs text-gray-500 truncate">@{userDetails.username}</p>
          </div>
        )}
        <ul className="py-1 text-sm text-gray-700">
          <li>
            <button
              onClick={() => navigate({ to: "/profile/$userId", params: { userId: userDetails?.id ?? "" } })}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              View Profile
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 cursor-pointer"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileLogo;