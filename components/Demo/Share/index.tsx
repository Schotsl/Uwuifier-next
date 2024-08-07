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

    try {
      navigator.share({
        text: output,
      });
    } catch (error: any) {
      // No need to report this abort error
      if (error.name === "AbortError") {
        return;
      }

      throw error;
    }
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
