import { getSession, useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <p>You are not authenticated</p>
        <Link href="/register">Register</Link>
        <br />
        <Link href="/login">Login</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {session.user.email}</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
