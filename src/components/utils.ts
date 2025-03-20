export function format(s: number): string {
  if (s === 0) return '0,00 B'

  const base: number = 1024
  const unit: string[] = ['B', 'KB', 'MB', 'GB', 'TB']

  // Calculate how often base number fits into given file size
  let x: number = Math.floor(Math.log(s) / Math.log(base))

  // If we deal with petabyte sizes or larger, clamp x to terabyte size format
  x = x > 4 ? 4 : x

  return (s / Math.pow(base, x)).toFixed(2).replace('.', ',') + ' ' + unit[x]
}

export function uuid (noDash: boolean): string {
  const uuid: string = crypto.randomUUID();

  return noDash ? uuid.replace(/-/g, "") : uuid;
}
