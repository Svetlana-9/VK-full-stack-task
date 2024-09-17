import "./Section.css";
import { MouseEventHandler } from "react";
interface SectionProps {
  onClick?: MouseEventHandler | undefined;
  name: string;
}
export default function Section (props: SectionProps) {
  return (
    <div className="section" onClick={props.onClick}>
      <p>{props.name}</p>
    </div>
  );
}
