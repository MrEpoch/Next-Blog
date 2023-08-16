import GlassPane from "@/components/GlassPane"
import Sidebar from "@/components/Sidebar"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

async function checkForUser() {
    const user = cookies().get(process.env.COOKIE_NAME)?.value;
    if (!user) {
        return redirect("/login");
    }
}

export default async function DashboardRootLayout({ children }: { children: React.ReactNode }) {
    await checkForUser();

    return (
        <div className="h-screen w-screen rainbow-mesh p-6">
            <GlassPane className="w-full h-full flex items-center">
                <Sidebar />
                {children}
            </GlassPane>
        </div>
    )
}
