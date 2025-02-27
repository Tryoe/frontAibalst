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
  height: "50px",
  background: "#000000",
  width: "100%",
  display: "flex",
  padding: "0 1rem",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  zIndex: 1000,
}))

const NavButton = styled(Button, {
  backgroundColor: "transparent",
  color: "#ffffff",
  position: "relative",
  zIndex: 1001,
  height: "32px",
  minWidth: "auto",
  padding: "0 16px",
  fontSize: "13px",
  fontWeight: 400,
  border: "1px solid rgba(255, 255, 255, 0.15)",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease",
  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.25)",
  },
  ":active": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
})

const Title = styled(Block, {
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: 500,
  letterSpacing: "0.5px",
})

const UserMenuContainer = styled("div", {
  background: "#ffffff",
  borderRadius: "6px",
  width: "300px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
})

const MenuItem = styled("div", {
  display: "flex",
  alignItems: "center",
  padding: "8px 16px",
  cursor: "pointer",
  color: "#24292f",
  fontSize: "14px",
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
  padding: "12px 16px",
  borderBottom: "1px solid #d0d7de",
})

const UserName = styled("div", {
  color: "#24292f",
  fontSize: "14px",
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
  transition: "background 0.2s ease",
  ":hover": {
    background: "rgba(255, 255, 255, 0.1)",
  },
})

function UserMenu() {
  const menuItems = [
    { label: "个人信息", icon: "👤" },
    { label: "我的项目", icon: "📁" },
    { label: "系统设置", icon: "⚙️" },
    { label: "帮助文档", icon: "📚" },
    { label: "退出登录", icon: "🚪" },
  ]

  return (
    <UserMenuContainer>
      <MenuHeader>
        <Block display="flex" alignItems="center">
          <Avatar
            name="特别周"
            size="scale900"
            src={avatarImage}
          />
          <UserName>特别周</UserName>
        </Block>
      </MenuHeader>

      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          <MenuItem>
            <span style={{ marginRight: "8px" }}>{item.icon}</span>
            {item.label}
          </MenuItem>
          {index === 2 && <MenuDivider />}
        </React.Fragment>
      ))}
    </UserMenuContainer>
  )
}

function Navbar() {
  const editor = useEditor()

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
      <Block display="flex" gridGap="8px">
        <NavButton
          onClick={handleOpenFile}
          overrides={{
            BaseButton: {
              style: {
                boxShadow: "none",
              }
            }
          }}
        >
          打开云端文件
        </NavButton>
        <NavButton
          onClick={handleViewLogs}
          overrides={{
            BaseButton: {
              style: {
                boxShadow: "none",
              }
            }
          }}
        >
          打开服务日志
        </NavButton>
      </Block>

      <Title>
        全断面+楔形掏槽
      </Title>

      <Block display="flex" gridGap="8px">
        <NavButton
          onClick={handleSaveToCloud}
          overrides={{
            BaseButton: {
              style: {
                boxShadow: "none",
              }
            }
          }}
        >
          保存为云端文件
        </NavButton>
        <NavButton
          onClick={handleSaveLocal}
            overrides={{
            BaseButton: {
                style: {
                boxShadow: "none",
              }
            }
          }}
        >
          保存为本地文件
        </NavButton>
        <NavButton
          onClick={handleCreateProject}
            overrides={{
            BaseButton: {
                style: {
                boxShadow: "none",
              }
            }
          }}
        >
          创建新项目
        </NavButton>
      </Block>

      <Block display="flex" alignItems="center">
        <StatefulPopover
          content={<UserMenu />}
          placement={PLACEMENT.bottomRight}
            overrides={{
            Inner: {
                style: {
                backgroundColor: "transparent",
                border: "none",
              },
              },
            }}
          >
          <UserInfo>
            <Avatar
              name="特别周"
              size="scale800"
              src={avatarImage}
            />
          </UserInfo>
        </StatefulPopover>
        </Block>
      </Container>
  )
}

export default Navbar
