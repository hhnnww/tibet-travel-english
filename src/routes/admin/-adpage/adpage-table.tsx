import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import { PencilRuler } from "lucide-react";
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
import { AdpageDelete } from "./adpage-delete";
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
							<TableHead>ID</TableHead>
							<TableHead>标题</TableHead>
							<TableHead>创建时间</TableHead>
							<TableHead>操作</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{adpagelist.data?.map((item) => (
							<TableRow key={item.id}>
								<TableCell>{item.id}</TableCell>
								<TableCell className="w-full">{item.title}</TableCell>
								<TableCell>
									{dayjs(item.createdAt).format("YYYY-MM-DD")}
								</TableCell>
								<TableCell>
									<div className="flex gap-2">
										<Link
											to={"/admin/adpage-edit/$id"}
											params={{ id: String(item.id) }}
										>
											<Button>
												<PencilRuler />
												编辑
											</Button>
										</Link>
										<AdpageDelete pageId={item.id} />
									</div>
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
