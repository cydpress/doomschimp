import { createFileRoute } from "@tanstack/react-router";
import { CountdownView } from "@/components/countdown-view";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <CountdownView />;
}
