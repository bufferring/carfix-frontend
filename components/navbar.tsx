"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingCart, User, Store, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"

export default function Navbar() {
  const pathname = usePathname()
  const { itemCount } = useCart()

  const routes = [
    {
      href: "/",
      label: "Inicio",
      active: pathname === "/",
    },
    {
      href: "/repuestos",
      label: "Repuestos",
      active: pathname === "/repuestos",
    },
    {
      href: "/promociones",
      label: "Promociones",
      active: pathname === "/promociones",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="lg:hidden">
              <div className="flex justify-center mb-6 mt-4">
                <div className="relative h-20 w-60">
                  <Image src="/images/logo.png" alt="CarFix Logo" fill className="object-contain" priority />
                </div>
              </div>
              <nav className="flex flex-col gap-4 mt-8">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      route.active ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {route.label}
                  </Link>
                ))}
                <div className="h-px bg-border my-2" />
                <Link href="/usuario" className="flex items-center gap-2 text-sm font-medium">
                  <User className="h-4 w-4" />
                  Mi Cuenta
                </Link>
                <Link href="/negocio" className="flex items-center gap-2 text-sm font-medium">
                  <Store className="h-4 w-4" />
                  Mi Negocio
                </Link>
                <Link href="/configuracion" className="flex items-center gap-2 text-sm font-medium">
                  <Settings className="h-4 w-4" />
                  Configuración
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center">
            <div className="relative h-16 w-60 mr-4">
              <Image src="/images/logo.png" alt="CarFix Logo" fill className="object-contain" priority />
            </div>
          </Link>
          <nav className="hidden lg:flex items-center ml-8 space-x-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  route.active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/carrito" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                  {itemCount}
                </Badge>
              )}
              <span className="sr-only">Carrito</span>
            </Button>
          </Link>
          <div className="hidden md:flex gap-2">
            <Link href="/usuario">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Usuario</span>
              </Button>
            </Link>
            <Link href="/negocio">
              <Button variant="ghost" size="icon">
                <Store className="h-5 w-5" />
                <span className="sr-only">Negocio</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
