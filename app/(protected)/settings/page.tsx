import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { authRoutes } from "@/routes";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut({ redirectTo: authRoutes[0] });
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
};

export default SettingsPage;
