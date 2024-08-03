import Button from "@/components/Button";

import { useState } from "react";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { usePlausible } from "next-plausible";

type DemoCopyProps = {
  output: string;
};

export default function DemoCopy({ output }: DemoCopyProps) {
  const plausible = usePlausible();

  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(output);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);

    plausible("Copied text");
  }

  return (
    <Button
      key={0}
      aria="Copy text"
      icon={copied ? faCheck : faCopy}
      onClick={handleCopy}
    />
  );
}
