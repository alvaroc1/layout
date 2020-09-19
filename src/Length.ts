type Length = number | 'fill' | /*'content' |*/ Fill /*| Min | Max*/

type Fill = {
  fillValue: number
}

type Min = {
  minSize: number,
  length: Length
}

type Max = {
  minSize: number,
  length: Length
}

namespace Length {
  export const fill = (n: number): Length => ({fillValue: n})
  export const min = (minSize: number, length: Length) => ({minSize, length})
  export const max = (maxSize: number, length: Length) => ({maxSize, length})
}

export default Length
