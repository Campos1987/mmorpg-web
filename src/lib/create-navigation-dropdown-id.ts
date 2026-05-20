export function createNavigationDropdownId(label: string): string {
  return `nav-dropdown-${label.toLowerCase().replace(/\s+/g, "-")}`;
}
