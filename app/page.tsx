"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Star, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Actualizar los datos de ejemplo para las promociones e intercambiar la primera y última
  const promotions = [
    {
      id: 1,
      title: "Envío Gratis en Baterías",
      description: "Por compras superiores a $100",
      image: "/images/promotions/promo-filtros.png", // Cambiar a la imagen de filtros
    },
    {
      id: 2,
      title: "2x1 en Aceites Sintéticos",
      description: "La mejor calidad para tu motor",
      image: "/images/promotions/promo-aceites.webp", // Mantener igual
    },
    {
      id: 3,
      title: "Descuento del 20% en Filtros",
      description: "Aprovecha esta oferta por tiempo limitado",
      image: "/images/promotions/promo-baterias.webp", // Cambiar a la imagen de baterías
    },
  ]

  // Auto-advance slider every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length)
    }, 10000) // 10 segundos

    return () => clearInterval(timer)
  }, [promotions.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promotions.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promotions.length) % promotions.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Resto de los datos de productos y categorías...
  const featuredProducts = [
    {
      id: 1,
      name: "Filtro de Aceite Premium",
      price: 24.99,
      image: "/images/products/filtro-aceite.png",
      rating: 4.5,
      category: "Filtros",
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
  ]

  // Actualizar las categorías con las nuevas imágenes en el orden especificado
  const categories = [
    { id: 1, name: "Filtros", count: 120, image: "/images/categories/filtros-new.jpeg" },
    { id: 2, name: "Baterías", count: 85, image: "/images/categories/baterias-new.jpeg" },
    { id: 3, name: "Frenos", count: 150, image: "/images/categories/frenos-new.jpeg" },
    { id: 4, name: "Suspensión", count: 95, image: "/images/categories/suspension-new.webp" },
    { id: 5, name: "Lubricantes", count: 110, image: "/images/categories/lubricantes-new.png" },
  ]

  return (
    <div className="flex flex-col gap-10 pb-10">
      {/* Hero Carousel con auto-advance */}
      <section className="w-full relative">
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-lg">
          {promotions.map((promo, index) => (
            <div
              key={promo.id}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                index === currentSlide
                  ? "translate-x-0"
                  : index < currentSlide
                    ? "-translate-x-full"
                    : "translate-x-full"
              }`}
            >
              <Image src={promo.image || "/placeholder.svg"} alt={promo.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-6 text-center">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">{promo.title}</h2>
                <p className="text-lg md:text-xl mb-6">{promo.description}</p>
                <Button size="lg">Ver Oferta</Button>
              </div>
            </div>
          ))}

          {/* Botones de navegación */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicadores de puntos */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {promotions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="container">
        <h2 className="text-2xl font-bold mb-6">Categorías Populares</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link href={`/repuestos?categoria=${category.id}`} key={category.id}>
              <Card className="h-full hover:border-primary transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 relative mb-2">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-center">{category.name}</h3>
                  <p className="text-sm text-muted-foreground text-center">{category.count} productos</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Productos Destacados</h2>
          <Link href="/repuestos" className="text-primary hover:underline flex items-center">
            Ver todos <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <Tabs defaultValue="populares" className="mb-6">
          <TabsList>
            <TabsTrigger value="populares">Más Populares</TabsTrigger>
            <TabsTrigger value="recientes">Recién Llegados</TabsTrigger>
            <TabsTrigger value="ofertas">En Oferta</TabsTrigger>
          </TabsList>
          <TabsContent value="populares" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product) => (
                <Link href={`/repuestos/${product.id}`} key={product.id}>
                  <Card className="h-full hover:border-primary transition-colors overflow-hidden">
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
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="font-bold">${product.price.toFixed(2)}</span>
                      <Button size="sm" variant="secondary">
                        Agregar
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="recientes" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(2, 6).map((product) => (
                <Link href={`/repuestos/${product.id}`} key={product.id}>
                  <Card className="h-full hover:border-primary transition-colors overflow-hidden">
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
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="font-bold">${product.price.toFixed(2)}</span>
                      <Button size="sm" variant="secondary">
                        Agregar
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="ofertas" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(1, 5).map((product) => (
                <Link href={`/repuestos/${product.id}`} key={product.id}>
                  <Card className="h-full hover:border-primary transition-colors overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -20%
                      </div>
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
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <div>
                        <span className="font-bold">${(product.price * 0.8).toFixed(2)}</span>
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <Button size="sm" variant="secondary">
                        Agregar
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>

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
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </div>
  )
}
