import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent text-sm font-bold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-[#1c1b1b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f3f3] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-[#1c1b1b] text-white hover:bg-[#333333]",
        outline:
          "border-[#1c1b1b] bg-transparent text-[#1c1b1b] hover:bg-[#1c1b1b]/5",
        secondary:
          "bg-white text-[#1c1b1b] hover:bg-[#f3f3f3] border border-[#e5e5e5]",
        ghost: "hover:bg-[#1c1b1b]/5 text-[#474545] hover:text-[#1c1b1b]",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        link: "text-[#1c1b1b] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-8",
        xs: "h-8 px-4 text-xs",
        sm: "h-10 px-6 text-sm",
        lg: "h-14 px-10 text-base",
        icon: "size-12",
        "icon-xs": "size-8",
        "icon-sm": "size-10",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
