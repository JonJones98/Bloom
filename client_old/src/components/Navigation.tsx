import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="">
      {/* Main Navigation Bar */}
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between  lg:px-8">
        
        {/* Logo Section - Visible on both desktop and mobile */}
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 ">
            <span className="sr-only">Bloom</span>
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
        </div>
        
        {/* Mobile Menu Button - Only visible on mobile (lg:hidden) */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        
        {/* Desktop Navigation Links - Only visible on desktop (hidden lg:flex) */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <a href="/" className="text-sm/6 font-semibold text-gray-900 hover:underline hover:decoration-green-500 hover:decoration-2 hover:underline-offset-4 transition-all duration-200">
            Dashboard
          </a>

          <a href="/resume" className="text-sm/6 font-semibold text-gray-900 hover:underline hover:decoration-green-500 hover:decoration-2 hover:underline-offset-4 transition-all duration-200">
            Resume
          </a>
          <a href="/business-card" className="text-sm/6 font-semibold text-gray-900 hover:underline hover:decoration-green-500 hover:decoration-2 hover:underline-offset-4 transition-all duration-200">
            Business Card
          </a>
          <a href="/business-plan" className="text-sm/6 font-semibold text-gray-900 hover:underline hover:decoration-green-500 hover:decoration-2 hover:underline-offset-4 transition-all duration-200">
            Business Plan
          </a>
        </PopoverGroup>
        
        {/* Desktop Login Link - Only visible on desktop */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/login" className="text-sm/6 font-semibold text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      
      {/* Mobile Menu Dialog - Only visible on mobile when menu is open */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          
          {/* Mobile Menu Header - Logo and Close Button */}
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Bloom</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          
          {/* Mobile Menu Content */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              
              {/* Mobile Navigation Links */}
              <div className="space-y-2 py-6">
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-green-200 transition-all duration-200"
                >
                  Dashboard
                </a>
                <a
                  href="/resume"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-green-200 transition-all duration-200"
                >
                  Resume
                </a>
                <a
                  href="/business-card"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-green-200 transition-all duration-200"
                >
                  Business Card
                </a>
                <a
                  href="/business-plan"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-green-200 transition-all duration-200"
                >
                  Business Plan
                </a>
              </div>
              
              {/* Mobile Login Section */}
              <div className="py-6">
                <a
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-green-200 transition-all duration-200"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
export default Navigation