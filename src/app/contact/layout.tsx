import React from 'react'

export default function Contact_layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center">Contact Layout</h1>
            {children}
        </div>
    )
}
