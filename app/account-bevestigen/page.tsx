"use client";

import Emoji from "@/components/Emoji";
import AuthenticationPage from "@/components/Authentication/Page";
import AuthenticationForm from "@/components/Authentication/Form";
import AuthenticationLoading from "@/components/Authentication/Loading";
import AuthenticationFormButton from "@/components/Authentication/Form/Button";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const urlParams = useSearchParams();
  const urlRedirect = urlParams.get("url")!;

  const [loading, setLoading] = useState(false);

  const handleActivate = () => {
    setLoading(true);
  };

  return (
    <AuthenticationPage>
      <h2>Je bent er bijna!</h2>

      <AuthenticationForm onSubmit={handleActivate}>
        <p>
          Druk op de knop hieronder om je account te bevestigen. Hierna word je
          direct ingelogd. <Emoji emoji="🎉" />
        </p>

        {loading && <AuthenticationLoading />}

        <AuthenticationFormButton href={urlRedirect} disabled={loading}>
          Account bevestigen
        </AuthenticationFormButton>
      </AuthenticationForm>
    </AuthenticationPage>
  );
}
