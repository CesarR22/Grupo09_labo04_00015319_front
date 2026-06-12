import { Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useQuery } from '@tanstack/react-query'
import type CategoriaFinanciera from '@/models/api/entities/CategoriaFinanciera'
import { finanzasService } from '@/services/api'
import { queryKeys } from '@/lib/queryClient'

export default function CategoriasView() {
  const { data = [], isLoading } = useQuery({
    queryKey: queryKeys.finanzasCategorias,
    queryFn: () => finanzasService.getCategorias(),
  })

  const columns: ColumnsType<CategoriaFinanciera> = [
    { title: 'ID', dataIndex: 'id', key: 'id', align: 'center' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre', align: 'center' },
    {
      title: 'Estado',
      dataIndex: 'activa',
      key: 'activa',
      align: 'center',
      render: (value: boolean) => (
        <Tag color={value ? 'green' : 'red'}>
          {value ? 'Activa' : 'Inactiva'}
        </Tag>
      ),
    },
  ]

  return (
    <Table<CategoriaFinanciera>
      columns={columns}
      dataSource={data}
      loading={isLoading}
      rowKey="id"
      pagination={{ pageSize: 10, position: ['bottomCenter'] }}
    />
  )
}
