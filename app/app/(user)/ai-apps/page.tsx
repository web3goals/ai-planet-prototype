import { AIAppDirectory } from "@/components/ai-app-directory";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";

export default function AIAppsPage() {
  return (
    <div className="container py-10 lg:px-96">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">AI Apps</h2>
        <p className="text-muted-foreground">
          Solutions that can make your life better
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col items-start gap-6">
        {Object.values(siteConfig.contracts).map((contracts, index) => (
          <AIAppDirectory key={index} contracts={contracts} />
        ))}
      </div>
    </div>
  );
}
