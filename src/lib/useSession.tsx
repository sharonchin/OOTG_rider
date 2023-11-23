import { useEffect } from "react";
import { apiGetAuthRider } from "./api-requests";
import useStore from "@/store";

export default function useSession() {
  const store = useStore();

  async function fetchRider() {
    try {
      const rider = await apiGetAuthRider();
      store.setAuthUser(rider);
    } catch (error: any) {
      store.reset();
    }
  }

  useEffect(() => {
    if (!store.authUser) {
      fetchRider();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return store.authUser;
}
