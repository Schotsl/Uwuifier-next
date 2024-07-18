import Button from "@/components/Button";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";

type DemoShareProps = {
  output: string;
};

export default function DemoShare({ output }: DemoShareProps) {
  function handleShare() {
    // Check if the share API is available
    if (!navigator.share) {
      alert("The share API is not supported in your browser.");
      return;
    }

    navigator.share({
      text: output,
    });
  }

  return (
    <Button icon={faShareFromSquare} label="Share text" onClick={handleShare} />
  );
}
