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

      <div>
        <h2>Tired of Human Interaction?</h2>
        <p>
          Friends getting on your nerves? Socializing becoming a chore? Embrace
          the blissful solitude of uwu with uwuifier.com! Our ridiculously
          simple uwu translator takes any boring, human text and transforms it
          into the language of pure, unadulterated cuteness: uwu.
        </p>

        <p>
          Suddenly regretting your descent into uwu-ness? No worries! Hit the
          un-uwuify button and watch your text magically revert back to the
          dullness of normal English. uwuifier: the perfect tool for those
          fleeting moments when you want to escape humanity, one uwu at a time.
        </p>
      </div>
    </>
  );
}
