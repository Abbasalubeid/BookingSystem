"use client"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "next/link";

const Navbar = () => {
  return (
    <NavigationMenu className="p-3">
        <NavigationMenuList>
            <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                </NavigationMenuLink>
            </Link>

            <Link href="/courses" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Courses
                </NavigationMenuLink>
            </Link>

            <Link href="/reservations" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    My Reservations
                </NavigationMenuLink>
            </Link>

            <Link href="/admin" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Admin
                </NavigationMenuLink>
            </Link>

            <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Log in
                </NavigationMenuLink>
            </Link>
            
            <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Log out
                </NavigationMenuLink>
            </Link>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>

  );
};

export default Navbar;
