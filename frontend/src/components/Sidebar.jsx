import { IconFilter2 } from "@tabler/icons-react";

export default function Sidebar() {
    return (
        <>
            <button className="hover:cursor-pointer my-2.5 justify-between bg-white/2.5 border transition-all hover:bg-white/5 border-black/25 flex flex-row rounded-lg py-2.5 gap-1 items-center w-full px-5">
                <span>{"Category"}</span>
                <IconFilter2 size={25} className="mb-1" strokeWidth={1.25} />
            </button>
        </>
    );
}
