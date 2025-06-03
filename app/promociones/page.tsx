import Link from "next/link"
import Image from "next/image"
import { CalendarDays, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PromocionesPage() {
  // Datos de ejemplo para las promociones
  const promotions = [
    {
      id: 1,
      title: "Descuento del 20% en Filtros",
      description:
        "Aprovecha esta oferta por tiempo limitado en todos los filtros de nuestra tienda. Válido hasta agotar existencias.",
      image: "/images/promotions/promo-filtros.png",
      discount: "20%",
      validUntil: "30 junio 2023",
      category: "Filtros",
    },
    {
      id: 2,
      title: "2x1 en Aceites Sintéticos",
      description:
        "Lleva 2 aceites sintéticos por el precio de 1. La mejor calidad para tu motor con esta promoción especial.",
      image: "/images/promotions/promo-aceites.png",
      discount: "2x1",
      validUntil: "15 julio 2023",
      category: "Lubricantes",
    },
    {
      id: 3,
      title: "Envío Gratis en Baterías",
      description:
        "Por compras superiores a $100 en baterías, el envío es totalmente gratis a cualquier parte del país.",
      image: "/images/promotions/promo-baterias.png",
      discount: "Envío Gratis",
      validUntil: "31 julio 2023",
      category: "Baterías",
    },
  ]

  // Datos de ejemplo para los productos destacados
  const featuredProducts = [
    {
      id: 1,
      name: "Filtro de Aceite Premium",
      price: 24.99,
      salePrice: 19.99,
      image: "/images/products/filtro-aceite.png",
      rating: 4.5,
      category: "Filtros",
    },
    {
      id: 2,
      name: "Batería de Alto Rendimiento",
      price: 129.99,
      salePrice: 99.99,
      image: "/images/products/bateria.png",
      rating: 4.8,
      category: "Baterías",
    },
    {
      id: 3,
      name: "Kit de Frenos Completo",
      price: 89.99,
      salePrice: 69.99,
      image: "/images/products/frenos.png",
      rating: 4.7,
      category: "Frenos",
    },
    {
      id: 4,
      name: "Amortiguadores Deportivos",
      price: 149.99,
      salePrice: 119.99,
      image: "/images/products/amortiguadores.png",
      rating: 4.6,
      category: "Suspensión",
    },
    {
      id: 5,
      name: "Aceite Sintético 5W-30",
      price: 39.99,
      salePrice: 29.99,
      image: "/images/products/aceite.png",
      rating: 4.9,
      category: "Lubricantes",
    },
    {
      id: 6,
      name: "Bujías de Iridio",
      price: 19.99,
      salePrice: 14.99,
      image: "/images/products/bujias.png",
      rating: 4.7,
      category: "Encendido",
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Promociones y Destacados</h1>

      {/* Promociones Actuales */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Promociones Actuales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <Card key={promo.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={promo.image || "/placeholder.svg"} alt={promo.title} fill className="object-cover" />
                <div className="absolute top-4 right-4 bg-red-500 text-white text-lg font-bold px-3 py-1 rounded-full">
                  {promo.discount}
                </div>
              </div>
              <CardHeader>
                <CardTitle>{promo.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{promo.description}</p>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center text-sm">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    <span>Válido hasta: {promo.validUntil}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Tag className="h-4 w-4 mr-2" />
                    <span>Categoría: {promo.category}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Ver Detalles</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Productos Destacados */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Productos Destacados</h2>

        <Tabs defaultValue="ofertas" className="mb-6">
          <TabsList>
            <TabsTrigger value="ofertas">En Oferta</TabsTrigger>
            <TabsTrigger value="populares">Más Populares</TabsTrigger>
            <TabsTrigger value="nuevos">Recién Llegados</TabsTrigger>
          </TabsList>
          <TabsContent value="ofertas" className="mt-6">
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
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <Badge variant="outline">{product.category}</Badge>
                      <CardTitle className="text-base mt-2">{product.name}</CardTitle>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <div>
                        <span className="font-bold">${product.salePrice.toFixed(2)}</span>
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
          <TabsContent value="populares" className="mt-6">
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
                        -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <Badge variant="outline">{product.category}</Badge>
                      <CardTitle className="text-base mt-2">{product.name}</CardTitle>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <div>
                        <span className="font-bold">${product.salePrice.toFixed(2)}</span>
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
          <TabsContent value="nuevos" className="mt-6">
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
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <Badge variant="outline">{product.category}</Badge>
                      <CardTitle className="text-base mt-2">{product.name}</CardTitle>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <div>
                        <span className="font-bold">${product.salePrice.toFixed(2)}</span>
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

        <div className="text-center mt-8">
          <Link href="/repuestos">
            <Button size="lg">Ver Todos los Productos</Button>
          </Link>
        </div>
      </section>

      {/* Suscripción a Promociones */}
      <section className="mt-16 bg-muted/40 rounded-lg p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">¿No quieres perderte ninguna oferta?</h2>
          <p className="text-muted-foreground mb-6">
            Suscríbete a nuestro boletín de promociones y recibe las mejores ofertas directamente en tu correo.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button>Suscribirse</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Al suscribirte, aceptas recibir correos electrónicos de marketing de CarFix. Puedes darte de baja en
            cualquier momento.
          </p>
        </div>
      </section>
    </div>
  )
}
