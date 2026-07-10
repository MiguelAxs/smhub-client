import type { Transition } from "motion/react"

export const SIDEBAR_TRANSITION: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
}

export const NAV_ITEM_PADDING = {
    expanded: { paddingLeft: 12, paddingRight: 12 }, // equivalente a px-3
    collapsed: { paddingLeft: 18, paddingRight: 18 }, // centraliza o ícone de 20px numa faixa de ~56px
} as const



export const HEADER_PADDING_LEFT = {
    expanded: 16,
    collapsed: 22,
} as const