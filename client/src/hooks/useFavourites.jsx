import { useContext, useEffect, useRef } from "react";
import userDetailContext from "../context/UserDetailContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getALlFav } from "../utils/api";

const useFavourites = () => {
  const { userDetails, setUserDetails } = useContext(userDetailContext);
  const querRef = useRef();
  const { user } = useAuth0();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allFavourites",
    queryFn: () => getALlFav(user?.email, userDetails?.token),
    onSuccess: (data) =>
      setUserDetails((prev) => ({ ...prev, favourites: data })),
    enabled: user !== undefined,
    staleTime: 30000,
  });

  querRef.current = refetch;

  useEffect(() => {
    querRef.current && querRef.current();
  }, [userDetails?.token]);

  return { data, isError, isLoading, refetch };
};
export default useFavourites;
