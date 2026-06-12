import { Table, Tag } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type Movimiento from '@/models/api/entities/Movimiento'
import { finanzasService } from '@/services/api'
import { queryKeys } from '@/lib/queryClient'

export default function MovimientosView() {
  const [params, setParams] = useState({ page: 0, size: 10 })

  const { data, isLoading } = useQuery({
    queryKey: [...queryKeys.finanzasMovimientos, params],
    queryFn: () => finanzasService.getMovimientos(params.page, params.size),
  })

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setParams({
      page: (pagination.current ?? 1) - 1,
      size: pagination.pageSize ?? 10,
    })
  }

  const columns: ColumnsType<Movimiento> = [
    { title: 'ID', dataIndex: 'id', key: 'id', align: 'center' },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      align: 'center',
      render: (value: string) => dayjs(value).format('DD/MM/YYYY HH:mm'),
    },
    { title: 'Cuenta', dataIndex: 'cuenta', key: 'cuenta', align: 'center' },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
      align: 'center',
      render: (value: string) => (
        <Tag color={value === 'INGRESO' ? 'green' : 'red'}>{value}</Tag>
      ),
    },
    {
      title: 'Monto',
      dataIndex: 'monto',
      key: 'monto',
      align: 'center',
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      align: 'center',
    },
    {
      title: 'Categoría',
      dataIndex: 'categoria',
      key: 'categoria',
      align: 'center',
      render: (value?: string | null) => value ?? 'Sin categoría',
    },
  ]

  return (
    <Table<Movimiento>
      columns={columns}
      dataSource={data?.data}
      loading={isLoading}
      rowKey="id"
      pagination={{
        current: (data?.pagination.page ?? 0) + 1,
        pageSize: data?.pagination.pageSize ?? params.size,
        total: data?.pagination.total ?? 0,
        showSizeChanger: true,
        position: ['bottomCenter'],
      }}
      onChange={handleTableChange}
    />
  )
}
