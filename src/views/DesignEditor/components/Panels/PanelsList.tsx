import { useStyletron } from "baseui"
import { BASE_ITEMS, VIDEO_PANEL_ITEMS } from "~/constants/app-options"
import useAppContext from "~/hooks/useAppContext"
import { styled } from "baseui"
import Icons from "~/components/Icons"
import { useTranslation } from "react-i18next"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import useEditorType from "~/hooks/useEditorType"
import Scrollable from "~/components/Scrollable"
import { Block } from "baseui/block"

const Container = styled("div", (props) => ({
  width: "80px",
  backgroundColor: props.$theme.colors.primary100,
  display: "flex",
}))

function PanelsList() {
  const { activePanel } = useAppContext()
  const { t } = useTranslation("editor")
  const editorType = useEditorType()
  const PANEL_ITEMS = editorType === "VIDEO" ? VIDEO_PANEL_ITEMS : BASE_ITEMS
  return (
    <Container>
      <Scrollable autoHide={true}>
        {PANEL_ITEMS.map((panelListItem) => (
          <PanelListItem
            label={t(`panels.panelsList.${panelListItem.id}`)}
            name={panelListItem.name}
            key={panelListItem.name}
            icon={panelListItem.name}
            activePanel={activePanel}
          />
        ))}
      </Scrollable>
    </Container>
  )
}

function PanelListItem({ label, icon, activePanel, name }: any) {
  const { setActivePanel } = useAppContext()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [css, theme] = useStyletron()
  // @ts-ignore
  const Icon = Icons[icon]
  const isActive = name === activePanel

  return (
    <Block
      id={"EditorPanelList"}
      onClick={() => {
        setIsSidebarOpen(true)
        setActivePanel(name)
      }}
      $style={{
        width: "80px",
        height: "70px",
        backgroundColor: isActive ? theme.colors.white : theme.colors.primary100,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "Uber Move Text",
        fontWeight: 500,
        fontSize: "0.8rem",
        userSelect: "none",
        transition: "all 0.3s ease",
        gap: "0.1rem",
        position: "relative",
        ':before': {
          content: '""',
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: isActive ? "3px" : "0",
          height: "24px",
          backgroundColor: theme.colors.primary,
          transition: "width 0.3s ease"
        },
        ":hover": {
          cursor: "pointer",
          backgroundColor: theme.colors.white,
          transform: "translateY(-1px)",
          boxShadow: isActive ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none",
        },
      }}
    >
      <Block
        $style={{
          color: isActive ? theme.colors.primary : theme.colors.contentPrimary,
          transition: "color 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Icon size={24} />
      </Block>
      <Block
        $style={{
          color: isActive ? theme.colors.primary : theme.colors.contentPrimary,
          transition: "color 0.3s ease",
          marginTop: "4px"
        }}
      >
        {label}
      </Block>
    </Block>
  )
}

export default PanelsList