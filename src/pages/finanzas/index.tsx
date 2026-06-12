import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FinanzasPage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/finanzas/cuentas', { replace: true })
  }, [navigate])

  return null
}
