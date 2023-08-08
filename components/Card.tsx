import clsx from "clsx";

export default function Card ({ className, children }: { className?: string, children: React.ReactNode }) { 
    return (
        <div className={clsx(
            "rounded-3xl px-10 py-4 drop-shadow-xl bg-white",
            className
        )}>
            {children}
        </div>
    )
};
