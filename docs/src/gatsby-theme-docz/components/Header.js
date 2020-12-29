import { css } from '@emotion/react'
import React from 'react'

import { config } from '../../../config'

export function Header() {
  return (
    <nav
      css={css`
        width: 100%;
        height: 60px;
        border-bottom: 1px #e5e8eb solid;
        background-color: #fff;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          padding: 6px 30px;
          height: 100%;
          box-sizing: border-box;
        `}
      >
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
            `}
            src="/icon/logo.png"
            alt="react-calendar-logo"
            height="36px"
          />
          <img src="/icon/title.png" alt="react-calendar-title" height="24px" />
        </div>

        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
          `}
        >
          <a href={config.repoUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </nav>
  )
}
