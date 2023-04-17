export interface JsonData {
  count: number,
  data: MovementsByDate[]
}

type Movement = {
  name: string,
  category: string,
  amount: number,
}

interface MovementsByDate {
  date: string,
  movements: Movement[]
}
