'use client'
import { cn } from '@/lib/utils'
import React, { Children, cloneElement, ReactElement } from 'react'
import { ButtonProps } from "@/components/ui/button";


interface ButtonGroupProps{
    className?:string;
    children:ReactElement<ButtonProps>[];
}

export const ButtonGroup = ({className,children}:ButtonGroupProps) => {
    const totalButtons = Children.count(children);
  return (
    <div className={cn('flex w-full',className)}>
        {
            children.map((child,index)=>{
                const isFirstItem = index === 0;
                const isLastItem = index === totalButtons - 1;
                return cloneElement(child,{
                    className:cn(
                        {
                            'rounded-l-none': !isFirstItem,
                            'rounded-r-none': !isLastItem,
                            'border-l-0': !isFirstItem,
                        }
                    ,child.props.className)
                })
            })
        }
    </div>
  )
}
