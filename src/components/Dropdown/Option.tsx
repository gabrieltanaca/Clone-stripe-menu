import React from "react";

interface DropdownOptionProps {
  name: string;
  content: Function;
}

export function DropdownOption({ name, content }: DropdownOptionProps) {
  return <button className="dropdown-option">{name}</button>;
}
