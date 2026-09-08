export const authedMenuItems = [
  { label: "Saved items", link: "/saved", icon: "bookmarks-outline" },
  { label: "Resources", link: "/resources", icon: "folder-open-outline" },
  { label: "Communities", link: "/communities", icon: "people-outline" },
  "divider",
  {
    label: "Feedback",
    icon: "chatbox-ellipses-outline",
    to: "/feedback",
  },
  {
    label: "Help & Support",
    icon: "help-circle-outline",
    to: "/help",
  },
  "divider",
];

export const unAuthedMenuItems = [
  {
    label: "Feedback",
    icon: "chatbox-ellipses-outline",
    to: "/feedback",
  },
  {
    label: "Help & Support",
    icon: "help-circle-outline",
    to: "/help",
  },
  {
    label: "Report a problem",
    icon: "alert-circle-outline",
    to: "/report-a-problem",
  },
  "divider",
  "theme_switcher",
];
