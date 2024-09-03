export  const Inputbox = ({onChange, label, placeholder}) => {
    return <div className="py-2">
        <div className="text-left font-bold text-sm py-2">
            {label}
        </div>
        <div >
            <input onChange={onChange} className=" border w-full py-2 px-1 border-slate-300 rounded" placeholder={placeholder} type="text" />
        </div>
    </div>
}