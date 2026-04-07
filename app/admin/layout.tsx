"use client"
import { div } from "framer-motion/client";
import React from "react";
import AdminHeader from "./Header";

export default function AdminLayout({children,}: Readonly<{children: React.ReactNode}> ){
    return(
        <div className="w-full ">
            
             <AdminHeader/>
             <div className="my-5 mx-2 md:mx-5">
                {children}
             </div>
           
        </div>
    )
}