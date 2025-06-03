import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <div className="relative h-20 w-64 mb-4">
              <Image src="/images/logo.png" alt="CarFix Logo" fill className="object-contain" priority />
            </div>
            <p className="text-sm text-muted-foreground">
              La mejor plataforma para encontrar repuestos automotrices de calidad.
            </p>
            <div className="flex mt-4 space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/repuestos" className="text-muted-foreground hover:text-primary">
                  Repuestos
                </Link>
              </li>
              <li>
                <Link href="/promociones" className="text-muted-foreground hover:text-primary">
                  Promociones
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Cuenta</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/usuario" className="text-muted-foreground hover:text-primary">
                  Mi Cuenta
                </Link>
              </li>
              <li>
                <Link href="/negocio" className="text-muted-foreground hover:text-primary">
                  Mi Negocio
                </Link>
              </li>
              <li>
                <Link href="/configuracion" className="text-muted-foreground hover:text-primary">
                  Configuración
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <address className="not-italic text-sm text-muted-foreground">
              <p>Calle Principal #123</p>
              <p>Ciudad, País</p>
              <p className="mt-2">contacto@carfix.com</p>
              <p>+123 456 7890</p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CarFix. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
