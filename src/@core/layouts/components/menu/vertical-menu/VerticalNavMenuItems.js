// ** Vertical Menu Components
import VerticalNavMenuLink from "./VerticalNavMenuLink"
import VerticalNavMenuGroup from "./VerticalNavMenuGroup"
import VerticalNavMenuSectionHeader from "./VerticalNavMenuSectionHeader"

// ** Utils
import {
  resolveVerticalNavMenuItemComponent as resolveNavItemComponent,
  canViewMenuGroup,
  canViewMenuItem,
} from "@layouts/utils"

const VerticalMenuNavItems = (props) => {
  // ** Components Object
  const Components = {
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
    VerticalNavMenuSectionHeader,
  }

  // ** Render Nav Menu Items
  const RenderNavItems = props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)]
    if (item.children) {
      return (
        canViewMenuGroup(item) && (
          <TagName item={item} index={index} key={item.id} {...props} />
        )
      )
    } else {
      return (
        canViewMenuItem(item) && (
          <TagName item={item} index={index} key={item.id} {...props} />
        )
      )
    }
  })

  return RenderNavItems
}

export default VerticalMenuNavItems
