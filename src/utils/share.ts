export async function shareText(text: string): Promise<"shared" | "copied" | "failed"> {
  const copyAttempt = navigator.clipboard
    ?.writeText(text)
    .then(() => true)
    .catch(() => false);

  if (typeof navigator.share === "function") {
    try {
      await navigator.share({ text });
      await copyAttempt;
      return "shared";
    } catch (error) {
      const aborted =
        error instanceof DOMException && error.name === "AbortError";
      if (aborted) {
        return (await copyAttempt) ? "copied" : "failed";
      }
    }
  }

  return (await copyAttempt) ? "copied" : "failed";
}
