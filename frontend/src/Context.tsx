import React, { createContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

export const userContext = createContext({});

const Context = (props: any) => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
      .then((res: AxiosResponse) => {
        if (res.data) setUser(res.data);
      });
  }, []);

  return (
    <userContext.Provider value={user}>{props.children}</userContext.Provider>
  );
};

export default Context;
