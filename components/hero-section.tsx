"use client";
import React from "react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Link from "next/link";
import { Shovel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundPattern } from "./ui/background-pattern";

export default function HeroSection() {
  return (
    <>
      <main className="overflow-hidden">
        <BackgroundPattern />
        <section className="relative">
          <div className="relative py-48 sm:py-72">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
              <div className="text-center sm:mx-auto sm:w-10/12 lg:mr-auto lg:mt-0 lg:w-4/5">
                <h1 className="mt-8 text-4xl font-semibold md:text-5xl xl:text-5xl xl:[line-height:1.125]">
                  🌱 Plantventory
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-wrap text-[17px] md:text-lg  text-muted-foreground">
                  Your comprehensive plant inventory management app. Track,
                  organize, and care for your green collection with ease.
                  Perfect for plant enthusiasts, nurseries, and botanical
                  gardens.
                </p>

                <div className="mt-8">
                  <Button size="lg" asChild>
                    <Link href="/plants">
                      <Shovel className="relative size-4" />
                      <span className="text-nowrap">Start Managing</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="x-auto relative mx-auto mt-8 max-w-lg sm:mt-12">
                <div className="absolute inset-0 -top-8 left-1/2 -z-20 h-56 w-full -translate-x-1/2 [background-image:linear-gradient(to_bottom,transparent_98%,theme(colors.gray.200/75%)_98%),linear-gradient(to_right,transparent_94%,_theme(colors.gray.200/75%)_94%)] [background-size:16px_35px] [mask:radial-gradient(black,transparent_95%)] dark:opacity-10"></div>
                <div className="absolute inset-x-0 top-12 -z-[1] mx-auto h-1/3 w-2/3 rounded-full bg-blue-300 blur-3xl dark:bg-white/20"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
