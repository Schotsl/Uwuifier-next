import Intro from "@/components/Intro";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createServerComponentClient({ cookies });

async function loadStatistics() {
  try {
    const { data } = await supabase
      .from("statistics")
      .select("uwuified_sentence")
      .single();

    if (!data) {
      return 0;
    }

    return data.uwuified_sentence;
  } catch (error) {
    return 0;
  }
}

function loadPersonal() {
  const store = cookies();

  const personal = store.get("personal")?.value || "0";
  const personalParsed = parseInt(personal);

  return personalParsed;
}

export default async function Page() {
  const initialTotal = await loadStatistics();
  const initialPersonal = loadPersonal();

  return (
    <>
      <Intro initialTotal={initialTotal} initialPersonal={initialPersonal} />
    </>
  );
}
