"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  category?: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Calcular el número total de items en el carrito
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  // Calcular el subtotal
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  // Cargar el carrito desde localStorage cuando el componente se monta
  useEffect(() => {
    setMounted(true)
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Error parsing cart data:", error)
        localStorage.removeItem("cart")
      }
    }
  }, [])

  // Guardar el carrito en localStorage cuando cambia
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, mounted])

  // Agregar un item al carrito
  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => {
      // Verificar si el item ya existe en el carrito
      const existingItemIndex = currentItems.findIndex((item) => item.id === newItem.id)

      if (existingItemIndex > -1) {
        // Si existe, incrementar la cantidad
        const updatedItems = [...currentItems]
        updatedItems[existingItemIndex].quantity += 1
        return updatedItems
      } else {
        // Si no existe, agregar como nuevo item con cantidad 1
        return [...currentItems, { ...newItem, quantity: 1 }]
      }
    })
  }

  // Eliminar un item del carrito
  const removeItem = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  // Actualizar la cantidad de un item
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return

    setItems((currentItems) => currentItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Vaciar el carrito
  const clearCart = () => {
    setItems([])
  }

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
