import { CircleCheck } from 'lucide-react'
import React from 'react'

export default function AllOrdersPage() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-20 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold flex items-center gap-2"> <CircleCheck /> Your Order Done Successfully</h1>
            </div>
        </section>
    )
}
