import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const SignInCard = () => {
  return (
    <Card className="w-full h-full md:w-[480px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-8">
        <CardTitle className="text-2xl">Sign In</CardTitle>
      </CardHeader>
      <div className="px-8">
        <Separator />
      </div>
    </Card>
  );
}
