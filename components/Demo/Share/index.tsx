import Button from "@/components/Button";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { usePlausible } from "next-plausible";

type DemoShareProps = {
  output: string;
};

export default function DemoShare({ output }: DemoShareProps) {
  const plausible = usePlausible();

  function handleShare() {
    // Check if the share API is available
    if (!navigator.share) {
      alert("The share API is not supported in your browser.");
      return;
    }

    navigator.share({
      text: output,
    });

    plausible("Shared text");
  }

  return (
    <Button
      icon={faShareFromSquare}
      aria="Share text"
      label="Share text"
      onClick={handleShare}
    />
  );
}
