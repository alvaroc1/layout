import React from 'react'
import InternalElem, { InternalElemProps } from './internal/InternalElem'

export interface ColumnProps extends Omit<InternalElemProps, "type"> {}

const Column = React.forwardRef((props: ColumnProps, ref: React.Ref<HTMLDivElement>) => {
  const { children, ...rest } = props
  return (
    <InternalElem type='column' {...rest} ref={ref}>{children}</InternalElem>
  )
})

Column.displayName = 'Column'

export default Column