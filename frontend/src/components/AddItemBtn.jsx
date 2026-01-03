import { IconPlus, IconX } from "@tabler/icons-react";

export const AddItemBtn = ({ item, setCurrentAmt, itemCount, setItemCount }) => {
    return (
        <>
            <button
                className="rotate-45 hover:cursor-pointer transition-all ease-in-out duration-200 hover:bg-white/15 rounded-full"
                onClick={() => {
                    setCurrentAmt((prevPrice) => prevPrice + item.price);
                    setItemCount(prevCount => prevCount + 1)
                }
                }>
                <IconX
                    size={30}
                    strokeWidth={1}
                    className="bg-white/10 rounded-full"
                />
            </button>
        </>
    );
};
// className="w-fit rounded-full z-10 ease-in-out duration-300 transition-all hover:cursor-pointer backdrop-blur-xl text-white text-center p-2.5">
