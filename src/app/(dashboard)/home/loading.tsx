import Card from "@/components/Card";

export default function HomePageLoader() {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <Card className="">
                <div className="animate-spin border-4 border-dashed w-16 h-16 rounded-full dark:border-violet-400"></div>
            </Card>
        </div>
    )
}
