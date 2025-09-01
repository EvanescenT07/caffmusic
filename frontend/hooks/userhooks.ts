import { UserProps } from "@/types/type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export function userHook(): UserProps | null {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email!,
        name: session.user.name ?? undefined,
        isOAuth: true,
      });
    } else {
      const match = document.cookie.match(/token=([^;]+)/);
      if (match) {
        try {
          const decode = jwtDecode<UserProps>(match[1]);
          setUser({
            ...decode,
            isOAuth: false,
          });
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }
  }, [session]);

  return user;
}
