import Card from "./Card";
import Image from "next/image";
import SidebarLink from "./SidebarLink";

const links = [
    { label: "Home", icon: "Grid", link: "/home" },
    { label: "Calendar", icon: "Calendar", link: "/calendar" },
    { label: "Settings", icon: "Settings", link: "/settings" },
    { label: "Profile", icon: "User", link: "/profile" },
];

export default function Sidebar() {
    return (
        <Card className="h-full w-40 flex items-center justify-between flex-wrap">
            {links.map((link, i) => (
                <SidebarLink key={i} link={link} />
            ))}
        </Card>
    )
}
