"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { User, Package, Heart, CreditCard, Settings, LogOut, ShoppingBag, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UsuarioPage() {
  const [activeTab, setActiveTab] = useState("perfil")

  // Datos de ejemplo para el perfil
  const user = {
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "+123 456 7890",
    address: "Calle Principal 123, Ciudad, País",
    avatar: "/images/profiles/user-profile.png",
    joinDate: "Enero 2023",
  }

  // Datos de ejemplo para los pedidos
  const orders = [
    {
      id: "ORD-12345",
      date: "15 marzo 2023",
      status: "Entregado",
      total: 144.97,
      items: 3,
    },
    {
      id: "ORD-12346",
      date: "2 abril 2023",
      status: "En proceso",
      total: 89.99,
      items: 1,
    },
    {
      id: "ORD-12347",
      date: "10 mayo 2023",
      status: "Enviado",
      total: 219.98,
      items: 2,
    },
  ]

  // Datos de ejemplo para los favoritos
  const favorites = [
    {
      id: 1,
      name: "Filtro de Aceite Premium",
      price: 24.99,
      image: "/images/products/filtro-aceite.png",
      category: "Filtros",
    },
    {
      id: 2,
      name: "Batería de Alto Rendimiento",
      price: 129.99,
      image: "/images/products/bateria.png",
      category: "Baterías",
    },
    {
      id: 3,
      name: "Kit de Frenos Completo",
      price: 89.99,
      image: "/images/products/frenos.png",
      category: "Frenos",
    },
    {
      id: 4,
      name: "Amortiguadores Deportivos",
      price: 149.99,
      image: "/images/products/amortiguadores.png",
      category: "Suspensión",
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Mi Cuenta</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>Cliente desde {user.joinDate}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Separator />
              <nav className="flex flex-col">
                <Button
                  variant={activeTab === "perfil" ? "default" : "ghost"}
                  className="justify-start rounded-none h-12"
                  onClick={() => setActiveTab("perfil")}
                >
                  <User className="mr-2 h-5 w-5" />
                  Perfil
                </Button>
                <Button
                  variant={activeTab === "pedidos" ? "default" : "ghost"}
                  className="justify-start rounded-none h-12"
                  onClick={() => setActiveTab("pedidos")}
                >
                  <Package className="mr-2 h-5 w-5" />
                  Mis Pedidos
                </Button>
                <Button
                  variant={activeTab === "favoritos" ? "default" : "ghost"}
                  className="justify-start rounded-none h-12"
                  onClick={() => setActiveTab("favoritos")}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Favoritos
                </Button>
                <Button
                  variant={activeTab === "pagos" ? "default" : "ghost"}
                  className="justify-start rounded-none h-12"
                  onClick={() => setActiveTab("pagos")}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Métodos de Pago
                </Button>
                <Button
                  variant={activeTab === "configuracion" ? "default" : "ghost"}
                  className="justify-start rounded-none h-12"
                  onClick={() => setActiveTab("configuracion")}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Configuración
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start rounded-none h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Cerrar Sesión
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Contenido principal */}
        <div className="md:col-span-3">
          {activeTab === "perfil" && (
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>Gestiona tu información personal y de contacto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Nombre Completo</h3>
                    <p className="text-muted-foreground">{user.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Correo Electrónico</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Teléfono</h3>
                    <p className="text-muted-foreground">{user.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Dirección</h3>
                    <p className="text-muted-foreground">{user.address}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Editar Información</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "pedidos" && (
            <Card>
              <CardHeader>
                <CardTitle>Mis Pedidos</CardTitle>
                <CardDescription>Historial de tus compras y estado de tus pedidos</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No tienes pedidos</h3>
                    <p className="text-muted-foreground mb-4">Aún no has realizado ningún pedido con nosotros.</p>
                    <Link href="/repuestos">
                      <Button>Explorar Repuestos</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium">{order.id}</h3>
                                <Badge
                                  variant={
                                    order.status === "Entregado"
                                      ? "success"
                                      : order.status === "Enviado"
                                        ? "default"
                                        : "outline"
                                  }
                                >
                                  {order.status}
                                </Badge>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" />
                                {order.date}
                              </div>
                            </div>
                            <div className="flex flex-col md:items-end">
                              <div className="font-medium">${order.total.toFixed(2)}</div>
                              <div className="text-sm text-muted-foreground">
                                {order.items} {order.items === 1 ? "producto" : "productos"}
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Ver Detalles
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "favoritos" && (
            <Card>
              <CardHeader>
                <CardTitle>Mis Favoritos</CardTitle>
                <CardDescription>Productos que has marcado como favoritos</CardDescription>
              </CardHeader>
              <CardContent>
                {favorites.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No tienes favoritos</h3>
                    <p className="text-muted-foreground mb-4">Aún no has agregado productos a tus favoritos.</p>
                    <Link href="/repuestos">
                      <Button>Explorar Repuestos</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favorites.map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex">
                            <div className="relative h-24 w-24 shrink-0">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="p-4 flex flex-col justify-between flex-1">
                              <div>
                                <Badge variant="outline" className="mb-1">
                                  {product.category}
                                </Badge>
                                <h3 className="font-medium line-clamp-1">{product.name}</h3>
                                <div className="font-bold mt-1">${product.price.toFixed(2)}</div>
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Button size="sm" variant="secondary" className="flex-1">
                                  Agregar
                                </Button>
                                <Button size="sm" variant="ghost" className="px-2">
                                  <Heart className="h-4 w-4 fill-destructive text-destructive" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "pagos" && (
            <Card>
              <CardHeader>
                <CardTitle>Métodos de Pago</CardTitle>
                <CardDescription>Gestiona tus tarjetas y métodos de pago</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No tienes métodos de pago guardados</h3>
                  <p className="text-muted-foreground mb-4">
                    Agrega un método de pago para agilizar tus compras futuras.
                  </p>
                  <Button>Agregar Método de Pago</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "configuracion" && (
            <Card>
              <CardHeader>
                <CardTitle>Configuración de la Cuenta</CardTitle>
                <CardDescription>Gestiona las preferencias de tu cuenta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Preferencias de Notificaciones</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Correos electrónicos de pedidos</h4>
                        <p className="text-sm text-muted-foreground">Recibe actualizaciones sobre tus pedidos</p>
                      </div>
                      <div className="flex items-center h-5">
                        <input
                          id="order-emails"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Correos promocionales</h4>
                        <p className="text-sm text-muted-foreground">Recibe ofertas y promociones especiales</p>
                      </div>
                      <div className="flex items-center h-5">
                        <input id="promo-emails" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-medium mb-4">Seguridad</h3>
                  <Button variant="outline">Cambiar Contraseña</Button>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-medium mb-4">Eliminar Cuenta</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate de estar seguro.
                  </p>
                  <Button variant="destructive">Eliminar Cuenta</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
