import React, { useState } from "react"
import { Block } from "baseui/block"
import { Input } from "baseui/input"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import Scrollable from "~/components/Scrollable"

interface StrengthRange {
  description: string
  examples: string
  range: string
  color: string
  midValue: number
}

const strengthRanges: StrengthRange[] = [
  {
    description: "标本只能用地质锤端敲才能断裂",
    examples: "新鲜玄武岩、辉石、辉绿岩、片麻岩、花岗岩、石英岩",
    range: ">250",
    color: "#28a745",
    midValue: 275
  },
  {
    description: "标本需要地质锤多次击打才能断裂",
    examples: "角闪岩、砂岩、玄武岩、辉长岩、片麻岩、花岗闪长岩、石灰岩",
    range: "100-250",
    color: "#4834d4",
    midValue: 175
  },
  {
    description: "标本需要地质锤不止一次的击打才能断裂",
    examples: "石灰石、大理石、干软岩、砂岩、片岩、页岩、粉砂岩",
    range: "50-100",
    color: "#ffa502",
    midValue: 75
  },
  {
    description: "不能用小刀刮或刻划，标本可以用刀一击断裂",
    examples: "粘土、煤、片岩、页岩、粉砂岩",
    range: "25-50",
    color: "#ff7979",
    midValue: 37.5
  },
  {
    description: "用小刀很难刻开，用刀尖用力滑击，形成浅玉痕",
    examples: "白垩、岩盐",
    range: "5-25",
    color: "#ff7979",
    midValue: 15
  },
  {
    description: "在地质锤的尖头猛烈的打击下，碎块可以被刻到",
    examples: "高度风化或变质的岩石",
    range: "1-5",
    color: "#ffbe76",
    midValue: 3
  }
]

export default function () {
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [strengthValue, setStrengthValue] = useState<string>("")
  const [selectedRange, setSelectedRange] = useState<number | null>(null)
  const [selectedStrength, setSelectedStrength] = useState<string>("120")

  // 判断数值所属范围
  const determineRange = (value: number): number | null => {
    if (value > 250) return 0
    if (value >= 100 && value <= 250) return 1
    if (value >= 50 && value < 100) return 2
    if (value >= 25 && value < 50) return 3
    if (value >= 5 && value < 25) return 4
    if (value >= 1 && value < 5) return 5
    return null
  }

  // 处理强度值变化
  const handleStrengthChange = (value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setSelectedStrength(value)
      // 自动判断并高亮对应范围
      const rangeIndex = determineRange(numValue)
      setSelectedRange(rangeIndex)
    } else if (value === "") {
      setSelectedStrength(value)
      setSelectedRange(null)
    }
  }

  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* 标题栏 */}
      <Block $style={{
        display: "flex",
        alignItems: "center",
        fontWeight: 500,
        justifyContent: "space-between",
        padding: "1.4rem 1.5rem",
      }}>
        <Block $style={{
          fontSize: "18px",
          color: "#1a1a1a",
          borderBottom: "2px solid rgb(41, 49, 55)",
          paddingBottom: "7px",
          marginBottom: "0px",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <span style={{
            background: "rgb(41, 49, 55)",
            color: "white",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
          }}>2</span>
          <span style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}>岩石强度</span>
        </Block>
        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>

      <Scrollable>
        <div style={{ padding: "0.05rem 1.5rem" }}>
          {/* 强度范围表格 */}
          <Block $style={{
            marginBottom: "1.5rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            overflow: "hidden"
          }}>
            {strengthRanges.map((range, index) => (
              <Block 
                key={index} 
                onClick={() => {
                  setSelectedRange(index)
                  setSelectedStrength(range.midValue.toString())
                }}
                $style={{
                  padding: "1rem",
                  borderBottom: index < strengthRanges.length - 1 ? "1px solid #e9ecef" : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  cursor: "pointer",
                  backgroundColor: selectedRange === index ? `${range.color}15` : "transparent",
                  transition: "all 0.3s ease",
                  ':hover': {
                    backgroundColor: `${range.color}10`,
                    transform: "translateX(4px)"
                  }
                }}>
                <Block $style={{ flex: 1 }}>
                  <Block $style={{
                    fontSize: "14px",
                    color: selectedRange === index ? range.color : "#1a1a1a",
                    marginBottom: "0.5rem",
                    transition: "color 0.3s ease",
                    fontWeight: selectedRange === index ? "500" : "normal"
                  }}>{range.description}</Block>
                  <Block $style={{
                    fontSize: "13px",
                    color: selectedRange === index ? range.color : "#666",
                    transition: "color 0.3s ease"
                  }}>{range.examples}</Block>
                </Block>
                <Block $style={{
                  padding: "4px 12px",
                  borderRadius: "4px",
                  backgroundColor: range.color,
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 500,
                  transform: selectedRange === index ? "scale(1.1)" : "scale(1)",
                  transition: "all 0.3s ease",
                  boxShadow: selectedRange === index ? "0 2px 8px " + range.color + "80" : "none"
                }}>
                  {range.range}
                </Block>
              </Block>
            ))}
          </Block>

          {/* 输入区域 */}
          <Block $style={{ marginBottom: "1rem" }}>
            <Block $style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "0.5rem"
            }}>
              <span style={{
                width: "6px",
                height: "16px",
                backgroundColor: "rgb(41, 49, 55)",
                borderRadius: "3px",
                display: "inline-block"
              }}></span>
              <span style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#1a1a1a"
              }}>上传上一个环节的参数</span>
            </Block>
            <Input
              value={strengthValue}
              onChange={e => setStrengthValue(e.currentTarget.value)}
              placeholder="文件类型支持txt，上一个进尺所有相扣孔距10cm参数"
              clearable
              size="compact"
              overrides={{
                Root: {
                  style: {
                    borderRadius: "8px"
                  }
                }
              }}
            />
          </Block>

          {/* 结果显示 */}
          <Block>
            <Block $style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "0.5rem"
            }}>
              <span style={{
                width: "6px",
                height: "16px",
                backgroundColor: "rgb(41, 49, 55)",
                borderRadius: "3px",
                display: "inline-block"
              }}></span>
              <span style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#1a1a1a"
              }}>您判定的岩石单轴抗压强度：</span>
            </Block>
            <Block $style={{
              border: "1px solid #e0e4e9",
              borderRadius: "8px",
              padding: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              transition: "all 0.3s ease",
              ':hover': {
                borderColor: "#2196f3",
                boxShadow: "0 2px 8px rgba(33, 150, 243, 0.15)"
              }
            }}>
              <Input
                value={selectedStrength}
                onChange={e => handleStrengthChange(e.currentTarget.value)}
                type="number"
                min="0"
                max="300"
                size="compact"
                overrides={{
                  Root: {
                    style: {
                      borderRadius: "4px",
                      width: "120px",
                      border: "none",
                      backgroundColor: "transparent"
                    }
                  },
                  Input: {
                    style: {
                      fontSize: "15px",
                      color: "#2196f3",
                      padding: "0",
                      backgroundColor: "transparent",
                      textAlign: "left"
                    }
                  },
                  InputContainer: {
                    style: {
                      backgroundColor: "transparent"
                    }
                  }
                }}
              />
              <span style={{ fontSize: "14px", color: "#999" }}>MPa</span>
            </Block>
          </Block>
        </div>
      </Scrollable>
    </Block>
  )
}
