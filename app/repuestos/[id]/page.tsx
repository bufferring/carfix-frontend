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

// --- DEFINICIÓN DE TIPOS DETALLADOS PARA EL PRODUCTO ---
type ApiCategory = {
  id: number;
  name: string;
}

type Business = {
  id: number;
  business_name: string;
}

type ProductDetail = {
  id: number;
  name: string;
  price: string;
  description: string;
  stock: number;
  Category: ApiCategory;
  Business: Business; // Aquí está la marca (proveedor)
  // Campos opcionales que tu API debería proveer para una experiencia completa
  images?: string[];
  oem_code?: string;
  specifications?: { name: string; value: string }[];
  features?: string[];
  relatedProducts?: any[]; 
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) {
        setError("No se ha especificado un ID de producto.");
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`https://ccw.prawn-enigmatic.ts.net/api/spare-parts/${params.id}`)
        
        if (!response.ok) {
          throw new Error(response.status === 404 ? "Producto no encontrado." : "Error al conectar con el servidor.");
        }

        const apiResponse = await response.json();
        if (apiResponse.success && apiResponse.data) {
          setProduct(apiResponse.data);
        } else {
          throw new Error("El formato de los datos del producto no es correcto.");
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Error detallado al obtener el producto:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [params.id]);

  const handleQuantityChange = (newQuantity: number) => {
    if (product && newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  }

  const handleAddToCart = () => {
    if (!product) return;
    
    // El contexto del carrito debe aceptar la cantidad
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.images?.[0] || "/placeholder.svg",
      category: product.Category.name,
    }, quantity);

    toast({
      title: "Producto agregado",
      description: `${quantity} ${quantity === 1 ? 'unidad' : 'unidades'} de ${product.name} al carrito.`,
      duration: 3000,
    });
  }

  if (isLoading) {
    return <div className="container py-8 flex justify-center items-center h-[80vh]"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  if (error) {
    return <div className="container py-8 text-center text-destructive h-[80vh]"><h2 className="text-2xl font-bold">¡Ocurrió un Error!</h2><p className="mt-2">{error}</p><Link href="/repuestos"><Button className="mt-4">Volver al Catálogo</Button></Link></div>;
  }

  if (!product) {
    return <div className="container py-8 text-center h-[80vh]"><h2 className="text-2xl font-bold">Producto no encontrado</h2><p className="mt-2 text-muted-foreground">El producto que buscas no existe.</p><Link href="/repuestos"><Button className="mt-4">Volver al Catálogo</Button></Link></div>;
  }

  return (
    <div className="container py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Inicio</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/repuestos">Repuestos</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href={`/repuestos?categoria=${product.Category.name}`}>{product.Category.name}</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><span className="font-medium text-foreground">{product.name}</span></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <div className="aspect-square relative border rounded-lg overflow-hidden">
            <Image src={product.images?.[0] || "/placeholder.svg"} alt={product.name} fill className="object-contain p-4" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {(product.images || []).slice(0, 4).map((image, index) => (
              <div key={index} className="aspect-square relative border rounded-lg overflow-hidden">
                <Image src={image || "/placeholder.svg"} alt={`${product.name} - Vista ${index + 1}`} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">{product.Category.name}</Badge>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            {/* El rating necesitaría venir de la API. Lo comentamos por ahora. */}
          </div>

          <div className="text-3xl font-bold">${parseFloat(product.price).toFixed(2)}</div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Marca:</span> {product.Business.business_name}</p>
            <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">SKU/OEM:</span> {product.oem_code || "N/A"}</p>
            <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Disponibilidad:</span> {product.stock > 0 ? <span className="text-green-600">En stock ({product.stock} unidades)</span> : <span className="text-red-600">Agotado</span>}</p>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center border rounded-md"><Button variant="ghost" size="icon" onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1}><Minus className="h-4 w-4" /></Button><span className="w-12 text-center">{quantity}</span><Button variant="ghost" size="icon" onClick={() => handleQuantityChange(quantity + 1)} disabled={quantity >= product.stock}><Plus className="h-4 w-4" /></Button></div>
            <Button className="flex-1" onClick={handleAddToCart} disabled={product.stock === 0}>Agregar al Carrito</Button>
            <Button variant="outline" size="icon"><Heart className="h-5 w-5" /><span className="sr-only">Agregar a favoritos</span></Button>
          </div>
        </div>
      </div>
      
      {/* Las tabs necesitarían que la API devuelva los datos de especificaciones, etc. */}
    </div>
  )
}
