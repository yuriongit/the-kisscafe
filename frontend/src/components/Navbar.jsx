import { useState } from "react";
import {
    IconSearch,
    IconShoppingBagEdit,
} from "@tabler/icons-react";

export default function Navbar ({ currentAmt }) {
    // const [ searchItems, setSearchItems ] = useState("");

    return (
        <div className="flex flex-col items-center h-full justify-between w-full">
            <div className="flex flex-row border-b gap-5 border-orange-900/15 pb-5 items-center justify-between w-full">
                <div className="items-center w-full flex flex-col text-center justify-center">
                    <a className="2xl:text-3xl text-amber-700 hover:cursor-pointer text-center flex flex-row items-center">
                        Kiss
                        <span className="text-black/75 pr-1">Café</span>
                    </a>
                </div>
                <button className="hover:cursor-pointer w-full text-orange-300 bg-black/75 hover:bg-black/65 justify-center flex flex-row rounded-lg py-2 gap-2 text-center items-center min-w-40 px-2.5">
                    <span className="text-lg">${currentAmt.toFixed(2)}</span>
                    <IconShoppingBagEdit
                        size={25}
                        className="mb-0.5"
                        strokeWidth={1}
                    />
                </button>
            </div>

            <button className="hover:cursor-pointer w-full text-white bg-black/75 hover:bg-black/65 justify-center flex flex-row rounded-lg py-2.5 text-center items-center min-w-40 px-2.5">
                <span className="text-lg">Go to Checkout</span>
            </button>
        </div>
    );
}