import type { Icon } from './icons'

export interface Category {
  name: string
  path: string
  icon: Icon
  subcategories: Subcategory[]
}

export interface Subcategory {
  name: string
  icon: Icon
  words: string[]
}

export const WordCategories: Category[] = [
  {
    name: 'Basics',
    path: 'basics',
    icon: 'book',
    subcategories: [
      {
        name: 'Greetings',
        icon: 'handshake',
        words: [
          'hello',
          'hi',
          'good morning',
          'good afternoon',
          'good evening',
          'good night',
          'goodbye',
          'see you later',
          'take care',
          'have a nice day',
        ],
      },
      {
        name: 'Numbers',
        icon: 'binary',
        words: [
          'zero',
          'one',
          'two',
          'three',
          'five',
          'ten',
          'twenty',
          'fifty',
          'hundred',
          'thousand',
        ],
      },
      {
        name: 'Actions',
        icon: 'person-standing',
        words: ['go', 'stop', 'sit', 'stand', 'walk', 'run', 'jump', 'sleep', 'eat', 'drink'],
      },
    ],
  },
  {
    name: 'Travel',
    path: 'travel',
    icon: 'tickets-plane',
    subcategories: [
      {
        name: 'Air Travel',
        icon: 'plane',
        words: [
          'departure',
          'arrival',
          'boarding pass',
          'passport control',
          'baggage claim',
          'terminal',
          'gate',
          'check-in',
          'security check',
          'customs',
        ],
      },
      {
        name: 'Road Travel',
        icon: 'car',
        words: [
          'gas station',
          'parking lot',
          'highway',
          'toll road',
          'car rental',
          'traffic light',
          'directions',
          'rest area',
          'exit',
          'roundabout',
        ],
      },
      {
        name: 'Rail Travel',
        icon: 'rail-symbol',
        words: [
          'platform',
          'ticket office',
          'train station',
          'timetable',
          'track number',
          'railway car',
          'connection',
          'seat reservation',
          'conductor',
          'delay',
        ],
      },
    ],
  },
  {
    name: 'Places',
    path: 'places',
    icon: 'map-pin-house',
    subcategories: [
      {
        name: 'Hotels',
        icon: 'bed',
        words: [
          'reception',
          'check-in',
          'checkout',
          'room service',
          'housekeeping',
          'wake-up call',
          'minibar',
          'luggage storage',
          'complimentary breakfast',
          'reservation',
        ],
      },
      {
        name: 'Work',
        icon: 'briefcase',
        words: [
          'meeting room',
          'office',
          'conference call',
          'presentation',
          'printer',
          'colleague',
          'deadline',
          'schedule',
          'business card',
          'appointment',
        ],
      },
      {
        name: 'Outdoors',
        icon: 'trees',
        words: [
          'hiking trail',
          'campsite',
          'picnic area',
          'scenic view',
          'national park',
          'beach',
          'mountain',
          'lake',
          'forest',
          'garden',
        ],
      },
    ],
  },
  {
    name: 'Food & Drink',
    path: 'food-drink',
    icon: 'utensils-crossed',
    subcategories: [
      {
        name: 'Restaurant',
        icon: 'utensils',
        words: [
          'reservation',
          'menu',
          'waiter',
          'bill',
          'tip',
          'table for two',
          'appetizer',
          'main course',
          'dessert',
          'drinks',
        ],
      },
      {
        name: 'Pub & Bar',
        icon: 'beer',
        words: [
          'draft beer',
          'wine list',
          'cocktail',
          'happy hour',
          'bar stool',
          'snacks',
          'last call',
          'spirits',
          'bartender',
          'tab',
        ],
      },
      {
        name: 'Cafe',
        icon: 'coffee',
        words: [
          'espresso',
          'latte',
          'pastry',
          'wifi password',
          'takeaway',
          'coffee to go',
          'breakfast menu',
          'barista',
          'milk alternatives',
          'opening hours',
        ],
      },
    ],
  },
  {
    name: 'Shopping',
    path: 'shopping',
    icon: 'shopping-bag',
    subcategories: [
      {
        name: 'Clothes',
        icon: 'shirt',
        words: [
          'fitting room',
          'size',
          'sale',
          'discount',
          'receipt',
          'return policy',
          'cashier',
          'price tag',
          'collection',
          'payment',
        ],
      },
      {
        name: 'Electronics',
        icon: 'tablet-smartphone',
        words: [
          'charger',
          'adapter',
          'warranty',
          'technical support',
          'battery life',
          'specifications',
          'memory',
          'display',
          'accessories',
          'repair',
        ],
      },
      {
        name: 'Books',
        icon: 'book',
        words: [
          'bestseller',
          'paperback',
          'hardcover',
          'genre',
          'author',
          'bookshelf',
          'recommendation',
          'new releases',
          'bookstore',
          'reading list',
        ],
      },
    ],
  },
  {
    name: 'Money',
    path: 'money',
    icon: 'wallet',
    subcategories: [
      {
        name: 'Banking',
        icon: 'landmark',
        words: [
          'account',
          'balance',
          'transfer',
          'withdrawal',
          'deposit',
          'statement',
          'exchange rate',
          'branch',
          'online banking',
          'transaction',
        ],
      },
      {
        name: 'Cash',
        icon: 'coins',
        words: [
          'change',
          'bills',
          'coins',
          'currency',
          'ATM',
          'cash back',
          'money exchange',
          'safe',
          'wallet',
          'local currency',
        ],
      },
      {
        name: 'Cards',
        icon: 'credit-card',
        words: [
          'credit card',
          'debit card',
          'PIN number',
          'contactless',
          'chip',
          'swipe',
          'card reader',
          'expiry date',
          'security code',
          'card limit',
        ],
      },
    ],
  },
]
