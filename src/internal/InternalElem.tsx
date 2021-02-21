import React from 'react'

import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import Length from '../Length'
import classNames from 'classnames'

type PassThruElementProps = Pick<React.HTMLAttributes<HTMLDivElement>, 'onClick'|'onMouseOver'|'onMouseOut'>
type PassThruCssProps = Pick<React.CSSProperties, 'background'|'fontWeight'|'color'|'outline'|'transform'|'transformOrigin'>

export interface InternalElemProps extends PassThruCssProps, PassThruElementProps {
  type: 'layout' | 'el' | 'column' | 'row',
  alignBottom?: boolean,
  centerX?: boolean,
  centerY?: boolean,
  children: React.ReactNode,
  fillPortion?: number,
  fontSize?: number,
  fontFamily?: string,
  height?: Length,
  padding?: number | [number,number] | [number,number,number,number],
  scrollbarY?: boolean,
  scrollbarX?: boolean,
  scrollbars?: boolean,
  spacing?: number,
  width?: Length,
}


const shrinkStyles = ({
  flexShrink: 1
})

// asChild and asContainer are typically applied to the same root element
// except when an element is made up of 2 divs: an outer and an inner for layout purposes
export const elemStyles = createStyles({
  asChild: (props: InternalElemProps) => ({
    boxSizing: 'border-box',
    transform: props.transform,
    transformOrigin: props.transformOrigin,
    flexShrink: 0,

    // width
    ...props.width ?
      props.width === 'fill' ? 
        {width: '100%'} :
      typeof props.width === 'object' ? 
        {flexGrow: 100000 * props.width.fillValue} : 
        {width: props.width} :
      {},

    // height
    ...props.height ?
      props.height === 'fill' ? 
        {height: '100%'} :
      typeof props.height === 'object' ? 
        {flexGrow: 100000 * props.height.fillValue} : 
        {height: props.height} :
      {},

    // background
    ...props.background ? {background: props.background} : {},

    // outline
    ...props.outline ? {outline: props.outline} : {},

    // centerX (requires wrapper)
    ...props.centerX ? {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      alignSelf: 'center'
    } : {},

    // alignBottom (requires wrapper)
    ...props.alignBottom ? {
      display: 'flex',
      flex: 1,
      flexBasis: 'auto',
      alignSelf: 'stretch', 
      width: '100%',
      textDecoration: 'none',
      whiteSpace: 'pre',
      flexShrink: 0,
      position: 'relative',
    } : {},

    // fillPortion
    ...props.fillPortion ?
      {flexGrow: 100000 * props.fillPortion} :
      {}
  }),
  asContainer: (props: InternalElemProps) => {
    // axis-aware css props
    const [marginMainPre, marginMainPost] = 
      props.type === 'row' ? 
        (['marginLeft', 'marginRight'] /* as const*/):
        (['marginTop', 'marginBottom'] /* as const*/)

    return ({
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: props.type === 'row' ? 'row' : 'column',
      alignItems: props.type === 'row' ? 'center' : 'flex-start',
      overflow: 'hidden',

      // font
      ...props.fontSize ? {fontSize: props.fontSize} : {},
      ...props.fontFamily ? {fontFamily: props.fontFamily} : {},
      ...props.fontWeight ? {fontWeight: props.fontWeight} : {},
      ...props.color ? {color: props.color} : {},

      // padding
      ...props.padding ? 
        typeof props.padding === 'number' ? ({padding: props.padding}) :
        {padding: props.padding.map(v => `${v}px`).join(" ")} :
        {},

      // spacing
      ...props.spacing ? {
        '& > *': {[marginMainPost]: props.spacing},
        '& > *:last-child': {marginBottom: 0}
      } : {},

      // scrollbars
      ...props.scrollbars ? ({overflow: 'auto', ...shrinkStyles}) : ({}),
      ...props.scrollbarX ? ({overflowX: 'auto', ...shrinkStyles}) : ({}),
      ...props.scrollbarY ? ({overflowY: 'auto', ...shrinkStyles}) : ({}),
    })
  },
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  rootRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rootColumn: {
    flexDirection: 'column'
  },
})

interface Props extends InternalElemProps, WithStyles<typeof elemStyles> {}

const InternalElem = withStyles(elemStyles)(React.forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {

  const centerYStyles: React.CSSProperties =
    props.centerY ? ({marginTop: 'auto', marginBottom: 'auto'}) : ({})

  const alignStyles: React.CSSProperties =
    props.alignBottom ?
      ({marginTop: 'auto'}) :
      ({})

  const styles = {
    ...centerYStyles,
    ...alignStyles,
  }

  const asChildProps: React.HTMLAttributes<HTMLDivElement> & {ref?: React.Ref<HTMLDivElement>} = {
    className: props.classes.asChild,
    onClick: props.onClick,
    ref: ref
  }

  const asContainerProps: React.HTMLAttributes<HTMLDivElement> = {
    className: props.classes.asContainer
  }

  // whether to use a wrapper
  return props.centerX || props.alignBottom ? 
      <div style={styles} {...asChildProps}>
        <div {...asContainerProps}>{props.children}</div>
      </div> :
    <div style={styles} {...asChildProps} {...asContainerProps} className={classNames(props.classes.asContainer, props.classes.asChild)}>{props.children}</div>
}))

InternalElem.displayName = 'InternalElem'


export default InternalElem
