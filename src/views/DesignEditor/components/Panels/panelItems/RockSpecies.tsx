import React from "react"
import { useEditor } from "@layerhub-io/react"
import { Block } from "baseui/block"
import { loadFonts } from "~/utils/fonts"
import Scrollable from "~/components/Scrollable"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import { useStyletron } from "baseui"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { Select } from "baseui/select"
import axios from "axios"

// 修改模拟数据为实际API地址
const API_BASE_URL = "http://111.229.115.234:8089"
const ROCK_TYPE_API = `${API_BASE_URL}/rockType/all`

interface SelectOption {
  label: string;
  id?: string | number;
}

export default function () {
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const { setCurrentScene, currentScene } = useDesignEditorContext()
  const [css] = useStyletron()
  
  // 状态管理
  const [options1, setOptions1] = React.useState([])
  const [options2, setOptions2] = React.useState([])
  const [options3, setOptions3] = React.useState([])  
  const [value1, setValue1] = React.useState([])
  const [value2, setValue2] = React.useState([])
  const [value3, setValue3] = React.useState([])
  const [selectedValue, setSelectedValue] = React.useState<SelectOption | null>(null)
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null)
  const [uploadStatus, setUploadStatus] = React.useState("上传岩样图片识别")
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  
  // 处理文件上传
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        // 显示图片预览
        const reader = new FileReader()
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setUploadedImage(reader.result)
          }
        }
        reader.readAsDataURL(file)

        // 准备上传数据
        const formData = new FormData()
        formData.append('file', file)

        // 发送识别请求
        setUploadStatus("正在识别...")
        const response = await axios.post("http://212.64.29.33:8080/uploadImg", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        // 处理识别结果
        if (response.data && response.data.name) {
          setSelectedValue({ label: response.data.name })
          setUploadStatus("识别成功！")
        } else {
          setUploadStatus("识别失败：未获取到结果")
        }
      } catch (error) {
        console.error('图片上传识别失败:', error)
        setUploadStatus("识别失败：" + ((error as any).response?.data?.message || (error as any).message || '未知错误'))
      }
    }
  }

  // 触发文件选择
  const handleUploadClick = () => {
    inputFileRef.current?.click()
  }
  
  // 处理选择变化
  const handleSelectChange = (value: any[], setValue: Function, index: number) => {
    setValue(value)
    if (value.length > 0) {
      setSelectedValue(value[0])
      // 清空其他选择
      if (index !== 1) setValue1([])
      if (index !== 2) setValue2([])
      if (index !== 3) setValue3([])
    } else {
      setSelectedValue(null)
    }
  }
  
  // API请求函数
  const fetchOptions = React.useCallback(async () => {
    try {
      const response = await axios.get(ROCK_TYPE_API)
      if (response.data.code === 1 && response.data.data) {
        // 根据type_code分类数据
        const data = response.data.data
        const igneous = data.filter((item: { type_code: string; name: string; foreign_name: string; id: string | number }) => item.type_code === '002002').map((item: { name: string; foreign_name: string; id: string | number }) => ({
          label: `${item.name} (${item.foreign_name})`,
          id: item.id
        }))
        const sedimentary = data.filter((item: { type_code: string; name: string; foreign_name: string; id: string | number }) => item.type_code === '002001').map((item: { name: string; foreign_name: string; id: string | number }) => ({
          label: `${item.name} (${item.foreign_name})`,
          id: item.id
        }))
        const metamorphic = data.filter((item: { type_code: string; name: string; foreign_name: string; id: string | number }) => item.type_code === '002003').map((item: { name: string; foreign_name: string; id: string | number }) => ({
          label: `${item.name} (${item.foreign_name})`,
          id: item.id
        }))
        
        setOptions1(igneous)
        setOptions2(sedimentary)
        setOptions3(metamorphic)
      }
    } catch (error) {
      console.error('获取岩石种类失败:', error)
    }
  }, [])
  
  React.useEffect(() => {
    // 在组件加载时获取数据
    fetchOptions()
  }, [fetchOptions])
  
  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
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
          }}>1</span>
          <span style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}>岩石种类</span>
        </Block>
        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
      <Scrollable>
        <div style={{ padding: "0.05rem 1.5rem"}}>
          <Block
            $style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginBottom: "0rem",
            }}
          >
            <Select
              options={options1}
              value={value1}
              placeholder="火成岩（按拼音排序）"
              onChange={({ value }) => handleSelectChange([...value], setValue1, 1)}
              disabled={!!(value2.length || value3.length)}
              overrides={{
                ControlContainer: {
                  style: {
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    border: "1px solid #e0e4e9",
                    transition: "all 0.3s ease",
                    ':hover': {
                      transform: "scale(1.02)",
                      boxShadow: "0 4px 12px rgba(33, 150, 243, 0.15)",
                      borderColor: "#2196f3",
                    }
                  },
                },
                Placeholder: {
                  style: {
                    color: "#666",
                    fontSize: "14px"
                  }
                },
                DropdownListItem: {
                  style: {
                    fontSize: "14px",
                    transition: "all 0.01s ease",
                    ':hover': {
                      backgroundColor: '#e3f2fd',
                      color: '#2196f3'
                    }
                  }
                },
                ValueContainer: {
                  style: {
                    padding: "12px 16px"
                  }
                }
              }}
            />
            <Select
              options={options2}
              value={value2}
              placeholder="沉积岩"
              onChange={({ value }) => handleSelectChange([...value], setValue2, 2)}
              disabled={!!(value1.length || value3.length)}
              overrides={{
                ControlContainer: {
                  style: {
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    border: "1px solid #e0e4e9",
                    transition: "all 0.3s ease",
                    ':hover': {
                      transform: "scale(1.02)",
                      boxShadow: "0 4px 12px rgba(33, 150, 243, 0.15)",
                      borderColor: "#2196f3",
                    }
                  },
                },
                Placeholder: {
                  style: {
                    color: "#666",
                    fontSize: "14px"
                  }
                },
                DropdownListItem: {
                  style: {
                    fontSize: "14px",
                    transition: "all 0.2s ease",
                    ':hover': {
                      backgroundColor: '#e3f2fd',
                      color: '#2196f3'
                    }
                  }
                },
                ValueContainer: {
                  style: {
                    padding: "12px 16px"
                  }
                }
              }}
            />
            <Select
              options={options3}
              value={value3}
              placeholder="变质岩"
              onChange={({ value }) => handleSelectChange([...value], setValue3, 3)}
              disabled={!!(value1.length || value2.length)}
              overrides={{
                ControlContainer: {
                  style: {
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    border: "1px solid #e0e4e9",
                    transition: "all 0.3s ease",
                    ':hover': {
                      transform: "scale(1.02)",
                      boxShadow: "0 4px 12px rgba(33, 150, 243, 0.15)",
                      borderColor: "#2196f3",
                    }
                  },
                },
                Placeholder: {
                  style: {
                    color: "#666",
                    fontSize: "14px"
                  }
                },
                DropdownListItem: {
                  style: {
                    fontSize: "14px",
                    transition: "all 0.2s ease",
                    ':hover': {
                      backgroundColor: '#e3f2fd',
                      color: '#2196f3'
                    }
                  }
                },
                ValueContainer: {
                  style: {
                    padding: "12px 16px"
                  }
                }
              }}
            />

            {/* 结果显示区域 */}
            <Block
              $style={{
                marginTop: "0rem",
                borderRadius: "8px",
                minHeight: "60px",
              }}
            >
              {/* 图片上传区域标题 */}
              <Block $style={{ 
                fontWeight: "bold",
                fontSize: "16px", 
                color: "#1a1a1a", 
                marginBottom: "0.5rem",
                marginTop: "0rem",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <span style={{
                  width: "6px",
                  height: "16px",
                  backgroundColor: "rgb(41, 49, 55)",
                  borderRadius: "3px",
                  display: "inline-block"
                }}></span>
                图片上传区域：
              </Block>

              {/* 文件输入框 */}
              <input
                type="file"
                ref={inputFileRef}
                style={{ display: "none" }}
                onChange={handleFileUpload}
                accept="image/*"
              />

              {/* 上传区域 */}
              <Block
                onClick={handleUploadClick}
                $style={{
                  width: "431px",
                  maxHeight: "200px",
                  border: "1px dashed #ccc",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backgroundColor: "#f8f8fb",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  ":hover": {
                    border: "1px dashed #2196f3",
                    backgroundColor: "#f0f7ff",
                    transform: "translateY(-2px)",
                    boxShadow: "0 2px 8px rgba(33, 150, 243, 0.15)"
                  }
                }}
              >
                {!uploadedImage ? (
                  <>
                    <Block $style={{ 
                      fontSize: "36px",
                      color: "#666",
                      transition: "color 0.3s ease",
                      ":hover": {
                        color: "#2196f3"
                      }
                    }}>+</Block>
                    <Block $style={{ 
                      marginBottom: "1rem",
                      color: "#666",
                      transition: "color 0.3s ease",
                      ":hover": {
                        color: "#2196f3"
                      }
                    }}>{uploadStatus}</Block>
                  </>
                ) : (
                  <>
                    <Block $style={{ 
                      width: "100%", 
                      height: "180px", 
                      display: "flex", 
                      justifyContent: "center", 
                      alignItems: "center",  
                      backgroundColor: "#ffffff",
                      transition: "transform 0.3s ease",
                      ":hover": {
                        transform: "scale(1.02)"
                      }
                    }}>
                      <img 
                        src={uploadedImage as string} 
                        alt="预览图片"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain"
                        }}
                      />
                    </Block>
                  </>
                )}
              </Block>

              <Block $style={{ 
                fontWeight: "bold",
                fontSize: "16px", 
                color: "#1a1a1a", 
                marginBottom: "0.5rem",
                marginTop: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <span style={{
                  width: "6px",
                  height: "16px",
                  backgroundColor: "rgb(41, 49, 55)",
                  borderRadius: "3px",
                  display: "inline-block"
                }}></span>
                结果：
              </Block>
              <Block $style={{ 
                color: selectedValue ? "#2196f3" : "#666",
                border: "1px solid #e0e4e9",
                width: "431px",
                height: "48px",
                fontSize: "15px",
                backgroundColor: "white",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                ':hover': {
                  borderColor: "#2196f3",
                  boxShadow: "0 4px 12px rgba(33, 150, 243, 0.15)"
                }
              }}>    
                {selectedValue && typeof selectedValue === 'object' && selectedValue !== null && 'label' in selectedValue 
                  ? (selectedValue as { label: string }).label 
                  : <span style={{ color: "#999" }}>未选择</span>
                }
              </Block>
            </Block>
          </Block>
        </div>
      </Scrollable>
    </Block>
  )
}

function ImageItem({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) {
  const [css] = useStyletron()
  return (
    <div
      onClick={onClick}
      className={css({
        position: "relative",
        background: "#f8f8fb",
        cursor: "pointer",
        borderRadius: "8px",
        overflow: "hidden",
        "::before:hover": {
          opacity: 1,
        },
      })}
    >
      <div
        className={css({
          backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          height: "100%",
          width: "100%",
          ":hover": {
            opacity: 1,
          },
        })}
      ></div>
      <img
        src={preview}
        className={css({
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          verticalAlign: "middle",
        })}
      />
    </div>
  )
}
