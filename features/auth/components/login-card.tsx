import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const LoginCard = () => {
  return (
    <Card className="w-full h-full md:w-[480px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-8">
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
      </CardHeader>
      <div className="px-8">
        <Separator />
      </div>
      <CardContent className="p-8">
      </CardContent>
    </Card>
  );
}
