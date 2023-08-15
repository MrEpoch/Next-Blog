import GlassPane from "@/components/GlassPane"
import Sidebar from "@/components/Sidebar"

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-screen rainbow-mesh p-6">
            <GlassPane className="w-full h-full flex items-center justify-center">
                <Sidebar />
                {children}
            </GlassPane>
        </div>
    )
}
