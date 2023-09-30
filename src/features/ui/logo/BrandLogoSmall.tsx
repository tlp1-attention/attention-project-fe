import { ComponentProps } from "react";

type BrandLogoSmallProps = ComponentProps<"img">;

export function BrandLogoSmall({ className, ...rest }: BrandLogoSmallProps) {
  return (
    <img
      src="/assets/logo-1.png"
      alt="logo pequeño"
      className={`brand-logo small ${className}`}
      {...rest}
    />
  );
}
