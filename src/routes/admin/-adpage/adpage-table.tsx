import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";
import { orpc } from "#/orpc/client";
import { NewAdpageButton } from "./new-adpage";

export const AdPageTable = () => {
	const adpagelist = useQuery(
		orpc.adpageRoute.list.queryOptions({ input: {} }),
	);

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>广告页面列表</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>标题</TableHead>
							<TableHead>操作</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{adpagelist.data?.map((item) => (
							<TableRow key={item.id}>
								<TableCell>{item.title}</TableCell>
								<TableCell>
									<Button>
										<Link
											to={"/admin/adpage-edit/$id"}
											params={{ id: String(item.id) }}
										>
											编辑
										</Link>
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter>
				<NewAdpageButton />
			</CardFooter>
		</Card>
	);
};
