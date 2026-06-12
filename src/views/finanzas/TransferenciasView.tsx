import { Button, Card, Form, Input, InputNumber, Select, message } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type Transferencia from '@/models/api/entities/Transferencia'
import { finanzasService } from '@/services/api'
import { queryKeys } from '@/lib/queryClient'

export default function TransferenciasView() {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()

  const { data: cuentas = [], isLoading } = useQuery({
    queryKey: queryKeys.finanzasCuentas,
    queryFn: () => finanzasService.getCuentas(),
  })

  const transferenciaMutation = useMutation({
    mutationFn: (payload: Transferencia) => finanzasService.transferir(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.finanzasCuentas }),
        queryClient.invalidateQueries({ queryKey: queryKeys.finanzasMovimientos }),
      ])
      message.success('Transferencia realizada correctamente')
      form.resetFields()
    },
  })

  const handleTransferir = async () => {
    const values = await form.validateFields()
    await transferenciaMutation.mutateAsync({
      cuentaOrigenId: values.cuentaOrigenId,
      cuentaDestinoId: values.cuentaDestinoId,
      monto: values.monto,
      descripcion: values.descripcion,
    })
  }

  const cuentaOptions = cuentas.map((cuenta) => ({
    label: `${cuenta.nombre} - ${cuenta.numeroCuenta} - $${cuenta.saldo.toFixed(2)}`,
    value: Number(cuenta.id),
  }))

  return (
    <Card title="Realizar transferencia" className="max-w-2xl">
      <Form form={form} layout="vertical">
        <Form.Item
          name="cuentaOrigenId"
          label="Cuenta origen"
          rules={[{ required: true, message: 'Selecciona la cuenta origen' }]}
        >
          <Select
            loading={isLoading}
            options={cuentaOptions}
            placeholder="Selecciona una cuenta"
          />
        </Form.Item>

        <Form.Item
          name="cuentaDestinoId"
          label="ID cuenta destino"
          rules={[{ required: true, message: 'Ingresa la cuenta destino' }]}
        >
          <InputNumber className="w-full!" min={1} placeholder="Ejemplo: 2" />
        </Form.Item>

        <Form.Item
          name="monto"
          label="Monto"
          rules={[{ required: true, message: 'Ingresa el monto' }]}
        >
          <InputNumber className="w-full!" min={1} precision={2} prefix="$" />
        </Form.Item>

        <Form.Item name="descripcion" label="Descripción">
          <Input placeholder="Transferencia de prueba" />
        </Form.Item>

        <Button
          type="primary"
          loading={transferenciaMutation.isPending}
          onClick={handleTransferir}
        >
          Transferir
        </Button>
      </Form>
    </Card>
  )
}
