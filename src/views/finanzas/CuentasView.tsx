import { Button, Form, Input, Modal, Space, Table, Tag, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type Cuenta from '@/models/api/entities/Cuenta'
import { finanzasService } from '@/services/api'
import { queryKeys } from '@/lib/queryClient'

export default function CuentasView() {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const queryClient = useQueryClient()

  const { data = [], isLoading } = useQuery({
    queryKey: queryKeys.finanzasCuentas,
    queryFn: () => finanzasService.getCuentas(),
  })

  const crearCuentaMutation = useMutation({
    mutationFn: (payload: Pick<Cuenta, 'nombre' | 'numeroCuenta'>) =>
      finanzasService.crearCuenta(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.finanzasCuentas })
      message.success('Cuenta creada correctamente')
      setOpen(false)
      form.resetFields()
    },
  })

  const handleCreate = async () => {
    const values = await form.validateFields()
    await crearCuentaMutation.mutateAsync({
      nombre: values.nombre,
      numeroCuenta: values.numeroCuenta,
    })
  }

  const columns: ColumnsType<Cuenta> = [
    { title: 'ID', dataIndex: 'id', key: 'id', align: 'center' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre', align: 'center' },
    {
      title: 'Número de cuenta',
      dataIndex: 'numeroCuenta',
      key: 'numeroCuenta',
      align: 'center',
    },
    {
      title: 'Saldo',
      dataIndex: 'saldo',
      key: 'saldo',
      align: 'center',
      render: (value: number) => `$${value.toFixed(2)}`,
    },
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
    <div>
      <div className="mb-4 flex justify-end">
        <Button type="primary" onClick={() => setOpen(true)}>
          Crear cuenta
        </Button>
      </div>

      <Table<Cuenta>
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="id"
        pagination={{ pageSize: 10, position: ['bottomCenter'] }}
      />

      <Modal
        title="Crear cuenta bancaria"
        open={open}
        onOk={handleCreate}
        onCancel={() => setOpen(false)}
        okText="Guardar"
        cancelText="Cancelar"
        confirmLoading={crearCuentaMutation.isPending}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nombre"
            label="Nombre"
            rules={[{ required: true, message: 'Ingresa el nombre de la cuenta' }]}
          >
            <Input placeholder="Cuenta principal" />
          </Form.Item>

          <Form.Item
            name="numeroCuenta"
            label="Número de cuenta"
            rules={[{ required: true, message: 'Ingresa el número de cuenta' }]}
          >
            <Input placeholder="00015319-001" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
