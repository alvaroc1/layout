import React from 'react'
import InternalElem, { InternalElemProps } from './internal/InternalElem'

export interface RowProps extends Omit<InternalElemProps, "type"> {
}

const Row = React.forwardRef((props: RowProps, ref: React.Ref<HTMLDivElement>) => {
  const { children, ...rest } = props
  return (
    <InternalElem type='row' {...rest} ref={ref}>{children}</InternalElem>
  )
})
Row.displayName = 'Row'

export default Row
