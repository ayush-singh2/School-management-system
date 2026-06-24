import { redirect } from "next/navigation";

// Root redirects to login; authenticated users are sent to their portal by middleware
export default function RootPage() {
  redirect("/login");
}
