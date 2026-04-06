import { div } from "framer-motion/client";
import React from "react";
import AdminHeader from "./Header";

export default function AdminLayout({children,}: Readonly<{children: React.ReactNode}> ){
    return(
        <div className="h-100">
            
             <AdminHeader/>
            {children}
        </div>
    )
}