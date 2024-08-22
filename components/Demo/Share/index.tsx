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
      const errorStringified = JSON.stringify(error);
      const errorAborted = errorStringified.includes("AbortError");

      // No need to report this abort error
      if (errorAborted) return;

      throw error;
    }

    plausible("Shared sentence");
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
