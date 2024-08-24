import Demo from "@/components/Demo";
import Modal from "@/components/Modal";
import Header from "@/components/Header";

// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default async function Page() {
  // const codeString =
  //   `import Uwuifier from "uwuifier";\n\n` +
  //   `const uwuifier = new Uwuifier();\n\n` +
  //   `console.log(uwuifier.uwuifySentence("This package is amazing!"));`;

  return (
    <main>
      <Header />
      <Demo />

      {/* <div>
        <h2 style={{ opacity: 1 }}>Tired of Human Interaction?</h2>
        <p style={{ paddingBottom: "1.5rem", margin: "0.5rem 0" }}>
          Friends getting on your nerves? Socializing becoming a chore? Embrace
          the blissful solitude of uwu with{" "}
          <a href="https://uwuifier.com">uwuifier.com</a> or the JavaScript /
          TypeScript package on{" "}
          <a href="https://www.npmjs.com/package/uwuifier">NPM</a>,{" "}
          <a href="https://jsr.io/@schotsl/uwuifier">JSR</a> or{" "}
          <a href="https://github.com/Schotsl/Uwuifier">GitHub</a>! This
          ridiculously simple uwu translator takes any boring, human text and
          transforms it into the language of pure, lonely, unadulterated
          cuteness: uwu.
        </p>

        <SyntaxHighlighter
          style={darcula}
          language="typescript"
          customStyle={{
            padding: "20px 24px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.02)",
            borderRadius: "32px",
            backgroundColor: "#303030",
          }}
        >
          {codeString}
        </SyntaxHighlighter>

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
