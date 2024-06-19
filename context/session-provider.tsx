import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CustomerType } from "../types";
import axios from "axios";

// Create context.
const SessionContext = React.createContext({} as CustomerType | null);

// Provider.
export default function SessionProvider({ children }) {
  const { decodedSession } = internal_useSessionGetter();

  if (!!decodedSession) {
    return (
      <SessionContext.Provider value={decodedSession}>
        {children}
      </SessionContext.Provider>
    );
  } else {
    return (
      <SessionContext.Provider value={null}>{children}</SessionContext.Provider>
    );
  }
}

// internal session getter
const internal_useSessionGetter = () => {
  const [decodedSession, setDecodedSession] = useState(null);

  const fetchSession = async () => {
    const response = await axios.get("/api/auth/session");
    return response.data;
  };

  const { data: sessionData, refetch } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
  });

  React.useEffect(() => {
    if (sessionData) {
      setDecodedSession(sessionData.session);
    }
  }, [sessionData]);

  return { decodedSession, refetch };
};

// useSession Hook.
export const useSession = () => React.useContext(SessionContext);
