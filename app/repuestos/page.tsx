"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Filter, ShoppingCart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

// --- DEFINICIÓN DE TIPOS DE DATOS ---
type ApiCategory = {
  id: number
  name: string
  description: string
}

type SparePart = {
  id: number
  name: string
  price: string
  stock: number
  description: string
  Category: ApiCategory
}

type Brand = {
  id: number
  name: string
}

export default function RepuestosPage() {
  const { addItem } = useCart()
  const { toast } = useToast()

  // --- ESTADOS ---
  const [spareParts, setSpareParts] = useState<SparePart[]>([])
  const [apiBrands, setApiBrands] = useState<Brand[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mantenemos las categorías estáticas por ahora
  const categories = [
    { id: "filtros", name: "Filtros" },
    { id: "baterias", name: "Baterías" },
    { id: "frenos", name: "Frenos" },
    { id: "suspension", name: "Suspensión" },
    { id: "lubricantes", name: "Lubricantes" },
    { id: "encendido", name: "Encendido" },
    { id: "electricos", name: "Eléctricos" },
    { id: "refrigeracion", name: "Refrigeración" },
    { id: "sensores", name: "Sensores" },
  ]
  
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const [sparePartsResponse, brandsResponse] = await Promise.all([
          fetch("https://ccw.prawn-enigmatic.ts.net/api/spare-parts"),
          fetch("https://ccw.prawn-enigmatic.ts.net/api/brands"),
        ])

        if (!sparePartsResponse.ok) throw new Error("Error al obtener los repuestos.")
        if (!brandsResponse.ok) throw new Error("Error al obtener las marcas.")

        const sparePartsResult = await sparePartsResponse.json()
        const brandsResult = await brandsResponse.json()

        if (sparePartsResult.success && Array.isArray(sparePartsResult.data)) {
          setSpareParts(sparePartsResult.data)
        } else {
          throw new Error("El formato de los datos de repuestos no es correcto.")
        }

        if (brandsResult.success && Array.isArray(brandsResult.data)) {
          setApiBrands(brandsResult.data)
        } else {
          throw new Error("El formato de los datos de marcas no es correcto.")
        }
      } catch (err: any) {
        setError(err.message)
        console.error("Error detallado al cargar los datos de la página:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPageData()
  }, [])

  const handleAddToCart = (product: SparePart) => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: "/placeholder.svg",
      category: product.Category.name,
    })

    toast({
      title: "Producto agregado",
      description: `${product.name} se ha agregado al carrito`,
      duration: 3000,
    })
  }
  
  // RENDERIZADO DE ESTADO DE CARGA
  if (isLoading) {
    return (
      <div className="container py-8 flex justify-center items-center" style={{ minHeight: "60vh" }}>
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Cargando...</p>
      </div>
    )
  }

  // RENDERIZADO DE ESTADO DE ERROR
  if (error) {
    return (
      <div className="container py-8 text-center text-destructive" style={{ minHeight: "60vh" }}>
        <h2 className="text-2xl font-bold">¡Ocurrió un Error!</h2>
        <p className="mt-2">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Intentar de Nuevo
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Catálogo de Repuestos</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filtros para escritorio */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="font-medium mb-4">Buscar</h3>
              <div className="relative">
                <Input placeholder="Buscar repuestos..." className="w-full" />
              </div>
            </div>

            <Accordion type="multiple" defaultValue={["categorias", "marcas", "precio"]}>
              <AccordionItem value="categorias">
                <AccordionTrigger>Categorías</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox id={`category-${category.id}`} />
                        <label htmlFor={`category-${category.id}`} className="text-sm">{category.name}</label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="marcas">
                <AccordionTrigger>Marcas</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {apiBrands.map((brand) => (
                      <div key={brand.id} className="flex items-center space-x-2">
                        <Checkbox id={`brand-${brand.id}`} />
                        <label htmlFor={`brand-${brand.id}`} className="text-sm">{brand.name}</label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="precio">
                 <AccordionTrigger>Rango de Precio</AccordionTrigger>
                 <AccordionContent>
                   <div className="space-y-4">
                     <div className="flex items-center space-x-2">
                       <Input type="number" placeholder="Min" className="w-20" />
                       <span>-</span>
                       <Input type="number" placeholder="Max" className="w-20" />
                     </div>
                     <Button size="sm" className="w-full">Aplicar</Button>
                   </div>
                 </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <Button variant="outline" className="w-full">Limpiar Filtros</Button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1">
          {/* Aquí puedes agregar la barra de filtros móvil si la necesitas */}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spareParts.map((product) => (
              <Card key={product.id} className="h-full hover:border-primary transition-colors overflow-hidden">
                <Link href={`/repuestos/${product.id}`} className="block">
                  <div className="aspect-square relative">
                    <Image
                      src={"/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline">{product.Category.name}</Badge>
                    </div>
                    <CardTitle className="text-base mt-2">{product.name}</CardTitle>
                  </CardHeader>
                </Link>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="font-bold">${parseFloat(product.price).toFixed(2)}</span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-1"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {product.stock > 0 ? "Agregar" : "Agotado"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
