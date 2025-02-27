import React, { useState } from "react"
import { styled } from "baseui"
import { Button } from "baseui/button"
import { useEditor } from "@layerhub-io/react"
import { Block } from "baseui/block"
import { Theme } from "baseui/theme"
import { Avatar } from "baseui/avatar"
import { StatefulPopover, PLACEMENT } from "baseui/popover"
import { ChevronDown } from "baseui/icon"
import avatarImage from "../../../../assets/images/avatar.jpg"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "64px",
  background: "linear-gradient(to right, #1a1a1a, #2d2d2d)",
  width: "100%",
  display: "flex",
  padding: "0 2rem",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  zIndex: 1000,
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
}))

const NavButton = styled(Button, {
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  color: "#ffffff",
  position: "relative",
  zIndex: 1001,
  height: "38px",
  minWidth: "auto",
  padding: "0 24px",
  fontSize: "14px",
  fontWeight: 500,
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  backdropFilter: "blur(8px)",
  textShadow: "0 1px 2px rgba(0,0,0,0.2)",

  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },

  ":active": {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    transform: "translateY(0)",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
})

const Title = styled(Block, {
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: 600,
  letterSpacing: "0.5px",
  padding: "0 12px",
  borderLeft: "3px solid rgba(255, 255, 255, 0.8)",
})

const UserMenuContainer = styled("div", {
  position: "fixed",
  top: 0,
  right: 0,
  height: "100vh",
  width: "380px",
  background: "#ffffff",
  boxShadow: "-4px 0 24px rgba(0,0,0,0.15)",
  transform: "translateX(100%)",
  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  zIndex: 2000,
  borderTopLeftRadius: "12px",
  borderBottomLeftRadius: "12px",
})

const UserMenuOverlay = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  opacity: 0,
  visibility: "hidden",
  transition: "all 0.3s ease",
  zIndex: 1999,
})

const MenuItem = styled("div", {
  display: "flex",
  alignItems: "center",
  padding: "10px 20px",
  cursor: "pointer",
  color: "#24292f",
  fontSize: "15px",
  transition: "background 0.2s ease",
  ":hover": {
    background: "#f6f8fa",
  },
})

const MenuDivider = styled("div", {
  height: "1px",
  background: "#d0d7de",
  margin: "8px 0",
})

const MenuHeader = styled("div", {
  padding: "16px 20px",
  borderBottom: "1px solid #d0d7de",
  borderTopLeftRadius: "12px",
})

const UserName = styled("div", {
  color: "#24292f",
  fontSize: "16px",
  fontWeight: 600,
  marginLeft: "12px",
  marginTop: "0",
})

const UserInfo = styled("div", {
  display: "flex",
  alignItems: "center",
  padding: "4px",
  cursor: "pointer",
  borderRadius: "50%",
  transition: "all 0.2s ease",
  border: "2px solid transparent",
  ":hover": {
    background: "rgba(255, 255, 255, 0.1)",
    border: "2px solid rgba(255, 255, 255, 0.2)",
  },
})

function UserMenu({ onClose }: { onClose: () => void }) {
  const menuItems = [
    { label: "Your Profile", icon: "👤" },
    { label: "My Projects", icon: "📁" },
    { label: "System Settings", icon: "⚙️" },
    { label: "Help Documents", icon: "📚" },
    { label: "Logout", icon: "🚪" },
  ]

  return (
    <>
      <UserMenuOverlay 
        onClick={onClose}
        style={{
          opacity: 1,
          visibility: "visible"
        }}
      />
      <UserMenuContainer
        style={{
          transform: "translateX(0)"
        }}
      >
        <MenuHeader>
          <Block display="flex" alignItems="center" justifyContent="space-between">
            <Block display="flex" alignItems="center">
              <Avatar
                name="特别周"
                size="scale900"
                src={avatarImage}
              />
              <UserName>特别周</UserName>
            </Block>
            <Button
              onClick={onClose}
              overrides={{
                BaseButton: {
                  style: {
                    backgroundColor: "transparent",
                    color: "#666",
                    padding: "8px",
                    minWidth: "auto",
                    ":hover": {
                      backgroundColor: "rgba(0,0,0,0.05)",
                    }
                  }
                }
              }}
            >
              ✕
            </Button>
          </Block>
        </MenuHeader>

        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <MenuItem>
              <span style={{ marginRight: "12px" }}>{item.icon}</span>
              {item.label}
            </MenuItem>
            {index === 2 && <MenuDivider />}
          </React.Fragment>
        ))}
      </UserMenuContainer>
    </>
  )
}

const Navbar = () => {
  const editor = useEditor()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleOpenFile = () => {
    // 处理打开云端文件
  }

  const handleViewLogs = () => {
    // 处理查看服务日志
  }

  const handleSaveToCloud = () => {
    // 处理保存为云端文件
  }

  const handleSaveLocal = () => {
    // 处理保存为本地文件
  }

  const handleCreateProject = () => {
    // 处理创建新项目
  }

  return (
    <Container>
      <Title>
        全断面+楔形掏槽
      </Title>

      <Block display="flex" alignItems="center" gridGap="20px">
        <Block display="flex" gridGap="12px">
          <NavButton onClick={handleOpenFile}>
            打开云端文件
          </NavButton>
          <NavButton onClick={handleViewLogs}>
            打开服务日志
          </NavButton>
        </Block>

        <Block display="flex" gridGap="12px">
          <NavButton onClick={handleSaveToCloud}>
            保存为云端文件
          </NavButton>
          <NavButton onClick={handleSaveLocal}>
            保存为本地文件
          </NavButton>
          <NavButton 
            onClick={handleCreateProject}
            overrides={{
              BaseButton: {
                style: {
                  background: "linear-gradient(45deg, #4a90e2, #357abd)",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(74,144,226,0.3)",
                  ":hover": {
                    background: "linear-gradient(45deg, #5a9ee8, #4289d0)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(74,144,226,0.4)",
                  },
                  ":active": {
                    background: "linear-gradient(45deg, #357abd, #2d6aa6)",
                    transform: "translateY(0)",
                    boxShadow: "0 2px 6px rgba(74,144,226,0.3)",
                  }
                }
              }
            }}
          >
            创建新项目
          </NavButton>
        </Block>

        <Block 
          height="24px" 
          width="1px" 
          backgroundColor="rgba(255, 255, 255, 0.12)"
          margin="0 8px"
        />

        <UserInfo onClick={() => setIsUserMenuOpen(true)}>
          <Avatar
            name="特别周"
            size="scale900"
            src={avatarImage}
          />
        </UserInfo>
      </Block>

      {isUserMenuOpen && (
        <UserMenu onClose={() => setIsUserMenuOpen(false)} />
      )}
    </Container>
  )
}

export default Navbar
