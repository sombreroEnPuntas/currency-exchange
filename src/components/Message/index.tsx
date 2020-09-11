import React from 'react'

interface Props {
  error?: boolean
  message: string
}
const Message = ({ error, message }: Props) => (
  <div className="terminal-prompt borderless-box">
    <span
      className={error ? 'terminal-alert-error' : ''}
      style={{
        whiteSpace: 'pre-wrap',
      }}
    >
      {message || ' '}
    </span>
  </div>
)

export default Message
