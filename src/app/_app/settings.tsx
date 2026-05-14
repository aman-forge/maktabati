import { SettingsSidebar } from "@/features/settings/components/settings-sidebar";

import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_app/settings")({
	component: SettingsLayout,
});

function SettingsLayout() {
	return (
		<html lang="ar" dir="rtl">
			<body>
				<div className="flex">
					<SettingsSidebar />
					<main className="flex-2 p-6 lg:p-10 mx-auto max-w-3xl">
						<Outlet />
					</main>
				</div>
			</body>
		</html>
	);
}
