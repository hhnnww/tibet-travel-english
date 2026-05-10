import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "#/components/ui/button";

export const PageNavi = ({ page }: { page: number }) => {
	return (
		<div className="flex items-center justify-center gap-4">
			<Button variant="outline" disabled={page <= 1}>
				<ChevronLeft className="size-4" />
				<Link
					to="/admin/images/$page"
					params={{
						page: String(page - 1),
					}}
				>
					上一页
				</Link>
			</Button>

			<div className="text-sm text-muted-foreground">第 {page} 页</div>

			<Button variant="outline">
				<Link
					to="/admin/images/$page"
					params={{
						page: String(page + 1),
					}}
				>
					下一页
				</Link>
				<ChevronRight className="size-4" />
			</Button>
		</div>
	);
};
