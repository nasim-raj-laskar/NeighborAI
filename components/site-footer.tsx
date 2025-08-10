import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function SiteFooter({}: Record<string, never> = {}) {
  return (
    <footer className="mt-auto bg-[#FEFCF9] border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <nav className="text-sm text-gray-700">
            <Link href="/#about" className="hover:underline">
              About
            </Link>
            <span className="mx-2 text-gray-400">|</span>
            <Link href="/#contact" className="hover:underline">
              Contact
            </Link>
            <span className="mx-2 text-gray-400">|</span>
            <Link href="/#privacy" className="hover:underline">
              Privacy
            </Link>
            <span className="mx-2 text-gray-400">|</span>
            <Link href="/#terms" className="hover:underline">
              Terms
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link aria-label="Twitter" href="#" className="text-[#58A4B0] hover:opacity-80">
              <Twitter size={20} />
            </Link>
            <Link aria-label="Instagram" href="#" className="text-[#FB7185] hover:opacity-80">
              <Instagram size={20} />
            </Link>
            <Link aria-label="Facebook" href="#" className="text-[#B4AEE8] hover:opacity-80">
              <Facebook size={20} />
            </Link>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-[#777]">Powered by NeighborAI</p>
      </div>
    </footer>
  )
}
