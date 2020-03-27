import React from 'react'

const CodePen = props => {
  const codePenData = props.children.filter
    ? props.children.filter(child => child.props.mdxType === 'pre')
    : props.children
  const other = props.children.filter ? (
    props.children.filter(child => child.props.mdxType !== 'pre')
  ) : (
    <></>
  )

  const parentStyle = other.length > 0 ? { display: 'flex' } : {}

  return (
    <div style={parentStyle}>
      {other.length > 0 && <div style={{ width: '50%' }}>{other}</div>}
      <div
        className="codepen-later"
        data-prefill
        data-height="500"
        data-editable
        data-default-tab={props.defaultTab || 'html,result'}
      >
        {codePenData}
      </div>
    </div>
  )
}

export default CodePen
