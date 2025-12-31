import { useEffect, useState } from "react";
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar";
import { Modal } from "./components/CafeItemsModal";
import SelectCafeItem from "./components/SelectCafeItem";

const API_URL = import.meta.env.VITE_API_URL;

const capitalize = (word) => (word.split(" ").map((i) => i.charAt(0).toUpperCase() + i.slice(1)).join(" "));


export default function App() {
    const [ cafeItems, setCafeItems ] = useState([]);
    const [ selectedItem, setSelectedItem ] = useState(null);

    useEffect(() => {
        const fetchCafeItems = async () => {
            try {
                const res = await fetch(`${API_URL}/cafe_items`);
                const data = await res.json();
                setCafeItems(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCafeItems();
    }, []);


    return (
        <>
            <main className="text-zinc-300 min-h-screen 2xl:max-w-8xl flex-col w-full bg-linear-240 from-orange-200 font-thin from-5% to-orange-600/90 items-center">
                <nav className="w-full h-fit bg-white/5 z-10 shadow-sm backdrop-blur-lg top-0 fixed flex flex-col items-center justify-between px-5 py-7.5">
                    <Navbar />
                </nav>

                <section className="flex w-full bg-white/5 h-screen gap-2.5 p-5 items-end justify-center flex-row">
                    <nav className="w-[15%] p-2.5 gap-2.5 flex flex-col max-h-[87.5%] h-full bg-white/5 rounded-lg">
                        <Sidebar />
                    </nav>

                    <div
                        className="grid grid-cols-3 border border-black/25 bg-orange-500/25 w-full max-h-[87.5%] min-h-[87.5%] overflow-y-auto [&::-webkit-scrollbar]:w-3 
					[&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-orange-400/45
					overflow-hidden backdrop-blur-xs rounded-lg gap-2.5 p-2.5">
                        <Modal
                            cafeItems={cafeItems}
                            selectedItem={selectedItem}
                            setSelectedItem={setSelectedItem}
                            capitalize={capitalize}
                        />
                    </div>
                </section>

                <div
                    className={`flex justify-center h-screen w-screen items-center p-10 inset-0 fixed transition-all ${
                        selectedItem
                            ? "backdrop-blur-xl opacity-100 z-50 bg-black/25 pointer-events-auto"
                            : "-z-10 backdrop-blur-none opacity-0 pointer-events-none"
                    }`}>
                    <SelectCafeItem
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        capitalize={capitalize}
                    />
                </div>
                
            </main>
        </>
    );
}