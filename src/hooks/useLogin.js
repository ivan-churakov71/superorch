import { useContext } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { LOGIN_QUERY } from "../api/auth";
import { AuthContext } from "../context/auth-context";

export default function useLogin() {
  const context = useContext(AuthContext);

  const [login, { loading, data, error }] = useLazyQuery(LOGIN_QUERY, {
    onCompleted: ({ login }) => {
      // Save authentication data and leave.
      context.login(login.token, login.userId, login.tokenExpiration);
    },
    onError: err => console.log(err.message)
  });

  return [login, { loading, data, error }];
}
