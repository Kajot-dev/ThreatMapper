import { Config } from 'tailwindcss/types/config';
import TailwindcssVariables from '@mertasan/tailwindcss-variables';
import colorVariable from '@mertasan/tailwindcss-variables/colorVariable';

const commonColors = {
  clarity: {
    border: '#0F171C',
    'page-bg': '#1B2A32',
    'component-bg': '#22343C',
    'active-bg': '#324F61',
    action: '#31A1D7',
  },
  chart: {
    pink1: '#F1428A',
    pink2: '#C7527E',
    pink3: '#E3749E',
    red: '#F55B47',
    orange: '#F57600',
    yellow1: '#E5C354',
    yellow2: '#F6C24F',
    lime: '#62C655',
    green: '#2FBF9E',
    blue1: '#0095D3',
    blue2: '#3478EB',
    blue3: '#1C64F2',
    purple1: '#6870C4',
    purple2: '#8451ED',
  },
  'df-gray': {
    100: '#F3F6FA',
    200: '#D9E4EA',
    300: '#C1CDD4',
    400: '#A9B6BE',
    500: '#919FA8',
    600: '#61717D',
    700: '#495A67',
    800: '#314351',
    900: '#25333D',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  red: {
    50: '#FDF2F2',
    100: '#FDE8E8',
    200: '#FBD5D5',
    300: '#F8B4B4',
    400: '#F98080',
    500: '#F05252',
    600: '#E02424',
    700: '#C81E1E',
    800: '#9B1C1C',
    900: '#771D1D',
  },
  orange: {
    50: '#FFF8F1',
    100: '#FEECDC',
    200: '#FCD9BD',
    300: '#FDBA8C',
    400: '#FF8A4C',
    500: '#FF5A1F',
    600: '#D03801',
    700: '#B43403',
    800: '#8A2C0D',
    900: '#771D1D',
  },
  yellow: {
    50: '#FDFDEA',
    100: '#FDF6B2',
    200: '#FCE96A',
    300: '#FACA15',
    400: '#E3A008',
    500: '#C27803',
    600: '#9F580A',
    700: '#8E4B10',
    800: '#723B13',
    900: '#633112',
  },
  green: {
    50: '#F3FAF7',
    100: '#DEF7EC',
    200: '#BCF0DA',
    300: '#84E1BC',
    400: '#31C48D',
    500: '#0E9F6E',
    600: '#057A55',
    700: '#046C4E',
    800: '#03543F',
    900: '#014737',
  },
  teal: {
    50: '#EDFAFA',
    100: '#D5F5F6',
    200: '#AFECEF',
    300: '#7EDCE2',
    400: '#16BDCA',
    500: '#0694A2',
    600: '#047481',
    700: '#036672',
    800: '#05505C',
    900: '#014451',
  },
  blue: {
    50: '#EBF5FF',
    100: '#E1EFFE',
    200: '#C3DDFD',
    300: '#A4CAFE',
    400: '#76A9FA',
    500: '#3F83F8',
    600: '#1C64F2',
    700: '#1A56DB',
    800: '#1E429F',
    900: '#233876',
  },
  indigo: {
    50: '#F0F5FF',
    100: '#E5EDFF',
    200: '#CDDBFE',
    300: '#B4C6FC',
    400: '#8DA2FB',
    500: '#6875F5',
    600: '#5850EC',
    700: '#5145CD',
    800: '#42389D',
    900: '#362F78',
  },
  purple: {
    50: '#F6F5FF',
    100: '#EDEBFE',
    200: '#DCD7FE',
    300: '#CABFFD',
    400: '#AC94FA',
    500: '#9061F9',
    600: '#7E3AF2',
    700: '#6C2BD9',
    800: '#5521B5',
    900: '#4A1D96',
  },
  pink: {
    50: '#FDF2F8',
    100: '#FCE8F3',
    200: '#FAD1E8',
    300: '#F8B4D9',
    400: '#F17EB8',
    500: '#E74694',
    600: '#D61F69',
    700: '#BF125D',
    800: '#99154B',
    900: '#751A3D',
  },
};

const colors = {
  variables: {
    DEFAULT: {
      'brand-blue': '#2742e7',
      'brand-magenta': '#d91590',
      'brand-purple': '#6d32e5',
      'text-text-and-icon': '#565656',
      'text-input-value': '#000000',
      'text-text-inverse': '#ffffff',
      'text-link': '#056699',
      'accent-accent': '#0079b8',
      'bg-page': '#f5f5f5',
      'bg-grid-border': '#e5e7eb',
      'bg-tooltip': '#000000',
      'bg-grid-header': '#fbfbfb',
      'bg-header': '#f6f7f9',
      'bg-top-header': '#ffffff',
      'bg-left-nav': '#fcfcfc',
      'bg-breadcrumb-bar': '#fdfdfd',
      'bg-grid-default': '#ffffff',
      'bg-grid-border-light': '#e5e7eb',
      'bg-map-cluster': '#183867',
      'bg-card': '#ffffff',
      'bg-map-node': '#1b365e',
      'bg-active-selection': '#e4ecf2',
      'bg-hover-1': '#0072a3',
      'bg-hover-2': '#edf0f3',
      'bg-hover-3': '#0099e9',
      'bg-side-panel': '#fefefe',
      'status-success': '#3c8500',
      'status-error': '#c81e1e',
      'status-warning': '#e3a008',
      'status-info': '#1d8ee6',

      'chart-splitline': commonColors['df-gray']['600'],
      'chart-axislabel': commonColors['df-gray']['100'],
      'brand-error': '#f56682',

      ...commonColors,
    },
  },
  darkVariables: {
    DEFAULT: {
      'brand-blue': '#2742e7',
      'brand-magenta': '#e640a2',
      'brand-purple': '#753ee5',
      'text-text-and-icon': '#b2c0c9',
      'text-input-value': '#eeeeee',
      'text-text-inverse': '#000000',
      'text-link': '#0ca7ff',
      'accent-accent': '#489cff',
      'bg-page': '#020617',
      'bg-grid-border': '#2c375f',
      'bg-tooltip': '#233c7d',
      'bg-grid-header': '#0f1e34',
      'bg-header': '#11223b',
      'bg-top-header': '#0c1a33',
      'bg-left-nav': '#0b121e',
      'bg-breadcrumb-bar': '#11223b',
      'bg-grid-default': '#0c182a',
      'bg-grid-border-light': '#1c243f',
      'bg-map-cluster': '#183867',
      'bg-card': '#16253b',
      'bg-map-node': '#1b365e',
      'bg-active-selection': '#183867',
      'bg-hover-1': '#3777c2',
      'bg-hover-2': '#0e1f33',
      'bg-hover-3': '#0140e3',
      'bg-side-panel': '#192c49',
      'status-success': '#15b77e',
      'status-error': '#f56682',
      'status-warning': '#ff9c32',
      'status-info': '#1d8ee6',

      'chart-splitline': commonColors['df-gray']['400'],
      'chart-axislabel': commonColors['df-gray']['900'],
      'brand-error': '#f56682',

      ...commonColors,
    },
  },
};

const preset = {
  darkMode: 'class',
  plugins: [TailwindcssVariables({ colorVariables: true })],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Nunito Sans',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        body: [
          'Nunito Sans',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      fontSize: {
        h1: [
          '30px',
          {
            lineHeight: '36px',
            fontWeight: '600',
          },
        ],
        h2: [
          '22px',
          {
            lineHeight: '30px',
            fontWeight: '600',
          },
        ],
        h3: [
          '18px',
          {
            lineHeight: '24px',
            fontWeight: '600',
          },
        ],
        h4: [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: '400',
          },
        ],
        h5: [
          '14px',
          {
            lineHeight: '24px',
            fontWeight: '700',
          },
        ],
        h6: [
          '14px',
          {
            lineHeight: '24px',
            fontWeight: '600',
          },
        ],
        p1: [
          '14px',
          {
            lineHeight: '24px',
            fontWeight: '400',
          },
        ],
        p2: [
          '14px',
          {
            lineHeight: '24px',
            fontWeight: '400',
          },
        ],
        p3: [
          '13px',
          {
            lineHeight: '18px',
            fontWeight: '700',
          },
        ],
        p4: [
          '13px',
          {
            lineHeight: '18px',
            fontWeight: '400',
          },
        ],
        p5: [
          '13px',
          {
            lineHeight: '18px',
            fontWeight: '400',
          },
        ],
        p6: [
          '12px',
          {
            lineHeight: '18px',
            fontWeight: '600',
          },
        ],
        p7: [
          '12px',
          {
            lineHeight: '18px',
            fontWeight: '400',
          },
        ],
        p8: [
          '11px',
          {
            lineHeight: '16px',
            fontWeight: '400',
          },
        ],
        p9: [
          '10px',
          {
            lineHeight: '13px',
            fontWeight: '400',
          },
        ],
        t1: [
          '12px',
          {
            lineHeight: '16px',
            fontWeight: '800',
            letterSpacing: '0.1em',
          },
        ],
        t2: [
          '12px',
          {
            lineHeight: '16px',
            fontWeight: '700',
            letterSpacing: '0.1em',
          },
        ],
        t3: [
          '11px',
          {
            lineHeight: '16px',
            fontWeight: '800',
            letterSpacing: '0.1em',
          },
        ],
        t4: [
          '11px',
          {
            lineHeight: '16px',
            fontWeight: '600',
            letterSpacing: '0.05em',
          },
        ],
        t5: [
          '10px',
          {
            lineHeight: '16px',
            fontWeight: '600',
            letterSpacing: '0.05em',
          },
        ],
      },
      colors: {
        transparent: 'transparent',
        white: '#ffffff',
        black: '#000000',
        'brand-light': {
          blue: colorVariable('var(--brand-blue)'),
          magenta: colorVariable('var(--brand-magenta)'),
          purple: colorVariable('var(--brand-purple)'),
        },
        'brand-dark': {
          blue: colorVariable('var(--brand-blue)'),
          magenta: colorVariable('var(--brand-magenta)'),
          purple: colorVariable('var(--brand-purple)'),
        },
        text: {
          'text-and-icon': colorVariable('var(--text-text-and-icon)'),
          'input-value': colorVariable('var(--text-input-value)'),
          'text-inverse': colorVariable('var(--text-text-inverse)'),
          link: colorVariable('var(--text-link)'),
        },
        accent: {
          accent: colorVariable('var(--accent-accent)'),
        },
        bg: {
          page: colorVariable('var(--bg-page)'),
          'grid-border': colorVariable('var(--bg-grid-border)'),
          tooltip: colorVariable('var(--bg-tooltip)'),
          'grid-header': colorVariable('var(--bg-grid-header)'),
          header: colorVariable('var(--bg-header)'),
          'top-header': colorVariable('var(--bg-top-header)'),
          'left-nav': colorVariable('var(--bg-left-nav)'),
          'breadcrumb-bar': colorVariable('var(--bg-breadcrumb-bar)'),
          'grid-default': colorVariable('var(--bg-grid-default)'),
          'grid-border-light': colorVariable('var(--bg-grid-border-light)'),
          'map-cluster': colorVariable('var(--bg-map-cluster)'),
          card: colorVariable('var(--bg-card)'),
          'map-node': colorVariable('var(--bg-map-node)'),
          'active-selection': colorVariable('var(--bg-active-selection)'),
          'hover-1': colorVariable('var(--bg-hover-1)'),
          'hover-2': colorVariable('var(--bg-hover-2)'),
          'hover-3': colorVariable('var(--bg-hover-3)'),
          'side-panel': colorVariable('var(--bg-side-panel)'),
        },
        status: {
          success: colorVariable('var(--status-success)'),
          error: colorVariable('var(--status-error)'),
          warning: colorVariable('var(--status-warning)'),
          info: colorVariable('var(--status-info)'),
        },
        clarity: {
          border: colorVariable('var(--clarity-border)'),
          'page-bg': colorVariable('var(--clarity-page-bg)'),
          'component-bg': colorVariable('var(--clarity-component-bg)'),
          'active-bg': colorVariable('var(--clarity-active-bg)'),
          action: colorVariable('var(--clarity-action)'),
        },
        chart: {
          pink1: colorVariable('var(--chart-pink1)'),
          pink2: colorVariable('var(--chart-pink2)'),
          pink3: colorVariable('var(--chart-pink3)'),
          red: colorVariable('var(--chart-red)'),
          orange: colorVariable('var(--chart-orange)'),
          yellow1: colorVariable('var(--chart-yellow1)'),
          yellow2: colorVariable('var(--chart-yellow2)'),
          lime: colorVariable('var(--chart-lime)'),
          green: colorVariable('var(--chart-green)'),
          blue1: colorVariable('var(--chart-blue1)'),
          blue2: colorVariable('var(--chart-blue2)'),
          blue3: colorVariable('var(--chart-blue3)'),
          purple1: colorVariable('var(--chart-purple1)'),
          purple2: colorVariable('var(--chart-purple2)'),
        },
        'df-gray': {
          100: colorVariable('var(--df-gray-100)'),
          200: colorVariable('var(--df-gray-200)'),
          300: colorVariable('var(--df-gray-300)'),
          400: colorVariable('var(--df-gray-400)'),
          500: colorVariable('var(--df-gray-500)'),
          600: colorVariable('var(--df-gray-600)'),
          700: colorVariable('var(--df-gray-700)'),
          800: colorVariable('var(--df-gray-800)'),
          900: colorVariable('var(--df-gray-900)'),
        },
        gray: {
          50: colorVariable('var(--gray-50)'),
          100: colorVariable('var(--gray-100)'),
          200: colorVariable('var(--gray-200)'),
          300: colorVariable('var(--gray-300)'),
          400: colorVariable('var(--gray-400)'),
          500: colorVariable('var(--gray-500)'),
          600: colorVariable('var(--gray-600)'),
          700: colorVariable('var(--gray-700)'),
          800: colorVariable('var(--gray-800)'),
          900: colorVariable('var(--gray-900)'),
        },
        red: {
          50: colorVariable('var(--red-50)'),
          100: colorVariable('var(--red-100)'),
          200: colorVariable('var(--red-200)'),
          300: colorVariable('var(--red-300)'),
          400: colorVariable('var(--red-400)'),
          500: colorVariable('var(--red-500)'),
          600: colorVariable('var(--red-600)'),
          700: colorVariable('var(--red-700)'),
          800: colorVariable('var(--red-800)'),
          900: colorVariable('var(--red-900)'),
        },
        orange: {
          50: colorVariable('var(--orange-50)'),
          100: colorVariable('var(--orange-100)'),
          200: colorVariable('var(--orange-200)'),
          300: colorVariable('var(--orange-300)'),
          400: colorVariable('var(--orange-400)'),
          500: colorVariable('var(--orange-500)'),
          600: colorVariable('var(--orange-600)'),
          700: colorVariable('var(--orange-700)'),
          800: colorVariable('var(--orange-800)'),
          900: colorVariable('var(--orange-900)'),
        },
        yellow: {
          50: colorVariable('var(--yellow-50)'),
          100: colorVariable('var(--yellow-100)'),
          200: colorVariable('var(--yellow-200)'),
          300: colorVariable('var(--yellow-300)'),
          400: colorVariable('var(--yellow-400)'),
          500: colorVariable('var(--yellow-500)'),
          600: colorVariable('var(--yellow-600)'),
          700: colorVariable('var(--yellow-700)'),
          800: colorVariable('var(--yellow-800)'),
          900: colorVariable('var(--yellow-900)'),
        },
        green: {
          50: colorVariable('var(--green-50)'),
          100: colorVariable('var(--green-100)'),
          200: colorVariable('var(--green-200)'),
          300: colorVariable('var(--green-300)'),
          400: colorVariable('var(--green-400)'),
          500: colorVariable('var(--green-500)'),
          600: colorVariable('var(--green-600)'),
          700: colorVariable('var(--green-700)'),
          800: colorVariable('var(--green-800)'),
          900: colorVariable('var(--green-900)'),
        },
        teal: {
          50: colorVariable('var(--teal-50)'),
          100: colorVariable('var(--teal-100)'),
          200: colorVariable('var(--teal-200)'),
          300: colorVariable('var(--teal-300)'),
          400: colorVariable('var(--teal-400)'),
          500: colorVariable('var(--teal-500)'),
          600: colorVariable('var(--teal-600)'),
          700: colorVariable('var(--teal-700)'),
          800: colorVariable('var(--teal-800)'),
          900: colorVariable('var(--teal-900)'),
        },
        blue: {
          50: colorVariable('var(--blue-50)'),
          100: colorVariable('var(--blue-100)'),
          200: colorVariable('var(--blue-200)'),
          300: colorVariable('var(--blue-300)'),
          400: colorVariable('var(--blue-400)'),
          500: colorVariable('var(--blue-500)'),
          600: colorVariable('var(--blue-600)'),
          700: colorVariable('var(--blue-700)'),
          800: colorVariable('var(--blue-800)'),
          900: colorVariable('var(--blue-900)'),
        },
        indigo: {
          50: colorVariable('var(--indigo-50)'),
          100: colorVariable('var(--indigo-100)'),
          200: colorVariable('var(--indigo-200)'),
          300: colorVariable('var(--indigo-300)'),
          400: colorVariable('var(--indigo-400)'),
          500: colorVariable('var(--indigo-500)'),
          600: colorVariable('var(--indigo-600)'),
          700: colorVariable('var(--indigo-700)'),
          800: colorVariable('var(--indigo-800)'),
          900: colorVariable('var(--indigo-900)'),
        },
        purple: {
          50: colorVariable('var(--purple-50)'),
          100: colorVariable('var(--purple-100)'),
          200: colorVariable('var(--purple-200)'),
          300: colorVariable('var(--purple-300)'),
          400: colorVariable('var(--purple-400)'),
          500: colorVariable('var(--purple-500)'),
          600: colorVariable('var(--purple-600)'),
          700: colorVariable('var(--purple-700)'),
          800: colorVariable('var(--purple-800)'),
          900: colorVariable('var(--purple-900)'),
        },
        pink: {
          50: colorVariable('var(--pink-50)'),
          100: colorVariable('var(--pink-100)'),
          200: colorVariable('var(--pink-200)'),
          300: colorVariable('var(--pink-300)'),
          400: colorVariable('var(--pink-400)'),
          500: colorVariable('var(--pink-500)'),
          600: colorVariable('var(--pink-600)'),
          700: colorVariable('var(--pink-700)'),
          800: colorVariable('var(--pink-800)'),
          900: colorVariable('var(--pink-900)'),
        },
      },
      keyframes: {
        // tooltip
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-right-fade': {
          '0%': { opacity: '0', transform: 'translateX(-2px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: '0', transform: 'translateY(-2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-left-fade': {
          '0%': { opacity: '0', transform: 'translateX(2px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        // dropdown menu & select
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-right-in': {
          '100%': { right: '0' },
        },
        'slide-right-out': {
          '0%': { right: '0' },
        },
        'slide-left-in': {
          '100%': { left: '0' },
        },
        'slide-left-out': {
          '0%': { left: '0' },
        },
        'opacity-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'opacity-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'modal-slide-in': {
          '0%': { opacity: '1', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pop-out': {
          '100%': { opacity: '1', transform: 'scale(1)' },
          '0%': { opacity: '0', transform: 'scale(0.96)' },
        },
        'accordion-slide-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-slide-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        // tooltip
        'slide-up-fade': 'slide-up-fade 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right-fade': 'slide-right-fade 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade': 'slide-down-fade 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left-fade': 'slide-left-fade 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        // dropdown menu & select
        'scale-in': 'scale-in 0.2s ease-in-out',
        'slide-down': 'slide-down 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        // modal
        'pop-in': 'pop-in 250ms ease',
        'pop-out': 'pop-out 250ms ease',
        'slide-right-in': 'slide-right-in 250ms forwards cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right-out': 'slide-right-out 250ms forwards cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left-in': 'slide-left-in 250ms forwards cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left-out': 'slide-left-out 250ms forwards cubic-bezier(0.16, 1, 0.3, 1)',
        'opacity-out': 'opacity-out 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        'opacity-in': 'opacity-in 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        'modal-slide-in': 'modal-slide-in 300ms cubic-bezier(0.5, 1, 0.5, 1)',
        'accordion-open': 'accordion-slide-down 100ms cubic-bezier(0.16, 1, 0.3, 1)',
        'accordion-closed': 'accordion-slide-up 100ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
    ...colors,
  },
} satisfies Partial<Config>;

export { colors, preset };
