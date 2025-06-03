"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Truck, ShieldCheck, ArrowLeft, Minus, Plus, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { toast } = useToast()

  // Actualizar los datos de ejemplo para el producto
  const product = {
    id: Number.parseInt(params.id),
    name: "Filtro de Aceite Premium",
    price: 24.99,
    description:
      "Filtro de aceite de alta calidad diseñado para maximizar la protección del motor y prolongar la vida útil del aceite. Compatible con una amplia gama de vehículos.",
    rating: 4.5,
    reviewCount: 128,
    category: "Filtros",
    brand: "Bosch",
    sku: "FIL-1234",
    stock: 45,
    images: [
      "/images/products/filtro-aceite.png",
      "/images/products/filtro-aceite.png",
      "/images/products/filtro-aceite.png",
      "/images/products/filtro-aceite.png",
    ],
    specifications: [
      { name: "Marca", value: "Bosch" },
      { name: "Modelo", value: "P7100" },
      { name: "Dimensiones", value: "86mm x 71mm" },
      { name: "Material", value: "Metal y papel filtrante" },
      { name: "Compatibilidad", value: "Toyota, Honda, Nissan, Ford" },
      { name: "Eficiencia", value: "99.5%" },
    ],
    features: [
      "Filtración de alta eficiencia",
      "Resistente a altas temperaturas",
      "Fácil instalación",
      "Larga duración",
      "Certificado de calidad ISO 9001",
    ],
    relatedProducts: [
      {
        id: 2,
        name: "Filtro de Aire Deportivo",
        price: 34.99,
        image: "/images/products/filtro-aire.png",
        category: "Filtros",
      },
      {
        id: 3,
        name: "Kit de Filtros Completo",
        price: 59.99,
        image: "/images/products/filtro-aceite.png",
        category: "Filtros",
      },
      {
        id: 4,
        name: "Aceite Sintético 5W-30",
        price: 39.99,
        image: "/images/products/aceite.png",
        category: "Lubricantes",
      },
    ],
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    // Agregar el producto al carrito con la cantidad seleccionada
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      })
    }

    toast({
      title: "Producto agregado",
      description: `${quantity} ${quantity === 1 ? "unidad" : "unidades"} de ${product.name} ${quantity === 1 ? "ha" : "han"} sido ${quantity === 1 ? "agregada" : "agregadas"} al carrito`,
      duration: 3000,
    })
  }

  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/repuestos">Repuestos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/repuestos?categoria=${product.category}`}>{product.category}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Link
        href="/repuestos"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a repuestos
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          <div className="aspect-square relative border rounded-lg overflow-hidden">
            <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div key={index} className="aspect-square relative border rounded-lg overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Vista ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : i < product.rating
                          ? "fill-primary text-primary opacity-50"
                          : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reseñas)
              </span>
            </div>
          </div>

          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Marca:</span> {product.brand}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">SKU:</span> {product.sku}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Disponibilidad:</span>{" "}
              {product.stock > 0 ? (
                <span className="text-green-600">En stock ({product.stock} unidades)</span>
              ) : (
                <span className="text-red-600">Agotado</span>
              )}
            </p>
          </div>

          <div className="border-t pt-4">
            <p className="mb-4">{product.description}</p>
            <ul className="space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button className="flex-1" onClick={handleAddToCart} disabled={product.stock === 0}>
              Agregar al Carrito
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Agregar a favoritos</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Envío gratis en pedidos +$50</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Garantía de 1 año</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Calidad certificada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de información adicional */}
      <Tabs defaultValue="especificaciones" className="mb-12">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="especificaciones">Especificaciones</TabsTrigger>
          <TabsTrigger value="compatibilidad">Compatibilidad</TabsTrigger>
          <TabsTrigger value="opiniones">Opiniones</TabsTrigger>
        </TabsList>
        <TabsContent value="especificaciones" className="p-4 border rounded-md mt-4">
          <table className="w-full">
            <tbody>
              {product.specifications.map((spec, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                  <td className="py-2 px-4 font-medium">{spec.name}</td>
                  <td className="py-2 px-4">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
        <TabsContent value="compatibilidad" className="p-4 border rounded-md mt-4">
          <p className="mb-4">Este producto es compatible con los siguientes vehículos:</p>
          <ul className="space-y-2">
            <li>• Toyota Corolla (2010-2022)</li>
            <li>• Honda Civic (2012-2022)</li>
            <li>• Nissan Sentra (2014-2022)</li>
            <li>• Ford Focus (2015-2020)</li>
            <li>• Chevrolet Cruze (2016-2022)</li>
            <li>• Hyundai Elantra (2017-2022)</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Para verificar la compatibilidad con tu vehículo específico, por favor contacta con nuestro servicio de
            atención al cliente.
          </p>
        </TabsContent>
        <TabsContent value="opiniones" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Opiniones de clientes</h3>
              <Button>Escribir opinión</Button>
            </div>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 5 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">Excelente producto</span>
                </div>
                <p className="text-sm mb-1">
                  Este filtro de aceite es de excelente calidad. Fácil de instalar y funciona perfectamente.
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>Juan Pérez</span>
                  <span className="mx-2">•</span>
                  <span>15 marzo 2023</span>
                </div>
              </div>
              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 4 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">Buen producto</span>
                </div>
                <p className="text-sm mb-1">
                  Buena relación calidad-precio. Llevo usándolo 3 meses y funciona muy bien.
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>María García</span>
                  <span className="mx-2">•</span>
                  <span>2 febrero 2023</span>
                </div>
              </div>
              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 5 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">Muy recomendable</span>
                </div>
                <p className="text-sm mb-1">
                  Excelente filtro, mi motor funciona mucho mejor desde que lo instalé. Envío rápido y buen servicio.
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>Carlos Rodríguez</span>
                  <span className="mx-2">•</span>
                  <span>10 enero 2023</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Cargar más opiniones
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Productos relacionados */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.relatedProducts.map((relatedProduct) => (
            <Link href={`/repuestos/${relatedProduct.id}`} key={relatedProduct.id}>
              <Card className="h-full hover:border-primary transition-colors overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2">
                    {relatedProduct.category}
                  </Badge>
                  <h3 className="font-medium mb-2">{relatedProduct.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">${relatedProduct.price.toFixed(2)}</span>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.preventDefault()
                        addItem({
                          id: relatedProduct.id,
                          name: relatedProduct.name,
                          price: relatedProduct.price,
                          image: relatedProduct.image,
                          category: relatedProduct.category,
                        })
                        toast({
                          title: "Producto agregado",
                          description: `${relatedProduct.name} se ha agregado al carrito`,
                          duration: 3000,
                        })
                      }}
                    >
                      Agregar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
