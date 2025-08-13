import React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Globe } from "lucide-react"

import { cn } from "@/lib/utils"

interface WrapButtonProps {
  className?: string
  children: React.ReactNode
  href?: string
}

const WrapButton: React.FC<WrapButtonProps> = ({
  className,
  children,
  href,
}) => {
  return (
    <div className="flex items-center justify-center">
      {href ? (
        <Link to={href}>
          <div
            className={cn(
              "group cursor-pointer border group border-primary/20 bg-background/10 backdrop-blur-sm gap-2 h-[64px] flex items-center p-[11px] rounded-full hover:border-primary/40 transition-all duration-300",
              className
            )}
          >
            <div className="border border-primary/30 bg-primary h-[43px] rounded-full flex items-center justify-center text-primary-foreground">
              <p className="font-medium tracking-tight mr-3 ml-2 flex items-center gap-2 justify-center  p-1">
                {children}
              </p>
            </div>
            <div className="text-foreground/60 group-hover:ml-2 ease-in-out transition-all size-[36px] flex items-center justify-center rounded-full border-2 border-foreground/20 group-hover:border-primary/40">
              <ArrowRight
                size={20}
                className="group-hover:rotate-45 ease-in-out transition-all "
              />
            </div>
          </div>
        </Link>
      ) : (
        <div
          className={cn(
            "group cursor-pointer border group border-primary/20 bg-background/10 backdrop-blur-sm gap-2 h-[64px] flex items-center p-[11px] rounded-full hover:border-primary/40 transition-all duration-300",
            className
          )}
        >
          <div className="border border-primary/30 bg-primary h-[43px] rounded-full flex items-center justify-center text-primary-foreground">
            <Globe className="mx-2 animate-spin " />
            <p className="font-medium tracking-tight mr-3">
              {children ? children : "Get Started"}
            </p>
          </div>
          <div className="text-foreground/60 group-hover:ml-2 ease-in-out transition-all size-[26px] flex items-center justify-center rounded-full border-2 border-foreground/20 group-hover:border-primary/40">
            <ArrowRight
              size={18}
              className="group-hover:rotate-45 ease-in-out transition-all "
            />
          </div>
        </div>
      )}
    </div>
  )
}

export { WrapButton }