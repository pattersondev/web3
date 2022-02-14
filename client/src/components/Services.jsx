import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ color, title, icon, subtitle }) => (
	<div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
		<div
			className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
		>
			{icon}
		</div>
		<div className="ml-5 flex flex-col flex-1">
			<h1 className="mt-2 text-white text-lg">{title}</h1>
			<p className="mt-2 text-white text-sm md:9/12">{subtitle}</p>
		</div>
	</div>
);

export default function Services() {
	return (
		<div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
			<div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
				<div className="flex-1 flex-col justify-start items-start">
					<h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
						Services that we
						<br />
						continue to improve
					</h1>
				</div>
			</div>
			<div className="flex-1 flex flex-col justify-start items-center">
				<ServiceCard
					color="bg-[#2952e3]"
					title="Security Guaranteed"
					icon={
						<BsShieldFillCheck
							fontSize={21}
							className="text-white"
						/>
					}
					subtitle="Trusted by many, privacy is maintained and our products are of the highest tier"
				/>
				<ServiceCard
					color="bg-[#8945f8]"
					title="It's good"
					icon={<BiSearchAlt fontSize={21} className="text-white" />}
					subtitle="Trusted by many, privacy is maintained and our products are of the highest tier"
				/>
				<ServiceCard
					color="bg-[#f84550]"
					title="It's really good"
					icon={<RiHeart2Fill fontSize={21} className="text-white" />}
					subtitle="Trusted by many, privacy is maintained and our products are of the highest tier"
				/>
			</div>
		</div>
	);
}