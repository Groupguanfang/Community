export function parseTime(timer?: string, gap: string = "-"): string {
  let date = new Date(parseInt(<string>timer))
  let time = date.getHours() + ":" + date.getMinutes()
  let dater = date.getFullYear() + gap + date.getMonth() + gap + date.getDate()
  return dater + " " + time
}
