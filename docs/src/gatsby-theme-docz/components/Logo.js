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
        src="/icon/logo.png"
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
