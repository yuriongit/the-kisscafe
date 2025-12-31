import { useState } from "react";
import {
    IconSearch,
    IconShoppingBag,
} from "@tabler/icons-react";

export default function Navbar () {
    const [ searchItems, setSearchItems ] = useState("");

    return (
        <div className="flex flex-row items-center justify-between w-full">
            <div className="border-l px-5 border-orange-300 w-full items-start">
                <div className="text-orange-300 bg-black/75 hover:bg-black/65 transition-all p-2.5 rounded-lg flex flex-row items-center justify-between w-fit">
                    <input
                        type="text"
                        className="w-[85%] outline-none px-2.5"
                        placeholder="Search"
                        onChange={() => setSearchItems()}
                        value={searchItems}
                    />
                    <button className="hover:cursor-pointer px-2.5">
                        <IconSearch strokeWidth={1.25} />
                    </button>
                </div>
            </div>

            <div className="items-center w-full flex flex-col text-center justify-center">
                <a className="2xl:text-4xl text-white hover:cursor-pointer text-center flex flex-row items-center">
                    Kiss
                    <span className="text-black/75 pr-1">Café</span>
                </a>
            </div>

            <div className="border-r px-5 flex items-end justify-end w-full transition-all border-orange-900/15">
                <button className="hover:cursor-pointer text-orange-300 bg-black/75 hover:bg-black/65 justify-center flex flex-row rounded-lg py-2 gap-2 text-center items-center min-w-40 px-2.5">
                    <span className="text-lg">$24.89</span>
                    <IconShoppingBag
                        size={27.5}
                        className="mb-0.5"
                        strokeWidth={1}
                    />
                </button>
            </div>
        </div>
    );
}