import {
    IconCoffee,
    IconFilter2,
    IconPlus,
    IconSearch,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

// const navLi = [
//     { name: "Coming Soon", href: "#" },
//     { name: "Coming Soon", href: "#" },
//     { name: "Coming Soon", href: "#" },
//     { name: "Coming Soon", href: "#" },
// ];

export default function App() {
    const [cafeItems, setCafeItems] = useState([]);
    const [searchItems, setSearchItems] = useState("");

    useEffect(() => {
	const fetchCafeItems = async () => {
	    try {
		const res = await fetch(`http://localhost:3300/cafe-items`);
		const data = await res.json();
		setCafeItems(data);
	    } catch (err) {
		console.error(err);
	    }
	};
	fetchCafeItems();
    }, []);

    const [selectedItem, setSelectedItem] = useState(null);

    const capitalize = (word) =>
	word
	    .split(" ")
	    .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
	    .join(" ");

    return (
	<>
		<main className="text-zinc-300 min-h-screen 2xl:max-w-8xl flex-col w-full bg-linear-330 from-black from-50% to-purple-800 items-center">
			<nav className="w-full h-fit bg-white/5 z-10 shadow-sm backdrop-blur-lg top-0 fixed flex flex-col items-center justify-between px-5 py-7.5">
			<div className="flex flex-row items-center justify-between w-full">
				<div className="border-l px-5 border-purple-300 w-full items-start">
				<div className="bg-white/2.5 border border-purple-200/15 hover:bg-white/5 transition-all p-2.5 rounded-lg flex flex-row items-center justify-between w-fit">
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

				<div className="items-center w-full flex flex-col gap-2.5 text-center justify-center">
				<a className="2xl:text-3xl text-white hover:cursor-pointer text-center flex flex-row items-center font-normal">
					Kiss
					<span className="text-purple-600 pr-1">
					Café
					</span>
				</a>
				</div>

				<div className="border-r px-5 flex items-end justify-end w-full transition-all border-purple-900/15">
				<button className="hover:cursor-pointer hover:bg-white/5 bg-white/2.5 justify-center border border-purple-900/15 flex flex-row rounded-lg py-2 gap-1 text-center items-center min-w-40 px-2.5">
					<span className="tracking-wide text-lg">
					$24.89
					</span>
					<IconCoffee
					size={30}
					className="mb-1.5 text-purple-300"
					strokeWidth={1.25}
					/>
				</button>
				</div>
			</div>
			</nav>

			<section className="flex w-full bg-white/5 h-screen gap-2.5 p-5 items-end justify-center flex-row">
			<nav className="w-[15%] p-2.5 gap-2.5 flex flex-col max-h-[87.5%] h-full bg-white/5 rounded-lg">
				<button className="hover:cursor-pointer my-2.5 justify-between bg-white/2.5 border transition-all hover:bg-white/5 border-purple-200/15 flex flex-row rounded-lg py-2.5 gap-1 items-center w-full px-5">
				<span>{"Category"}</span>
				<IconFilter2
					size={25}
					className="mb-1"
					strokeWidth={1.25}
				/>
				</button>
				{/* <ul className="flex flex-col w-full items-center gap-2.5">
					{navLi.map((i) => (
						<li key={i.name} className="w-full">
						<a
							href={i.href}
							className="hover:cursor-pointer justify-between bg-white/2.5 border transition-all hover:bg-white/5 border-purple-200/15 flex flex-row rounded-lg py-2.5 gap-1 items-center w-full px-5"
						>
							{i.name}
						</a>
						</li>
					))}
					</ul> */}
			</nav>
			<div
				className="grid grid-cols-3 w-full max-h-[87.5%] min-h-[87.5%] overflow-y-auto [&::-webkit-scrollbar]:w-2 
				[&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-white 
				overflow-hidden top-0 backdrop-blur-xs bg-white/5 rounded-lg gap-2.5 p-2.5">
				{cafeItems.map((item) => (
				<div
					key={item.name}
					className="bg-white/2.5 transition-all border border-purple-900/15 flex-col flex justify-between 
						items-center p-5 rounded-xl w-full min-h-125 h-full">
					<div className="flex flex-row justify-between items-center w-full">
					<label className="text-xl text-white font-thin">
						{capitalize(item.name)}
					</label>
					<button
						onClick={() => setSelectedItem(item)}
						className="items-center text-zinc-700 hover:text-zinc-800 flex flex-row gap-2.5 transition-all  hover:cursor-pointer rounded py-1.5 px-2 text-sm">
						<span>View More</span>
						<IconSearch size={15} />
					</button>
					</div>

					<div>
					<img
						onClick={() => setSelectedItem(item)}
						className="max-h-70"
						src={item?.cafe_img || null}
						alt={item.name}
					/>
					</div>

					<div className="flex flex-row items-center w-full">
					<button
						className="w-fit px-10 backdrop-blur-xl bg-white/10 hover:bg-white/15 ease-in-out duration-300 
						transition-all text-base hover:cursor-pointer font-normal text-purple-700 text-center py-1.5 rounded-xl">
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
			</div>
			</section>

			<div
			className={`flex justify-center items-center p-10 inset-0 fixed transition-all ${
				selectedItem
				? "backdrop-blur-md opacity-100 bg-black/75 z-50 pointer-events-auto"
				: "-z-10 backdrop-blur-none opacity-0 pointer-events-none"
			}`}>
			{selectedItem && (
				<div className="min-w-225 flex-col gap-5 flex justify-between rounded-lg p-7.5 min-h-[50%] bg-white/5">
					<div className="w-full flex border-b border-b-zinc-300/15 justify-between items-start">
						<div className="flex flex-col pb-5 space-y-2.5">
						<label className="text-3xl font-thin">
							{capitalize(selectedItem.name)}
						</label>
						<label className="text-2xl text-purple-300">
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
			</div>
		</main>
	</>
    );
}

// Notes:

{
    /* <p className="text-zinc-600 2xl:text-lg font-medium">
	    Simply brewing & satisfiying
	    <span className="text-green-500"> needs & wants</span> for 25 years.
	</p>; */
}

// const displayCafeItems = data.map((item) => ({
//     name: item.name,
//     price: item.price,
//     available: item.available,
//     category: item.category,
//     calories: item.calories,
// }));
