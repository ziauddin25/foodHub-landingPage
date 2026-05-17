import { SignIn } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

export default function SignInPage() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const redirectUrl = params.get("redirect") || "/";

  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn forceRedirectUrl={redirectUrl} />
    </div>
  );
}