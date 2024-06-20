import axios from "axios";
import React from "react";
interface cardProps {
   name: string;
   email: string;
   key: string;
   onDelete: (id: string) => void;
}
function AdmainCards({ name, email, onDelete, key }: cardProps) {
   return (
      <div className="p-1 w-full">
         <div className="flex gap-3 align-middle">
            <div className="bg-white p-[6px] rounded-sm w-[200px] border border-violet-200">
               <h2 className="text-[14px]">{name}</h2>
            </div>
            <div className="bg-white p-[6px] rounded-sm w-[200px] border border-violet-200">
               <h2 className="text-[14px]">{email}</h2>
            </div>

            <button
               type="button"
               className="transition-all bg-red-400 focus:bg-red-500 hover:bg-red-500 w-[100px] rounded-sm text-white text-[14px]"
            >
               Delete
            </button>
         </div>
      </div>
   );
}

export default AdmainCards;
