import "./Section.css";
import { MouseEventHandler } from "react";
interface SectionProps {
  onClick?: MouseEventHandler | undefined;
  name: string;
}
export default function Section ({onClick, name}: SectionProps) {
  return (
    <div className="section" onClick={onClick}>
      <p>{name}</p>
    </div>
  );
}
