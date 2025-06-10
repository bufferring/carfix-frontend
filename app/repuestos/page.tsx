"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Filter, ShoppingCart, Loader2 } from "lucide-react" // Se agrega Loader2 para el ícono de carga
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

// 1. DEFINICIÓN DE TIPOS DE DATOS SEGÚN TU API
// Esto ayuda a evitar errores y mejora el autocompletado en tu editor.
type ApiCategory = {
  id: number
  name: string
  description: string
}

type SparePart = {
  id: number
  name: string
  price: string // El precio viene como texto desde la API
  stock: number
  description: string
  Category: ApiCategory // Objeto anidado para la categoría
  // Nota: Tu API no provee 'image' ni 'rating' por ahora.
}

export default function RepuestosPage() {
  const { addItem } = useCart()
  const { toast } = useToast()

  // 2. ESTADOS PARA MANEJAR LOS DATOS, LA CARGA Y LOS ERRORES
  const [spareParts, setSpareParts] = useState<SparePart[]>([])
  const [isLoading, setIsLoading] = useState(true) // Inicia en true para mostrar el cargador
  const [error, setError] = useState<string | null>(null)

  // Los filtros se mantienen estáticos por ahora. En el futuro, podrías cargarlos desde la API.
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
  const brands = [
    { id: "bosch", name: "Bosch" },
    { id: "acdelco", name: "ACDelco" },
    { id: "monroe", name: "Monroe" },
    { id: "fram", name: "Fram" },
    { id: "gates", name: "Gates" },
    { id: "ngk", name: "NGK" },
  ]

  // 3. LLAMADA A LA API CUANDO EL COMPONENTE SE CARGA
  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        const response = await fetch("https://ccw.prawn-enigmatic.ts.net/api/spare-parts")
        if (!response.ok) {
          throw new Error("Error al conectar con el servidor.")
        }
        const apiResponse = await response.json()
        if (apiResponse.success && Array.isArray(apiResponse.data)) {
          setSpareParts(apiResponse.data)
        } else {
          throw new Error("El formato de los datos recibidos no es correcto.")
        }
      } catch (err: any) {
        setError(err.message)
        console.error("Error detallado:", err)
      } finally {
        setIsLoading(false) // Oculta el cargador, tanto si hubo éxito como si hubo error
      }
    }

    fetchSpareParts()
  }, []) // El array vacío [] asegura que se ejecute solo una vez

  // 4. ADAPTACIÓN DE LA FUNCIÓN PARA AÑADIR AL CARRITO
  const handleAddToCart = (product: SparePart) => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price), // Convertimos el precio a número
      image: "/placeholder.svg", // Usamos una imagen genérica
      category: product.Category.name,
    })

    toast({
      title: "Producto agregado",
      description: `${product.name} se ha agregado al carrito`,
      duration: 3000,
    })
  }

  // 5. RENDERIZADO CONDICIONAL: MUESTRA ESTADO DE CARGA O ERROR
  if (isLoading) {
    return (
      <div className="container py-8 flex justify-center items-center" style={{ minHeight: "60vh" }}>
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Cargando Repuestos...</p>
      </div>
    )
  }

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

  // El resto del componente se mantiene casi igual, solo cambia el origen de los datos
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Catálogo de Repuestos</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filtros (se mantiene igual) */}
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
                        <label
                          htmlFor={`category-${category.id}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="marcas">
                {/* ... tu código de marcas aquí ... */}
              </AccordionItem>

              <AccordionItem value="precio">
                {/* ... tu código de rango de precios aquí ... */}
              </AccordionItem>
            </Accordion>
            
            <Button variant="outline" className="w-full">Limpiar Filtros</Button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1">
          {/* Barra de filtros móvil (se mantiene igual) */}
          <div className="lg:hidden flex items-center justify-between mb-6">
            {/* ... tu código de filtros móviles aquí ... */}
          </div>

          {/* Barra de ordenación para escritorio (se mantiene igual) */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            {/* ... tu código de barra de ordenación aquí ... */}
          </div>

          {/* 6. LISTA DE PRODUCTOS DINÁMICA DESDE LA API */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spareParts.map((product) => (
              <Card key={product.id} className="h-full hover:border-primary transition-colors overflow-hidden">
                <Link href={`/repuestos/${product.id}`} className="block">
                  <div className="aspect-square relative">
                    <Image
                      // ¡IMPORTANTE! Tu API no devuelve una imagen. Usamos una de respaldo.
                      // Asegúrate de tener un archivo 'placeholder.svg' en tu carpeta /public
                      src={"/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline">{product.Category.name}</Badge>
                      {/* ¡IMPORTANTE! Tu API no devuelve un 'rating'. He comentado esta sección para evitar errores. */}
                      {/* 
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                      */}
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
                    disabled={product.stock === 0} // Deshabilita el botón si no hay stock
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {product.stock > 0 ? "Agregar" : "Agotado"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Paginación (se mantiene igual) */}
          <div className="mt-8">
            {/* ... tu código de paginación aquí ... */}
          </div>
        </div>
      </div>
    </div>
  )
}
