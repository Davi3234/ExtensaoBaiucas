export enum PaymentMethod {
  CARD = 'C',
  CASH = 'D',
  PIX = 'P'
}

export enum DescriptionPayment{
  C = 'Cartão',
  D = 'Dinheiro',
  P = 'Pix'
}
export function getPaymentDescription(method?: string): string {
  return DescriptionPayment[method as keyof typeof DescriptionPayment] || 'Desconhecido';
}
