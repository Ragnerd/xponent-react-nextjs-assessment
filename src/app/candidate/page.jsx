import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function CandidatePage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const assignedTest = await db.assignedTest.findFirst({
    where: {
      userId: session.user.id,
      submittedAt: null,
      isLocked: false,
    },
  });

  // If test exists → go to test page
  if (assignedTest) {
    redirect(`/candidate/${assignedTest.id}`);
  }

  // No test assigned → show message + logout
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 border rounded-lg text-center space-y-4">
        <h2 className="text-xl font-semibold">No test assigned</h2>

        <p className="text-muted-foreground">
          Currently there is no assigned test for you. Please wait for the admin
          to assign one.
        </p>

        {/* 🔐 Logout button */}
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/auth/login" });
          }}
        >
          <button
            type="submit"
            className="mt-4 w-full px-4 py-2 rounded bg-black text-white hover:bg-black/90"
          >
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
