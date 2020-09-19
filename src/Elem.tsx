import React from 'react'
import InternalElem, { InternalElemProps } from './internal/InternalElem'

type Props = Omit<InternalElemProps, "type"> 

const Elem = React.forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => 
  <InternalElem type='el' {...props} ref={ref}/>
)

Elem.displayName = 'Elem'

export default Elem
