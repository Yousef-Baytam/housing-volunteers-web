import React from "react";
import Link from "next/link";
import TextBlock from "../core/TextBlock";

const Navbar = () => {
  return (
    <nav className="w-full max-w-container px-4 py-10 md:px-16">
      <Link href="/?page=1">
        <TextBlock
          tagName="h1"
          text="Iwaa.team"
          className="text-3xl font-extrabold text-primary md:text-5xl"
        />
      </Link>
    </nav>
  );
};

export default Navbar;
