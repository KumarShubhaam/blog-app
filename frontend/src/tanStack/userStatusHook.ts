import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { authQueryOptions } from "./query";

export function useUserStatus() {
  const { data: loggedUser, isError, isPending, error } = useQuery(authQueryOptions());
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && loggedUser && !loggedUser.authenticated) {
      navigate({ to: "/signin" });
    }
  }, [loggedUser, isPending, navigate]);

  useEffect(() => {
    if (isError) {
      console.error("Error occurred while fetching user status", error?.message);
      navigate({ to: "/" });
    }
  }, [isError, error, navigate]);

  return {
    authStatus: loggedUser?.authenticated ?? false,
    userDetails: loggedUser?.payload ?? null,
    isPending,
  };
}