"use client";
import React from "react";
import { LinkPreview } from "@/components/ui/link-preview";

export function LinkPreviewDemoSecond() {
  return (
    <div className="flex justify-center items-center h-[40rem] flex-col px-4">
      <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl  text-left mb-10">
        Visit{" "}
        <LinkPreview
          url="https://ui.aceternity.com"
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
        >
          Aceternity UI
        </LinkPreview>{" "}
        and for amazing Tailwind and Framer Motion components.
      </p>

      <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl  text-left ">
        I listen to{" "}
        <LinkPreview
          url="https://www.youtube.com/watch?v=S-z6vyR89Ig&list=RDMM&index=4"
          imageSrc="https://m.media-amazon.com/images/M/MV5BMjA4Nzk3MDU0OV5BMl5BanBnXkFtZTgwMTEyMDU0OTE@._V1_.jpg"
          isStatic
          className="font-bold"
        >
          this guy
        </LinkPreview>{" "}
        and I watch{" "}
        <LinkPreview
          url="/templates"
          imageSrc="https://www.hindustantimes.com/ht-img/img/2023/08/31/550x309/Screenshot_2023-08-31_235519_1693506340978_1693506363085.png"
          isStatic
          className="font-bold"
        >
          this movie
        </LinkPreview>{" "}
        twice a day
      </p>
    </div>
  );
}
