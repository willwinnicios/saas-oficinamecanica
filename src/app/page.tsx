import { redirect } from "next/navigation";

export default function RootPage() {
  // In a real app, we would check for a session here
  redirect("/login");
}
