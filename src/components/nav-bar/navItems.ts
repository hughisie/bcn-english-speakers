export type NavItem = {
  title: string;
  path: string;
  children?: NavItem[];
  badge?: boolean;
}
export const menuItems: NavItem[] = [
  // {
  //   title: "Features",
  //   path: "#",
  //   children: [
  //     { title: "Action", path: "/" },
  //     { title: "Another action", path: "#" },
  //     { title: "Dropdown Submenu", path: "#" },
  //     { title: "404 Page", path: "/404" },
  //   ],
  // },
  {
    title: "Expert Blog",
    path: "/blog",
  },
  {
    title: "Community",
    path: "/community",
  },
  {
    title: "Events",
    path: "/events",
  },
];
