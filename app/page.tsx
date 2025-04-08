import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Button variant="default">Default</Button>
      <Button variant="secondary" size="lg">Default</Button>
      <Button variant="destructive" size="lg">Default</Button>
      <Button variant="outline" size="lg">Default</Button>
      <Button variant="link" size="lg">Default</Button>
      <Button variant="ghost" size="lg">Default</Button>
    </div>
  );
}
