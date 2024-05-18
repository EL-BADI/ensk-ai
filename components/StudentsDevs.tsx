"use client";
import React from "react";
import { AnimatedTooltip } from "./ui/AnimatedToolTip";

const people = [
  {
    id: 1,
    name: "Zenikhri Abdelbadia",
    designation: "Full-Stack Web Dev, UI/UX Designer",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocKW6Nc5spv5-F2z5F9oyxrUBpoRzONBIJ1mieWZy6TEfPYi0lk=s288-c-no",
  },
];

export function StudentsDevs() {
  return (
    <div className="flex flex-row items-center mt-3 justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
