"use client"

import Link from "next/link"
import Image from "next/image"
import { Star, Filter, ShoppingCart } from "lucide-react"
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

export default function RepuestosPage() {
  const { addItem } = useCart()
  const { toast } = useToast()

  // Datos de ejemplo para los productos
  const products = [
    {
      id: 1,
      name: "Suspensión Delantera F-150 Fortaleza",
      price: 90.99,
      image: "/images/products/Suspensión Delantera F-150 Fortaleza.web",
      rating: 4.5,
      category: "Suspensión",
    },
    {
      id: 2,
      name: "Batería de Alto Rendimiento",
      price: 129.99,
      image: "/images/products/bateria.png",
      rating: 4.8,
      category: "Baterías",
    },
    {
      id: 3,
      name: "Kit de Frenos Completo",
      price: 89.99,
      image: "/images/products/frenos.png",
      rating: 4.7,
      category: "Frenos",
    },
    {
      id: 4,
      name: "Amortiguadores Deportivos",
      price: 149.99,
      image: "/images/products/amortiguadores.png",
      rating: 4.6,
      category: "Suspensión",
    },
    {
      id: 5,
      name: "Aceite Sintético 5W-30",
      price: 39.99,
      image: "/images/products/aceite.png",
      rating: 4.9,
      category: "Lubricantes",
    },
    {
      id: 6,
      name: "Bujías de Iridio",
      price: 19.99,
      image: "/images/products/bujias.png",
      rating: 4.7,
      category: "Encendido",
    },
    {
      id: 7,
      name: "Filtro de Aire Deportivo",
      price: 34.99,
      image: "/images/products/filtro-aire.png",
      rating: 4.6,
      category: "Filtros",
    },
    {
      id: 8,
      name: "Pastillas de Freno Cerámicas",
      price: 59.99,
      image: "/images/products/pastillas-freno.png",
      rating: 4.8,
      category: "Frenos",
    },
    {
      id: 9,
      name: "Alternador Reconstruido",
      price: 189.99,
      image: "/images/products/bateria.png",
      rating: 4.5,
      category: "Eléctricos",
    },
    {
      id: 10,
      name: "Bomba de Agua",
      price: 45.99,
      image: "/images/products/frenos.png",
      rating: 4.6,
      category: "Refrigeración",
    },
    {
      id: 11,
      name: "Termostato de Motor",
      price: 29.99,
      image: "/images/products/amortiguadores.png",
      rating: 4.7,
      category: "Refrigeración",
    },
    {
      id: 12,
      name: "Sensor de Oxígeno",
      price: 79.99,
      image: "/images/products/aceite.png",
      rating: 4.8,
      category: "Sensores",
    },
  ]

  // Categorías para filtrar
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

  // Marcas para filtrar
  const brands = [
    { id: "bosch", name: "Bosch" },
    { id: "acdelco", name: "ACDelco" },
    { id: "monroe", name: "Monroe" },
    { id: "fram", name: "Fram" },
    { id: "gates", name: "Gates" },
    { id: "ngk", name: "NGK" },
  ]

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })

    toast({
      title: "Producto agregado",
      description: `${product.name} se ha agregado al carrito`,
      duration: 3000,
    })
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
                <AccordionTrigger>Marcas</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand.id} className="flex items-center space-x-2">
                        <Checkbox id={`brand-${brand.id}`} />
                        <label
                          htmlFor={`brand-${brand.id}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {brand.name}
                        </label>
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
                    <Button size="sm" className="w-full">
                      Aplicar
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button variant="outline" className="w-full">
              Limpiar Filtros
            </Button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1">
          {/* Barra de filtros móvil */}
          <div className="lg:hidden flex items-center justify-between mb-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="space-y-6 py-4">
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
                              <Checkbox id={`mobile-category-${category.id}`} />
                              <label
                                htmlFor={`mobile-category-${category.id}`}
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
                      <AccordionTrigger>Marcas</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {brands.map((brand) => (
                            <div key={brand.id} className="flex items-center space-x-2">
                              <Checkbox id={`mobile-brand-${brand.id}`} />
                              <label
                                htmlFor={`mobile-brand-${brand.id}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {brand.name}
                              </label>
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
                          <Button size="sm" className="w-full">
                            Aplicar
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Button variant="outline" className="w-full">
                    Limpiar Filtros
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Ordenar por:</span>
              <Select defaultValue="relevancia">
                <SelectTrigger className="w-[160px] h-8">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevancia">Relevancia</SelectItem>
                  <SelectItem value="precio-asc">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="precio-desc">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="rating">Mejor Valorados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Barra de ordenación para escritorio */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">Mostrando 1-12 de 48 productos</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Ordenar por:</span>
              <Select defaultValue="relevancia">
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevancia">Relevancia</SelectItem>
                  <SelectItem value="precio-asc">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="precio-desc">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="rating">Mejor Valorados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="h-full hover:border-primary transition-colors overflow-hidden">
                <Link href={`/repuestos/${product.id}`} className="block">
                  <div className="aspect-square relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline">{product.category}</Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-base mt-2">{product.name}</CardTitle>
                  </CardHeader>
                </Link>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-1"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Agregar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Paginación */}
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  )
}
