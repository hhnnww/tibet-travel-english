import type { InferRouterOutputs } from "@orpc/server";
import type { adSalerRoute } from "#/orpc/router/adsaler-route";

export const Sidebar = (ctx: {
	salers: InferRouterOutputs<typeof adSalerRoute>["list"];
}) => {
	const active_salers = ctx.salers.filter((saler) => saler.state === true);
	const now = new Date();
	// 获取今天开始的时间戳
	const startOfDay = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
	).getTime();
	// 计算今天是今天的第几分钟 (0-indexed)
	const minuteIndex = Math.floor((now.getTime() - startOfDay) / (1000 * 60));
	// 取模运算实现循环，确保每分钟显示一个不同的销售
	const index =
		active_salers.length > 0 ? minuteIndex % active_salers.length : 0;

	const current_saler = active_salers[index];
	return (
		<div className="border p-3 rounded text-wrap">
			<div className="">{startOfDay}</div>
			<div className="">{minuteIndex}</div>
			<div className="">{index}</div>
			<div className="">{JSON.stringify(current_saler)}</div>
		</div>
	);
};
