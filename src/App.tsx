import { HousePartyPage } from "./pages/HousePartyPage";
import { HalloweenPage } from "./pages/HalloweenPage";

function isHalloweenPath(pathname: string) {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return normalized.endsWith("/halloween");
}

export default function App() {
  if (isHalloweenPath(window.location.pathname)) {
    return <HalloweenPage />;
  }

  return <HousePartyPage />;
}
