import { IconSearch } from "@tabler/icons-react";

export const Modal = ({ cafeItems, setSelectedItem, capitalize }) => {
    return (
        <>
            {cafeItems.map((item) => (
                <div
                    key={item.id}
                    className="bg-white/5 transition-all shadow-md hover:rotate-z-1 hover:scale-98 hover:bg-white/15 duration-100 ease-in-out border border-black/25 flex-col flex justify-between items-center p-5 rounded-xl w-full min-h-125 h-full">
                    <div className="flex flex-row justify-between items-center w-full">
                        <label className="text-2xl text-black font-thin">
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
                        <button className="w-fit px-15 backdrop-blur-xl bg-black/75 hover:bg-black/65 ease-in-out duration-300 transition-all text-base hover:cursor-pointer font-normal text-white text-center py-3 rounded-xl">
                            Add
                        </button>

                        <label
                            className={`w-full items-end flex text-lg flex-row justify-end ${
                                item.price.toFixed(2) < 5
                                    ? "text-green-400"
                                    : "text-zinc-300/90"
                            }`}>
                            ${item.price.toFixed(2)}
                        </label>
                    </div>
                </div>
            ))}
        </>
    );
};