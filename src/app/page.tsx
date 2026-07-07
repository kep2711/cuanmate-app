import { Button } from "@/components/ui/button";
import { CircleDollarSign } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cuanmate",
  description: "Your personal finance app with AI",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <CircleDollarSign className="text-primary size-20" />
      <h1 className="text-4xl text-primary  font-bold">
        Welcome to Cuanmate
      </h1>
      <p className="mt-2 text-lg">your personal finance app with AI</p>
      <Link href="/dashboard">

        <Button className="mt-2 bg-emerald-700" size="lg">
          Get Started
        </Button>

      </Link>
    </main>
  );
}
