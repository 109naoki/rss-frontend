import { authOptions } from "@/lib/authOption";
import { Session, getServerSession } from "next-auth";

export const useAuthorizationHeaders = async () => {
  const session = (await getServerSession(authOptions)) as Session | null;

  return {
    Authorization: `Bearer ${session?.bearerToken}`,
  };
};
