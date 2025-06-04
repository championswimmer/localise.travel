<script setup lang="ts">
import { computed } from 'vue'
import type { Icon } from '@/data/icons'
import {
  TicketsPlane,
  Plane,
  Car,
  RailSymbol,
  MapPinHouse,
  Bed,
  Briefcase,
  Trees,
  UtensilsCrossed,
  Utensils,
  Beer,
  Coffee,
  ShoppingBag,
  Shirt,
  TabletSmartphone,
  Book,
  Wallet,
  Landmark,
  Coins,
  CreditCard,
  BookType,
  Handshake,
  PersonStanding,
  Binary,
} from 'lucide-vue-next'

const props = defineProps<{
  name: Icon
  size?: number
  color?: string
  width?: number
}>()

const icon = computed(() => {
  switch (props.name) {
    case 'book-type':
      return BookType
    case 'handshake':
      return Handshake
    case 'binary':
      return Binary
    case 'person-standing':
      return PersonStanding
    case 'tickets-plane':
      return TicketsPlane
    case 'plane':
      return Plane
    case 'car':
      return Car
    case 'rail-symbol':
      return RailSymbol
    case 'map-pin-house':
      return MapPinHouse
    case 'bed':
      return Bed
    case 'briefcase':
      return Briefcase
    case 'trees':
      return Trees
    case 'utensils-crossed':
      return UtensilsCrossed
    case 'utensils':
      return Utensils
    case 'beer':
      return Beer
    case 'coffee':
      return Coffee
    case 'shopping-bag':
      return ShoppingBag
    case 'shirt':
      return Shirt
    case 'tablet-smartphone':
      return TabletSmartphone
    case 'book':
      return Book
    case 'wallet':
      return Wallet
    case 'landmark':
      return Landmark
    case 'coins':
      return Coins
    case 'credit-card':
      return CreditCard
    default:
      throw Error(`Icon ${props.name} not found`)
  }
})
</script>

<template>
  <component
    :is="icon"
    :size="props.size || 24"
    :stroke="props.color || 'currentColor'"
    :strokeWidth="props.width || 2"
  />
</template>
