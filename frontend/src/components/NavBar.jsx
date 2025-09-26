import { useState } from "react"
import { Link } from "react-router-dom"
import { LogOut, Menu, Search } from "lucide-react"
import { useAuthStore } from "../store/authUser.js"

const NavBar = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const {user, logout} = useAuthStore();

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <header className="max-w-6xl mx-auto p-4 h-20 flex flex-wrap justify-between items-center">
            <div className="flex items-center gap-10 z-50">
                <Link to={"/"}>
                <img src="/netflix-logo.png" alt="Logo" className='w-32 md:w-40' />
            </Link>

            {/* Desktop navbar Items */}
            <div className="hidden sm:flex items-center gap-2">

                <Link to={"/Movies"} 
                    className="text-white hover:underline hover:underline-offset-8">
                        Movies
                </Link>

                <Link to={"/TVShow"} 
                    className="text-white hover:underline hover:underline-offset-8">
                        TV Show
                </Link>

                <Link to={"/SearchHistory"} 
                    className="text-white hover:underline hover:underline-offset-8">
                        Search History
                </Link>

            </div>
        </div>

        <div className="flex gap-2 items-center z-50">
            <Link to={"/search"}>
                <Search className="size-6 cursor-pointer"/>
            </Link>
            <img src={user?.profilePicture} alt="Avatar" className=" h-8 rounded cursor-pointer" />
            <LogOut className="size-6 cursor-pointer" onClick={logout} />

            <div className="sm:hidden">
                <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
            </div>
        </div>

        {/* Mobile Menu Button */}
        {isMobileMenuOpen && (
            <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">

                <Link to={"/Movies"} 
                    className="block w-full text-center p-2 text-white hover:underline hover:underline-offset-8"
                    onClick={toggleMobileMenu}
                    >
                        Movies
                </Link>
                <Link to={"/TVShow"} 
                    className="block w-full text-center p-2 text-white hover:underline hover:underline-offset-8"
                    onClick={toggleMobileMenu}>
                        TV Show
                </Link>

                <Link to={"/SearchHistory"} 
                    className="block w-full text-center p-2 text-white hover:underline hover:underline-offset-8"
                    onClick={toggleMobileMenu}
                    >
                        Search History
                </Link>

            </div>
        )}
    </header>
    )
}

export default NavBar;