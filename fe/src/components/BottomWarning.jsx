import { Link } from "react-router-dom"

export const BottomWarning = ({label, btmWarLabel, to}) => {
    return <div className="flex justify-center px-1 py-2">
        <div className="text-sm text-gray-500">
            {label}
        </div>
        <a className="pointer underline cursor-pointer text-gray-500 pl-1" href={to}>{btmWarLabel}</a>
        {/* <Link className="pointer underline cursor-pointer text-gray-500 pl-1" to={to}>{btmWarLabel}</Link> */}
    </div>
}