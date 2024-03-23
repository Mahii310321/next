"use client";
import { PRODUCT_CATEGORIES } from "@/config";
import React, { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import useOnClickOutside from "@/hooks/useOnClickOutside";

function NavItems() {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef, () => setActiveIndex(null));

  useEffect(() => {
    function escapeHandler(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    }
    document.addEventListener("keydown", escapeHandler);

    return () => {
      document.removeEventListener("keydown", escapeHandler);
    };
  }, []);

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((item, index) => {
        function handleOpen() {
          if (activeIndex === index) setActiveIndex(null);
          else setActiveIndex(index);
        }
        const isOpen = activeIndex === index;

        return (
          <NavItem
            category={item}
            handleOpen={handleOpen}
            isOpen={isOpen}
            key={item.value}
            iaAnyOpen={activeIndex !== null}
          />
        );
      })}
    </div>
  );
}

export default NavItems;
