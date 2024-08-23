export function openSidebar() {
  if (typeof document !== "undefined") {
    document.body.style.overflow = "hidden";
    document.documentElement.style.setProperty("--SideNavigation-slideIn", "1");
  }
}

export function closeSidebar() {
  if (typeof document !== "undefined") {
    document.documentElement.style.removeProperty("--SideNavigation-slideIn");
    document.body.style.removeProperty("overflow");
  }
}

export function toggleSidebar() {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--SideNavigation-slideIn");
    if (slideIn) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
}

export function openMessagesPane() {
  if (typeof document !== "undefined") {
    document.body.style.overflow = "hidden";
    document.documentElement.style.setProperty("--MessagesPane-slideIn", "1");
  }
}

export function closeMessagesPane() {
  if (typeof document !== "undefined") {
    document.documentElement.style.removeProperty("--MessagesPane-slideIn");
    document.body.style.removeProperty("overflow");
  }
}

export function toggleMessagesPane() {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--MessagesPane-slideIn");
    if (slideIn) {
      closeMessagesPane();
    } else {
      openMessagesPane();
    }
  }
}
/**
 * coler converter
 * @param rgba rgba(170, 70, 67, 0.8) 
 * @returns -> #aa464380
 */
export const rgbaToHex = (rgba:string): string=>{
  const rgbaMatch = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*\.?\d*)?\)/);

  if (!rgbaMatch) {
      throw new Error("Invalid RGBA format");
  }

  const r = parseInt(rgbaMatch[1], 10);
  const g = parseInt(rgbaMatch[2], 10);
  const b = parseInt(rgbaMatch[3], 10);
  const a = rgbaMatch[4] !== "" ? parseFloat(rgbaMatch[4]) : 1;

  let hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  let alphaHex = Math.round(a * 255).toString(16).padStart(2, '0');

  return `#${hex}${alphaHex}`;
}

/**
 * convert seconds to hours and minutes
 * @param seconds 
 * @returns {hours, minutes}
 */
export function secondsToHoursAndMinutes(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);

  return { hours, minutes };
}

