export function canShare(file: File, nav: Navigator = navigator): boolean {
  try {
    return (
      typeof nav.share === "function" &&
      typeof nav.canShare === "function" &&
      nav.canShare({ files: [file] })
    );
  } catch {
    return false;
  }
}
export async function share(
  file: File,
  text: string,
  nav: Navigator = navigator,
): Promise<"shared" | "cancelled"> {
  try {
    await nav.share({ files: [file], text });
    return "shared";
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError")
      return "cancelled";
    throw e;
  }
}
export async function copy(text: string, nav: Navigator = navigator) {
  await nav.clipboard.writeText(text);
}
