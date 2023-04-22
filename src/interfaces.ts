export type Transaction = {
  id: number,
  name: string,
  category?: string,
  amount: number,
  date: string
}

export interface TransactionsByDate {
  date: string,
  transactions: Transaction[]
}

export type Category = {
  label: string
  amount: number
}
