import Demo from "@/components/Demo";
import Modal from "@/components/Modal";
import Header from "@/components/Header";

export default async function Page() {
  return (
    <main>
      <Header />
      <Demo />
      {/* 
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
      </div> */}

      <Modal />
    </main>
  );
}
