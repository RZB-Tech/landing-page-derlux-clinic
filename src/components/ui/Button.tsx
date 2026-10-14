import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/format";
import { Icon } from "./Icon";

/** Figma «_Components / Button»: Primary · Secondary · Light · Dark. */
export type ButtonVariant = "primary" | "secondary" | "light" | "dark";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-on-dark hover:bg-accent/90",
  secondary: "border border-ink text-ink hover:bg-ink/5",
  light: "bg-milk text-ink hover:bg-white",
  dark: "bg-ink text-on-dark hover:bg-ink/85",
};

const arrows = {
  primary: "arrow-right-on-dark",
  dark: "arrow-right-on-dark",
  secondary: "arrow-right-ink",
  light: "arrow-right-ink",
} as const;

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
};

export function buttonClassName({ variant = "primary", fullWidth, className }: ButtonStyleOptions = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4.5 text-button font-medium whitespace-nowrap transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    fullWidth && "w-full",
    className,
  );
}

export function ButtonContent({
  children,
  variant = "primary",
  arrow,
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
}) {
  return (
    <>
      {children}
      {arrow && <Icon name={arrows[variant]} size={20} />}
    </>
  );
}

type LinkButtonProps = ButtonStyleOptions & { arrow?: boolean } & ComponentPropsWithoutRef<"a">;

/** A link styled as a button (navigation, anchors, tel:, external). */
export function LinkButton({ variant = "primary", fullWidth, arrow, className, children, ...props }: LinkButtonProps) {
  return (
    <a className={buttonClassName({ variant, fullWidth, className })} {...props}>
      <ButtonContent variant={variant} arrow={arrow}>
        {children}
      </ButtonContent>
    </a>
  );
}
