import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

type ItemType = {
  title: string;
  href?: string;
  items?: ItemType[];
};

const items: ItemType[] = [
  { title: "Главная", href: "/" },
  {
    title: "Каталог",
    items: [
      { title: "Все товары", href: "/catalog" },
      { title: "Зарядные устройства", href: "/catalog&object=chargers" },
    ],
  },
  {
    title: "Услуги",
    items: [{ title: "Установка зарядного устройства", href: "/install" }],
  },
  { title: "Контакты", href: "/contacts" },
  { title: "О нас", href: "/about" },
];

const NavMenu = () => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {items.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.items ? (
              <>
                <NavigationMenuTrigger className="p-2">
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white border-none p-0">
                  {item.items.map((subItem, subIndex) => (
                    <NavigationMenuLink
                      className="whitespace-nowrap"
                      asChild
                      key={subIndex}
                    >
                      <Link href={subItem.href ?? "#"}>{subItem.title}</Link>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link href={item.href ?? "#"}>{item.title}</Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
