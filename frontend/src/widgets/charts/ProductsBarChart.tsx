'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { CustomChartTooltip } from '@/widgets/charts/CustomChartTooltip'
import { useEffect, useState } from 'react'

type ChartItem = {
  type: string
  count: number
}

type Props = {
  data: ChartItem[]
}

export const ProductsBarChart = ({ data }: Props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted || !data || data.length === 0) return null

  return (
    <ResponsiveContainer width={240} height={120}>
      <BarChart data={data}>
        <XAxis
          dataKey="type"
          stroke="var(--color-text-secondary)"
          tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
        />

        <YAxis
          stroke="var(--color-text-secondary)"
          tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
        />

        <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />

        <Tooltip content={<CustomChartTooltip />} />

        <Bar dataKey="count" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
