import { useState } from "react";
import { Link } from "react-router-dom";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, ChevronRight, Search, Filter, Calendar, X } from "lucide-react";
import Profile01 from "./profile-01";
import { ThemeToggle } from "../theme-toggle";
import FiltersPanel from "./filters-panel";

interface BreadcrumbItem {
	label: string;
	href?: string;
}

export default function TopNav() {
	const [searchQuery, setSearchQuery] = useState("");
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);
	const [activeFilters, setActiveFilters] = useState<string[]>([]);

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: "TaskFlow", href: "#" },
		{ label: "dashboard", href: "#" },
	];

	const handleClearSearch = () => {
		setSearchQuery("");
	};

	const handleTodayFilter = () => {
		const todayFilter = "Due Today";
		if (activeFilters.includes(todayFilter)) {
			setActiveFilters((prev) => prev.filter((f) => f !== todayFilter));
		} else {
			setActiveFilters((prev) => [...prev, todayFilter]);
		}
	};

	return (
		<>
			<nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] border-b border-gray-200 dark:border-[#1F1F23] h-full">
				<div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
					{breadcrumbs.map((item, index) => (
						<div key={item.label} className="flex items-center">
							{index > 0 && (
								<ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />
							)}
							{item.href ? (
								<Link
									to={item.href}
									className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
								>
									{item.label}
								</Link>
							) : (
								<span className="text-gray-900 dark:text-gray-100">
									{item.label}
								</span>
							)}
						</div>
					))}
				</div>

				<div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-md mx-4">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
						<Input
							type="text"
							placeholder="Search tasks, projects, people..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10 pr-10 h-9 bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#2B2B30]"
						/>
						{searchQuery && (
							<button
								onClick={handleClearSearch}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
							>
								<X className="h-4 w-4" />
							</button>
						)}
					</div>
					<Button
						variant={isFiltersOpen ? "default" : "outline"}
						size="sm"
						className="h-9 px-3 bg-transparent relative"
						onClick={() => setIsFiltersOpen(!isFiltersOpen)}
					>
						<Filter className="h-4 w-4 mr-1" />
						Filter
						{activeFilters.length > 0 && (
							<span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
								{activeFilters.length}
							</span>
						)}
					</Button>
					<Button
						variant={
							activeFilters.includes("Due Today")
								? "default"
								: "outline"
						}
						size="sm"
						className="h-9 px-3 bg-transparent"
						onClick={handleTodayFilter}
					>
						<Calendar className="h-4 w-4 mr-1" />
						Today
					</Button>
				</div>

				<div className="flex items-center gap-2 sm:gap-4">
					<button
						type="button"
						className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
					>
						<Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
					</button>

					<ThemeToggle />

					<DropdownMenu>
						<DropdownMenuTrigger className="focus:outline-none">
							<Image
								src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"
								alt="User avatar"
								width={28}
								height={28}
								className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							sideOffset={8}
							className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
						>
							<Profile01 avatar="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png" />
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</nav>

			<FiltersPanel
				isOpen={isFiltersOpen}
				onClose={() => setIsFiltersOpen(false)}
				activeFilters={activeFilters}
				onFiltersChange={setActiveFilters}
				searchQuery={searchQuery}
			/>
		</>
	);
}
