import { Logout } from "./Logout"

export const Appbar = () => {
    return <div className="px-5 py-6">
        <div className="flex items-center justify-between hover:bg-slate-200 border border-slate-200 rounded-lg px-5 py-2  bg-white">
        <div className="font-bold text-lg">
            Paytm App
        </div>
        <div className="flex items-center justify-between ">
            <div className="pr-2 flex flex-col justify-center h-full ">
                Hello
            </div>
            <div className=" w-6 h-6 border  rounded-full h-full  bg-slate-200 hover:bg-slate-100 font-bold text-gray-700 rounded-full cursor-pointer flex flex-col items-center justify-center ">
                U
            </div>
            <div className=" pl-3">
                <Logout/>
            </div>
        </div>
    </div>
    </div>
}