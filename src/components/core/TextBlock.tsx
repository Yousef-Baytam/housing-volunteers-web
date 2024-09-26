import { CSSProperties, MouseEvent, ReactNode } from "react";
import { cn } from "@/utils/helpers";

type TagNamesType = "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface ITextBlockProps {
  text?: string | ReactNode;
  className?: string;
  tagName?: TagNamesType;
  onClick?: (
    e?: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLDivElement>,
  ) => void;
  tabIndex?: number;
  innerHtml?: string;
  style?: CSSProperties;
}

const TextBlock = ({
  text = "",
  className = "",
  tagName = undefined,
  onClick = undefined,
  tabIndex = 0,
  innerHtml = undefined,
  style = {},
}: ITextBlockProps) => {
  const Tag = onClick ? "button" : (tagName ?? "div");

  if (innerHtml) {
    return (
      <Tag
        className={cn("text-primary-text text-sm md:text-base", className)}
        tabIndex={tabIndex || (onClick ? 0 : -1)}
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: innerHtml }}
        style={style}
      />
    );
  }

  return (
    <Tag
      className={cn("text-primary-text text-sm md:text-base", className)}
      tabIndex={tabIndex || (onClick ? 0 : -1)}
      onClick={onClick}
      style={style}
    >
      {text}
    </Tag>
  );
};

export type { ITextBlockProps };
export default TextBlock;
