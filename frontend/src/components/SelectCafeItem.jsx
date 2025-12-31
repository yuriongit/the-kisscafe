import { IconPlus } from "@tabler/icons-react";


export default function SelectCafeItem ({ selectedItem, setSelectedItem, capitalize }) {
    return (
        <>
            {selectedItem && (
                <div className="min-w-225 flex-col gap-5 flex justify-between rounded-lg p-7.5 min-h-[50%] bg-white/5">
                    <div className="w-full flex border-b border-b-black/25 justify-between items-start">
                        <div className="flex flex-col pb-5 space-y-2.5">
                            <label className="text-3xl font-thin text-black">
                                {capitalize(selectedItem.name)}
                            </label>
                            <label className="text-2xl text-orange-300">
                                ${selectedItem.price.toFixed(2)}
                            </label>
                        </div>
                        <button
                            onClick={() => setSelectedItem(false)}
                            className="hover:cursor-pointer transition-all hover:bg-white/5 rounded-full h-fit p-2">
                            <IconPlus
                                strokeWidth={1}
                                size={30}
                                className="rotate-45"
                            />
                        </button>
                    </div>
                    <div className="w-full flex flex-row items-center justify-between gap-10">
                        <div className="w-full justify-center flex items-center">
                            <img
                                className="max-h-70 mb-5"
                                src={selectedItem?.cafe_img || null}
                                alt={selectedItem.name}
                            />
                        </div>
                        <div>
                            <ul className="grid grid-cols-2 py-5 gap-2.5 h-full">
                                <li className={`flex flex-col`}>
                                    <label className="text-zinc-500 uppercase font-thin">
                                        Category
                                    </label>
                                    {capitalize(selectedItem.category)}
                                </li>
                                <li className={`flex flex-col`}>
                                    <label className="text-zinc-500 uppercase font-thin">
                                        Calories
                                    </label>
                                    {selectedItem.calories} KCal
                                </li>

                                <li
                                    className={`flex flex-col ${
                                        selectedItem.rating >= 4
                                            ? `text-amber-400`
                                            : `text-red-500`
                                    } ${
                                        selectedItem.rating > 6 &&
                                        "text-green-400"
                                    }`}>
                                    <span>
                                        <label className="text-zinc-500 uppercase font-thin">
                                            Rating
                                        </label>
                                    </span>
                                    {selectedItem.rating}/10
                                </li>

                                <li
                                    className={`flex flex-col ${
                                        selectedItem.available
                                            ? `text-green-400`
                                            : `text-red-500`
                                    }`}>
                                    <span>
                                        <label className="text-zinc-500 uppercase font-thin">
                                            Status
                                        </label>
                                    </span>
                                    {selectedItem.available
                                        ? "Available"
                                        : "Unavailable"}
                                </li>
                            </ul>
                            <p
                                className={`flex flex-col w-full border-t border-zinc-300/15 py-10`}>
                                <label className="text-zinc-500 uppercase font-thin">
                                    Description
                                </label>
                                <span className="min-w-sm max-w-sm">
                                    {selectedItem.item_desc
                                        ? selectedItem.item_desc
                                        : "No description yet provided..."}
                                </span>
                            </p>
                            <button
                                onClick={() => setSelectedItem(false)}
                                className="bg-white/5 hover:cursor-pointer hover:bg-white/10 w-full ease-in-out transition-all duration-100 rounded-lg h-fit p-2.5">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
