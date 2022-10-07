import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../_recoil/userState";

export default function Dashboard() {
  const route = useRouter();
  const user = useRecoilValue(userState)
    return (
      <div>
        <h1>Welcome to your dashboard {user.user.email}</h1>
      </div>
    );
}