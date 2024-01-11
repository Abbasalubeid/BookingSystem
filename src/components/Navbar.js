import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "next/link";

const Navbar = ({ onLogout, isAdmin }) => {
  return (
    <NavigationMenu className="p-3">
        <NavigationMenuList>
            <NavigationMenuItem>
            {/* <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                </NavigationMenuLink>
            </Link> */}
            {!isAdmin &&
            <Link href="/courses" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Courses
                </NavigationMenuLink>
            </Link>
            }

            {!isAdmin &&
            <Link href="/reservations" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    My Reservations
                </NavigationMenuLink>
            </Link>
            }

            {isAdmin &&
            <Link href="/admin" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Admin
                </NavigationMenuLink>
            </Link>
            }

            <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Log in
                </NavigationMenuLink>
            </Link>
            
            <button onClick={() => onLogout()} className={navigationMenuTriggerStyle()}>
                Log out
            </button>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>

  );
};

export default Navbar;
