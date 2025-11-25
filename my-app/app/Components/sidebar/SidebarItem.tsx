import React from 'react'
import { Link } from '@tanstack/react-router'
import {cn} from "@/app/utils/cn";

interface SidebarItemProps {
  icon?: React.ReactNode
  title?: string
  href: string
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, title, href }) => {
  return (
    <Link
      to={href}
      className="flex w-full justify-between rounded-xl items-center"
      activeProps={{ className: 'bg-blue-50' }}
      inactiveProps={{ className: 'hover:bg-gray-50' }}
    >
      {({ isActive }: { isActive: boolean }) => {
        return (
          <div
            className={cn(
              'rounded-xl flex justify-start py-3 px-4 items-center gap-3 w-full transition-all',
              '[&_svg]:[stroke:currentColor] [&_svg_path]:[stroke:currentColor] [&_svg_rect]:[stroke:currentColor]',
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'
            )}
          >
            {icon && <span className="text-xl">{icon}</span>}
            {title && <span className="text-sm">{title}</span>}
          </div>
        )
      }}
    </Link>
  )
}

export default SidebarItem
