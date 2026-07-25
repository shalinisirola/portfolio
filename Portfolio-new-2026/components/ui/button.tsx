import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.16em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        solid:
          "border border-espresso bg-espresso text-cream hover:-translate-y-0.5 hover:opacity-90",
        outline:
          "border border-espresso bg-transparent text-espresso hover:-translate-y-0.5 hover:bg-espresso hover:text-cream",
        submit: "border-none bg-espresso text-cream hover:opacity-90",
        icon: "border border-line bg-transparent text-text hover:border-accent",
      },
      size: {
        default: "px-8 py-4",
        sm: "px-[17px] py-[9px] text-[11.5px] tracking-[0.14em]",
        icon: "h-[42px] w-[42px] p-0 tracking-normal",
        block: "w-full p-4",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
