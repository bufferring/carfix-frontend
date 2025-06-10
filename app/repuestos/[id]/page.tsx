"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Truck, ShieldCheck, ArrowLeft, Minus, Plus, Heart, Loader2 } from "lucide-react"
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
  // Objeto estático que sirve como base para toda la página
  const product = {
    id: Number.parseInt(params.id),
    name: "Filtro de Aceite Premium",
    price: 24.99,
    description: "Filtro de aceite de alta calidad...",
    rating: 4.5,
    reviewCount: 128,
    category: "Filtros",
    brand: "Bosch", // Valor de respaldo
    sku: "FIL-1234",
    stock: 45,
    images: ["/images/products/filtro-aceite.png", "/images/products/filtro-aceite.png", "/images/products/filtro-aceite.png", "/images/products/filtro-aceite.png"],
    specifications: [{ name: "Marca", value: "Bosch" }, { name: "Modelo", value: "P7100" }, { name: "Dimensiones", value: "86mm x 71mm" }],
    features: ["Filtración de alta eficiencia", "Resistente a altas temperaturas", "Fácil instalación"],
    relatedProducts: [{ id: 2, name: "Filtro de Aire Deportivo", price: 34.99, image: "/images/products/filtro-aire.png", category: "Filtros" }, { id: 4, name: "Aceite Sintético 5W-30", price: 39.99, image: "/images/products/aceite.png", category: "Lubricantes" }],
  }

  // Estados para la parte dinámica (la marca)
  const [apiBrandName, setApiBrandName] = useState<string | null>(null)
  const [isBrandLoading, setIsBrandLoading] = useState(true)

  // Estados para la interacción del usuario
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { toast } = useToast()

  // useEffect para obtener solo la marca desde la API
  useEffect(() => {
    const fetchBrand = async () => {
      if (!params.id) {
        setIsBrandLoading(false);
        return;
      }
      try {
        const response = await fetch(`https://ccw.prawn-enigmatic.ts.net/api/spare-parts/${params.id}`)
        if (response.ok) {
          const apiResponse = await response.json()
          if (apiResponse.success && apiResponse.data && apiResponse.data.Business) {
            setApiBrandName(apiResponse.data.Business.business_name)
          }
        }
      } catch (err) {
        console.error("No se pudo obtener la marca desde la API. Se usará el valor de respaldo.", err)
      } finally {
        setIsBrandLoading(false)
      }
    }
    fetchBrand()
  }, [params.id])

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    // La función para agregar al carrito no necesita la marca de la API
    addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], category: product.category }, quantity)
    toast({ title: "Producto agregado", description: `${quantity} ${quantity === 1 ? "unidad" : "unidades"} de ${product.name} al carrito.`, duration: 3000 })
  }

  return (
    <div className="container py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Inicio</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/repuestos">Repuestos</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href={`/repuestos?categoria=${product.category}`}>{product.category}</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><span className="font-medium text-foreground">{product.name}</span></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <Link href="/repuestos" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"><ArrowLeft className="mr-2 h-4 w-4" />Volver a repuestos</Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <div className="aspect-square relative border rounded-lg overflow-hidden"><Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-contain p-4" /></div>
          <div className="grid grid-cols-4 gap-2">{product.images.map((image, index) => (<div key={index} className="aspect-square relative border rounded-lg overflow-hidden"><Image src={image || "/placeholder.svg"} alt={`${product.name} - Vista ${index + 1}`} fill className="object-contain" /></div>))}</div>
        </div>
        
        <div className="space-y-6">
          <div><Badge variant="outline" className="mb-2">{product.category}</Badge><h1 className="text-3xl font-bold">{product.name}</h1><div className="flex items-center mt-2"><div className="flex">{[...Array(5)].map((_, i) => (<Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`} />))}</div><span className="ml-2 text-sm text-muted-foreground">{product.rating} ({product.reviewCount} reseñas)</span></div></div>
          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Marca:</span> {isBrandLoading ? <span className="italic">Cargando...</span> : (apiBrandName || product.brand)}</p>
            <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">SKU:</span> {product.sku}</p>
            <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Disponibilidad:</span> {product.stock > 0 ? <span className="text-green-600">En stock ({product.stock} unidades)</span> : <span className="text-red-600">Agotado</span>}</p>
          </div>
          <div className="border-t pt-4"><p className="mb-4">{product.description}</p></div>
          <div className="flex flex-col sm:flex-row gap-4"><div className="flex items-center border rounded-md"><Button variant="ghost" size="icon" onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1}><Minus className="h-4 w-4" /></Button><span className="w-12 text-center">{quantity}</span><Button variant="ghost" size="icon" onClick={() => handleQuantityChange(quantity + 1)} disabled={quantity >= product.stock}><Plus className="h-4 w-4" /></Button></div><Button className="flex-1" onClick={handleAddToCart} disabled={product.stock === 0}>Agregar al Carrito</Button><Button variant="outline" size="icon"><Heart className="h-5 w-5" /><span className="sr-only">Agregar a favoritos</span></Button></div>
        </div>
      </div>

      <Tabs defaultValue="especificaciones" className="mb-12">
        <TabsList className="w-full grid grid-cols-3"><TabsTrigger value="especificaciones">Especificaciones</TabsTrigger><TabsTrigger value="compatibilidad">Compatibilidad</TabsTrigger><TabsTrigger value="opiniones">Opiniones</TabsTrigger></TabsList>
        <TabsContent value="especificaciones" className="p-4 border rounded-md mt-4">
          <table className="w-full"><tbody>{product.specifications.map((spec, index) => (<tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}><td className="py-2 px-4 font-medium">{spec.name}</td><td className="py-2 px-4">{spec.name === "Marca" ? (isBrandLoading ? "Cargando..." : apiBrandName || spec.value) : spec.value}</td></tr>))}</tbody></table>
        </TabsContent>
        <TabsContent value="compatibilidad" className="p-4 border rounded-md mt-4"><p>Información de compatibilidad no disponible dinámicamente.</p></TabsContent>
        <TabsContent value="opiniones" className="p-4 border rounded-md mt-4"><p>Sección de opiniones no disponible dinámicamente.</p></TabsContent>
      </Tabs>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{product.relatedProducts.map((related) => (<Link href={`/repuestos/${related.id}`} key={related.id}><Card className="h-full hover:border-primary transition-colors overflow-hidden"><div className="aspect-square relative"><Image src={related.image || "/placeholder.svg"} alt={related.name} fill className="object-cover transition-transform hover:scale-105" /></div><CardContent className="p-4"><Badge variant="outline" className="mb-2">{related.category}</Badge><h3 className="font-medium mb-2">{related.name}</h3><div className="flex justify-between items-center"><span className="font-bold">${related.price.toFixed(2)}</span></div></CardContent></Card></Link>))}</div>
      </div>
    </div>
  )
}
