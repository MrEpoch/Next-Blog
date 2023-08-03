import GlassPane from "@/components/GlassPane"

export default function AuthRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-screen candy-mesh p-6">
            <GlassPane className="w-full h-full flex items-center justify-center">
                {children}
            </GlassPane>
        </div>
    )
}
