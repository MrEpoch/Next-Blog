import clsx from "clsx";

export default function Input({ className, ...props}) {
    return (
        <input
            className={clsx(
                "border-solod border-gray border-2 px-6 py2 text-lg rounded-3xl w-full",
                className
            )}
            {...props}
        />
    )
}
