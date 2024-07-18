import Button from "@/components/Button";

import { useState } from "react";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";

type DemoCopyProps = {
  output: string;
};

export default function DemoCopy({ output }: DemoCopyProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(output);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <Button key={0} icon={copied ? faCheck : faCopy} onClick={handleCopy} />
  );
}
