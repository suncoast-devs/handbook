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

  return (
    <div style={{ display: 'flex', flex: 1 }}>
      {other.length > 0 && <div style={{ width: '50%' }}>{other}</div>}
      <div
        className="codepen-later"
        data-prefill
        data-height="500"
        data-editable
        data-default-tab="html,css,result"
      >
        {codePenData}
      </div>
    </div>
  )
}

export default CodePen
