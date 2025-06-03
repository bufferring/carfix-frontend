"use client"

import { useState } from "react"
import Image from "next/image"
import { Store, Package, BarChart3, Settings, Plus, Edit, Trash2, Search, Filter, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function NegocioPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  // Datos de ejemplo para el negocio
  const business = {
    name: "Auto Repuestos Express",
    type: "Distribuidor",
    joinDate: "Enero 2023",
    logo: "/images/profiles/business-profile.png",
    address: "Calle Comercial 456, Ciudad, País",
    phone: "+123 456 7890",
    email: "contacto@autorepuestosexpress.com",
  }

  // Datos de ejemplo para los productos
  const products = [
    {
      id: 1,
      name: "Filtro de Aceite Premium",
      price: 24.99,
      stock: 45,
      category: "Filtros",
      status: "Activo",
    },
    {
      id: 2,
      name: "Batería de Alto Rendimiento",
      price: 129.99,
      stock: 12,
      category: "Baterías",
      status: "Activo",
    },
    {
      id: 3,
      name: "Kit de Frenos Completo",
      price: 89.99,
      stock: 8,
      category: "Frenos",
      status: "Activo",
    },
    {
      id: 4,
      name: "Amortiguadores Deportivos",
      price: 149.99,
      stock: 6,
      category: "Suspensión",
      status: "Activo",
    },
    {
      id: 5,
      name: "Aceite Sintético 5W-30",
      price: 39.99,
      stock: 32,
      category: "Lubricantes",
      status: "Activo",
    },
    {
      id: 6,
      name: "Bujías de Iridio",
      price: 19.99,
      stock: 0,
      category: "Encendido",
      status: "Agotado",
    },
    {
      id: 7,
      name: "Filtro de Aire Deportivo",
      price: 34.99,
      stock: 15,
      category: "Filtros",
      status: "Activo",
    },
    {
      id: 8,
      name: "Pastillas de Freno Cerámicas",
      price: 59.99,
      stock: 0,
      category: "Frenos",
      status: "Agotado",
    },
  ]

  // Datos de ejemplo para los pedidos
  const orders = [
    {
      id: "ORD-12345",
      customer: "Juan Pérez",
      date: "15 marzo 2023",
      status: "Entregado",
      total: 144.97,
      items: 3,
    },
    {
      id: "ORD-12346",
      customer: "María García",
      date: "2 abril 2023",
      status: "En proceso",
      total: 89.99,
      items: 1,
    },
    {
      id: "ORD-12347",
      customer: "Carlos Rodríguez",
      date: "10 mayo 2023",
      status: "Enviado",
      total: 219.98,
      items: 2,
    },
    {
      id: "ORD-12348",
      customer: "Ana Martínez",
      date: "15 mayo 2023",
      status: "Pendiente",
      total: 59.99,
      items: 1,
    },
    {
      id: "ORD-12349",
      customer: "Luis Sánchez",
      date: "20 mayo 2023",
      status: "Entregado",
      total: 129.99,
      items: 1,
    },
  ]

  // Datos de ejemplo para las estadísticas
  const stats = [
    {
      title: "Ventas Totales",
      value: "$12,345.67",
      change: "+12.5%",
      changeType: "positive",
    },
    {
      title: "Pedidos",
      value: "156",
      change: "+8.2%",
      changeType: "positive",
    },
    {
      title: "Productos",
      value: "48",
      change: "+4.1%",
      changeType: "positive",
    },
    {
      title: "Clientes",
      value: "89",
      change: "+15.3%",
      changeType: "positive",
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Negocio</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="h-16 w-48 relative">
                <Image src="/images/logo.png" alt={business.name} fill className="object-contain" priority />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Separator />
              <nav className="flex flex-col">
                <Button
                  variant={activeTab === "dashboard" ? "default" : "ghost"}
                  className="justify-start rounded-none h-12"
                  onClick={() => setActiveTab("dashboard")}
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Dashboard
                </Button>
                <Button
                  variant={activeTab === "productos" ? "default" : "ghost"}
                  className="justify-start rounded-none h-12"
                  onClick={() => setActiveTab("productos")}
                >
                  <Package className="mr-2 h-5 w-5" />
                  Productos
                </Button>
                <Button
                  variant={activeTab === "pedidos" ? "default" : "ghost"}
                  className="justify-start rounded-none h-12"
                  onClick={() => setActiveTab("pedidos")}
                >
                  <Store className="mr-2 h-5 w-5" />
                  Pedidos
                </Button>
                <Button
                  variant={activeTab === "configuracion" ? "default" : "ghost"}
                  className="justify-start rounded-none h-12"
                  onClick={() => setActiveTab("configuracion")}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Configuración
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Contenido principal */}
        <div className="md:col-span-3">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <div className="flex items-baseline justify-between mt-2">
                          <h3 className="text-2xl font-bold">{stat.value}</h3>
                          <p
                            className={`text-sm ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
                          >
                            {stat.change}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Pedidos Recientes</CardTitle>
                  <CardDescription>Los últimos 5 pedidos recibidos</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === "Entregado"
                                  ? "success"
                                  : order.status === "Enviado"
                                    ? "default"
                                    : order.status === "En proceso"
                                      ? "outline"
                                      : "secondary"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Ver Todos los Pedidos
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Productos con Bajo Stock</CardTitle>
                  <CardDescription>Productos que necesitan reabastecimiento</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products
                        .filter((p) => p.stock < 10)
                        .map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                              <Badge variant={product.status === "Activo" ? "outline" : "secondary"}>
                                {product.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Gestionar Inventario
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {activeTab === "productos" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestión de Productos</CardTitle>
                  <CardDescription>Administra tu catálogo de productos</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Nuevo Producto
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                      <DialogDescription>
                        Completa la información del producto. Haz clic en guardar cuando termines.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right">
                          Nombre
                        </label>
                        <Input id="name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="category" className="text-right">
                          Categoría
                        </label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Seleccionar categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="filtros">Filtros</SelectItem>
                            <SelectItem value="baterias">Baterías</SelectItem>
                            <SelectItem value="frenos">Frenos</SelectItem>
                            <SelectItem value="suspension">Suspensión</SelectItem>
                            <SelectItem value="lubricantes">Lubricantes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="price" className="text-right">
                          Precio
                        </label>
                        <Input id="price" type="number" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="stock" className="text-right">
                          Stock
                        </label>
                        <Input id="stock" type="number" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="description" className="text-right">
                          Descripción
                        </label>
                        <textarea
                          id="description"
                          className="col-span-3 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Guardar Producto</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Buscar productos..." className="pl-8" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="todos">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="activo">Activos</SelectItem>
                        <SelectItem value="agotado">Agotados</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <Badge variant={product.status === "Activo" ? "outline" : "secondary"}>
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <span className="sr-only">Abrir menú</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                  >
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                  </svg>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Package className="mr-2 h-4 w-4" />
                                  Actualizar Stock
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "pedidos" && (
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Pedidos</CardTitle>
                <CardDescription>Administra los pedidos de tus clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Buscar pedidos..." className="pl-8" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="todos">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="pendiente">Pendientes</SelectItem>
                        <SelectItem value="proceso">En Proceso</SelectItem>
                        <SelectItem value="enviado">Enviados</SelectItem>
                        <SelectItem value="entregado">Entregados</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === "Entregado"
                                  ? "success"
                                  : order.status === "Enviado"
                                    ? "default"
                                    : order.status === "En proceso"
                                      ? "outline"
                                      : "secondary"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <span className="sr-only">Abrir menú</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                  >
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                  </svg>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                                <DropdownMenuItem>Actualizar Estado</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Imprimir Factura</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "configuracion" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información del Negocio</CardTitle>
                  <CardDescription>Actualiza la información de tu negocio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <div className="relative h-32 w-32 rounded-lg border overflow-hidden">
                        <Image
                          src={business.logo || "/placeholder.svg"}
                          alt={business.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Button variant="outline" size="sm" className="mt-4">
                        Cambiar Logo
                      </Button>
                    </div>
                    <div className="md:w-2/3 grid gap-4">
                      <div>
                        <label htmlFor="business-name" className="text-sm font-medium block mb-1">
                          Nombre del Negocio
                        </label>
                        <Input id="business-name" defaultValue={business.name} />
                      </div>
                      <div>
                        <label htmlFor="business-type" className="text-sm font-medium block mb-1">
                          Tipo de Negocio
                        </label>
                        <Select defaultValue={business.type.toLowerCase()}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="distribuidor">Distribuidor</SelectItem>
                            <SelectItem value="fabricante">Fabricante</SelectItem>
                            <SelectItem value="minorista">Minorista</SelectItem>
                            <SelectItem value="taller">Taller Mecánico</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label htmlFor="business-address" className="text-sm font-medium block mb-1">
                          Dirección
                        </label>
                        <Input id="business-address" defaultValue={business.address} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="business-phone" className="text-sm font-medium block mb-1">
                            Teléfono
                          </label>
                          <Input id="business-phone" defaultValue={business.phone} />
                        </div>
                        <div>
                          <label htmlFor="business-email" className="text-sm font-medium block mb-1">
                            Correo Electrónico
                          </label>
                          <Input id="business-email" defaultValue={business.email} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Guardar Cambios</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Envíos</CardTitle>
                  <CardDescription>Gestiona las opciones de envío para tus productos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="shipping-free" className="text-sm font-medium block mb-1">
                      Envío Gratuito a partir de
                    </label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <Input id="shipping-free" type="number" defaultValue="100" className="max-w-[120px]" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="shipping-cost" className="text-sm font-medium block mb-1">
                      Costo de Envío Estándar
                    </label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <Input id="shipping-cost" type="number" defaultValue="9.99" className="max-w-[120px]" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="local-pickup"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="local-pickup" className="text-sm font-medium">
                      Permitir recogida en tienda
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Guardar Cambios</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Métodos de Pago</CardTitle>
                  <CardDescription>Configura los métodos de pago aceptados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="payment-credit"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="payment-credit" className="text-sm font-medium">
                      Tarjetas de Crédito/Débito
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="payment-paypal"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="payment-paypal" className="text-sm font-medium">
                      PayPal
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="payment-transfer"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="payment-transfer" className="text-sm font-medium">
                      Transferencia Bancaria
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="payment-cash" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="payment-cash" className="text-sm font-medium">
                      Efectivo en Entrega
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Guardar Cambios</Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
