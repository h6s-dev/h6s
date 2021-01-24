import { css } from '@emotion/react'
import React from 'react'

export function Logo() {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      `}
    >
      <img
        css={css`
          display: inline-block;
          margin-right: 8px;
          height: 36px;
        `}
        src="https://raw.githubusercontent.com/veccu/react-calendar/main/docs/static/favicon/android-icon-192x192.png"
        alt="react-calendar Logo"
      />
      <span
        css={css`
          font-weight: bolder;
        `}
      >
        React Calendar
      </span>
    </div>
  )
}
