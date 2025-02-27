import React from "react"
import { Block } from "baseui/block"
import { useStyletron } from "baseui"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"

function Feedback() {
  const [css] = useStyletron()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <Block>反馈</Block>

        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
      <Scrollable>
        <Block padding={"0 1.5rem"}>
          <div
            className={css({
              fontSize: "1rem",
              textAlign: "center",
              maxWidth: "400px",
              margin: "0 auto",
            })}
          >
            <h2>反馈</h2>
            <p>我们非常重视您的反馈意见。如果您有任何建议或问题，请随时告诉我们。</p>
          </div>
        </Block>
      </Scrollable>
    </Block>
  )
}

export default Feedback