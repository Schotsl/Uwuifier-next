import Button from "@/components/Button";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { usePlausible } from "next-plausible";

type DemoShareProps = {
  output: string;
};

export default function DemoShare({ output }: DemoShareProps) {
  const plausible = usePlausible();

  async function handleShare() {
    // Check if the share API is available
    if (!navigator.share) {
      alert("The share API is not supported in your browser.");
      return;
    }

    try {
      await navigator.share({
        text: output,
      });
    } catch (error: any) {
      const errorAborted =
        error.name === "AbortError" ||
        error.message.includes("cancellation of share");

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
