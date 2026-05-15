import { useSuspenseQuery } from "@tanstack/react-query";
import { Check, Copy, Mail, MessageCircle } from "lucide-react";
import { useRef, useState } from "react";
import { Avatar, AvatarImage } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Field, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { orpc } from "#/orpc/client";

export const Sidebar = () => {
	const query = useSuspenseQuery(
		orpc.adSalerRoute.current_saler.queryOptions(),
	);
	const current_saler = query.data;
	if (!current_saler) return null;

	return (
		<Card>
			<CardHeader className="">
				<CardTitle className="font-semibold ">
					Contact {current_saler.name}
				</CardTitle>
				<CardDescription>
					You can get in touch with {current_saler.name} via the following ways
					to customize your tibet tour.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="flex flex-col gap-4">
					{/* 头像名字 */}
					<div className="text-center flex flex-col items-center pt-8">
						<Avatar size="lg" className={"data-[size=lg]:size-24"}>
							<AvatarImage src={current_saler.avatar || ""} alt="avatar" />
						</Avatar>

						<div className="text-xl font-semibold">
							{current_saler.name || ""}
						</div>
					</div>

					<div className="">
						<SidebarInputItem
							title="Email"
							value={current_saler.email || ""}
							link={`mailto:${current_saler.email}`}
							linkText={`Send email to ${current_saler.name}`}
							buttonIcon={<Mail />}
						/>
					</div>

					<div className="">
						<SidebarInputItem
							title="wechat"
							value={current_saler.wechat || ""}
							link={`weixin://dl/chat?uin=${current_saler.wechat}`}
							linkText="Open wechat"
							buttonIcon={<MessageCircle />}
						/>
					</div>

					<div className="">
						<SidebarInputItem
							title="whatapp"
							value={current_saler.whatapp || ""}
							link={`whatsapp://send?phone=${current_saler.whatapp}`}
							linkText="Open whatsapp"
							buttonIcon={<MessageCircle />}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const SidebarInputItem = (ctx: {
	title: string;
	value: string;
	link?: string;
	linkText?: string;
	buttonIcon?: React.ReactNode;
}) => {
	const [copied, setCopied] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSelectAll = () => {
		if (inputRef.current) {
			inputRef.current.select();
		}
	};

	const handleCopy = async () => {
		if (!ctx.value) return;
		try {
			await navigator.clipboard.writeText(ctx.value);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<Field>
			<FieldLabel>{ctx.title}</FieldLabel>
			<div className="flex gap-2">
				<Input ref={inputRef} value={ctx.value} onClick={handleSelectAll} />
				<Button onClick={handleCopy} size="icon" variant="outline">
					{copied ? <Check /> : <Copy />}
				</Button>
			</div>
			<a
				href={ctx.link}
				target="_blank"
				rel="noreferrer"
				className="w-full flex"
			>
				<Button className={"w-full bg-[#00852F]"}>
					{ctx.buttonIcon}
					{ctx.linkText}
				</Button>
			</a>
		</Field>
	);
};
