import TasksCard from "@/components/TaskCard";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

const getData = async (id) => {
    const user = await getUserFromCookie(cookies());
    const project = await db.project.findFirst({
        where: {
            id,
            belongsToId: user.id,
        },
        include: {
            tasks: true,
        }
    })

    return project;
}

export default async function Page({ params }) {
    const projectId = params.id;
    const project = await getData(projectId);

    return (
        <div className="h-full overflow-y-auto pr-6 w-1/1">
            <TasksCard tasks={project.tasks} title={project.name} />
        </div>
    )
}
