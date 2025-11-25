import React from 'react'
import { SidebarItem } from './SidebarItem'

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Quiz App</h1>
      </div>

      <nav className="space-y-2">
        <SidebarItem
          href="/"
          title="All Quizzes"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2L9 22" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 9H21" strokeWidth="2" strokeLinecap="round"/>
              <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
            </svg>
          }
        />

        <SidebarItem
          href="/create"
          title="Create Quiz"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5 12H19" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          }
        />
      </nav>
    </aside>
  )
}

export default Sidebar
