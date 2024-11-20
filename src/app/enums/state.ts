export enum State {
  PREPARING = 'EP',
  COMPLETED  = 'CO',
  IN_DELIVERY = 'EE',
  CANCELED  = 'CA'
}

export enum DescriptionState{
  EP = 'Em Preparo',
  CO  = 'Finalizado',
  EE = 'Em Entrega',
  CA  = 'Cancelado'
}

export function getStateDescription(method?: string){
  return DescriptionState[method as keyof typeof DescriptionState] || 'Desconhecido';
}
