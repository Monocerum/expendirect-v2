import { useEffect } from 'react'
import { applyTheme } from '@/theme/applyTheme'

export function useApplyTheme({ theme, custom }) {
  useEffect(() => applyTheme(theme, custom), [theme, custom])
}