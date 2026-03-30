import Providers from "@components/layout";
import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import NotFound from "@/ui/components/not-found";
import appCss from "../ui/style/globals.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{ title: "مكتبتي" },
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	component: RootLayout,
	notFoundComponent: NotFound,
});

function RootLayout() {
	return (
		<html lang="ar" dir="rtl" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<Providers>
					<Outlet />
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
					<Scripts />
				</Providers>
			</body>
		</html>
	);
}
