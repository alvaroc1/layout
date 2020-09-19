import React from 'react'
import Column from './Column'
import Row from './Row'
import Elem from './Elem'
import InternalElem, { InternalElemProps } from './internal/InternalElem'

interface Props extends Omit<InternalElemProps, "type"> {}

const LayoutC = React.forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { children, ...rest } = props
  return (
    <InternalElem type='layout' {...rest} ref={ref}>{children}</InternalElem>
  )
})

LayoutC.displayName = 'Layout'

const Layout = {
  el: Elem,
  row: Row,
  column: Column,
  layout: LayoutC
}

export default Layout
  