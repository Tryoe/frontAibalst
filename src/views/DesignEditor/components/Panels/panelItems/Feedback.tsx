import React, { useState, useEffect, useRef } from "react"
import { Block } from "baseui/block"
import { useStyletron } from "baseui"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { styled } from "baseui"
import * as echarts from 'echarts'

const SlidePanel = styled('div', {
  position: 'fixed',
  top: '50%',
  left: '50%',
  width: '960px',
  height: '680px',
  background: '#ffffff',
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  borderRadius: '12px',
  zIndex: 2000,
  transform: 'translate(-50%, -50%) translateX(-100vw)',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
})

const PanelOverlay = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.4)',
  opacity: 0,
  visibility: 'hidden',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  zIndex: 1999,
})

const PanelHeader = styled('div', {
  padding: '24px 32px',
  borderBottom: '1px solid #E5E7EB',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#ffffff',
})

const PanelTitle = styled('div', {
  fontSize: '24px',
  fontWeight: 600,
  color: '#1a1a1a',
})

const CloseButton = styled('button', {
  background: 'transparent',
  border: 'none',
  padding: '12px',
  cursor: 'pointer',
  color: '#6B7280',
  borderRadius: '8px',
  fontSize: '20px',
  lineHeight: 1,
  ':hover': {
    color: '#1a1a1a',
    background: '#F3F4F6',
  },
})

const FormGroup = styled('div', {
  marginBottom: '24px',
})

const FormLabel = styled('div', {
  color: '#111827',
  fontSize: '14px',
  marginBottom: '8px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
})

const IndexBadge = styled('span', {
  background: '#F3F4F6',
  color: '#3B82F6',
  width: '20px',
  height: '20px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: '500'
})

const SelectContainer = styled('div', {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
})

const Select = styled('select', {
  width: '100%',
  padding: '8px 16px',
  borderRadius: '6px',
  border: '1px solid #E5E7EB',
  background: '#ffffff',
  color: '#4B5563',
  fontSize: '14px',
  outline: 'none',
  cursor: 'pointer',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  transition: 'all 0.2s ease',
  height: '36px',
  
  ':hover': {
    borderColor: '#9CA3AF',
    background: '#F9FAFB',
  },
  
  ':focus': {
    borderColor: '#3B82F6',
    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)',
  }
})

const ConfirmButton = styled('button', {
  width: "100%",
  height: "48px",
  background: "rgb(41, 49, 55)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.3s ease",
  marginTop: "24px",
  marginBottom: "24px",
  
  ':hover': {
    background: "rgb(55, 65, 75)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  
  ':active': {
    transform: "translateY(0)",
    background: "rgb(35, 42, 47)",
  }
})

const ChartContainer = styled('div', {
  width: '100%',
  height: '400px',
  marginBottom: '32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const ScoreContainer = styled('div', {
  width: '160px',
  height: '160px',
  margin: '0 auto',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
})

const ScoreCircle = styled('div', {})

const ScoreText = styled('div', {
  position: 'absolute',
  fontSize: '36px',
  fontWeight: 'bold',
  color: '#2563EB',
  textAlign: 'center',
  
  '::after': {
    content: '"分"',
    display: 'block',
    fontSize: '14px',
    fontWeight: 'normal',
    marginTop: '-4px'
  }
})

// 定义类型
type EvaluationOption = {
  value: string;
  label: string;
}

type EvaluationData = {
  superExcavationValue: string;
  score: string;
}

type EvaluationItem = {
  title: string;
  name: string;
  options: EvaluationOption[];
  data: EvaluationData[];
}

const evaluationItems: EvaluationItem[] = [
  {
    title: "超挖值（cm)",
    name: "superExcavation",
    options: [
      {value: "value1", label: "0-5"},
      {value: "value2", label: "5-10"},
      {value: "value3", label: "10-15"},
      {value: "value4", label: "15-20"},
      {value: "value5", label: ">20"},
    ],
    data: [
      {superExcavationValue: "value1", score: "很好"}
    ]
  },
  {
    title: "欠挖值（cm)",
    name: "underExcavation",
    options: [
      {value: "value1", label: "0-5"},
      {value: "value2", label: "5-10"},
      {value: "value3", label: "10-15"},
      {value: "value4", label: "15-20"},
      {value: "value5", label: ">20"},
    ],
    data: [
      {superExcavationValue: "value1", score: "很好"}
    ]
  },
  {
    title: "块度",
    name: "blockSize",
    options: [
      {value: "value1", label: "很均匀"},
      {value: "value2", label: "均匀"},
      {value: "value3", label: "一般"},
      {value: "value4", label: "有大块"},
      {value: "value5", label: "大块多"},
    ],
    data: [
      {superExcavationValue: "value1", score: "很好"}
    ]
  },
  {
    title: "半孔率 %",
    name: "halfHoleRate",
    options: [
      {value: "value1", label: ">90"},
      {value: "value2", label: "70-90"},
      {value: "value3", label: "50-70"},
      {value: "value4", label: "30-50"},
      {value: "value5", label: "<30"},
    ],
    data: [
      {superExcavationValue: "value1", score: "很好"}
    ]
  },
  {
    title: "炮孔利用率 %",
    name: "holeUtilization",
    options: [
      {value: "value1", label: ">90"},
      {value: "value2", label: "80-90"},
      {value: "value3", label: "70-80"},
      {value: "value4", label: "60-70"},
      {value: "value5", label: "<60"},
    ],
    data: [
      {superExcavationValue: "value1", score: "很好"}
    ]
  },
  {
    title: "振速(cm/s)",
    name: "vibrationSpeed",
    options: [
      {value: "value1", label: "<0.1"},
      {value: "value2", label: "0.1-1"},
      {value: "value3", label: "1-2"},
      {value: "value4", label: "2-5"},
      {value: "value5", label: ">5"},
    ],
    data: [
      {superExcavationValue: "value1", score: "很好"}
    ]
  }
]

// 更新评分映射
const scoreMapping: Record<string, { score: number; label: string }> = {
  'value1': { score: 100, label: '很好' },
  'value2': { score: 85, label: '好' },
  'value3': { score: 75, label: '一般' },
  'value4': { score: 65, label: '差' },
  'value5': { score: 55, label: '很差' }
}

function Feedback() {
  const [css] = useStyletron()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [isOpen, setIsOpen] = useState(false)
  const chartRef = useRef<HTMLDivElement | null>(null)
  
  // 更新状态管理，设置默认值为 value1（满分）
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(() => {
    const initialValues: Record<string, string> = {}
    evaluationItems.forEach(item => {
      initialValues[item.name] = 'value1' // 默认设置为最高分
    })
    return initialValues
  })
  
  // 初始化评估结果
  const [evaluationResults, setEvaluationResults] = useState<Record<string, string>>(() => {
    const initialResults: Record<string, string> = {}
    evaluationItems.forEach(item => {
      initialResults[item.name] = scoreMapping['value1'].label // 默认设置为"很好"
    })
    return initialResults
  })
  
  // 处理选择变更
  const handleSelectChange = (itemName: string, value: string) => {
    setSelectedValues(prev => ({
      ...prev,
      [itemName]: value
    }))
    
    // 根据选择更新评估结果
    const result = scoreMapping[value]?.label || ''
    setEvaluationResults(prev => ({
      ...prev,
      [itemName]: result
    }))
  }
  
  // 计算总分
  const calculateTotalScore = () => {
    const scores = Object.values(selectedValues).map(value => 
      scoreMapping[value as keyof typeof scoreMapping]?.score || 100 // 默认使用满分
    )
    return scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : '100'
  }
  
  // 获取雷达图数据
  const getRadarData = () => {
    return evaluationItems.map(item => 
      scoreMapping[selectedValues[item.name] as keyof typeof scoreMapping]?.score || 100 // 默认使用满分
    )
  }
  
  // 计算圆环渐变的百分比
  const calculateCircleGradient = () => {
    const score = parseFloat(calculateTotalScore())
    const percentage = (score / 100) * 100
    return `conic-gradient(#2563EB 0% ${percentage}%, #E5E7EB ${percentage}% 100%)`
  }
  
  useEffect(() => {
    if (!chartRef.current || !isOpen) return
    
    const timer = setTimeout(() => {
      try {
        const myChart = echarts.init(chartRef.current)
        
        const option = {
          backgroundColor: '#fff',
          radar: {
            center: ['50%', '50%'],
            radius: '70%',
            indicator: evaluationItems.map(item => ({
              name: item.title,
              max: 100
            })),
            shape: 'polygon',
            splitNumber: 4,
            axisName: {
              color: '#333',
              fontSize: 14,
            },
            splitLine: {
              lineStyle: {
                color: '#2563EB',
                opacity: 0.2
              }
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(37, 99, 235, 0.05)', 'rgba(37, 99, 235, 0.1)']
              }
            },
            axisLine: {
              lineStyle: {
                color: '#2563EB',
                opacity: 0.3
              }
            }
          },
          series: [{
            type: 'radar',
            data: [{
              value: getRadarData(),
              name: '评估指标',
              symbol: 'none',
              lineStyle: {
                width: 2,
                color: '#2563EB'
              },
              areaStyle: {
                color: 'rgba(37, 99, 235, 0.2)'
              }
            }]
          }]
        }
        
        myChart.setOption(option)
        
        const handleResize = () => {
          myChart.resize()
        }
        
        window.addEventListener('resize', handleResize)
        return () => {
          window.removeEventListener('resize', handleResize)
          myChart.dispose()
        }
      } catch (error) {
        console.error('初始化图表失败:', error)
      }
    }, 300)
    
    return () => clearTimeout(timer)
  }, [isOpen, selectedValues])

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Block $style={{ 
      flex: 1, 
      display: "flex", 
      flexDirection: "column",
      background: '#ffffff',
      height: '100%',
      color: '#374151'
    }}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.4rem 1.5rem",
        }}
      >
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
          }}>10</span>
          <span style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}>爆破方案优化</span>
        </Block>
        <Block onClick={() => setIsSidebarOpen(false)} $style={{ 
          cursor: "pointer", 
          display: "flex",
          color: '#6B7280',
        }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>

      <Scrollable>
        <Block $style={{ padding: "0.05rem 1.5rem" }}>
          {evaluationItems.map((item, index) => (
            <FormGroup key={item.name}>
              <FormLabel>
                <IndexBadge>{index + 1}</IndexBadge>
                {item.title}
              </FormLabel>
              <Select 
                value={selectedValues[item.name] || 'value1'}
                onChange={(e) => handleSelectChange(item.name, e.target.value)}
              >
                {item.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              {evaluationResults[item.name] && (
                <Block $style={{
                  marginTop: '8px',
                  color: '#2563EB',
                  fontSize: '14px'
                }}>
                  评估结果: {evaluationResults[item.name]}
                </Block>
              )}
            </FormGroup>
          ))}
          <ConfirmButton onClick={handleOpen}>
            查看分析结果
          </ConfirmButton>
        </Block>
      </Scrollable>

      <PanelOverlay 
        onClick={handleClose}
        style={{
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
        }}
      />
      <SlidePanel
        style={{
          transform: isOpen 
            ? 'translate(-50%, -50%)'
            : 'translate(-50%, -50%) translateX(-100vw)',
        }}
      >
        <PanelHeader>
          <PanelTitle>方案分析结果</PanelTitle>
          <CloseButton onClick={handleClose}>✕</CloseButton>
        </PanelHeader>
        <Scrollable>
          <Block padding={"40px"} backgroundColor="#ffffff">
            <Block
              ref={chartRef}
              $style={{
                width: '100%',
                height: '420px',
                marginBottom: '40px',
                position: 'relative'
              }}
            />
            <ScoreContainer>
              <ScoreCircle 
                $style={{
                  width: '160px',
                  height: '160px',
                  margin: '0 auto',
                  borderRadius: '50%',
                  background: calculateCircleGradient(),
                  position: 'relative',
                  '::before': {
                    content: '""',
                    position: 'absolute',
                    top: '12%',
                    left: '12%',
                    right: '12%',
                    bottom: '12%',
                    background: '#ffffff',
                    borderRadius: '50%',
                    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.08)'
                  }
                }}
              />
              <ScoreText 
                $style={{
                  position: 'absolute',
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: '#2563EB',
                  textAlign: 'center',
                  '::after': {
                    content: '"分"',
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'normal',
                    marginTop: '-4px'
                  }
                }}
              >
                {calculateTotalScore()}
              </ScoreText>
            </ScoreContainer>
          </Block>
        </Scrollable>
      </SlidePanel>
    </Block>
  )
}

export default Feedback