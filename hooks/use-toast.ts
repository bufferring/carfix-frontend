"use client"

import type React from "react"

import { useState, useCallback } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000

type ToasterToast = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToasterToast[]>([])

  const toast = useCallback(
    ({ ...props }: Omit<ToasterToast, "id">) => {
      setToasts((state) => {
        const newToast = {
          id: genId(),
          ...props,
        }

        return [...state, newToast].slice(-TOAST_LIMIT)
      })

      return {
        id: count.toString(),
        dismiss: () => dismiss(count.toString()),
        update: (props: ToasterToast) =>
          update({
            ...props,
            id: count.toString(),
          }),
      }
    },
    [setToasts],
  )

  const dismiss = useCallback((id: string) => {
    setToasts((state) => state.filter((toast) => toast.id !== id))
  }, [])

  const update = useCallback((toast: ToasterToast) => {
    setToasts((state) => state.map((t) => (t.id === toast.id ? { ...t, ...toast } : t)))
  }, [])

  return {
    toast,
    dismiss,
    toasts,
  }
}
