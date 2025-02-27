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
  width: '800px',
  height: '700px',
  background: '#ffffff',
  boxShadow: '0 0 20px rgba(0,0,0,0.3)',
  borderRadius: '8px',
  zIndex: 2000,
  transform: 'translate(-50%, -50%) translateX(-100vw)',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
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
  padding: '20px 24px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const PanelTitle = styled('div', {
  fontSize: '20px',
  fontWeight: 600,
  color: '#ffffff',
})

const CloseButton = styled('button', {
  background: 'transparent',
  border: 'none',
  padding: '8px',
  cursor: 'pointer',
  color: 'rgba(255, 255, 255, 0.65)',
  borderRadius: '6px',
  ':hover': {
    color: '#ffffff',
    background: 'rgba(255, 255, 255, 0.1)',
  },
})

const FormGroup = styled('div', {
  marginBottom: '24px',
})

const FormLabel = styled('div', {
  color: '#000000',
  fontSize: '16px',
  marginBottom: '16px',
  fontWeight: 500,
})

const SelectContainer = styled('div', {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
})

const Select = styled('select', {
  width: '100%',
  padding: '16px',
  borderRadius: '8px',
  border: '1px solid #E5E7EB',
  background: '#ffffff',
  color: '#000000',
  fontSize: '16px',
  outline: 'none',
  cursor: 'pointer',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='black' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 16px center',
  
  ':hover': {
    background: '#F9FAFB',
    borderColor: '#D1D5DB',
  },
  
  ':focus': {
    background: '#ffffff',
    borderColor: '#2563EB',
    boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.1)',
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
  width: '200px',
  height: '200px',
  margin: '0 auto',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
})

const ScoreCircle = styled('div', {
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  background: 'conic-gradient(#4a90e2 0% 80%, #e2e8f0 80% 100%)',
  position: 'relative',
  
  '::before': {
    content: '""',
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '10%',
    background: '#ffffff',
    borderRadius: '50%',
  }
})

const ScoreText = styled('div', {
  position: 'absolute',
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#1a1a1a',
})

function Feedback() {
  const [css] = useStyletron()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [isOpen, setIsOpen] = useState(false)
  const chartRef = useRef(null)
  
  useEffect(() => {
    if (!chartRef.current || !isOpen) return
    
    // 添加延时，确保容器已渲染
    const timer = setTimeout(() => {
      const myChart = echarts.init(chartRef.current)
      
      const option = {
        backgroundColor: '#fff',
        radar: {
          center: ['50%', '50%'],
          radius: '70%',
          indicator: [
            { name: '超挖率', max: 100 },
            { name: '欠挖率', max: 100 },
            { name: '坡度', max: 100 },
            { name: '平乳率', max: 100 },
            { name: '给孔利用率', max: 100 },
            { name: '振速', max: 100 }
          ],
          shape: 'polygon',
          splitNumber: 4,
          axisName: {
            color: '#333',
            fontSize: 14,
          },
          splitLine: {
            lineStyle: {
              color: '#e6e6e6'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#f5f5f5', '#fff']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ddd'
            }
          }
        },
        series: [{
          type: 'radar',
          data: [{
            value: [85, 90, 75, 95, 85, 88],
            name: '评估指标',
            symbol: 'none',
            lineStyle: {
              width: 2,
              color: '#4a90e2'
            },
            areaStyle: {
              color: 'rgba(74, 144, 226, 0.2)'
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
        myChart.dispose()
        window.removeEventListener('resize', handleResize)
      }
    }, 300) // 300ms 延时
    
    return () => {
      clearTimeout(timer)
    }
  }, [isOpen])

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
      color: '#000000'
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
          <FormGroup>
            <FormLabel>最小抵抗线 (cm)</FormLabel>
            <Select defaultValue="0.5">
              <option value="0.5">0.5</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <FormLabel>孔距 (cm)</FormLabel>
            <Select defaultValue="0.5">
              <option value="0.5">0.5</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <FormLabel>坡度</FormLabel>
            <Select defaultValue="倾斜">
              <option value="倾斜">倾斜</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <FormLabel>平乳率%</FormLabel>
            <Select defaultValue=">90">
              <option value=">90">&gt;90</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <FormLabel>给孔利用率%</FormLabel>
            <Select defaultValue=">90">
              <option value=">90">&gt;90</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <FormLabel>振速(cm/s)</FormLabel>
            <Select defaultValue="<0.1">
              <option value="<0.1">&lt;0.1</option>
            </Select>
          </FormGroup>

          <ConfirmButton onClick={handleOpen}>
            确认
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
          <Block padding={"32px"} backgroundColor="#ffffff">
            <div 
              ref={chartRef} 
              style={{ 
                width: '100%', 
                height: '400px',
                marginBottom: '32px'
              }} 
            />
            <ScoreContainer>
              <ScoreCircle />
              <ScoreText>80.00</ScoreText>
            </ScoreContainer>
          </Block>
        </Scrollable>
      </SlidePanel>
    </Block>
  )
}

export default Feedback