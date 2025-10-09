"use client";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export function ContainerTextFlipDemo() {
    const words = ["better", "modern", "beautiful", "awesome"];
    return (
        <motion.h1
            initial={{
                opacity: 0,
            }}
            whileInView={{
                opacity: 1,
            }}
            className={cn(
                "relative mb-6 max-w-2xl text-left text-4xl leading-normal font-bold tracking-tight text-zinc-700 md:text-7xl dark:text-zinc-100",
            )}
            layout
        >
            <div className="flex items-center justify-center  h-[90vh] w-[100vw]">
                <div className="inline-block">
                    Make your websites look 10x <ContainerTextFlip words={words} />
                    {/* <Blips /> */}
                </div>
            </div>

        </motion.h1>
    );
}
