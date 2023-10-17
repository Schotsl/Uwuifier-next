import Header from "@/components/Header";

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

export default async function Page() {
  const initial = await loadStatistics();

  return (
    <>
      <Header offset={0} initial={initial} personal={10} />
    </>
  );
}
