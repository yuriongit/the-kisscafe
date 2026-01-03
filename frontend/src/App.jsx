import { useEffect, useState } from "react";
import Navbar from "./components/Navbar"
import { Modal } from "./components/Modal";
import SelectCafeItem from "./components/SelectCafeItem";

const API_URL = import.meta.env.VITE_API_URL;

const capitalize = (word) => (word.split(" ").map((i) => i.charAt(0).toUpperCase() + i.slice(1)).join(" "));


export default function App() {
    const [ cafeItems, setCafeItems ] = useState([]);
    const [ selectedItem, setSelectedItem ] = useState(null);
    const [ currentAmt, setCurrentAmt ] = useState(0);

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
            <main className="text-zinc-300 gap-5 p-5 min-h-screen justify-between flex flex-row 2xl:max-w-8xl w-full bg-linear-240 from-orange-200 font-thin from-5% to-orange-300/90 items-center">
                <Modal
                    capitalize={capitalize}
                    cafeItems={cafeItems}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    currentAmt={currentAmt}
                    setCurrentAmt={setCurrentAmt}
                />
                <nav className="w-[25%] h-200 border rounded-lg border-black/25 bg-orange-500/25 z-10 backdrop-blur-lg flex flex-col items-center justify-between px-5 py-5">
                    <Navbar currentAmt={currentAmt} />
                </nav>

                <div
                    className={`flex justify-center h-screen w-screen items-center p-10 inset-0 fixed transition-all ${
                        selectedItem
                            ? "backdrop-blur-2xl opacity-100 z-50 bg-black/35 pointer-events-auto"
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