import React, { useState } from "react"
import { Canvas } from "@layerhub-io/react"
import Playback from "../Playback"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { Button } from "baseui/button"

/**
 * 设计编辑器的主画布组件
 * 负责渲染编辑器的主要工作区域，包含2D/3D切换功能
 */
export default function () {
  const { displayPlayback } = useDesignEditorContext()
  const [is3D, setIs3D] = useState(false)

  return (
    <div style={{ flex: 1, display: "flex", position: "relative" }}>
      {displayPlayback && <Playback />}
      
      {/* 2D/3D切换按钮 */}
      <div style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000
      }}>
        <Button
          onClick={() => setIs3D(!is3D)}
          size="compact"
          overrides={{
            Root: {
              style: {
                backgroundColor: "#4f4f4f",
                color: "#ffffff"
              }
            }
          }}
        >
          {is3D ? "2D" : "3D"}
        </Button>
      </div>

      {/* 渲染区域 */}
      {is3D ? (
        <div style={{ flex: 1, background: "#ffffff" }}>
          {/* Three.js渲染区域将在这里实现 */}
          <div style={{ flex: 1, height: "100%", width: "98%", background: "rgba(114, 118, 139, .08）", margin: "10px" }}>3D View (待实现)</div>
        </div>
      ) : (
        <Canvas
          config={{
            background: "#f1f2f6",
            controlsPosition: {
              rotation: "TOP",
            },
            shadow: {
              blur: 4,
              color: "#fcfcfc",
              offsetX: 0,
              offsetY: 0,
            },
          }}
        />
      )}
    </div>
  )
}
