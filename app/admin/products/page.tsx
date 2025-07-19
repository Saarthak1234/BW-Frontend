"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ProductsSection from "@/components/ProductCards/AdminProductCards";


export default function ProductsPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/admin/products/1");
  };

  return (
    <div>
      <ProductsSection />
    </div>
  );
}