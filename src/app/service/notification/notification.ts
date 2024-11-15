export interface Notification {
  id: number
  title?: string
  message: string
  type: "SUCCESS" | "ERROR" | "WARNING" | "INFO"
}
