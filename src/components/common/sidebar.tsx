import { NavLink } from "react-router-dom";
import {
	LayoutDashboard,
	Calendar,
	CheckSquare,
	CalendarDays,
	Settings,
	Menu,
} from "lucide-react";
import { useState } from "react";

const navItems = [
	{
		lable: "Dashboard",
		href: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		lable: "Planner",
		href: "/planner",
		icon: Calendar,
	},
	{
		lable: "Tasks",
		href: "/tasks",
		icon: CheckSquare,
	},
	{
		lable: "Calendar",
		href: "/calendar",
		icon: CalendarDays,
	},
	{
		lable: "Setting",
		href: "/setting",
		icon: Settings,
	},
];
export default function Sidebar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	function handleNavigation() {
		setIsMobileMenuOpen(false);
	}

	return (
		<>
			<button
				type="button"
				className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
			>
				<Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
			</button>
			<nav
				className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
			>
				<div className="h-full flex flex-col">
					<div className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
								<CheckSquare className="h-5 w-5 text-white" />
							</div>
							<span className="text-lg font-semibold text-gray-900 dark:text-white">
								TaskFlow
							</span>
						</div>
					</div>

					<div className="flex-1 overflow-y-auto py-4 px-4">
						<div className="space-y-1">
							{navItems.map((item) => (
								<NavLink
									key={item.lable}
									to={item.href}
									className={({ isActive }) =>
										`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
											isActive
												? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
												: "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
										}`
									}
									onClick={handleNavigation}
								>
									<item.icon className="h-4 w-4 mr-3 flex-shrink-0" />
									{item.lable}
								</NavLink>
							))}
						</div>
					</div>
				</div>
			</nav>

			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
					onClick={() => setIsMobileMenuOpen(false)}
				/>
			)}
		</>
	);
}
