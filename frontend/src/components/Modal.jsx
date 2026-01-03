import { IconSearch, IconX } from "@tabler/icons-react";
import { AddItemBtn } from "./AddItemBtn";
import { useState } from "react";

export const Modal = ({ cafeItems, setSelectedItem, capitalize, setCurrentAmt }) => {
    const [ itemCount, setItemCount ] = useState(0)
    return (
        <div
            className="grid grid-cols-3 border border-black/25 bg-orange-500/25 w-full h-200 overflow-y-auto [&::-webkit-scrollbar]:w-2 
                [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-black/25
                rounded-lg gap-2.5 p-2.5">
            {cafeItems.map((item) => (
                <div
                    key={item.id}
                    className="bg-white/10 transition-all shadow-md hover:rotate-z-1 hover:scale-98 hover:bg-white/15 duration-200 ease-in-out border border-black/25 flex-col flex justify-between items-center p-5 rounded-xl w-full h-full gap-20">
                    <div className="flex flex-row justify-between items-center w-full">
                        <label className="text-2xl text-black/75 font-thin">
                            {capitalize(item.name)}
                        </label>

                        <button
                            onClick={() => setSelectedItem(item)}
                            className="items-center text-zinc-800 hover:text-zinc-950 flex flex-row gap-2.5 transition-all  hover:cursor-pointer rounded py-1.5 px-2 text-sm">
                            <span>View More</span>
                            <IconSearch size={15} />
                        </button>
                    </div>

                    <div>
                        <img
                            onClick={() => setSelectedItem(item)}
                            className="max-h-70"
                            src={item?.cafe_img || null}
                            loading="lazy"
                            width="200"
                            height="70"
                            alt={item.name}
                        />
                    </div>

                    <div className="flex flex-row items-center w-full">
                        <div className="bg-black/75 p-1 items-center gap-5 justify-between w-fit flex flex-row hover:bg-black/65 rounded-full">
                            <button className="hover:cursor-pointer transition-all ease-in-out duration-200 hover:bg-white/15 rounded-full">
                                <IconX
                                    onClick={() => {
                                        setCurrentAmt(
                                            (prevPrice) =>
                                                prevPrice - item.price
                                        );
                                        setItemCount(
                                            (prevCount) => prevCount - 1
                                        );
                                    }}
                                    className="bg-white/10 rounded-full"
                                    size={30}
                                    strokeWidth={1}
                                />
                            </button>
                            {itemCount}
                            <AddItemBtn
                                itemCount={itemCount}
                                setItemCount={setItemCount}
                                item={item}
                                setCurrentAmt={setCurrentAmt}
                            />
                        </div>

                        <label
                            className={`w-full items-end flex text-xl flex-row justify-end ${
                                item.price.toFixed(2) < 5
                                    ? "text-amber-700"
                                    : "text-black/75"
                            }`}>
                            ${item.price.toFixed(2)}
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );
};