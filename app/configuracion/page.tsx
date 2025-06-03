"use client"

import { useState } from "react"
import { Bell, Lock, User, CreditCard, Store, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ConfiguracionPage() {
  const [accountType, setAccountType] = useState("usuario")

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Configuración</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64 shrink-0">
          <Card>
            <CardContent className="p-0">
              <RadioGroup value={accountType} onValueChange={setAccountType} className="border-b">
                <div className="flex items-center space-x-2 p-4">
                  <RadioGroupItem value="usuario" id="usuario" />
                  <Label htmlFor="usuario" className="flex items-center cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Usuario
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4">
                  <RadioGroupItem value="negocio" id="negocio" />
                  <Label htmlFor="negocio" className="flex items-center cursor-pointer">
                    <Store className="h-4 w-4 mr-2" />
                    Negocio
                  </Label>
                </div>
              </RadioGroup>

              <Tabs defaultValue="cuenta" className="w-full">
                <TabsList className="grid grid-cols-1 h-auto">
                  <TabsTrigger value="cuenta" className="justify-start px-4 py-3 data-[state=active]:bg-muted">
                    <User className="h-4 w-4 mr-2" />
                    Cuenta
                  </TabsTrigger>
                  <TabsTrigger value="seguridad" className="justify-start px-4 py-3 data-[state=active]:bg-muted">
                    <Lock className="h-4 w-4 mr-2" />
                    Seguridad
                  </TabsTrigger>
                  <TabsTrigger value="notificaciones" className="justify-start px-4 py-3 data-[state=active]:bg-muted">
                    <Bell className="h-4 w-4 mr-2" />
                    Notificaciones
                  </TabsTrigger>
                  <TabsTrigger value="pagos" className="justify-start px-4 py-3 data-[state=active]:bg-muted">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pagos
                  </TabsTrigger>
                  <TabsTrigger value="privacidad" className="justify-start px-4 py-3 data-[state=active]:bg-muted">
                    <Shield className="h-4 w-4 mr-2" />
                    Privacidad
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de {accountType === "usuario" ? "Usuario" : "Negocio"}</CardTitle>
              <CardDescription>
                Administra tus preferencias y configuración de {accountType === "usuario" ? "usuario" : "negocio"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {accountType === "usuario" ? (
                <>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Información Personal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input id="nombre" defaultValue="Juan Pérez" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input id="email" type="email" defaultValue="juan.perez@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input id="telefono" defaultValue="+123 456 7890" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="direccion">Dirección</Label>
                        <Input id="direccion" defaultValue="Calle Principal 123, Ciudad, País" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Preferencias</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="idioma">Idioma</Label>
                        <Select defaultValue="es">
                          <SelectTrigger id="idioma">
                            <SelectValue placeholder="Seleccionar idioma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="moneda">Moneda</Label>
                        <Select defaultValue="usd">
                          <SelectTrigger id="moneda">
                            <SelectValue placeholder="Seleccionar moneda" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD - Dólar Estadounidense</SelectItem>
                            <SelectItem value="eur">EUR - Euro</SelectItem>
                            <SelectItem value="mxn">MXN - Peso Mexicano</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Información del Negocio</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre-negocio">Nombre del Negocio</Label>
                        <Input id="nombre-negocio" defaultValue="Auto Repuestos Express" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tipo-negocio">Tipo de Negocio</Label>
                        <Select defaultValue="distribuidor">
                          <SelectTrigger id="tipo-negocio">
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
                      <div className="space-y-2">
                        <Label htmlFor="email-negocio">Correo Electrónico</Label>
                        <Input id="email-negocio" type="email" defaultValue="contacto@autorepuestosexpress.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefono-negocio">Teléfono</Label>
                        <Input id="telefono-negocio" defaultValue="+123 456 7890" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="direccion-negocio">Dirección</Label>
                        <Input id="direccion-negocio" defaultValue="Calle Comercial 456, Ciudad, País" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Configuración de Ventas</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="impuestos">Impuestos</Label>
                        <div className="flex items-center space-x-2">
                          <Input id="impuestos" type="number" defaultValue="16" className="w-20" />
                          <span>%</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="mostrar-precios" defaultChecked />
                        <Label htmlFor="mostrar-precios">Mostrar precios con impuestos incluidos</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="mostrar-stock" defaultChecked />
                        <Label htmlFor="mostrar-stock">Mostrar disponibilidad de stock</Label>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
